const path = require("path");
const basePath = __dirname;
const distPath = "dist";

const devMode = process.env.NODE_ENV !== "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "styles.css" : "styles.[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "pages", "index.pug"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "pages", "404.pug"),
      filename: "404.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "pages", "about", "index.pug"),
      filename: "about/index.html",
    }),
    // new FaviconsWebpackPlugin(path.resolve("src", "static", "images", "logo-python.png")),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.pug/,
        use: ["pug-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|ico)/,
        loader: "file-loader",
        options: {
          name: "/static/images/[name].[ext]",
        },
      },
      {
        test: /\.htaccess/,
        loader: "file-loader",
        options: {
          name: "[name]",
        },
      },
    ],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve("src", "pages"),
    },
    compress: true,
    port: 3000,
    allowedHosts: "all",
  },
};
