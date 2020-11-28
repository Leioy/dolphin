const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
	devServer: {
		open: true,
		hot: true,
		inline: true,
	},
	entry: {
		app: path.join(__dirname, '../examples/main.js'),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					hotReload: true,
				},
			},
		],
	},
	resolve: {
		extensions: [ '.js', '.vue' ],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../examples/index.html'),
			filename: 'index.html',
		}),
	],
}
