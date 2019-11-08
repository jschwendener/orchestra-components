<template>
    <div class="form-group">
        <label v-if="label" :for="`form-input-${label}`">{{ label }} <span v-if="required" class="text-danger">*</span></label>
        <slot />
        <small v-if="helpText" 
            :id="`form-input-${label}-help`" 
            class="form-text text-muted">
            {{ helpText }}
        </small>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: null,
        },
        helpText: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        }
    }
}
</script>