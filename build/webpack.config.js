const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
	devServer: {
		hot: true,
		inline: true,
		stats: 'minimal',
		overlay: true,
	},
	entry: {
		app: path.join(__dirname, '../examples/main.ts'),
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
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [ /\.vue$/ ],
				},
			},
			{
				test: /\.(le|c)ss$/,
				loader: [ 'style-loader', 'css-loader', 'less-loader' ],
			},
		],
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.vue' ],
		alias: {
			packages: path.resolve(__dirname, '../packages'),
			examples: path.resolve(__dirname, '../examples'),
		},
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../examples/index.html'),
			filename: 'index.html',
		}),
	],
	optimization: {
		minimize: true,
	},
}
