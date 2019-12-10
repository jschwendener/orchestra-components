<template>
    <div>
        <aside class="sidebar" :class="{ 'open': open }">
            <div class="sidebar-row sidebar-branding">
                <div class="sidebar-icon">
                    <slot name="icon">B</slot>
                </div>
                <div class="sidebar-label">
                    <h4 class="m-0">{{ title }}</h4>
                </div>
            </div>

            <slot />
        </aside>
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
