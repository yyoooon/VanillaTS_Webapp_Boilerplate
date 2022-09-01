/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js', // 파일명 []사용시 entry키값
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // 사용할 로더
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: 'only',
    port: 8000,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.ts', '.js'],
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      dummy: path.resolve(__dirname, 'src/dummy/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      views: path.resolve(__dirname, 'src/views/'),
      style: path.resolve(__dirname, 'src/style/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './public/index.html', // index.html에 dist/main.js를 연결하지 않아도 자동으로 해준다
    }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
    new CleanWebpackPlugin(), // build할 때마다 이전 dist파일 삭제
  ],
};
