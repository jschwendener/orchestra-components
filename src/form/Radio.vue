<template>
    <div class="form-group">
        <label v-if="label" :for="`form-radio-${label}`">{{ label }}</label>
        <div v-for="(option, index) in options" :key="`radio-option-${index}`" class="custom-control custom-radio" :class="{ 'd-inline-block mr-3': inline }">
            <input :id="`form-radio-${label}-${index}`"
                type="radio" 
                class="custom-control-input" 
                :value="option[valueField]"
                :checked="option[valueField] == value"
                @input="$emit('input', $event.target.value)">
            
            <label :for="`form-radio-${label}-${index}`" class="custom-control-label">
                <slot 
                :id="`form-radio-${label}-${index}`"
                :option="option">
                    {{ option[labelField] }}
                </slot>
            </label>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: null,
        },
        value: {
            default: null,
        },
        options: {
            type: Array,
            default: []
        },
        labelField: {
            type: String,
            default: 'label'
        },
        valueField: {
            type: String,
            default: 'value'
        },
        inline: {
            type: Boolean,
            default: false,
        },
    }
}
</script>