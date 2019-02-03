module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 8080
  }
};
