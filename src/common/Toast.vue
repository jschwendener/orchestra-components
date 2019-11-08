<template>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header py-2" :class="`text-${type}`">
            <o-icon v-if="icon" :icon="['far', icon]" class="mr-2"></o-icon>
            <strong class="mr-auto pr-3">{{ title }}</strong>
            <small class="text-muted">{{ created }}</small>
            <a href="javascript:;">
                <o-icon
                    :icon="['far', 'times']"
                    class="ml-2" 
                    aria-label="Close"
                    @click="$emit('dismiss')">
                </o-icon>
            </a>
        </div>
        <div v-if="$slots.default || message" class="toast-body">
            <slot>{{ message }}</slot>
        </div>
    </div>
</template>
<script>
import OButton from './Button.vue'
export default {
    components: {
        OButton
    },

    props: {
        title: {
            type: String,
            default: 'Notification'
        },
        message: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: null,
        },
        persist: {
            type: Boolean,
            defaul: false,
        },
        lifetime: {
            type: Number,
            default: 5000,
        }
    },

    mounted() {
        if(!this.persist) {
            setTimeout(() => this.$emit('dismiss'), this.lifetime)
        }
    },

    computed: {
        created() {
            const d = new Date();
            const hour = d.getHours() < 10
                ? `0${d.getHours()}`
                : d.getHours();

            const minute = d.getMinutes() < 10
                ? `0${d.getMinutes()}`
                : d.getMinutes();

            const second = d.getSeconds() < 10
                ? `0${d.getSeconds()}`
                : d.getSeconds();

            return `${hour}:${minute}:${second}`;
        }
    }
}
</script>
