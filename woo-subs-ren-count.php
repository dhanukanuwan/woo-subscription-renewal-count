<?php
/**
 * The plugin bootstrap file
 *
 * @link              https://wpdoctor.se
 * @since             1.0.0
 * @package           Woo_Subs_Ren_Count
 *
 * @wordpress-plugin
 * Plugin Name:       Woo Subscriptions Renewal Count Updater
 * Plugin URI:        https://wpdoctor.se
 * Description:       Updates the number of subscription renewals of each subscription.
 * Version:           1.0.0
 * Author:            Dhanuka Gunarathna
 * Author URI:        https://wpdoctor.se/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       woo-subs-ren-count
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 */
define( 'WOO_SUBS_REN_COUNT_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-woo-subs-ren-count-activator.php
 */
function activate_woo_subs_ren_count() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-woo-subs-ren-count-activator.php';
	Woo_Subs_Ren_Count_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-woo-subs-ren-count-deactivator.php
 */
function deactivate_woo_subs_ren_count() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-woo-subs-ren-count-deactivator.php';
	Woo_Subs_Ren_Count_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_woo_subs_ren_count' );
register_deactivation_hook( __FILE__, 'deactivate_woo_subs_ren_count' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-woo-subs-ren-count.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0.0
 */
function run_woo_subs_ren_count() {

	$plugin = new Woo_Subs_Ren_Count();
	$plugin->run();
}

run_woo_subs_ren_count();
