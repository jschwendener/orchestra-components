<template>
    <div>
        <o-card class="card-sticky">
            <div class="row">
                <div class="col-12 col-md-auto mb-3 mb-md-0">
                    <router-link :to="$route.fullPath + '/create'"><o-button type="primary" icon="plus" class="w-100">Create</o-button></router-link>
                </div>

                <div v-if="$slots.actions" class="col-auto mb-3 mb-md-0">
                    <slot name="actions"></slot>
                </div>

                <div class="col-auto">
                    <o-dropdown v-if="sortBy" direction="left">
                        <o-button slot="toggle" type="light" icon-after="angle-down">
                            <span>Sort by</span>
                            <span v-if="sortingBy" class="badge badge-dark ml-2">{{ sortBy[sortingBy] }}</span>
                        </o-button>

                        <o-dropdown-item 
                            v-for="sortKey in Object.keys(sortBy)" 
                            :key="sortKey"
                            @click="setSorting(sortKey)"
                            class="d-flex justify-content-between"
                            :class="{ 'active': sortingBy == sortKey }">
                            <div>{{ sortBy[sortKey] }}</div>
                            <div v-if="sortingBy == sortKey">
                                <o-icon v-if="sortingDesc" :icon="['far', 'sort-down']"></o-icon>
                                <o-icon v-else :icon="['far', 'sort-up']"></o-icon>
                            </div>
                        </o-dropdown-item>

                        <div class="dropdown-divider"></div>
                        <o-dropdown-item @click="setSorting(null)" icon="times">Reset</o-dropdown-item>
                    </o-dropdown>

                    <o-button
                        v-if="filterBy.length > 0" 
                        :type="filtersOpen ? 'dark' : 'light'" 
                        class="d-inline-block ml-3" 
                        :icon-after="filtersOpen ? 'times' : 'angle-down'"
                        @click="filtersOpen = !filtersOpen">
                        Filters
                    </o-button>
                </div>

                <div v-if="searchBy.length > 0" class="col-12 col-md-auto flex-fill ml-md-auto mt-3 mt-lg-0">
                    <o-form-input placeholder="Search ..." class="mb-0" v-model="search" :autocomplete="false"></o-form-input>
                </div>
            </div>     
        </o-card>

        <transition name="slide-down">
            <o-card v-if="filtersOpen" class="bg-dark mx-md-2 mt-n4">
                <div class="row align-items-center">
                    <div class="col-12 d-md-none text-white">
                        <strong>Filters</strong>
                    </div>
                    <div class="col-6 pb-2 pb-md-0 col-md-auto"
                        v-for="(filter, filterIndex) in filterBy" :key="filterIndex">

                        <o-form-toggle
                            v-if="filter.type == 'toggle'"
                            :label="filter.label"
                            v-model="filters[filter.name]"
                            class="py-2 py-md-0 mt-4">
                        </o-form-toggle>

                        <o-form-search
                            v-else-if="filter.type == 'simple'"
                            class="mb-0"
                            :label="filter.label"
                            placeholder="All"
                            v-model="filters[filter.name]"
                            :options="filter.getOptions(value)"
                            value-field="value"
                            label-field="label"
                            :search-fields="['label']"
                            :show-selection="true">
                        </o-form-search>
                        
                        <o-form-search
                            v-else-if="filter.type == 'nested'"
                            class="mb-0"
                            :label="filter.label"
                            placeholder="All"
                            v-model="filters[filter.name]"
                            :options="filter.getOptions(value)"
                            :value-field="filter.optionValue"
                            :label-field="filter.optionLabel"
                            :search-fields="[filter.optionLabel]"
                            :show-selection="true">
                        </o-form-search>

                    </div>
                </div>
            </o-card>
        </transition>

        <div v-if="loading" class="text-center py-3">
            <o-spinner type="primary">Loading data</o-spinner>
        </div>

        <div v-if="!loading && items.length > 0" class="crud-table">
            <o-card v-if="$slots.headers" class="shadow-none mb-n1 bg-transparent font-weight-bold text-dark d-none d-lg-block">
                <slot name="headers"></slot>
            </o-card>

            <slot name="list" :listItems="items" :keyField="keyField" :openItem="openItem">
                <div class="crud-table-body" :class="wrapperClass">
                    <div
                        class="crud-table-item"
                        :class="itemClass"
                        v-for="(item, index) in items" 
                        :key="item[keyField]">
                            <o-card 
                                class="mb-1"
                                :class="{ 'shadow-lg': openItem == item }"
                                :style="{ zIndex: openItem == item ? 1 : '' }">
                                <slot :item="item" :index="index" :toggle="toggle">
                                    {{ item }}
                                </slot>
                                <div v-if="openItem == item">
                                    <hr class="mx-n3">
                                    <slot name="details" :item="item" :index="index" :toggle="toggle"></slot>
                                </div>
                            </o-card>
                    </div>
                </div>
            </slot>
        </div>

        <div v-if="!loading" class="row mt-3 justify-content-center">
            <div class="col-12 order-1 col-md-4">{{ items.length }} items shown ({{ filteredItemsCount }} filtered)</div>
            <div class="col-12 order-first order-md-2 col-md-4 text-md-center mb-2 mb-md-0">
                <o-button
                    v-if="displayItemsCurrently <= items.length && items.length < value.length"
                    type="light" 
                    @click="displayItemsCurrently += displayItemsIncrease">
                    Show {{ Math.min(displayItemsIncrease, filteredItemsCount - items.length) }} more
                </o-button>
                <o-button
                    v-if="displayItemsCurrently <= items.length && items.length < value.length"
                    type="link"
                    @click="displayItemsCurrently = value.length">
                    Show all
                </o-button>
            </div>
            <div class="col-12 order-3 col-md-4 text-md-right">
                {{ value.length }} items total
            </div>
        </div>
    </div>
</template>
<script>
import OButton from '@/components/common/Button.vue'
import OSpinner from '@/components/common/Spinner.vue'
import OCard from '@/components/common/Card.vue'
import OResource from '@/components/common/Resource.vue'
import ODropdown from '@/components/common/Dropdown.vue'
import ODropdownItem from '@/components/common/DropdownItem.vue'
import OFormInput from "@/components/form/Input.vue"
import OFormSearch from "@/components/form/Search.vue"
import OFormToggle from "@/components/form/Toggle.vue";

export default {
    name: 'CRUDIndexView',
    components: {
        OButton,
        OSpinner,
        OCard,
        OResource,
        ODropdown,
        ODropdownItem,
        OFormInput,
        OFormSearch,
        OFormToggle
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        keyField: {
            type: String,
            default: 'id'
        },
        sortBy: {
            type: Object,
            default: null,
        },
        filterBy: {
            type: Array,
            default: () => [],
        },
        searchBy: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false,
        },
        wrapperClass: {
            type: String,
            default: ''
        },
        itemClass: {
            type: String,
            default: ''
        },
        displayItems: {
            type: Number,
            default: 20,
        }
    },

    data() {
        return {
            openItem: null,
            sortingBy: null,
            sortingDesc: false,
            search: '',
            filters: null,
            filtersOpen: false,

            displayItemsInit: this.displayItems,
            displayItemsIncrease: this.displayItems,
            displayItemsCurrently: this.displayItems,
            filteredItemsCount: 0,
        }
    },

    created() {
        this.filters = {};
        this.filterBy.forEach(filter => {
            this.$set(this.filters, filter.name, null)
        })
    },

    methods: {
        toggle(item = null) {
            this.openItem = this.openItem == item
                ? null
                : item;
        },

        setSorting(key) {
            if(this.sortingBy == key) {
                this.sortingDesc = !this.sortingDesc;
            }

            this.sortingBy = key;
        }
    },

    computed: {
        items() {
            let items = this.value;

            if(this.searchBy.length > 0 && this.search.length > 0) {
                items = items.filter(item => {
                    let found = false
                    this.searchBy.forEach(searchField => {
                        if(
                            typeof searchField === 'string' && item[searchField].toLowerCase().includes(this.search.toLowerCase())
                            || typeof searchField === 'function' && searchField(item).toLowerCase().includes(this.search.toLowerCase())
                        ) {
                            found = true
                        }
                    });

                    return found
                })
            }

            if(this.filtersOpen) {
                this.filterBy.forEach(filter => {
                    items = filter.apply(items, this.filters[filter.name])
                })
            }

            if(this.sortingBy) {
                items = [...items].sort((a, b) => {
                    if(a[this.sortingBy] < b[this.sortingBy]) { return this.sortingDesc ? 1 : -1; }
                    if(a[this.sortingBy] > b[this.sortingBy]) { return this.sortingDesc ? -1 : 1; }
                    return 0;
                });
            }

            this.filteredItemsCount = items.length;

            return items.slice(0, this.displayItemsCurrently);
        }
    }
}
</script>
