import { Ref } from 'vue'

type TPaneProps = {
	label: string
	name: string
}
export type TPane = {
	uid: number
	props: TPaneProps
}

export type TActiveIndex = Ref<number>
