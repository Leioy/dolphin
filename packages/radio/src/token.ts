type TModel = string | number

export interface RadioGroupContext {
	name: 'DolRadioGroup'
	modelValue: string | number
	disabled: boolean
	changeEvent: (val: TModel) => void
}

const radioGroupKey: string = 'RadioGroup'
export default radioGroupKey
