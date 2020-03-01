<template>
    <o-form-group :label="label" :required="required" :help-text="helpText">
        <div class="input-group" :class="{
            'input-group-sm': size === 'sm',
            'input-group-lg': size === 'lg',
        }">
            <div v-if="prepend" class="input-group-prepend">
                <div v-if="Array.isArray(prepend)" class="input-group-text">
                    <o-icon :icon="prepend"></o-icon>
                </div>
                <div v-else class="input-group-text">{{ prepend }}</div>
            </div>
            <input 
                ref="input"
                :type="showPassword ? 'text' : type"
                :name="name"
                class="form-control" 
                :class="{
                    'bg-darkish border-dark text-white': active,
                    'is-invalid': invalid,
                    'form-control-sm': size === 'sm',
                    'form-control-lg': size === 'lg',
                }"
                :id="`form-input-${label}`" 
                :aria-describedby="`form-input-${label}-help`" 
                :placeholder="placeholder"
                :value="value"
                @input="$emit('input', $event.target.value)"
                @blur="$emit('blur', $event.target.value)"
                :autocomplete="autocomplete ? 'on' : 'off'"
                :autofocus="autofocus"
                :required="required"
                :disabled="disabled">
            <div v-if="append" class="input-group-append">
                <div v-if="Array.isArray(append)" class="input-group-text">
                    <o-icon :icon="append"></o-icon>
                </div>
                <div v-else class="input-group-text">{{ append }}</div>
            </div>
            <div v-if="type === 'password'" class="input-group-append">
                <a href="javascript:;" class="input-group-text btn btn-link" 
                    :class="{ 'bg-darkish text-white': showPassword }"
                    @click="togglePasswordVisiblity()"
                    title="Show password">
                    <o-icon :icon="['far', showPassword ? 'eye-slash' : 'eye']" fixed-width />
                </a>
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
            type: [String, Array],
            default: null,
        },
        append: {
            type: [String, Array],
            default: null,
        },
        placeholder: {
            type: [String, Number],
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
        size: {
            type: String,
            default: null,
        }
    },

    data() {
        return {
            showPassword: false,
        }
    },

    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => this.focus())
        }
    },

    activated() {
        if (this.autofocus) {
            this.$nextTick(() => this.focus())
        }
    },

    methods: {
        focus: function () {
            this.$refs.input.focus()
        },

        togglePasswordVisiblity() {
            this.showPassword = !this.showPassword
        }
    }
}
</script>
