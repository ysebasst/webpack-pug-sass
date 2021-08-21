const path = require("path");
const basePath = __dirname;
const distPath = "dist";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("src", "pages", "index.pug"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "pages", "about", "index.pug"),
      filename: "about/index.html",
    }),
    new FaviconsWebpackPlugin(path.resolve("src", "public", "logo-python.png")),
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
        use: ["style-loader", "css-loader", "sass-loader"],
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
