import { __ } from '@wordpress/i18n';

const App = () => {

    return(
        <div>
            <h1>{ __( 'Subscription Renewal Count Custom Field Settings', 'woo-subs-ren-count' ) }</h1>
        </div>
    );
}

export default App;