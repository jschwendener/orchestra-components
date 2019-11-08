<template>
    <button 
        ref="button" 
        :type="submit ? 'submit' : 'button'" 
        class="btn" 
        :class="[
            `btn${outline ? '-outline' : ''}-${type}`, 
            block ? 'btn-block' : null,
            size ? `btn-${size}` : null
        ]" 
        @click="$emit('click', $event)">
        <o-icon v-if="icon" :icon="[iconPrefix, icon]" fixed-width :class="{ 'mr-1': $slots.default }"></o-icon>
        <slot></slot>
        <o-icon v-if="iconAfter" :icon="[iconPrefix, iconAfter]" fixed-width :class="{ 'ml-1': $slots.default }"></o-icon>
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'link'
        },
        icon: {
            type: String,
            default: null,
        },
        iconAfter: {
            type: String,
            default: null,
        },
        iconPrefix: {
            type: String,
            default: 'far',
        },
        submit: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        outline: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: null
        }
    },

    methods: {
        focus: function () {
            this.$refs.button.focus()
        }
    }
}
</script>
