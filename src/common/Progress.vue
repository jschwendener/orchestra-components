<template functional>
    <div class="progress" :class="[data.class, data.staticClass]">
        <div class="progress-bar"
            :class="[`progress-bar-${props.type}`]"
            :style="{ width: `${props.value}%` }"  
            role="progressbar" 
            :aria-valuenow="props.value" 
            aria-valuemin="0" 
            aria-valuemax="100">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            default: 'default',
        }
    },
}
</script>
