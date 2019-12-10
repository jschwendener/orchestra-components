<template>
    <transition name="modal">
        <div v-if="show">
            <div class="modal d-block" tabindex="-1" role="dialog" @click="close()">
                <div class="modal-dialog modal-dialog-centered" :class="`modal-${size}`" role="document" style="margin-top: -5rem;">
                    <div class="modal-content shadow-lg" @click.stop>
                        <div v-if="title" class="modal-header align-items-center">
                            <h5 class="modal-title" :class="`text-${type}`">
                                {{ title }}
                            </h5>
                            <o-button icon="times" class="btn-sm text-dark" @click="close()"></o-button>
                        </div>
                        <div class="modal-body overflow-hidden">
                            <slot></slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer">
                                <o-button @click="close()" type="light">{{ cancelText }}</o-button>
                                <o-button @click="close(true)" :type="type || 'primary'">{{ confirmText }}</o-button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
		title: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: 'default'
        },
        confirmText: {
            type: String,
            default: 'OK'
        },
        cancelText: {
            type: String,
            default: 'Cancel'
        }
    },

    data() {
        return {
            show: false
        }
    },

    mounted() {
        this.show = true
    },

    methods: {
        close(confirm = false) {
            this.show = false
            
            this.$nextTick(() => {
                if (confirm) {
                    this.$emit('confirm')
                } else {
                    this.$emit('close')
                }
            })
        }
    }
};
</script>
