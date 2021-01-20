<template>
	<div class="container">
		<dol-button type="primary"> click</dol-button>
		<dol-button round disabled size="large">default</dol-button>
		<dol-button>default</dol-button>
		<dol-button round type="primary" icon="ios-checkmark-circle">primary</dol-button>
		<dol-button size="small" type="primary">primary</dol-button>
		<dol-button round size="large" type="primary">primary</dol-button>
		<dol-button type="info">info</dol-button>
		<dol-button type="warning">warning</dol-button>
		<dol-button type="success">success</dol-button>
		<dol-button type="error" disabled>error</dol-button>
		<dol-button type="text">text</dol-button>
		<dol-button type="primary" loading>加载中</dol-button>
		<dol-button type="primary" icon="ios-checkmark-circle"></dol-button>
		<hr>
		<dol-button-group>
			<dol-button type="primary" disabled icon="ios-arrow-back"></dol-button>
			<dol-button type="primary" icon="ios-arrow-forward"></dol-button>
		</dol-button-group>
		<hr>
		<dol-button-group>
			<dol-button type="primary" icon="ios-arrow-back">上一页</dol-button>
			<dol-button type="primary">下一页 <dol-icon name="ios-arrow-forward"></dol-icon></dol-button>
		</dol-button-group>
	</div>
</template>
