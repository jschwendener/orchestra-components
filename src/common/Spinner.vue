<template functional>
    <div class="d-inline-flex flex-column align-items-center">
        <div class="spinner-border" :class="`text-${props.type}`" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-if="slots().default" class="text-center pt-3">
            <span>
                <slot></slot>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default'
        }
    }
}
</script>
