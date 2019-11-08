<template>
    <div class="modal d-block" tabindex="-1" role="dialog" @click="$emit('close')">
		<div class="modal-dialog modal-dialog-centered" :class="`modal-${size}`" role="document" style="margin-top: -5rem;">
			<div class="modal-content shadow-lg" @click.stop>
				<div class="modal-header align-items-center" :class="`bg-${type}`">
					<h5 class="modal-title">
						<o-icon :icon="['far', 'exclamation-triangle']" class="mr-2"></o-icon>
						{{ title }}
					</h5>
					<o-button icon="times" class="btn-sm text-dark" @click="$emit('close')"></o-button>
				</div>
				<div class="modal-body overflow-hidden">
                    <slot></slot>
				</div>
				<div class="modal-footer">
                    <slot name="footer">
                        <o-button @click="$emit('close')" type="light">Cancel</o-button>
			            <o-button @click="$emit('confirm')" type="primary">Confirm</o-button>
                    </slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    props: {
		title: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'light'
		},
		size: {
			type: String,
			default: 'default'
		}
    },
};
</script>
