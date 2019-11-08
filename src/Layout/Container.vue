<template functional>
    <div :class="{
        'container': !props.fluid,
        'container-fluid': props.fluid,
    }">
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    }
}
</script>