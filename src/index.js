import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Styles
import './index.scss';

//Others
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <div className="todo">
          <App />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
