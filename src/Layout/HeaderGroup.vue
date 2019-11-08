<template functional>
    <div class="header-group" :class="{ 'header-brand': props.brand }">
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        brand: {
            type: Boolean,
            default: false
        }
    }
}
</script>