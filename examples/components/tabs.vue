<template>
	<div class="container">
		<dol-tabs v-model="name" @tab-click="handleClick">
			<dol-tab-pane label="用户管理" name="tab1">用户管理</dol-tab-pane>
			<dol-tab-pane label="配置管理" name="tab2">配置管理</dol-tab-pane>
			<dol-tab-pane label="角色管理" name="tab3">角色管理</dol-tab-pane>
		</dol-tabs>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup () {
		const handleClick = (tab: string, index: number, e: MouseEvent) => {
			console.log('tab-click', tab, index, e)
		}
		const name = ref('tab1')
		return { handleClick, name }
	},
})
</script>
