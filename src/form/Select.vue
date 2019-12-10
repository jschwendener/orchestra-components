<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <select 
            class="custom-select" 
            :value="value"
            @input="$emit('input', $event.target.value)" 
            :disabled="disabled"
            :required="required">
            <option v-if="placeholder" :value="null" disabled="disabled">{{ placeholder }}</option>
            <option 
                v-for="(option, index) in options" 
                :key="`option-${index}`"
                :value="option[valueField]">
                {{ option[labelField] }}
            </option>
        </select>
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
        helpText: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
