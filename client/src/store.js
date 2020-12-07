import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart', 'user'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, logger];

const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(pReducer, initialState, composedEnhancers);
const persistor = persistStore(store);

export { persistor, store };
