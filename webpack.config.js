var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: "./src/index.jsx"
  },
  output: {
    path: '//192.168.1.2/Share/web/xedecimal.net/wp-content/themes/celestial/dist',
    // path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
          publicPath: "dist"
        })
      }, {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "stylus-loader"],
          publicPath: "dist"
        })
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=[name].[ext]&outputPath=images/&publicPath=https://xedecimal.net/wp-content/themes/celestial/dist/images",
          "image-webpack-loader"
        ]
      }, {
        test: /\.(woff2?|svg)$/,
        loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
      }, {
        test: /\.(ttf|eot)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    })
  ]
};
