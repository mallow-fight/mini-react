const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = process.env.ROOT || 'demo';

module.exports = {
  // 模式
  mode: 'development',
  // 入口文件
  entry: `./${root}/index.jsx`,
  // 输出文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${root}.bundle.js`,
  },
  // 图结构
  devtool: 'inline-source-map',
  // 热加载
  devServer: {
    contentBase: './dist',
    port: 12345,
  },
  // 解析规则
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              // 解析class-properties的插件得放在transform-classes之前
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-classes',
              ['@babel/plugin-transform-arrow-functions', { spec: true }],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
    ],
  },
  // 解析插件
  plugins: [
    new HtmlWebpackPlugin({
      template: `${root}/index.html`,
    }),
  ],
  // import找不到.js时，去找这些后缀
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      packages: path.resolve(__dirname, `${root}/packages`),
    },
  },
};
