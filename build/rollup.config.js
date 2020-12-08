import path from 'path'
import Vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
	input: path.resolve(__dirname, '../packages/index.ts'),
	output: {
		file: 'lib/index.esm.js',
		format: 'es',
		name: 'Dolphin',
	},
	plugins: [
		terser(),
		nodeResolve(),
		Vue({
			target: 'browser',
			css: false,
			exposeFilename: false,
		}),
		typescript({
			tsconfig: path.resolve(__dirname, '../tsconfig.json'),
			tsconfigOverride: {
				'include': ['packages/**/*', 'typings/vue-shim.d.ts'],
				'exclude': ['node_modules', 'packages/**/__test__/*'],
			},
		}),
	],
	external: ['vue'],
}
