<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <div class="input-group" :class="{
            'input-group-sm': size === 'sm',
            'input-group-lg': size === 'lg',
        }">
            <div class="input-group-prepend">
                <a href="javascript:;" class="btn btn-link input-group-text" @click="instance.open()">
                    <o-icon :icon="['far', 'calendar-alt']" />
                </a>
            </div>
            <input 
                ref="input"
                type="text"
                class="form-control" 
                :class="{
                    'form-control-sm': size === 'sm',
                    'form-control-lg': size === 'lg',    
                }"
                :id="`datepicker-${label}`" 
                :value="value"
                :aria-describedby="`datepicker-${label}-help`" 
                :placeholder="placeholder"
                :required="required"
                autocomplete="none">
        </div>
    </o-form-group>
</template>
<script>
import flatpickr from "flatpickr"
import { German } from "flatpickr/dist/l10n/de"
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
            default: () => {}
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
        },
        size: {
            type: String,
            default: null,
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
            altFormat: 'd.m.Y',
            time_24hr: true,
            mode: this.mode,
            enableTime: this.time,
            locale: German,

            onChange(selectedDates, dateStr, instance) {
                if(selectedDates.length > 1) {
                    self.$emit('input', dateStr.split(' bis '))
                } else if (instance.config.mode != 'range') {
                    self.$emit('input', dateStr)
                }
            }
        }

        const mergedConfig = Object.assign(defaultConfig, this.options)
        this.instance = flatpickr(this.$refs.input, mergedConfig)

        if (this.value && this.value.includes(',')) {
            this.instance.setDate(this.value.split(','))
        } else if (this.value) {
            this.instance.setDate(this.value)
        }
    },

    watch: {
        value(val) {
            this.instance.setDate(val)
        },

        options: {
            handler(options) {
                Object.keys(options).forEach(key => {
                    this.instance.set(key, options[key])
                })
            },
            deep: true
        }
    }
}
</script>
