
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reminders from './reducers/reducer';
const store = createStore(reminders )

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root'));
