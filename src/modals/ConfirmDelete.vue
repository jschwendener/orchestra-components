<template>
	<o-modal :title="title" 
        @close="$store.commit('closeModal')"
        size="sm">

		<p>Do you really want to delete this item?. It cannot be restored afterwards.</p>

		<template slot="footer">
			<o-button @click="$store.commit('closeModal')" type="light">Cancel</o-button>
			<o-button 
                ref="primaryAction" 
                @click="$store.commit('confirmModal', true)" 
                type="danger" 
                icon="trash-alt" 
                autofocus>
                Delete
            </o-button>
		</template>
	</o-modal>
</template>
<script>
import OModal from "@/components/Layout/Modal.vue";

export default {
	components: {
		OModal
    },

    props: {
        title: {
            type: String,
            default: 'Delete Item'
        }
    },
    
    mounted() {
        this.$refs.primaryAction.focus()
    }
};
</script>
