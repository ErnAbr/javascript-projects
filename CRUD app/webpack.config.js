const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/script.js"),
    post: path.resolve(__dirname, "src/services/post.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 5000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Javascript Exam",
      filename: "index.html",
      template: "src/index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      title: "add skills",
      filename: "add.html",
      template: "src/add.html",
      chunks: ["post"],
    }),
  ],
};
