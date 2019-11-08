<template functional>
    <router-link :to="props.link" class="sidebar-row sidebar-item">
        <div class="sidebar-icon" title="label">
            <o-icon v-if="props.icon" :icon="['far', props.icon]" :size="props.iconSize"></o-icon>
        </div>
        <div class="sidebar-label">
            <slot />
        </div>
    </router-link>
</template>
<script>
export default {
    props: {
        link: {
            type: String,
            default: '/',
        },
        icon: {
            type: String,
            default: null,
        },
        iconSize: {
            type: String,
            default: null
        }
    },
}
</script>
