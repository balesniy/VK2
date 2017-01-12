const path = require('path');
const webpack = require('webpack');
module.exports = {
  context:   path.resolve(__dirname, './src'),
  entry:     {
    app: './index.js',
  },
  output:    {
    filename:   '[name].bundle.js',
    path:       path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),  // New
    proxy: {
      "/api": "http://localhost:3000"
    },
  },

  module:    {
    rules: [
      {
        test: /\.js$/,
        use:  [
          {
            loader:  'babel-loader',
            options: {
              presets: [
                [
                  "env", {
                  "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
                  },
                  "modules": false,
                  "loose":   false
                }
                ]
                , 'react'
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } }
        ],
      },

      // Loaders for other file types can go here
    ],
  },
};