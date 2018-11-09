var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
 
module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
 
    entry: {
        app: [
            './app/app.ts'
        ],
        vendor: [
            'angular/angular.js',
            'angular-ui-router/release/angular-ui-router.js',
            'angular-ui-bootstrap',
            'angular-sanitize',
            'jquery',
            'bootstrap'
        ]
    },
    context: __dirname + "",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: 'bundle.map'
    },
    watch: true,
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {}
            },
            {
                test: /\.html$/,
                use: [{
                        loader: 'file-loader?name=[path][name].[ext]r',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'extract-loader'
 
                    },
                    {
                        loader: 'html-loader'
 
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(scss)$/,
                use: [
                  {
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                  },
                  {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                  },
                  {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                      plugins: function () {
                        return [
                          require('autoprefixer')
                        ];
                      }
                    }
                  },
                  {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                  }
                ]
              },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|png|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
 
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendors.js' }),
        new CopyWebpackPlugin([{ from: './app/index.html', to: './index.html' }])
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9001
    },
};
