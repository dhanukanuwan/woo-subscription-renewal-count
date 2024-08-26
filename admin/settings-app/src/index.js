import {createRoot} from '@wordpress/element';
import App from './App';
import SettingsContextProvider from './context/customFieldDataContext';

const InitSettings = () => {
	return (
		<SettingsContextProvider>
            <App />
        </SettingsContextProvider>
	)
}

const container = document.getElementById('subs_renew_count_wrapper');

if ( container ) { //check if element exists before rendering
	document.addEventListener('DOMContentLoaded', () => {

		const root = createRoot(container);
		root.render(<InitSettings />);

  	});
  
}