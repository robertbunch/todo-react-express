import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './ToDo';

// Get the createStore method from the redux module
// as well as the applyMiddleWare method 
import { createStore, applyMiddleware } from 'redux';

// createStore needs a reducer.
import RootReducer from './reducers/RootReducer'
// we are going to need AJAX a lot. We will use it in our
// Redux Actions which means... we need redux-promise (or thunk).
import reduxPromise from 'redux-promise';

// We have set up Redux (just need theStore below). 
// Now we need a way to tell React about it. PROVIDER!
import { Provider } from 'react-redux';

const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Hand render the Provider and hand Provider theStore.
// Put ToDo INSIDE of the Provider, so that everything inside,
// will know about the theStore
ReactDOM.render(
	<Provider store={theStore}>
		<ToDo />
	</Provider>, 
	document.getElementById('root'
));

