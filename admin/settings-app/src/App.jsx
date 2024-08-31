import { useContext, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Spinner, Button, Notice } from '@wordpress/components';
import { SettingsContext } from './context/customFieldDataContext';
import SubscriptionsUpdater from './partials/SubscriptionsUpdater';

const App = () => {

	const { useSettings, useIsPending, useUpdateCustomField, useHasError, useNotice } = useContext(SettingsContext);
    const [customFieldName, setCustomFieldName] = useState('');

	useEffect(() => {
        
		if ( !useSettings ) {
			return;
		}

		setCustomFieldName( useSettings.custom_field_name );

    }, [useSettings]);

	if ( !Object.keys(useSettings).length && useIsPending === false ) {
        return (
			<div>
				<h1>{ __( 'Subscription Renewal Count Custom Field Settings', 'woo-subs-ren-count' ) }</h1>
				<Spinner />
			</div>
        )
    }

    return(
        <div>
            <h1>{ __( 'Subscription Renewal Count Custom Field Settings', 'woo-subs-ren-count' ) }</h1>

			<div style={{maxWidth: '700px', marginTop: '20px'}}>

				{ useHasError && 
					<div style={{marginBottom: '20px'}}>
						<Notice status="error">{useNotice}</Notice>
					</div>
				}

				<TextControl
					label={__( 'Custom Field Name', 'woo-subs-ren-count' )}
					value={ customFieldName }
					onChange={ ( value ) => setCustomFieldName( value ) }
					help={ __( 'All subsciptions must be updated after you change the field name.', 'woo-subs-ren-count' ) }
				/>
				<Button variant="primary" onClick={() => useUpdateCustomField({field_name: customFieldName})} disabled={ useSettings && useSettings.custom_field_name === customFieldName }>
					<span>{__( 'Update Custom Field Name', 'woo-subs-ren-count' )}</span>
					{ useIsPending && <Spinner /> }
				</Button>

				<SubscriptionsUpdater />
			</div>
            
        </div>
    );
}

export default App;