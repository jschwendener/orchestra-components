<template>
    <div class="form-group">
        <label v-if="label" :for="`form-checkbox-${label}`">{{ label }}</label>
        <div v-for="(option, index) in options" :key="`checkbox-option-${index}`" class="custom-control">
            <input :id="`form-checkbox-${label}-${index}`"
                type="checkbox" 
                class="custom-control-input" 
                :value="option[valueField]"
                v-model="state"
                :required="required">
            
            <label :for="`form-checkbox-${label}-${index}`" class="custom-control-label text-dark">
                <slot 
                :id="`form-checkbox-${label}-${index}`"
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
            type: Array,
            default: () => [],
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
        required: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            state: this.value,
        }
    },

    watch: {
        state(val) {
            this.$emit('input', val);
        }
    }
}
</script>