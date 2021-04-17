import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'

import PlacesNavigator from './navigation/PlacesNavigator'
import placesReducer from './store/reducers/Places'
import { init } from './helpers/db'
// initialize database 
init().then(() => {
  console.log("Initialized Database")
}).catch((err) => {
  console.log("Initializing Database failed.")
  console.log(err)

})

const rootReducer = combineReducers({
  places: placesReducer,

})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    // we wrap PlacesNavigator with Provider because every screen in our app should have access to the store and to the provider
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}

