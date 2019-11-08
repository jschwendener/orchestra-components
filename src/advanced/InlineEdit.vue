<template>
    <transition name="fade" mode="out-in">
        <input v-if="editing && !textarea" 
        ref="input"
        type="text" 
        class="form-control" 
        :value="value" 
        @input="$emit('input', $event.target.value)"
        @keyup.enter="close()"
        @blur="close()">
        <textarea v-else-if="editing && textarea" 
            ref="input"
            class="form-control" 
            :value="value" 
            @input="$emit('input', $event.target.value)"
            @blur="close()">
        </textarea>
        <span v-else v-html="value || `<span class=text-muted>${placeholder}</span>`" @click="edit()" v-tooltip="'Click to edit'"></span>
    </transition>
</template>
<script>
export default {
    props: {
        value: {
            default: null
        },
        placeholder: {
            type: String,
            default: 'Empty',
        },
        textarea: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            editing: false,
        }
    },

    methods: {
        edit() {
            this.editing = true
            setTimeout(() => {
                this.$refs.input.focus()
            }, 200)
        },

        close() {
            this.editing = false
        }
    }
}
</script>
