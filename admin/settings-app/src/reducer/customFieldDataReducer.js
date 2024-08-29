import {__} from "@wordpress/i18n";

const CustomFieldDataReducer = (state, action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {

        case 'FETCH_SETTINGS':
            newState.fetchedSettings = action.payload.fetchedSettings.data;
            newState.stateSettings = action.payload.stateSettings.data;
            newState.isPending = false;
            newState.canSave = false;

            if( typeof action.payload.fetchedSettings.renew_count_errors !== 'undefined'){
                newState.notice = __( 'An error occurred.', 'woo-subs-ren-count' );
                newState.hasError = true;
            }
            break;

        case 'UPDATE_CUSTOM_FIELD_BEFORE':
            newState.isPending = action.payload.isPending;
            newState.newSubscriptions = {};
            newState.stateSubscriptions = {};
            newState.fetchedSettings = {};
            newState.stateSettings = {};
            newState.hasError = false;
            break;

        case 'UPDATE_CUSTOM_FIELD':
            newState.fetchedSubscriptions = action.payload.updatedSettings.data?.subscriptions;
            newState.stateSubscriptions = action.payload.updatedSettings.data?.subscriptions;
            newState.fetchedSettings = action.payload.updatedSettings.data?.settings;
            newState.stateSettings = action.payload.updatedSettings.data?.settings;
            newState.isPending = false;
            newState.canSave = false;

            if ( action.payload.updatedSettings.success ) {
                newState.subscriptionsUpdated = false;
            }

            if( typeof action.payload.updatedSettings.update_errors !== 'undefined'){
                newState.notice = __( 'An error occurred.', 'woo-subs-ren-count' );
                newState.hasError = true;
            }

            if( action.payload.updatedSettings.success === false ){
                newState.notice = action.payload.updatedSettings.message;
                newState.hasError = true;
            }
            break;

        case 'UPDATE_SUBSCRIPTION_FIELD_BEFORE':
            newState.isPending = action.payload.isPending;
            newState.hasError = false;
            break;
        
        case 'UPDATE_SUBSCRIPTION_FIELD':
            newState.updatedSubscriptions = action.payload.updatedData.data;
            newState.canSave = false;

            break;

        case 'UPDATE_STATE':
            if( action.payload.fetchedSettings){
                newState.fetchedSettings = action.payload.fetchedSettings;
            }
            if( action.payload.stateSettings){
                newState.stateSettings = action.payload.stateSettings;
            }
            if( typeof action.payload.isPending !== 'undefined' ){
                newState.isPending = action.payload.isPending;
            }
            if( typeof action.payload.notice !== 'undefined' ){
                newState.notice = action.payload.notice;
            }
            if( typeof action.payload.hasError !== 'undefined' ){
                newState.hasError = action.payload.hasError;
            }

            if( typeof action.payload.canSave !== 'undefined'){
                newState.canSave = action.payload.canSave;
            }
            break;
    }
    return newState;
};
export default CustomFieldDataReducer;