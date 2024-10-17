# Woo Subscriptions Renewal Count Updater
Contributors: Dhanuka Gunarathna<br/>
Website: https://wpdoctor.se/<br/>
Email: dhanuka@wpdoctor.se<br/>
Tags: WooCommerce, Memberships, Subscriptions<br/>
License: GPLv2 or later<br/>
License URI: http://www.gnu.org/licenses/gpl-2.0.html<br/>

## Description

This plugin will add new custom field to all subscriptions and it will have the number of times each subscription got renewed.
The value will be updated on each successful renewal using actions from WooCommerce Subscriptions plugin.

Plugin registers a new settings tab under WooCommerce settings. You must create a custom field name from the settings tab and  run subscriptions updater from there.
This will add the custom field name to all active subscriptions with the number of existing renewal orders count of the subscription as value of the custom field.

The plugin only counts renewal orders with completed status. All subscription orders with status refunded, processing payments, etc will be ignored.

## How it works

The count starts from 1 for all subscriptions because it counts the initial order as well. Then it will increase the value by 1 after every successfull renewals.

Plugin is using following actions introduced by WooCommerce Subscriptions plugin to update the count.

```php
woocommerce_subscription_payment_complete //Used to identify the initial successful order payment.
woocommerce_subscription_renewal_payment_complete //Used to identify successful renewal order payments.
```

Plugin also introduces a filter for you to access the new count just before it's going to save in the database.

```php
// $renew_count       = 'New Count';
// $count_update_type = 'renewal' or 'initial';
$new_count = apply_filters( 'woo_subs_renew_count', $renew_count, $count_update_type );
```

## Dependencies

WooCommerce<br/>
WooCommerce Subscriptions<br/>
WooCommerce Memberships<br/>

