<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <textarea 
            ref="input"
            :type="type"
            class="form-control" 
            :id="`form-textarea-${label}`" 
            :aria-describedby="`form-textarea-${label}-help`" 
            :placeholder="placeholder"
            :value="value"
            :required="required"
            :rows="rows"
            @input="$emit('input', $event.target.value)">
        </textarea>
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
        placeholder: {
            type: String,
            default: null,
        },
        value: {
            default: null,
        },
        rows: {
            type: Number,
            default: 5,
        },
        type: {
            type: String,
            default: 'text',
        },
        helpText: {
            type: String,
            default: null,
        },
        required: {
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
