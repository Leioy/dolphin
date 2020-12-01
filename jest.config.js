module.exports = {
	preset: 'ts-jest',
	globals: {},
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': 'vue-jest',
	},
	moduleNameMapper: {
		'^packages/(.*)$': '<rootDir>/packages/$1',
	},
	collectCoverage: true,
	collectCoverageFrom: [ 'packages/**/*.{vue}', '!**/node_modules/**' ],
	moduleFileExtensions: [ 'vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node' ],
	coverageDirectory: 'coverage',
	coverageReporters: [ 'text', 'lcov' ],
}
