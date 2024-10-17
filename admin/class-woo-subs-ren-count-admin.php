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

	/**
	 * Get all plugin settings.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_get_plugin_settings_endpoint() {
		register_rest_route(
			'renewcountwoo/v1',
			'/getsettings',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'renew_count_get_plugin_settings_endpoint_callback' ),
					'permission_callback' => array( $this, 'renew_count_rest_api_user_permissions' ),
				),
			)
		);
	}

	/**
	 * Get all plugin settings callback.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_get_plugin_settings_endpoint_callback() {

		$data = array();

		$plugin_settings = get_option( 'renew_count_woo_settings' );

		if ( empty( $plugin_settings ) ) {
			$plugin_settings = array(
				'custom_field_name' => 'subs_renew_count',
			);
		}

		$data = $plugin_settings;

		$response = rest_ensure_response(
			array(
				'data' => $data,
			)
		);

		return $response;
	}

	/**
	 * Get all subscriptions endpoint.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_update_custom_field_name_endpoint() {
		register_rest_route(
			'renewcountwoo/v1',
			'/updatecustomfieldname',
			array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'renew_count_update_custom_field_name_endpoint_callback' ),
					'permission_callback' => array( $this, 'renew_count_rest_api_user_permissions' ),
					'args'                => array(
						'field_name' => array(
							'required' => true,
							'type'     => 'string',
						),
					),
				),
			)
		);
	}

	/**
	 * Get all subscriptions callback.
	 *
	 * @param    array $request request array.
	 * @since    1.0.0
	 */
	public function renew_count_update_custom_field_name_endpoint_callback( $request ) {

		$field_name = sanitize_text_field( $request->get_param( 'field_name' ) );

		$data    = array();
		$success = false;
		$message = '';

		if ( ! empty( $field_name ) ) {

			$plugin_settings = get_option( 'renew_count_woo_settings' );

			if ( empty( $plugin_settings ) ) {
				$plugin_settings = array();
			}

			$plugin_settings['custom_field_name'] = $field_name;

			$success = update_option( 'renew_count_woo_settings', $plugin_settings );

			$data['settings'] = $plugin_settings;

		}

		if ( function_exists( 'wcs_get_subscriptions' ) && true === $success ) {

			$args = array(
				'subscriptions_per_page' => -1,
				'subscription_status'    => array( 'wc-active' ),
			);

			$subscriptions = wcs_get_subscriptions( $args );

			if ( ! empty( $subscriptions ) && ! is_wp_error( $subscriptions ) ) {

				$subscription_ids = array();

				foreach ( $subscriptions as $subscription_id => $subscription_data ) {
					$subscription_ids[] = $subscription_id;
				}

				$data['subscriptions'] = $subscription_ids;
			} else {
				$success = false;
				$message = __( 'No subscriptions found.', 'woo-subs-ren-count' );
			}
		} else {
			$message = __( 'An error occurred while updating the field name.', 'woo-subs-ren-count' );
		}

		$response = rest_ensure_response(
			array(
				'data'    => $data,
				'success' => $success,
				'message' => $message,
			)
		);

		return $response;
	}

	/**
	 * Bulk update active subscriptions with the custom field.
	 *
	 * @since    1.0.0
	 */
	public function renew_count_update_subscription_custom_field_name_endpoint() {
		register_rest_route(
			'renewcountwoo/v1',
			'/updatesubscriptioncustomfieldname',
			array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'renew_count_update_subscription_custom_field_name_endpoint_callback' ),
					'permission_callback' => array( $this, 'renew_count_rest_api_user_permissions' ),
					'args'                => array(
						'field_name' => array(
							'required' => true,
							'type'     => 'string',
						),
						'post_ids'   => array(
							'required' => true,
							'type'     => 'string',
						),
					),
				),
			)
		);
	}

	/**
	 * Bulk update active subscriptions callback.
	 *
	 * @param    array $request request array.
	 * @since    1.0.0
	 */
	public function renew_count_update_subscription_custom_field_name_endpoint_callback( $request ) {

		$field_name = sanitize_text_field( $request->get_param( 'field_name' ) );
		$post_ids   = sanitize_text_field( $request->get_param( 'post_ids' ) );

		if ( ! empty( $post_ids ) ) {
			$post_ids = json_decode( $post_ids );
		}

		$updated_count = 0;
		$failed_count  = 0;
		$total         = 0;

		if ( ! empty( $field_name ) && ! empty( $post_ids ) ) {

			$total = count( $post_ids );

			foreach ( $post_ids as $post_id ) {

				$old_custom_field_val = get_post_meta( $post_id, 'BLP_Count', true );
				$new_custom_field_val = 1;

				if ( ! empty( $old_custom_field_val ) ) {
					$new_custom_field_val = (int) $old_custom_field_val;
				}

				$status = update_post_meta( $post_id, $field_name, $new_custom_field_val );

				if ( false === $status ) {
					$failed_count = ++$failed_count;
				} else {
					$updated_count = ++$updated_count;
				}
			}
		}

		$data = array(
			'updated_count' => $updated_count,
			'failed_count'  => $failed_count,
			'total'         => $total,
		);

		$response = rest_ensure_response(
			array(
				'data' => $data,
			)
		);

		return $response;
	}

	/**
	 * Check user permissions.
	 *
	 * @param    array $request request array.
	 * @since    1.0.0
	 */
	public function renew_count_rest_api_user_permissions( $request ) { //phpcs:ignore
		return current_user_can( 'manage_options' );
	}

	/**
	 * Add custom field to the subscription on inital successful order payment.
	 *
	 * @param    WC_Subscription $subscription Object representing the subscription which has just received a payment.
	 * @since    1.0.0
	 */
	public function renew_count_add_custom_field_on_inital_payment( $subscription ) {

		$plugin_settings = get_option( 'renew_count_woo_settings' );

		// Do nothing if custom field name not saved.
		if ( empty( $plugin_settings ) || ( isset( $plugin_settings['custom_field_name'] ) && empty( $plugin_settings['custom_field_name'] ) ) ) {

			$failed_note = __( 'Adding initial payment count failed. Reason: Custom field name not saved.', 'woo-subs-ren-count' );
			$subscription->add_order_note( $failed_note );

			return;
		}

		$subscription_id = $subscription->get_id();

		$custom_field_name = $plugin_settings['custom_field_name'];

		// Make sure this is the initial payment by checking existing custom fields.
		$renew_count         = get_post_meta( $subscription_id, $custom_field_name, true );
		$initial_count_saved = get_post_meta( $subscription_id, 'initial_count_saved', true );

		// Do nothing if custom field values are not empty.
		if ( ! empty( $renew_count ) && 'true' === $initial_count_saved ) {

			$failed_note = __( 'Adding initial payment count skipped. Reason: Possible renewal order.', 'woo-subs-ren-count' );
			$subscription->add_order_note( $failed_note );

			return;
		}

		$renew_count       = 1;
		$count_update_type = 'initial';

		$initial_count = apply_filters( 'woo_subs_renew_count', $renew_count, $count_update_type );

		$update_status = update_post_meta( $subscription_id, $custom_field_name, $initial_count );

		if ( false !== $update_status ) {
			// translators: Subscription renewal count.
			$success_note = sprintf( __( 'Initial payment count saved. Count: %d', 'woo-subs-ren-count' ), $initial_count );
			$subscription->add_order_note( $success_note );

			update_post_meta( $subscription_id, 'initial_count_saved', 'true' );
		} else {
			$failed_note = __( 'Initial payment count saving failed.', 'woo-subs-ren-count' );
			$subscription->add_order_note( $failed_note );
		}
	}

	/**
	 * Increase subscription reneal count by +1 on successfull renewal payment.
	 *
	 * @param    WC_Subscription $subscription Object representing the subscription which has just received a payment.
	 * @since    1.0.0
	 */
	public function renew_count_increase_count_on_renew_payment( $subscription ) {

		$plugin_settings = get_option( 'renew_count_woo_settings' );

		// Do nothing if custom field name not saved.
		if ( empty( $plugin_settings ) || ( isset( $plugin_settings['custom_field_name'] ) && empty( $plugin_settings['custom_field_name'] ) ) ) {

			$failed_note = __( 'Updating renewal count failed. Reason: Custom field name not saved.', 'woo-subs-ren-count' );
			$subscription->add_order_note( $failed_note );

			return;
		}

		$subscription_id = $subscription->get_id();

		$custom_field_name = $plugin_settings['custom_field_name'];

		// Get saved custom field values.
		$renew_count   = get_post_meta( $subscription_id, $custom_field_name, true );
		$order_renewed = get_post_meta( $subscription_id, 'renew_count_order_renewed', true );

		if ( empty( $renew_count ) ) {
			$renew_count = 1;
		}

		if ( empty( $order_renewed ) ) {
			update_post_meta( $subscription_id, 'renew_count_order_renewed', 'true' );
		}

		$renew_count       = (int) $renew_count + 1;
		$count_update_type = 'renewal';

		$new_count = apply_filters( 'woo_subs_renew_count', $renew_count, $count_update_type );

		$update_status = update_post_meta( $subscription_id, $custom_field_name, $new_count );

		if ( false !== $update_status ) {
			// translators: Subscription renewal count.
			$success_note = sprintf( __( 'Successfully updated the renewal count. Count: %d', 'woo-subs-ren-count' ), $new_count );
			$subscription->add_order_note( $success_note );
		} else {
			$failed_note = __( 'Updating renewal count failed.', 'woo-subs-ren-count' );
			$subscription->add_order_note( $failed_note );
		}
	}
}
