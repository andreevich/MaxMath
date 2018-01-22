const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.join(__dirname, './src'),
    buildPath = path.join(__dirname, process.env.NODE_ENV === 'test' ? './dist-testing' : './dist');

const conf = {
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        filename: '[name].js',
        path: buildPath
    },

    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {'@src': sourcePath}
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/},
            {
                test: /fonts(.)+\.(eot|woff2|woff|ttf|svg)$/,
                use: 'file-loader?name=fonts/[hash].[ext]'
            },

            {
                test: /images(.)+\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

            {
                test: /inline-svg(.)+\.svg$/,
                use: 'svg-inline-loader',
            }

        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(sourcePath, 'templates/index.html'),
            path: buildPath,
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new require('stylelint-webpack-plugin')(),
    ],
    devServer: {
        contentBase: path.join(__dirname, process.env.NODE_ENV === 'test' ? "dist-testing" : "dist"),
        compress: true,
        disableHostCheck: true,
        port: 9000,
        hot: true,
        https: true,
        proxy: {
            '/api/*': {
                target: process.env.NODE_ENV === 'test'
                    ? 'https://proxy-test/api/'
                    : 'https://proxy/api/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
};

if (process.env.NODE_ENV !== 'development') {
    conf.plugins.push(
        new ExtractTextPlugin('[name].css')
    );
    conf.module.rules.push(
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader',
            }),
        }
    );
}
else {
    conf.module.rules.push(
        {
            test: /\.css$/,
            //exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        }
    );
}

module.exports = conf;
