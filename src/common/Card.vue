<template functional>
    <div class="card" :class="{ 'card-dark': props.dark }">
        <img v-if="props.image" :src="props.image" class="card-img-top">
        <div v-if="slots().header" class="card-header card-handle">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <h5 v-if="props.title" class="card-title d-flex justify-content-between align-items-center">
                {{ props.title }}
            </h5>
            <slot></slot>
        </div>
        <div v-if="slots().footer" class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
        dark: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
