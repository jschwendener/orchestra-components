<template functional>
    <div class="card" :class="{ 'card-dark': props.dark }">
        <div class="card-body d-flex align-items-center">
            <img v-if="props.image" :src="props.image" class="card-resource-img card-handle img-fluid rounded mr-3" style="width: 50px;">
            <div class="d-flex flex-fill align-items-center justify-content-between">
                <div>
                    <div>
                        <router-link v-if="props.link" :to="props.link" class="highlight">{{ props.title }}</router-link>
                        <strong v-else class="text-dark">{{ props.title }}</strong>
                    </div>
                    <div>{{ props.subtitle }}</div>
                </div>

                <slot name="actions"></slot>
            </div>
        </div>
        <hr class="my-0">
        <div class="card-body">
            <slot></slot>
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
        subtitle: {
            type: String,
            default: null,
        },
        link: {
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
