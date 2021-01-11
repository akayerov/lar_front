/* Этоот код генерится create-react-app  при создании приложения
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/

import './css/toastr.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import AppReducer from './redux/reducers';

import { loadState, clearState } from './localStorage';
import App from './App';
import ModalManager from './ModalManager';

import toastr from 'toastr';
import axios from 'axios';

toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "300",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
 window.toast = toastr;
 
export let store = createStore(AppReducer, loadState(), composeWithDevTools(applyMiddleware(thunk)));


console.log('store=', store);
console.log('token=', store.getState());

/**  axios прерыватель interceptors запрос */ 
axios.interceptors.request.use(
  config => {
    if(store.getState().token)
      config.headers.Authorization = 'Bearer ' + store.getState().token;
    return config;
  },
  error => Promise.reject(error)
);

/**  axios прерыватель interceptors ответ */ 
axios.interceptors.response.use(response => {
//  console.log('!!!SUCCESS!!! response interseptor');
  return response;
}, error => {
//  console.log('ERROR response interseptor');
  if (error.response.status === 401) {
      console.log('response =', error.response);
      if( error.response.config.url == '/api/auth/logout')  {
         console.log('clear state');
         clearState();
        setTimeout(() => {
            window.location.pathname = '/auth';
          }, 1000);
      }
      else {   
        window.toast.error('Ошибка авторизации');
        setTimeout(() => {
            window.location.pathname = '/auth';
          }, 1000);
      }  
  }
  return Promise.reject(error)
})


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
render(
  <Provider store={store}>
    <ModalManager />
  </Provider>,
  document.getElementById('modals_root')
);
