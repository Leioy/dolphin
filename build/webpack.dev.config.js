const path = require('path')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const resolve = dir => path.join(__dirname, '..', dir)
module.exports = merge(baseConfig, {
		mode: 'development',
		devtool: 'eval-source-map',
		entry: {
			app: resolve('examples/main.ts'),
		},
		devServer: {
			hot: true,
			inline: true,
			stats: 'minimal',
			overlay: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: resolve('examples/index.html'),
				filename: 'index.html',
			}),
		],
	},
)
