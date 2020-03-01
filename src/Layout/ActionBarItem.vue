<template functional>
    <router-link tag="div" :to="props.link" exact-active-class="text-primary" class="action-bar__item col d-flex py-2 flex-column align-items-center text-center">
        <o-icon :icon="['fal', props.icon]" fixed-width size="lg" />
        <div style="font-size: 65%; padding-top: 5px;">
            <slot />
        </div>
    </router-link>
</template>
<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: ''
        }
    }
}
</script>