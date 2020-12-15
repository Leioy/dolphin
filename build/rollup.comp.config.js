import path from 'path'
import fs from 'fs'
import Vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import progress from 'rollup-plugin-progress'

function isDir (dir) {
	return fs.lstatSync(dir).isDirectory();
}

const packages = {};
const dir = path.join(__dirname, '../packages');
const files = fs.readdirSync(dir).filter(name => !name.includes('styles'))
files.forEach(file => {
	const absolutePath = path.join(dir, file);
	if (isDir(absolutePath)) {
		packages[file] = `packages/${file}/index.ts`;
	}
});

const createRollupConfig = (file, name) => {
	return {
		input: file,
		output: {
			file: `lib/${name}/index.js`,
			format: 'es',
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
					compilerOptions: {
						declaration: false,
					},
				},
			}),
			progress()
		],
		external: ['vue'],
	}
}
const buildPackages = []
for (let name in packages) {
	const file = packages[name]
	buildPackages.push(createRollupConfig(file, name))
}
export default buildPackages
