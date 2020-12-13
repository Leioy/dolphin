<template>
	<div class="dol-button-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent(
	{
		name: 'DolButtonGroup',
	},
)
</script>
