import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './store/user.context';
import { NotificationContextProvider } from './store/notification.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <NotificationContextProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
