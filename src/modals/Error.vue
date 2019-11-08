<template>
	<o-modal 
        title="An unexpected error occured" 
        type="danger"
        @close="$store.commit('closeModal')">

        <div v-if="isInstanceOfError">
            <label>Message</label>
            <div class="alert alert-light mx-n4">
                <code>{{ error.toString() }}</code>
            </div>
            <label>Stacktrace</label>
            <pre>{{ error.stack }}</pre>
        </div>
        <div v-else>
            <label>Status</label>
            <p>{{ error.status }} {{ error.statusText }}</p>

            <label>Message</label>
            <div v-if="error.status == 500" class="alert alert-light mx-n4">
                <code>{{ error.data.message }}</code>
            </div>
            <pre v-else>{{ error.data.message }}</pre>

            <label>URL</label>
            <p>{{ error.config.url }}</p>
        </div>

		<template slot="footer">
			<o-button ref="primaryAction" @click="$store.commit('closeModal')" type="light">Close</o-button>
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
        error: {
            type: [Object, String, Error],
            default: null,
        }
    },
    
    mounted() {
        this.$refs.primaryAction.focus()
    },

    computed: {
        isInstanceOfError() {
            return this.error instanceof Error
        }
    }
};
</script>
