<template>
	<div class="container">
		<dol-button type="primary"> click</dol-button>
		<dol-button round disabled size="large">default</dol-button>
		<dol-button>default</dol-button>
		<dol-button round type="primary" icon="alipay">primary</dol-button>
		<dol-button size="small" type="primary">primary</dol-button>
		<dol-button round size="large" type="primary">primary</dol-button>
		<dol-button type="info">info</dol-button>
		<dol-button type="warning">warning</dol-button>
		<dol-button type="success">success</dol-button>
		<dol-button type="error" disabled>error</dol-button>
		<dol-button type="text">text</dol-button>
		<dol-button type="primary" loading>加载中</dol-button>
		<dol-button type="primary" icon="alipay"></dol-button>
		<hr>
		<dol-button-group>
			<dol-button type="primary" disabled icon="fast-back"></dol-button>
			<dol-button type="primary" icon="fast-forward"></dol-button>
		</dol-button-group>
		<hr>
		<dol-button-group>
			<dol-button type="primary" icon="fast-back">上一页</dol-button>
			<dol-button type="primary">下一页 <dol-icon name="fast-forward"></dol-icon></dol-button>
		</dol-button-group>
	</div>
</template>
