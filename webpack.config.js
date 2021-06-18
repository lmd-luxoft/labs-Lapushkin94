const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js'
    ],

    devtool: 'source-map',
    
    mode: 'development',

    devServer: { 
        contentBase: './dist', 
        hot: true, 
    },

    plugins: [ 
        new webpack.HotModuleReplacementPlugin() 
    ],

    output: {
        filename: './bundle.js'
    },

    module: {
        rules:
            [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
    }
};