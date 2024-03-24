import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './app/store'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { AuthProvider } from './Components/Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </AuthProvider>
      
  </React.StrictMode>
);

