import apiFetch from "@wordpress/api-fetch";
import {addQueryArgs} from "@wordpress/url";

export const fetchSettings = async () => {
    let path = 'renewcountwoo/v1/getsettings',
        settings = {};

    try {
        settings = await apiFetch({
            path: path,
            method : 'GET',
            headers: {
                "X-WP-Nonce": renew_count_js_data?.rest_nonce
            }
        });
    } catch (error) {
        console.log('fetchSettings Errors:', error);
        return {
            renew_count_errors : true
        }
    }
    
    return settings;
};

export const updateCustomField = async ( data ) => {
    let path = 'renewcountwoo/v1/updatecustomfieldname',
        subscriptions = [];

        let queryArgs = {
            field_name : data?.field_name
        }
    
        path = addQueryArgs(path, queryArgs);

    try {
        subscriptions = await apiFetch({
            path: path,
            method : 'POST',
            headers: {
                "X-WP-Nonce": renew_count_js_data?.rest_nonce
            }
        });
    } catch (error) {
        console.log('updateCustomField Errors:', error);
        return {
            update_errors : true
        }
    }
    
    return subscriptions;
};