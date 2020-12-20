// Webpack config for Multiple Page
// Each Page has its own js file

const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// folder path of multiple html page
const htmlPath = './src/html/'; 

// folder paths of js files that will be inserted to html pages
// name of js file should be the same as the html file
const jsPath = './src/js/'; 

let entries = {};
let htmlWebpackPlugins = [];

let files = fs.readdirSync(htmlPath);
files.forEach(function (file) {
  let fileName = path.parse(file).name;
  let fileExtension = path.parse(file).ext;

  // if name.html cant find its own name.js throw error
  if (!fs.existsSync(jsPath + fileName + '.js')) {
    throw `File ${jsPath + fileName + '.js'} not found`;
  }

  if (fileExtension === '.html') {
    entries[fileName] = jsPath + fileName + '.js';
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      filename: file,
      template: htmlPath + file,
      chunks: [fileName]
    }))
  }
});

module.exports = {
  performance: {
    hints: false
  },
  optimization: {
      minimize: false
  },
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules:[
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "[name].css"
    })
  ]
};