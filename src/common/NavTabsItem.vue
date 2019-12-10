<template functional>
    <li class="nav-item">
        <nuxt-link class="nav-link" active-class="active" exact :to="props.link">
            <o-icon v-if="props.icon" :icon="[props.iconPrefix, props.icon]" fixed-width :class="{ 'mr-1': slots().default }"></o-icon>
            <slot />
        </nuxt-link>
    </li>
</template>
<script>
export default {
    props: {
        link: {
            type: [String, Object],
            default: null
        },
        icon: {
            type: String,
            default: null,
        },
        iconPrefix: {
            type: String,
            default: 'far',
        },
    }
}
</script>