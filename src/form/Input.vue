<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <div class="input-group">
            <div v-if="prepend" class="input-group-prepend">
                <div class="input-group-text">{{ prepend }}</div>
            </div>
            <input 
                ref="input"
                :type="type"
                :name="name"
                class="form-control" 
                :class="{
                    'bg-darkish border-dark text-white': active,
                    'is-invalid': invalid,
                }"
                :id="`form-input-${label}`" 
                :aria-describedby="`form-input-${label}-help`" 
                :placeholder="placeholder"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :autocomplete="autocomplete ? 'on' : 'off'"
                :autofocus="autofocus"
                :required="required"
                :disabled="disabled">
            <div v-if="append" class="input-group-append">
                <div class="input-group-text">{{ append }}</div>
            </div>
        </div>
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
        prepend: {
            type: String,
            default: null,
        },
        append: {
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
            default: false,
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
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: [Boolean, Array],
            default: false,
        },
    },

    methods: {
        focus: function () {
            this.$refs.input.focus()
        }
    }
}
</script>
