import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import App from './App.jsx';

let store = createStore(reducers);

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));
