const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve('./public'),
        filename: 'js/main.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: 'public',
        compress: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    }
}
