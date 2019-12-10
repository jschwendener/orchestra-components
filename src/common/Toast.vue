<template>
    <div class="toast show" :class="`bg-${type}`" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header py-2">
            <o-icon v-if="icon" :icon="['far', icon]" class="mr-2"></o-icon>
            <strong class="mr-auto pr-3">{{ title }}</strong>
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
            <slot>
                <ul v-if="Array.isArray(message)" class="list-unstyled m-0">
                    <li v-for="(m, i) in message" :key="i">{{ m }}</li>
                </ul>
                <div v-else>{{ message }}</div>
            </slot>
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
            type: [String, Array],
            default: null,
        },
        type: {
            type: String,
            default: null,
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
