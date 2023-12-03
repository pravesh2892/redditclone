import {applyMiddleware, createStore, combineReducers} from 'redux';
import dataReducer from './ProductReducer';
import userReducer from './UserReducer';
import thunk from 'redux-thunk';

function dataStore(){
    const rootReducer = combineReducers({
        data: dataReducer,
        user: userReducer,
      });

    return createStore(rootReducer, applyMiddleware(thunk));
}

export default dataStore;