import {
    createContext,
    useEffect,
    useReducer
} from "@wordpress/element";


import { fetchSettings, updateCustomField } from '../api/customFieldData';
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
        useSettings:state.stateSettings,
        useSubscriptions:state.stateSubscriptions,
        useIsPending:state.isPending,
        useNotice:state.notice,
        useHasError:state.hasError,
        useCanSave:state.canSave,
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