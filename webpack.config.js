const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = !process.env.WEBPACK_DEV_SERVER;

const CONFIG = {
  indexHtmlTemplate: './public/index.html',
  indexJSX: './src/index.jsx',
  outputDir: './build',
  assetDir: './public',
  publicDirProduct: '/what-to-watch',
  publicDirDevServer: '/',
  devServerPort: 8000,
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
  entry: './src/index.jsx',
  mode: isProduction ? 'production' : 'development',
  output: {
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    path: resolve(CONFIG.outputDir),
    publicPath: isProduction ? CONFIG.publicDirProduct : CONFIG.publicDirDevServer,
  },
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
          to: resolve(CONFIG.outputDir),
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
    publicPath: CONFIG.publicDirDevServer,
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
    extensions: ['.js', '.jsx', '.js', 'json']
  },
};
