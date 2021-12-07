import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './store/reducer';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>

  );
}


