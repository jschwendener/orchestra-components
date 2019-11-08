<template>
    <div class="progress my-2">
        <div class="progress-bar"
            :class="[`bg-${type}`]"
            :style="{ width: `${value}%` }"  
            role="progressbar" 
            :aria-valuenow="value" 
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
