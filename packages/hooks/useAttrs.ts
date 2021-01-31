import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue'

const DEFAULT_EXCLUDE_KEYS = [ 'class', 'style' ]
export const useAttrs = (excludeKeys: string[] = []) => {
	const instance = getCurrentInstance()!
	const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS)
	const attrs = shallowRef({});
	// make attrs to reactive
	instance.attrs = reactive(instance.attrs)
	
	watchEffect(() => {
		attrs.value = Object.entries(instance.attrs)
			.reduce((acm: { [key: string]: unknown }, [ key, val ]) => {
				if (!allExcludeKeys.includes(key)) {
					acm[key] = val
				}
				return acm
			}, {})
	})
	return attrs
}
