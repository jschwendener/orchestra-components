<template>
    <div class="form-group">
        <label v-if="label" :for="`form-input-${label}`">{{ label }}</label>
        <select class="custom-select" v-model="value" @input="$emit('input', $event.target.value)" :required="required">
            <option v-if="placeholder" :value="null" disabled="disabled">{{ placeholder }}</option>
            <option 
                v-for="(option, index) in options" 
                :key="`option-${index}`"
                :value="option[valueField]">
                {{ option[labelField] }}
            </option>
        </select>
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
            default: () => []
        },
        labelField: {
            type: String,
            default: 'label'
        },
        valueField: {
            type: String,
            default: 'value'
        },
        placeholder: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
