<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://hashcodeab.se
 * @since      1.0.0
 *
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/includes
 * @author     Dhanuka Gunarathna <dhanuka@hashcodeab.se>
 */
class Woo_Subs_Ren_Count_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'woo-subs-ren-count',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
