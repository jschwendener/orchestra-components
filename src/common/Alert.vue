<template functional>
    <div class="alert" :class="[`alert-${props.type}`, data.class, data.staticClass]" role="alert">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'light'
        }
    }
}
</script>