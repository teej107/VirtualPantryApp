import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {Provider} from 'react-redux';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
