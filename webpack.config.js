const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV !== 'production';

const CONFIG = {
  indexHtmlTemplate: './src/index.html',
  indexJSX: './src/index.jsx',
  cssEntry: './src/style.scss',
  outputDir: './deploy',
  assetDir: './public',
  publicDir: '/',
  devServerPort: 8001,
};

function resolve(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
}

const commonPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve(CONFIG.indexHtmlTemplate),
  }),
];

module.exports = {
  entry: isProduction ? {
    app: [resolve(CONFIG.indexJSX), resolve(CONFIG.cssEntry)],
  } : {
    app: [resolve(CONFIG.indexJSX)],
    style: [resolve(CONFIG.cssEntry)],
  },
  output: {
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    path: resolve(CONFIG.outputDir),
    publicPath: CONFIG.publicPath,
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: isProduction
    ? commonPlugins.concat([
      new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
      new CopyWebpackPlugin({
        patterns: [{
          from: resolve(CONFIG.assetDir),
        }],
      }),
    ])
    : commonPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ]),
  devServer: {
    contentBase: resolve(CONFIG.assetDir),
    historyApiFallback: {
      index: '/',
    },
    publicPath: CONFIG.publicPath,
    port: CONFIG.devServerPort,
    hot: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { implementation: require('sass') },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/,
        use: ['file-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', 'scss'],
  },
  devtool: 'source-map',
};
