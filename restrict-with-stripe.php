<?php
/**
 * Plugin Name: Restrict With Stripe
 * Description: Monetize your content using Stripe.
 * Version: 0.0
 * Author: Stranger Studios
 * Text Domain: restrict-with-stripe
 */
define( 'RWSTRIPE_VERSION', '0.0' );
define( 'RWSTRIPE_DIR', dirname( __FILE__ ) );
define( 'RWSTRIPE_BASE_FILE', __FILE__ );

function rwstripe_load_textdomain() {
	load_plugin_textdomain( 'restrict-with-stripe', false, plugin_basename( RWSTRIPE_DIR ) . '/languages' );
}
add_action( 'plugins_loaded', 'rwstripe_load_textdomain' );

require_once( RWSTRIPE_DIR . '/adminpages/settings.php' ); // Set up settings page in admin.
require_once( RWSTRIPE_DIR . '/adminpages/profile.php' ); // Add settings for admin profile page.

require_once( RWSTRIPE_DIR . '/includes/functions.php' ); // Declare common functions.
require_once( RWSTRIPE_DIR . '/includes/content.php' ); // Restrict page/post content on frontend.
require_once( RWSTRIPE_DIR . '/includes/scripts.php' ); // Set up JavaScript.
require_once( RWSTRIPE_DIR . '/includes/blocks.php' ); // Register blocks.

require_once( RWSTRIPE_DIR . '/shortcodes/rwstripe-customer-portal.php' ); // Shortcode to display link to Stripe Customer Portal.

require_once( RWSTRIPE_DIR . '/classes/class-rwstripe-stripe.php' );   // Facilitate interactions with Stripe.
require_once( RWSTRIPE_DIR . '/classes/class-rwstripe-rest-api.php' ); // Set up REST API endpoints.
