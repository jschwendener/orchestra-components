<template>
    <div class="form-group">
        <label v-if="label" :for="`form-range-${label}`" class="d-flex justify-content-between">
            <span>{{ label }}</span>
            <span v-if="showValue" class="badge badge-light">{{ value }}</span>
        </label>
        <input :id="`form-range-${label}`"
            type="range" class="custom-range" 
            :value="value" 
            :min="min" 
            :max="max" 
            :step="step"
            @input="$emit('input', parseInt($event.target.value))">
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            default: null,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        showValue: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
