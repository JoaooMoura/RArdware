import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, NativeModules } from 'react-native';
import { WebView } from 'react-native-webview';

const { LocalServerModule } = NativeModules;

export function Simulador3DScreen() {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    LocalServerModule.start()
      .then((url: string) => {
        if (mounted) {
          console.log('Servidor local Kotlin rodando em:', url);
          setServerUrl(url);
        }
      })
      .catch((err: any) => {
        if (mounted) setError(err.message || 'Erro ao ligar servidor');
      });

    return () => {
      mounted = false;
      LocalServerModule.stop();
    };
  }, []);

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  if (!serverUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#2F54FF" size="large" />
        <Text style={styles.loadingText}>Iniciando motor 3D offline...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `${serverUrl}/index.html` }}
        style={styles.webview}
        originWhitelist={['*']}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(event) => {
          console.log('WEBVIEW LOG:', event.nativeEvent.data);
        }}
        injectedJavaScript={`
          console.log = function(message) {
            window.ReactNativeWebView.postMessage(message);
          };
          console.error = function(message) {
            window.ReactNativeWebView.postMessage('ERROR: ' + message);
          };
          true;
        `}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0c10',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0b0c10',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0c10',
  },
  loadingText: {
    color: '#2F54FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
