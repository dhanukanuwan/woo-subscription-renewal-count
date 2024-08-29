<?php
/**
 * The file that defines the core plugin class
 *
 * @link       https://hashcodeab.se
 * @since      1.0.0
 *
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Woo_Subs_Ren_Count
 * @subpackage Woo_Subs_Ren_Count/includes
 * @author     Dhanuka Gunarathna <dhanuka@hashcodeab.se>
 */
class Woo_Subs_Ren_Count {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Woo_Subs_Ren_Count_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'WOO_SUBS_REN_COUNT_VERSION' ) ) {
			$this->version = WOO_SUBS_REN_COUNT_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'woo-subs-ren-count';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Woo_Subs_Ren_Count_Loader. Orchestrates the hooks of the plugin.
	 * - Woo_Subs_Ren_Count_i18n. Defines internationalization functionality.
	 * - Woo_Subs_Ren_Count_Admin. Defines all hooks for the admin area.
	 * - Woo_Subs_Ren_Count_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-woo-subs-ren-count-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-woo-subs-ren-count-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-woo-subs-ren-count-admin.php';

		$this->loader = new Woo_Subs_Ren_Count_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Woo_Subs_Ren_Count_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Woo_Subs_Ren_Count_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Woo_Subs_Ren_Count_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'woocommerce_settings_tabs_array', $plugin_admin, 'renew_count_woo_settings_tab', 70 );
		$this->loader->add_action( 'woocommerce_settings_renew_count', $plugin_admin, 'renew_count_woo_settings_tab_content' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'renew_count_woo_settings_tab_enqueue_scripts' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'renew_count_woo_settings_string_translations', 100 );

		$this->loader->add_action( 'rest_api_init', $plugin_admin, 'renew_count_get_plugin_settings_endpoint' );
		$this->loader->add_action( 'rest_api_init', $plugin_admin, 'renew_count_update_custom_field_name_endpoint' );
		$this->loader->add_action( 'rest_api_init', $plugin_admin, 'renew_count_update_subscription_custom_field_name_endpoint' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Woo_Subs_Ren_Count_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
