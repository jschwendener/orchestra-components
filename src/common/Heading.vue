<template functional>
    <div class="mb-3" :class="{ 'text-center': props.center }">
        <slot>
            <div class="text-primary font-weight-bold" v-if="props.prehead">{{ props.prehead }}</div>
            <h1 v-if="props.title">{{ props.title }}</h1>
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        prehead: {
            type: String,
            default: null
        },
        center: {
            type: Boolean,
            default: false
        }
    }
}
</script>