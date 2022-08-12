<?php

/*
 * Add settings page for Restrict with Stripe.
 *
 * @since 1.0
 */
function rwstripe_admin_menu() {
	add_options_page( esc_html__( 'Restrict with Stripe', 'restrict-with-stripe' ),  esc_html__( 'Restrict with Stripe', 'restrict-with-stripe' ), 'manage_options', 'rwstripe', 'rwstripe_render_settings_page');	
}
add_action('admin_menu', 'rwstripe_admin_menu');

/**
 * Populate the settings page.
 *
 * @since 1.0
 */
function rwstripe_render_settings_page() {
	?>
        <div id="rwstripe-settings"></div>
    <?php
}

/**
 * Register RWS settings with REST API so that they can be edited in JS.
 *
 * @since 1.0
 */
function rwstripe_settings_init() {
	register_setting(
		'rwstripe_show_excerpts',
		'rwstripe_show_excerpts',
		array(
			'type'         => 'boolean',
			'show_in_rest' => true,
			'default' => true,
		)
	);
	register_setting(
		'rwstripe_collect_password',
		'rwstripe_collect_password',
		array(
			'type'         => 'boolean',
			'show_in_rest' => true,
			'default' => true,
		)
	);
}
add_action( 'rest_api_init', 'rwstripe_settings_init' );

/**
 * Handle responses from the Stripe Connect server.
 *
 * @since 1.0
 */
function rwstripe_handle_connect_to_stripe_response() {
	// Is user have permission to edit give setting.
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_REQUEST['pmpro_stripe_connected'] )  ) {
		if ( 'false' === $_REQUEST['pmpro_stripe_connected'] && isset( $_REQUEST['error_message'] ) ) {
			$error = $_REQUEST['error_message'];
		} elseif (
			'false' === $_REQUEST['pmpro_stripe_connected']
			|| ! isset( $_REQUEST['pmpro_stripe_publishable_key'] )
			|| ! isset( $_REQUEST['pmpro_stripe_user_id'] )
			|| ! isset( $_REQUEST['pmpro_stripe_access_token'] )
		) {
			$error = esc_html__( 'Invalid response from the Stripe Connect server.', 'restrict-with-stripe' );
		} else {
			// Update keys.
			update_option( 'rwstripe_stripe_user_id', sanitize_text_field( $_REQUEST['pmpro_stripe_user_id'] ) );
			update_option( 'rwstripe_stripe_access_token', sanitize_text_field( $_REQUEST['pmpro_stripe_access_token'] ) );
			update_option( 'rwstripe_stripe_publishable_key', sanitize_text_field( $_REQUEST['pmpro_stripe_publishable_key'] ) );

			wp_redirect( admin_url( 'options-general.php?page=rwstripe' ) );
			exit;
		}
	} elseif ( isset( $_REQUEST['pmpro_stripe_disconnected'] ) ) {
		delete_option( 'rwstripe_stripe_user_id' );
		delete_option( 'rwstripe_stripe_access_token' );
		delete_option( 'rwstripe_stripe_publishable_key' );
	}

	// TODO: Show error messages from failed connection.
}
add_action( 'admin_init', 'rwstripe_handle_connect_to_stripe_response' );
