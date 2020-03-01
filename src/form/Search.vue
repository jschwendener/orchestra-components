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
                :value="selectedOption ? selectedOption.label : null"
                :required="required"
                autocomplete="off"
                @focus="onInputFocus()">
            <transition name="dropdown">
                <div v-if="dropdownIsOpen" ref="menu" class="dropdown-menu dropdown-menu-limit mt-2" :class="{ 'show': dropdownIsOpen }">
                    <div class="py-1 px-2 mb-1">
                        <input 
                            ref="searchInput"
                            type="text" 
                            class="form-control border-0 shadow-none" 
                            v-model="search" 
                            autocomplete="off"
                            @input="onInputChange($event.target.value)"
                            @keyup.esc="onInputEsc()"
                            @keydown.enter.stop.prevent="onInputEnter()"
                            @keydown.up.prevent="onInputUp()"
                            @keydown.down.prevent="onInputDown()" />
                    </div>
                    <button v-if="nullOption && value" class="dropdown-item border-bottom" @click="onOptionSelect(null)">{{ nullOption }}</button>
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
                    <button v-if="allowCreate && search" class="dropdown-item border-top" @click="onCreate()"><o-icon :icon="['far', 'plus-circle']" fixed-width /> <strong>{{ search }}</strong> ...</button>
                </div>
            </transition>
            <transition name="dropdown-backdrop">
                <div v-if="dropdownIsOpen" class="dropdown-backdrop" @click="onInputEsc()"></div>
            </transition>
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
        nullOption: {
            type: String,
            default: null
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
        autofocus: {
            type: Boolean,
            default: false
        },
        searchBy: {
            type: Array,
            default: () => []
        },
        selectFirst: {
            type: Boolean,
            default: false,
        },
        allowCreate: {
            type: Boolean,
            default: false,
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

    activated() {
        if (this.autofocus) {
            this.$nextTick(() => this.$refs.input.focus())
        }
    },

    methods: {
        openDropdown() {
            this.dropdownIsOpen = true
        },

        closeDropdown() {
            this.search = null
            this.currentIndex = null
            this.dropdownIsOpen = false

            this.$nextTick(() => {
                if (this.$refs.input) {
                    this.$refs.input.blur()
                }
            })
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
            this.$nextTick(() => {
                if (this.$refs.searchInput) {
                    this.$refs.searchInput.select()
                }
            })
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
        },

        onCreate() {
            this.$emit('create', this.search)
            this.closeDropdown()
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
                        const value = typeof key === 'function' ? key(option) : option[key]
                        return value.toString().toLowerCase().includes(this.search.toLowerCase())
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
            }

            return this.placeholder
        }
    },

    watch: {
        options: {
            handler() {
                if (!this.value && this.selectFirst && this.options.length > 0) {
                    this.selectOption(this.options[0])
                }
            },
            immediate: true
        }
    }
}
</script>
