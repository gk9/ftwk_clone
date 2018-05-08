const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const live = process.env.NODE_ENV === "production";
// console.log(live);
let cssConfig;
if (live) {
  cssConfig = ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ]);
} else {
  cssConfig = ['style-loader', 'css-loader', 'postcss-loader']
}

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '0.0.0.0',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Digital Innovation Consultancy for Healthcare | Service Design Thinking',
      template: './src/pages/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Digital Innovation Consultancy for Healthcare | Service Design Thinking | Services',
      template: './src/pages/services.html',
      filename: 'services.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Digital Innovation Consultancy for Healthcare | Service Design Thinking | Cases',
      template: './src/pages/cases.html',
      filename: 'cases/index.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Digital Innovation Consultancy for Healthcare | Service Design Thinking | People',
      template: './src/pages/people.html',
      filename: 'people.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Case | Bayer Open Innovation Portal',
      template: './src/pages/cs_boip.html',
      filename: 'cases/case_study_boip.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Case | Corporate Innovation',
      template: './src/pages/cs_corporate_innovation.html',
      filename: 'cases/case_study_corporate_innovation.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Case | SIMAPP iPad Sales App',
      template: './src/pages/cs_simapp.html',
      filename: 'cases/case_study_simapp.html',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Not Found | FTWK',
      template: './src/pages/not_found.html',
      filename: 'not_found.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'IMPRINT | FTWK',
      template: './src/pages/imprint.html',
      filename: 'imprint.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'FTWK | Space',
      template: './src/pages/space.html',
      filename: 'space.html'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: [
            /(node_modules)/,
            path.resolve(__dirname, './src/plugins')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: [
          {
            loader: 'file-loader?name=[path][name].[ext]'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
