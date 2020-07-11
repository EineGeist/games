const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const fileName = isDev ? '[name].[hash]' : '[name].[contenthash]';

const optimization = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  devtool: isDev ? 'source-map' : '',

  entry: './index.tsx',

  output: {
    filename: fileName + '.js',
    path: path.resolve(__dirname, isDev ? 'dist' : './build'),
    publicPath: isDev ? '/' : '/games/',
  },

  optimization: optimization(),

  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
    clientLogLevel: 'silent',
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({ filename: fileName + '.css' }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src')],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
};
