const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const resolve = dir => path.join(__dirname, '..', dir)
module.exports = merge(baseConfig, {
	mode: 'production',
	entry: resolve('packages/index.ts'),
	output: {
		path: resolve('lib'),
		library: 'dolphin',
		libraryTarget: 'umd',
		filename: 'index.min.js',
		umdNamedDefine: true,
	},
	externals: {
		vue: {
			root: 'vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue',
		},
	},
})
