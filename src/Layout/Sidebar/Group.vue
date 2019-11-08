<template functional>
    <div class="sidebar-group">
        <div v-if="props.name" class="sidebar-row">
            <div class="sidebar-icon"></div>
            <div class="sidebar-header">{{ props.name }}</div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: null,
        }
    }
}
</script>
