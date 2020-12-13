module.exports = {
	preset: 'ts-jest',
	globals: {},
	verbose: true,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.(t|j)sx?$': [
			'babel-jest', {
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: true,
							},
						},
					],
					'@babel/preset-typescript',
				],
			},
		],
	},
	moduleNameMapper: {
		'^packages/(.*)$': '<rootDir>/packages/$1',
	},
	collectCoverage: false,
	collectCoverageFrom: [ 'packages/**/*.{vue,ts}', '!**/node_modules/**' ],
	moduleFileExtensions: [ 'vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node' ],
	coverageDirectory: 'coverage',
	coverageReporters: [ 'text', 'lcov' ],
}
