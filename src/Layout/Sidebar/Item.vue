<template functional>
    <router-link :to="props.link" :exact="props.link === '/'" class="sidebar-row sidebar-item">
        <div class="sidebar-icon" title="label" v-tooltip:right="props.tooltip ? props.label : null">
            <o-icon v-if="props.icon" :icon="['fad', props.icon]" :size="props.iconSize"></o-icon>
        </div>
        <div class="sidebar-label">
            <slot>
                {{ props.label }}
            </slot>
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
        label: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
        iconSize: {
            type: String,
            default: 'lg'
        },
        tooltip: {
            type: Boolean,
            default: false
        }
    },
}
</script>
