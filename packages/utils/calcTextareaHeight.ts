let hiddenArea: HTMLTextAreaElement | null
const HIDDEN_STYLE = `
	height:0 !important;
	visibility:hidden !important;
	overflow:hidden !important;
	position:absolute !important;
	z-index:-1000 !important;
	top:0 !important;
	right:0 !important;
`
const COPY_STYLE = [
	'letter-spacing',
	'line-height',
	'padding-top',
	'padding-bottom',
	'font-family',
	'font-weight',
	'font-size',
	'text-rendering',
	'text-transform',
	'width',
	'text-indent',
	'padding-left',
	'padding-right',
	'border-width',
	'box-sizing',
]
type NodeStyle = {
	copyStyle: string
	boxSizing: string
	paddingSize: number
	borderSize: number
}
type TextareaHeight = {
	height: string
	minHeight?: string
}

function getTargetStyles (target: HTMLTextAreaElement | HTMLInputElement | null): NodeStyle {
		const style = window.getComputedStyle(target!)
		const boxSizing = style.getPropertyValue('box-sizing')
		const paddingSize = parseFloat(style.getPropertyValue('padding-top')) +
			parseFloat(style.getPropertyValue('padding-bottom'))
		const borderSize = parseFloat(style.getPropertyValue('border-top-width')) +
			parseFloat(style.getPropertyValue('border-bottom-width'))
		const copyStyle = COPY_STYLE
			.map(name => `${name}:${style.getPropertyValue(name)}`)
			.join(';')
		return { copyStyle, paddingSize, borderSize, boxSizing }
}

export const calcTextareaHeight: (target: HTMLTextAreaElement | HTMLInputElement | null, minRows?: number, maxRows?: number) => TextareaHeight = (target, minRows = 1, maxRows = undefined) => {
	if (!hiddenArea) {
		hiddenArea = document.createElement('textarea')
		document.body.appendChild(hiddenArea)
	}
	const { copyStyle, paddingSize, borderSize, boxSizing } = getTargetStyles(target!)
	hiddenArea.setAttribute('style', `${copyStyle};${HIDDEN_STYLE}`)
	hiddenArea.value = target!.value || target!.placeholder || ''
	let height = hiddenArea.scrollHeight
	const result = {} as TextareaHeight
	if (boxSizing === 'border-box') {
		height = height + borderSize
	} else if (boxSizing === 'content-box') {
		height = height - paddingSize
	}
	hiddenArea.value = ''
	const singleRowHeight = hiddenArea.scrollHeight - paddingSize
	if (minRows !== undefined) {
		let minHeight = singleRowHeight * minRows
		if (boxSizing === 'border-box') {
			minHeight = minHeight + paddingSize + borderSize
		}
		height = Math.max(height, minHeight)
		result.minHeight = `${minHeight}px`
	}
	if (maxRows !== undefined) {
		let maxHeight = singleRowHeight * maxRows
		if (boxSizing === 'border-box') {
			maxHeight = maxHeight + paddingSize + borderSize
		}
		height = Math.min(height, maxHeight)
	}
	result.height = `${height}px`
	hiddenArea.parentNode?.removeChild(hiddenArea)
	hiddenArea = null
	return result
}
