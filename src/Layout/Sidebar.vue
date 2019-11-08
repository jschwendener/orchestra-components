<template>
    <div>
        <aside class="sidebar" :class="{ 'open': open }">
            <div class="sidebar-row sidebar-branding">
                <div class="sidebar-icon">
                    <router-link to="/">
                        <slot name="icon">B</slot>
                    </router-link>
                </div>
                <div class="sidebar-label">
                    {{ title }}
                </div>
            </div>

            <slot></slot>

            <div class="sidebar-row d-none d-xl-flex sidebar-toggler">
                <a href="javascript:;" @click="$emit('toggle')" class="sidebar-icon" title="'Toggle'">
                    <o-icon :icon="['far', toggleIcon]" size="lg"></o-icon>
                </a>
            </div>
        </aside>

        <div class="sidebar-toggler-mobile d-xl-none" :class="{ 'bg-dark': open }" @click="$emit('toggle')">
            <transition name="tabs" mode="out-in">
                <o-icon :icon="['far', toggleIcon]" :key="toggleIcon" size="lg"></o-icon>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'open'],
    computed: {
        toggleIcon() {
            return this.open
                ? 'arrow-left'
                : 'bars'
        }
    },
}
</script>
