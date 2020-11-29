<template>
	<div class="button">button</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface IProps {
	size: string
	msg: string
}

export default defineComponent({
	props: {
		msg: {
			type: String,
			default: '',
		},
		size: {
			type: String,
			default: '',
		},
	},
	setup (props) {
		console.log(props.size)
	},
})

</script>
