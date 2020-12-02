module.exports = {
	preset: 'ts-jest',
	globals: {},
	verbose: true,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\js$': 'babel-jest',
	},
	moduleNameMapper: {
		'^packages/(.*)$': '<rootDir>/packages/$1',
	},
	collectCoverage: true,
	collectCoverageFrom: [ 'packages/**/*.{vue,ts}', '!**/node_modules/**' ],
	moduleFileExtensions: [ 'vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node' ],
	coverageDirectory: 'coverage',
	coverageReporters: [ 'text', 'lcov' ],
}
