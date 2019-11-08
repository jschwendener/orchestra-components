<template>
    <div class="custom-control custom-switch">
        <input :id="`form-switch-${label}`"
            type="checkbox" 
            class="custom-control-input" 
            :disabled="disabled"
            :checked="value"
            @input="$emit('input', $event.target.checked)">
        <label :for="`form-switch-${label}`" class="custom-control-label">{{ label }}</label>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
}
</script>
