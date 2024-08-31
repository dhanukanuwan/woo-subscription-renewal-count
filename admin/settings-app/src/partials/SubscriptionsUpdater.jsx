import { useContext, useState, useEffect } from '@wordpress/element';
import { sprintf, __, _n } from '@wordpress/i18n';
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
    
    const [totalUpdated, setTotalUpdated] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        
		if ( !useUpdatedSubscriptions || ( useUpdatedSubscriptions && useUpdatedSubscriptions.length === 0 ) ) return;

		setTotalUpdated( totalUpdated + useUpdatedSubscriptions.total );

        if ( useUpdatedSubscriptions.updated_count > 0 ) {
            setSuccessCount( successCount + useUpdatedSubscriptions.updated_count );
        }

        if ( useUpdatedSubscriptions.failed_count > 0 ) {
            setErrorCount( errorCount + useUpdatedSubscriptions.failed_count );
        }

    }, [useUpdatedSubscriptions]);

    useEffect(() => {

        if ( useSubscriptions && useSubscriptions.length > 0 ) return;

        setTotalUpdated(0);
        setSuccessCount(0);
        setErrorCount(0);

    }, [useSubscriptions]);

    return(
        <>
            { useSubscriptions && useSubscriptions.length > 0 &&
                <div style={{marginTop: '20px'}}>

                    { useHasError && !useIsPending &&
                        <div style={{marginBottom: '20px'}}>
                            <Notice status="error">{useNotice}</Notice>
                        </div>
                    }

                    { !useIsPending && errorCount > 0 &&
                        <Notice status="error">
                            { __( 'Could not update ', 'woo-subs-ren-count') }
                            { sprintf( _n( '%d subscription', '%d subscriptions', errorCount, 'woo-subs-ren-count' ), errorCount ) }
                        </Notice>
                    }

                    { !useIsPending && errorCount === 0 && totalUpdated === useSubscriptions.length &&
                        <Notice status="success">
                            { __( 'Subscriptions updated successfully.', 'woo-subs-ren-count') }
                        </Notice>
                    }

                    { totalUpdated !== useSubscriptions.length &&
                        <Card>
                            <CardHeader>
                                <Heading level={ 3 }>{ __( 'Subscriptions custom field updater', 'woo-subs-ren-count' ) }</Heading>
                                { useIsPending && useUpdatedSubscriptions && useUpdatedSubscriptions.total > 0 &&
                                    <div style={{textAlign: 'right'}}>
                                        <Text color="#0A875B">{ sprintf( __( `%d%s completed.`, 'woo-subs-ren-count' ), parseInt( (totalUpdated/useSubscriptions.length)*100, 10 ), '%' ) }</Text>
                                    </div>
                                }
                            </CardHeader>
                            <CardBody>

                                {! useIsPending &&
                                    <Text>{ sprintf( __( '%d subscriptions found.', 'woo-subs-ren-count' ), useSubscriptions.length ) }</Text>
                                }
                                
                                { useIsPending &&
                                    <Text>{ sprintf( __( '%d of %d subscriptions were updated.', 'woo-subs-ren-count' ), successCount, useSubscriptions.length ) }</Text>
                                }
                            </CardBody>
                            <CardFooter>
                                <Button variant="primary" onClick={() => useUpdateSubscriptionField({field_name: useSettings.custom_field_name, post_ids: useSubscriptions})} disabled={useIsPending}>
                                    <Text color="#ffffff">{__( 'Update Subscriptions', 'woo-subs-ren-count' )}</Text>
                                    { useIsPending && <Spinner /> }
                                </Button>
                            </CardFooter>
                        </Card>
                    }

                </div>
            }
        </>
    )

}

export default SubscriptionsUpdater;