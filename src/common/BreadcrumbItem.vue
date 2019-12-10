<template functional>
    <li class="breadcrumb-item" :class="{ 'active': props.active }">
        <nuxt-link v-if="props.link" :to="props.link">
            <o-icon v-if="props.icon" :icon="['far', props.icon]" fixed-width />
            <slot />
        </nuxt-link>
        <span v-else>
            <o-icon v-if="props.icon" :icon="['far', props.icon]" fixed-width />
            <slot />
        </span>
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
            default: null
        },
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>