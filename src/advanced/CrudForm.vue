<template>
	<div v-if="item">
        <h2>{{ createMode ? 'Create new' : item[titleField] }}</h2>

        <o-alert v-if="error" type="danger">
            <o-icon :icon="['far', 'exclamation-triangle']"></o-icon>
            {{ error }}
        </o-alert>

        <form action @submit.prevent="save()">
            <o-card class="card-sticky card-sticky-force">
                <o-button icon="arrow-left" type="light" @click="$router.back()" class="mr-3"></o-button>
                <o-button type="primary" icon="check" :form-submit="true">
                    <span v-if="item.id">Save</span>
                    <span v-else>Create</span>
                </o-button>
            </o-card>

            <slot :item="item"></slot>
        </form>
    </div>
    <o-card v-else class="py-5 text-center">
        <o-spinner>Loading item</o-spinner>
    </o-card>
</template>
<script>
import OAlert from '@/components/common/Alert.vue'

export default {
    components: {
        OAlert
    },

	props: {
        value: {
            type: Object,
            default: null,
        },
        titleField: {
            type: String,
            default: 'name'
        },
        createAction: {
            type: String,
            default: null,
        },
        updateAction: {
            type: String,
            default: null,
        },
        fetchAction: {
            type: String,
            default: null,
        },
        redirectTo: {
            type: String,
            default: null,
        },
        redirectAfterUpdate: {
            type: Boolean,
            default: true,
        },
        redirectAfterCreate: {
            type: Boolean,
            default: true,
        },
        storeModule: {
            type: String,
            default: null,
        }
    },

    data() {
        return {
            createMode: false,
            item: this.value,
            error: null,
            storeActions: {
                create: this.createAction || `${this.storeModule}/createItem`,
                update: this.updateAction || `${this.storeModule}/updateItem`,
                fetch: this.fetchAction || `${this.storeModule}/fetchItem`,
            }
        }
    },

    activated() {
        const id = this.$route.params.id

        if(id) {
            this.$store.dispatch(this.storeActions.fetch, id).then(res => {
                this.item = res
                this.$emit('item-fetched')
            })
        } else {
            this.createMode = true
            this.item = this.value
        }
    },

    deactivated() {
        this.item = null
        this.createMode = false
        this.error = null
    },

    methods: {
        save() {
            if(this.item.id) {
                // Update existing item
                this.$store.dispatch(this.storeActions.update, this.item).then(res => {
                    this.$store.commit('notify', {
                        title: 'Updated entry saved',
                        type: 'primary',
                        icon: 'check'
                    })

                    if(this.redirectAfterUpdate) {
                        this.$router.push(this.redirectTo)
                    }

                    this.$emit('item-updated')
                    this.$emit('item-saved')
                    
                }).catch(err => {
                    this.error = err.response.data.message
                    this.$emit('error', err.response.data)
                })
            } else {
                // Create new item
                this.$store.dispatch(this.storeActions.create, this.item).then(res => {
                    this.$store.commit('notify', {
                        title: 'New entry created',
                        type: 'success',
                        icon: 'check'
                    })

                    if(this.redirectAfterCreate) {
                        this.$router.push(this.redirectTo)
                    }

                    this.$emit('item-created')
                    this.$emit('item-saved')

                }).catch(err => {
                    this.error = err.response.data.message
                    this.$emit('error', err.response.data)
                })
            }
        }
    }
};
</script>
