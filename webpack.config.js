const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const mode =
  process.env.NODE_ENV !== "production" ? "development" : "production";

module.exports = {
  mode: mode,
  entry: {
    app: "./src/js/index.jsx"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./public/assets/js/")
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: [".js", ".jsx"]
  },
  optimization:
    mode === "production"
      ? {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: 6,
                compress: {
                  warnings: false,
                  drop_console: true
                }
              }
            })
          ]
        }
      : {}
};
