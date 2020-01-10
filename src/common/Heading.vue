<template functional>
    <div class="d-flex align-items-center mb-md-3" :class="{ 'text-center': props.center }">
        <div v-if="props.image" class="d-flex align-items-center mr-3" style="width: 3.2rem; height: 3.2rem;">
            <img :src="props.image" class="img-fluid rounded-circle">
        </div>
        <div>
            <div class="prehead" v-if="props.prehead">{{ props.prehead }}</div>
            <h1 v-if="props.title" class="m-0">{{ props.title }} <small v-if="props.postfix">{{ props.postfix }}</small></h1>
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        postfix: {
            type: [String, Number],
            default: null
        },
        prehead: {
            type: String,
            default: null
        },
        center: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: null
        }
    }
}
</script>