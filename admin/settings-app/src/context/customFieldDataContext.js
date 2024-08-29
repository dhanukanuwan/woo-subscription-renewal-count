import {
    createContext,
    useEffect,
    useReducer
} from "@wordpress/element";


import { fetchSettings, updateCustomField, updateSubscriptionField } from '../api/customFieldData';
import CustomFieldDataReducer from "../reducer/customFieldDataReducer";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
    /*Initial States Reducer*/
    const initialState = {
        fetchedSettings:{},
        stateSettings:{},
        fetchedSubscriptions:{},
        stateSubscriptions:{},
        isPending: false,
        notice: '',
        hasError: '',
        canSave: false,
        subscriptionsUpdated: false,
        updatedCount: 0,
        updatedSubscriptions: [],
    };

    const [state, dispatch] = useReducer(CustomFieldDataReducer, initialState);

    /*Wrapper Function for dispatch*/
    const useDispatch = (args) => {
        /*Reducer state on args*/
        dispatch(args);
    };

    const useFetchSettings = async () => {
        const gotSettings = await fetchSettings();

        dispatch({
            type: 'FETCH_SETTINGS',
            payload: {
                fetchedSettings : gotSettings,
                stateSettings : gotSettings,
            },
        });
    };

    const useUpdateCustomField = async (data) => {

        dispatch({
            type: 'UPDATE_CUSTOM_FIELD_BEFORE',
            payload: {
                isPending: true,
            },
        });

        const updatedData = await updateCustomField(data);

        /*Reducer state on UPDATE_CUSTOM_FIELD*/
        dispatch({
            type: 'UPDATE_CUSTOM_FIELD',
            payload: {
                updatedSettings: updatedData,
            },
        });
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const useUpdateSubscriptionField = async (data) => {

        dispatch({
            type: 'UPDATE_SUBSCRIPTION_FIELD_BEFORE',
            payload: {
                isPending: true,
            },
        });

        // Split the big array of post ids to smaller arrays.
        let chunksArray = [];

        if ( data.post_ids.length <= 50 ) {
            chunksArray.push( data.post_ids );
        } else {

            const size = 50;

            for  (let i = 0; i < data.post_ids.length; i+=size ) {
                chunksArray.push(data.post_ids.slice(i,i+size));
           }

        }


        for (let index = 0; index < chunksArray.length; index++) {

            const updatedData = await updateSubscriptionField({field_name: data.field_name, post_ids: JSON.stringify(chunksArray[index])});

            /*Reducer state on UPDATE_SUBSCRIPTION_FIELD*/
            dispatch({
                type: 'UPDATE_SUBSCRIPTION_FIELD',
                payload: {
                    updatedData: updatedData,
                },
            });

            await sleep(800);

        }

        dispatch({
            type: 'UPDATE_SUBSCRIPTION_FIELD_BEFORE',
            payload: {
                isPending: false,
            },
        });
    };

    /*Update State*/
    const useUpdateState = async (data) => {
        /*Reducer state on UPDATE_STATE*/
        dispatch({
            type: 'UPDATE_STATE',
            payload: data,
        });
    };

    /*Call once*/
    useEffect(() => {
        useFetchSettings();
    }, []);


    let allContextValue = {
        useDispatch,
        useFetchSettings,
        useUpdateState,
        useUpdateCustomField,
        useUpdateSubscriptionField,
        useSettings:state.stateSettings,
        useSubscriptions:state.stateSubscriptions,
        useIsPending:state.isPending,
        useNotice:state.notice,
        useHasError:state.hasError,
        useCanSave:state.canSave,
        useSubscriptionsUpdated: state.subscriptionsUpdated,
        useUpdatedSubscriptions: state.updatedSubscriptions,
    };
    return (
        <SettingsContext.Provider
            value={allContextValue}
        >
            {props.children}
        </SettingsContext.Provider>
    );
}

export default SettingsContextProvider;