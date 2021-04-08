module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false,
				targets:{
					browsers: [
						"last 3 Chrome versions",
						"last 3 Firefox versions",
						"Safari >= 10",
						"Explorer >= 11",
						"Edge >= 12",
						"iOS >= 10",
						"Android >= 6"
					]
				},
				useBuiltIns:'usage',
				debug:true,
				corejs: {
					version: 3,
					proposals: true // 使用尚在“提议”阶段特性的 polyfill
				}
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [ '@babel/transform-runtime' ],
	overrides: [
		{
			test: /\.vue$/,
			plugins: [ '@babel/plugin-transform-typescript' ],
		},
	],
}
