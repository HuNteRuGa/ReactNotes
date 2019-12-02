"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist/public"),
  assets: "static"
};

module.exports = {
  mode: "development",
  externals: {
    paths: PATHS
  },

  entry: {
    main: [`${PATHS.src}/main.js`]
  },
  output: {
    filename: `${PATHS.assets}/js/[name].js`,
    path: PATHS.dist,
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader"
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: false }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              config: { path: "./postcss.config.js" }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: false }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].css`
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}/img` },
      { from: `${PATHS.src}/assets/svg`, to: `${PATHS.assets}/img` },
      { from: `${PATHS.src}/assets/static`, to: `${PATHS.assets}` },
      { from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}/fonts` }
    ]),
    new HtmlWebpackPlugin({
      filename: `index.ejs`,
      template: path.resolve(__dirname, `${PATHS.src}/index.pug`),
      inject: false
    })
  ]
};
