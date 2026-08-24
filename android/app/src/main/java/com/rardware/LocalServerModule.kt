package com.rardware

import android.content.res.AssetManager
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import fi.iki.elonen.NanoHTTPD
import java.io.InputStream
import java.io.IOException

class LocalServerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var server: AssetServer? = null
    private val PORT = 8080

    override fun getName(): String {
        return "LocalServerModule"
    }

    @ReactMethod
    fun start(promise: Promise) {
        if (server == null) {
            server = AssetServer(reactApplicationContext.assets, PORT)
            try {
                server?.start()
                promise.resolve("http://localhost:$PORT")
            } catch (e: Exception) {
                promise.reject("SERVER_ERROR", "Could not start server: ${e.message}")
            }
        } else {
            promise.resolve("http://localhost:$PORT")
        }
    }

    @ReactMethod
    fun stop() {
        server?.stop()
        server = null
    }

    private inner class AssetServer(private val assetManager: AssetManager, port: Int) : NanoHTTPD(port) {
        override fun serve(session: IHTTPSession): Response {
            var uri = session.uri
            if (uri == "/") uri = "/index.html"
            
            // Remove leading slash for asset manager
            var assetPath = uri
            if (assetPath.startsWith("/")) {
                assetPath = assetPath.substring(1)
            }
            
            // Map root requests to the 3d folder
            val fullAssetPath = "3d/$assetPath"

            return try {
                val stream: InputStream = assetManager.open(fullAssetPath)
                val mimeType = getMimeTypeForFile(uri)
                val response = newChunkedResponse(Response.Status.OK, mimeType, stream)
                
                // IMPORTANTE: Adicionar CORS Headers para garantir que fetch() local funcione sem barreiras
                response.addHeader("Access-Control-Allow-Origin", "*")
                response.addHeader("Access-Control-Allow-Headers", "*")
                response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                
                response
            } catch (e: IOException) {
                Log.e("LocalServer", "File not found in assets: \$fullAssetPath")
                newFixedLengthResponse(Response.Status.NOT_FOUND, MIME_PLAINTEXT, "File not found: \$fullAssetPath")
            }
        }
    }
}
