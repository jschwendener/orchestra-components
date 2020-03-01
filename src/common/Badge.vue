<template functional>
	<span 
        class="badge badge-pill"
        :class="[
            data.class, 
            data.staticClass, 
            `badge-${props.type}`
        ]">
        <o-icon v-if="props.icon" :icon="[props.iconPrefix, props.icon]" fixed-width></o-icon>
		<slot />
        <o-icon v-if="props.iconAfter" :icon="[props.iconPrefix, props.iconAfter]" fixed-width></o-icon>
	</span>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: "link"
		},
		icon: {
			type: String,
			default: null
		},
		iconAfter: {
			type: String,
			default: null
		},
		iconPrefix: {
			type: String,
			default: "far"
		}
	}
};
</script>