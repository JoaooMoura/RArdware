module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.android.js', '.android.ts', '.android.tsx', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@db': './src/db',
          '@ar': './src/ar',
          '@assets': './src/assets',
          '@store': './src/store',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
