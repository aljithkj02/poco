import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';

const store = createStore(authReducer, applyMiddleware(thunk));

// store.subscribe(() => console.log(store.getState()));

export default store;