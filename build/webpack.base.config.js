const {VueLoaderPlugin} = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					hotReload: true,
				},
			},
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(le|c)ss$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'less-loader'},
				],
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=8192',
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					symbolId: 'icon-[name]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.vue'],
		alias: {
			packages: path.resolve(__dirname, '../packages'),
			examples: path.resolve(__dirname, '../examples'),
		},
	},
	plugins: [
		new VueLoaderPlugin(),
		new ProgressBarPlugin()
	],
}
