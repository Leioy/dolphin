import { Ref } from 'vue';

export function $<T> (ref: Ref<T>) {
	return ref.value
}
