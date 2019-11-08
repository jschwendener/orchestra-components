<template>
    <router-link v-if="to" class="dropdown-item" :class="{ 'active': active }" :to="to">
        <o-icon v-if="icon" :icon="['far', icon]" fixed-width class="mr-2 ml-n1"></o-icon>
        <slot></slot>
    </router-link>
    <a href="javascript:;" @click="$emit('click', $event)" v-else class="dropdown-item" :class="{ 'active': active }">
        <o-icon v-if="icon" :icon="['far', icon]" fixed-width class="mr-2 ml-n1"></o-icon>
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: {
        to: {
            type: [String, Object],
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>
