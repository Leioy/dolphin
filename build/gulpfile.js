const {series, dest, src} = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const noPrefixFile = /index/

function compile () {
	return src('../packages/styles/*.less')
		.pipe(less())
		.pipe(autoprefixer({cascade: false}))
		.pipe(cssmin())
		.pipe(rename(function (path) {
			if(!noPrefixFile.test(path.basename)) {
				path.basename = `dol-${path.basename}`
			}
		}))
		.pipe(dest('../lib/styles'))
}

function copyfont () {
	return src('../packages/styles/common/fonts/**')
		.pipe(cssmin())
		.pipe(dest('../lib/styles/fonts'))
}

exports.build = series(compile, copyfont)
