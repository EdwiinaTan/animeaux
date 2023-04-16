module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          path: '.env',
        },
      ],
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src/',
            assets: './assets/',
            static: './static/',
          },
          extensions: ['.js', 'jsx', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
