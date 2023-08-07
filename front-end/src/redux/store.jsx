import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import userSlice from './userSlice';
import categorySlice from './categorySlice';
import sessionSlice from './sessionSlice';

const reducers = combineReducers({
    user: userSlice.reducer,
    category: categorySlice.reducer,
    session: sessionSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'category', 'session']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, logger],
});

export default store;



// import {configureStore} from '@reduxjs/toolkit';
// import userReducer from './userSlice'

// const store = configureStore({
//     reducer:{
//         user:userReducer
//     }
// });

// export default store;