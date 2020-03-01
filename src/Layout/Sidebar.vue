<template>
    <div>
        <aside class="sidebar" :class="{ 'open': open }">
            <div class="sidebar-row sidebar-branding">
                <div class="sidebar-icon">
                    <slot name="icon">B</slot>
                </div>
                <div class="sidebar-label">
                    <div>{{ title }}</div>
                    <div v-if="app" class="text-muted font-weight-normal">{{ app }}</div>
                </div>
            </div>

            <slot />
        </aside>
    </div>
</template>
<script>
export default {
    props: ['title', 'app', 'open'],
    computed: {
        toggleIcon() {
            return this.open
                ? 'arrow-left'
                : 'bars'
        }
    },
}
</script>
