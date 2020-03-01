<template>
    <o-form-group :label="label" :helpText="helpText">
        <div class="custom-control custom-switch">
            <input :id="`form-switch-${label}`"
                type="checkbox" 
                class="custom-control-input" 
                :disabled="disabled"
                :checked="value"
                @input="$emit('input', $event.target.checked)">
            <label :for="`form-switch-${label}`" class="custom-control-label">{{ states[value ? 0 : 1] || '' }}</label>
        </div>
    </o-form-group>
</template>
<script>
import OFormGroup from './Group.vue'
export default {
    components: {
        OFormGroup,
    },

    props: {
        value: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        helpText: {
            type: String,
            default: null
        },
        states: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
}
</script>
