<template functional>
    <div class="loading-container" :class="props.loading ? [
        data.class, 
        data.staticClass
    ] : []">
        <slot />
        <transition name="fade">
            <div v-if="props.loading" class="loading-spinner">
                <o-spinner></o-spinner>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.loading-container {
    position: relative;
}

.loading-spinner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>