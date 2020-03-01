<template functional>
    <router-link v-if="props.to" 
        class="dropdown-item" 
        :class="[
            props.active ? 'active' : null,
            props.disabled ? 'disabled' : null,
            data.class,
            data.staticClass
        ]" 
        :to="props.to">
        <o-icon v-if="props.icon" :icon="['far', props.icon]" fixed-width class="mr-2 ml-n1"></o-icon>
        <slot></slot>
    </router-link>
    <a v-else 
        :href="props.href || 'javascript:;'" 
        :target="props.href ? '_blank' : null" 
        class="dropdown-item"
        @click="listeners['click'] ? listeners['click']($event) : null"
        :class="[
            props.active ? 'active' : null,
            props.disabled ? 'disabled' : null,
            data.class,
            data.staticClass
        ]" >
        <o-icon v-if="props.icon" :icon="['far', props.icon]" fixed-width class="mr-2 ml-n1"></o-icon>
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: {
        to: {
            type: [String, Object],
            default: null
        },
        href: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null,
        },
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
