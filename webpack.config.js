const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {       
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'), 
        },
        port: 3000,
        open: false,
        hot: true,
        compress: true,
        historyApiFallback: true
    },

    module: {
        rules: [ 
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                // url loader for select2 images
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192, // Convert images < 8kb to base64 strings
                    
                    },
                  }, 
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'JavaScript Arrays Demo',
            template: 'src/template.html',
            filename: 'index.html',  
            favicon: 'src/favicon.ico'      
        }),
        
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),       
    ]
};
