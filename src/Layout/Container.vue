<template functional>
    <div :class="[{
        'container': !props.fluid,
        'container-fluid': props.fluid
    }, data.class, data.staticClass]">
        <div v-if="props.narrow" class="row justify-content-center">
            <div class="col-lg-8">
                <slot />
            </div>
        </div>
        <slot v-else />
    </div>
</template>
<script>
export default {
    props: {
        fluid: {
            type: Boolean,
            default: false
        },
        narrow: {
            type: Boolean,
            default: false
        }
    }
}
</script>