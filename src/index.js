import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

import './styles/index.css';
import './styles/item.scss';
import './styles/react-colorful.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import TaskList from './components/tasklist';
//import App from './App';
//import App from './app_dif'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <TaskList />
    </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
