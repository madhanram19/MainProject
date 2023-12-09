import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import {store} from './appstore_admin/store_admin'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)


reportWebVitals()
