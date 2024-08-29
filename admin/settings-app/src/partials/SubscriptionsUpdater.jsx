import { useContext, useState } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { SettingsContext } from '../context/customFieldDataContext';
import {
    Spinner,
    Button,
    Notice,
    Card,
	CardHeader,
	CardBody,
	CardFooter,
	__experimentalText as Text,
	__experimentalHeading as Heading,
} from '@wordpress/components';

const SubscriptionsUpdater = () => {

    const { useSettings, useIsPending, useSubscriptions, useHasError, useNotice, useUpdateSubscriptionField, useUpdatedSubscriptions } = useContext(SettingsContext);

    //console.log( useUpdatedSubscriptions );

    return(
        <>
            { useSubscriptions && useSubscriptions.length > 0 &&
                <div style={{marginTop: '20px'}}>

                    { useHasError && !useIsPending &&
                        <div style={{marginBottom: '20px'}}>
                            <Notice status="error">{useNotice}</Notice>
                        </div>
                    }

                    <Card>
                        <CardHeader>
                            <Heading level={ 3 }>{ __( 'Subscriptions custom field updater', 'woo-subs-ren-count' ) }</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>{ sprintf( __( '%d subscriptions found.', 'woo-subs-ren-count' ), useSubscriptions.length ) }</Text>
                            
                        </CardBody>
                        <CardFooter>
                            <Button variant="primary" onClick={() => useUpdateSubscriptionField({field_name: useSettings.custom_field_name, post_ids: useSubscriptions})} >
                                <span>{__( 'Update Subscriptions', 'woo-subs-ren-count' )}</span>
                                { useIsPending && <Spinner /> }
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            }
        </>
    )

}

export default SubscriptionsUpdater;