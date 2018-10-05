const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";
const PORT = process.env.PORT || 4000;
const clientDir = path.join(__dirname, "src", "client");
const assetsBase = path.join(__dirname, "public", "assets");
const publicDir = path.join(__dirname, "public");

const cssFiles = [
  "css/bootstrap-clearmin.css",
  "css/roboto.css",
  "css/material-design.css",
  "css/small-n-flat.css",
  "css/font-awesome.min.css",
  "css/style.css"
];

const jsFiles = [
  "js/lib/jquery-2.1.3.min.js",
  "js/jquery.mousewheel.min.js",
  "js/jquery.cookie.min.js",
  "js/fastclick.min.js",
  "js/bootstrap.min.js",
  "js/clearmin.min.js"
];

module.exports = {
  entry: path.join(clientDir, "/index.js"),
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  devServer: {
    contentBase: assetsBase,
    port: 3000,
    open: true,
    proxy: {
      "/api": `http://localhost:${PORT}`
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(assetsBase, "css"), to: "css/" },
      { from: path.join(assetsBase, "js"), to: "js/" }
    ]),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: path.join(publicDir, "index.html"),
      favicon: path.join(publicDir, "favicon.ico")
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: jsFiles,
      append: false
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: cssFiles,
      append: true
    })
  ]
};
