import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import authReducer from "./state"
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
