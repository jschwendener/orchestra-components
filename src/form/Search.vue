<template>
    <o-form-group :label="label" :required="required" :help-text="helpText" @click.native.stop>
        <div class="dropdown">
            <input 
                ref="input"
                type="text"
                :name="name"
                class="form-control custom-select" 
                :id="`form-input-${label}`" 
                :aria-describedby="`form-input-${label}-help`" 
                :placeholder="placeholderText"
                :value="search || (!dropdownIsOpen && selectedOption ? selectedOption.label : null)"
                :required="required"
                autocomplete="off"
                @input="onInputChange($event.target.value)"
                @focus="onInputFocus()"
                @keyup.esc="onInputEsc()"
                @keydown.enter.stop="onInputEnter()"
                @keydown.up.prevent="onInputUp()"
                @keydown.down.prevent="onInputDown()">
            <div ref="menu" class="dropdown-menu mt-2" :class="{ 'show': dropdownIsOpen }" style="min-width: 100%;">
                <button
                    ref="items"
                    class="dropdown-item"
                    :class="{ 
                        'active': option === selectedOption,
                        'bg-light':  option !== selectedOption && index === currentIndex 
                    }"
                    v-for="(option, index) in filteredOptions" 
                    :key="index"
                    @click.prevent="onOptionSelect(option)">
                    <slot :option="option" :index="index">
                        {{ option.label }}
                    </slot>
                </button>
                <div v-if="filteredOptions.length === 0" class="dropdown-item disabled">Keine Ergebnisse.</div>
            </div>
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
        label: {
            type: String,
            default: null
        },
        value: {
            default: null
        },
        name: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: () => []
        },
        helpText: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        searchBy: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            dropdownIsOpen: false,
            currentIndex: null,
            search: null,
        }
    },

    mounted() {
        document.addEventListener('click', () => this.closeDropdown())
    },

    methods: {
        openDropdown() {
            this.dropdownIsOpen = true
        },

        closeDropdown() {
            this.search = null
            this.currentIndex = null
            this.dropdownIsOpen = false
            this.$refs.input.blur()
        },

        selectOption(option) {
            this.$emit('input', option ? option.value : null)
            this.closeDropdown()
        },

        onInputChange(query) {
            this.search = query

            if (this.filteredOptions.length > 0) {
                this.currentIndex = 0
            } else {
                this.currentIndex = null
            }
        },

        onInputFocus() {
            this.openDropdown()
            this.$refs.input.select()
        },

        onInputEnter() {
            if (this.filteredOptions.length === 1) {
                this.selectOption(this.filteredOptions[0])
            } else {
                const option = this.filteredOptions[this.currentIndex] || this.selectedOption
                this.selectOption(option)
            }
        },

        onInputEsc() {
            this.closeDropdown()
        },

        onOptionSelect(option) {
            this.selectOption(option)
        },

        onInputUp() {
            if (this.currentIndex === null) {
                this.currentIndex = 0
            } else if (this.currentIndex > 0) {
                this.currentIndex--
                this.scrollToCurrentOption()
            }
        },

        onInputDown() {
            if (this.currentIndex === null) {
                this.currentIndex = 0
            } else if (this.currentIndex < (this.filteredOptions.length - 1)) {
                this.currentIndex++
                this.scrollToCurrentOption()
            }
        },

        scrollToCurrentOption() {
            this.$nextTick(() => {
                if (this.currentIndex) {
                    const itemOffsetTop = this.$refs.items[this.currentIndex].offsetTop
                    this.$refs.menu.scrollTop = itemOffsetTop
                }
            })
        }
    },

    computed: {
        selectedOption() {
            return this.options.find(option => option.value === this.value)
        },

        currentOption() {
            return this.currentIndex !== null
                ? this.filteredOptions[this.currentIndex]
                : null
        },

        filteredOptions() {
            let options = this.options
            let searchBy = ['label', 'value'].concat(this.searchBy)

            if (this.search) {
                options = options.filter(option => {
                    return searchBy.some(key => {
                        return option[key].toLowerCase().includes(this.search.toLowerCase())
                    })
                })
            }

            return options
        },

        placeholderText() {
            if (this.dropdownIsOpen) {
                if (this.currentOption) {
                    return this.currentOption.label + ' (Enter zum Auswählen)'
                }

                return 'Suchen ...'
            }

            return this.placeholder
        }
    }
}
</script>
