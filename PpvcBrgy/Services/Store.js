import Root_Reducer from './Reducers/Root_reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(Root_Reducer, applyMiddleware(thunk));

export default store;
