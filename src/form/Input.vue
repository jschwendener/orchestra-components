<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <input 
            ref="input"
            :type="type"
            :name="name"
            class="form-control" 
            :class="{
                'bg-darkish border-dark text-white': active
            }"
            :id="`form-input-${label}`" 
            :aria-describedby="`form-input-${label}-help`" 
            :placeholder="placeholder"
            :value="value"
            :autocomplete="autocomplete ? 'on' : 'off'"
            :autofocus="autofocus"
            :required="required"
            @input="$emit('input', $event.target.value)">
    </o-form-group>
</template>
<script>
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
        name: {
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
        type: {
            type: String,
            default: 'text',
        },
        helpText: {
            type: String,
            default: null,
        },
        autocomplete: {
            type: Boolean,
            default: true,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        focus: function () {
            this.$refs.input.focus()
        }
    }
}
</script>
