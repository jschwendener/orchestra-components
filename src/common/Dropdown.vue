<template>
  <div class="dropdown d-inline-block">
    <div @click.stop="toggle()">
        <slot name="toggle">
            <o-button type="link"><o-icon :icon="['far', 'ellipsis-v']" fixed-width></o-icon></o-button>
        </slot>
    </div>
    <transition name="dropdown">
        <div v-if="isOpen" class="dropdown-menu mt-2 show" :class="`dropdown-menu-${align}`" aria-labelledby="dropdownMenuButton">
            <slot :toggle="toggle"></slot>
        </div>
    </transition>
    <transition name="dropdown-backdrop">
        <div v-if="isOpen" class="dropdown-backdrop"></div>
    </transition>
  </div>
</template>
<script>
import OButton from './Button.vue';
export default {
    props: {
        align: {
            type: String,
            default: 'right'
        }
    },

    data() {
        return {
            isOpen: false,
        }
    },

    components: {
        OButton,
    },

    mounted() {
        document.addEventListener('click', () => {
            this.isOpen = false
        });
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>
