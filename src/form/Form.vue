<template>
    <form ref="form" @submit.prevent="$emit('submit')">
        <slot />
    </form>
</template>
<script>
export default {
    props: {
        validation: {
            type: Object,
            default: null
        },
    },

    watch: {
        validation(value) {
            if (value) {
                Object.keys(value.errors).forEach(inputName => {
                    const invalidInput = this.$refs.form.querySelector(`input[name="${inputName}"]`)
                    if (invalidInput) {
                        invalidInput.classList.add('is-invalid')
                    }
                })
            } else {
                const invalidInputs = [...this.$refs.form.querySelectorAll('.is-invalid')]
                invalidInputs.forEach(input => input.classList.remove('is-invalid'))
            }
        }
    }
}
</script>