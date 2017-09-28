import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';

ReactDOM.render(
  <App initialData={window.initialData} />,
  document.getElementById('root'));
