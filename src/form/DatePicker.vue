<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <input 
            ref="input"
            type="text"
            class="form-control" 
            :id="`datepicker-${label}`" 
            :value="value"
            :aria-describedby="`datepicker-${label}-help`" 
            :placeholder="placeholder"
            :required="required"
            autocomplete="none">
    </o-form-group>
</template>
<script>
import flatpickr from "flatpickr"
import OFormGroup from './Group.vue'

export default {
    components: {
        OFormGroup
    },
    props: {
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        value: {
            default: null,
        },
        helpText: {
            type: String,
            default: null,
        },
        options: {
            type: Object,
            default: () => {
                return {}
            }
        },
        mode: {
            type: String,
            default: 'single'
        },
        time: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            instance: null,
        }
    },

    mounted() {
        const self = this
        const defaultConfig = {
            allowInput: true,
            altInput: true,
            altFormat: 'Y-m-d',
            time_24hr: true,
            mode: this.mode,
            enableTime: this.time,

            onChange(selectedDates, dateStr, instance) {
                if(selectedDates.length > 1) {
                    self.$emit('input', selectedDates.map(d => {
                        return instance.formatDate(new Date(d), instance.config.dateFormat)
                    }))
                } else {
                    self.$emit('input', dateStr)
                }
            }
        }

        const mergedConfig = Object.assign(defaultConfig, this.options)
        this.instance = flatpickr(this.$refs.input, mergedConfig)
    },

    watch: {
        value(val) {
            this.instance.setDate(val)
        }
    }
}
</script>
