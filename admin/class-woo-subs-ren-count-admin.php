<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://hashcodeab.se
 * @since      1.0.0
 *
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/admin
 * @author     Dhanuka Gunarathna <dhanuka@hashcodeab.se>
 */
class Woo_Subs_Ren_Count_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_woo_settings_tab_enqueue_scripts() {

		if ( isset( $_GET['tab'] ) && 'renew_count' === sanitize_text_field( $_GET['tab'] ) ) { //phpcs:ignore

			$dependancies = array( 'react', 'react-jsx-runtime', 'wp-element' );
			$version      = $this->version;

			$deps_file = plugin_dir_path( __FILE__ ) . 'settings-app/build/index.asset.php';

			if ( file_exists( $deps_file ) ) {
				$deps_file    = require $deps_file;
				$dependancies = $deps_file['dependencies'];
				$version      = $deps_file['version'];
			}

			wp_enqueue_script( 'renew_count_woo_settings-js', plugin_dir_url( __FILE__ ) . 'settings-app/build/index.js', $dependancies, $version, true );
			wp_enqueue_style( 'renew_count_woo_settings-css', plugin_dir_url( __FILE__ ) . 'settings-app/settings-styles.css', array(), $version );

			$renew_count_woo_js_data = array(
				'rest_root'  => esc_url_raw( rest_url() ),
				'rest_nonce' => wp_create_nonce( 'wp_rest' ),
			);

			wp_localize_script( 'renew_count_woo_settings-js', 'renew_count_js_data', $renew_count_woo_js_data );
		}
	}

	/**
	 * Register script translations.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_woo_settings_string_translations() {

		if ( isset( $_GET['tab'] ) && 'renew_count' === sanitize_text_field( $_GET['tab'] ) ) { //phpcs:ignore
			wp_set_script_translations(
				'renew_count_woo_settings-js',
				'woo-subs-ren-count',
				plugin_dir_path( __FILE__ ) . 'languages',
			);
		}
	}

	/**
	 * Custom settings tab for the plugin options.
	 *
	 * @since  1.0.0
	 * @param  array $tabs .
	 */
	public function renew_count_woo_settings_tab( $tabs ) {

		$tabs['renew_count'] = __( 'Renewal Count', 'woo-subs-ren-count' );

		return $tabs;
	}

	/**
	 * Render settings tab content.
	 *
	 * @since  1.0.0
	 */
	public function renew_count_woo_settings_tab_content() {

		$output = '<div id="subs_renew_count_wrapper"></div>';

		echo wp_kses_post( $output );
	}
}
