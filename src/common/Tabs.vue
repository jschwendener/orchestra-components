<template>
    <div>
        <ul class="nav nav-tabs">
            <li v-for="tab in tabs" :key="`tab-nav-${tab.name || tab}`" class="nav-item">
                <a class="nav-link" 
                    :class="{ 'active': (tab.name || tab) == active, 'disabled': tab.disabled }" 
                    href="javascript:;" 
                    @click="changeTab(tab)">
                        <o-icon v-if="tab.icon" 
                            :icon="['far', tab.icon]" 
                            class="mr-1" 
                            :class="`text-${(tab.name || tab) == active ? 'primary' : 'muted'}`">
                        </o-icon>
                        {{ tab.label || tab.name || tab }}
                    </a>
            </li>
            <div class="ml-auto d-flex">
                <slot name="actions"></slot>
            </div>
        </ul>
        <div class="tab-content">
            <transition name="tabs" mode="out-in">
                <div class="tab-pane show active" v-if="active" :key="`tab-${active.name || active}`">
                    <slot :name="active.name || active"></slot>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => [],
        }
    },

    data() {
        return {
            active: null,
        }
    },

    created() {
        let first = this.tabs.find(t => t.disabled === 'undefined' || !t.disabled);
        this.active = first.name || first || null;
    },

    methods: {
        changeTab(tab) {
            this.active = tab.name || tab
            this.$emit('changed', this.active)
        }
    }
}
</script>
