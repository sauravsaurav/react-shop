import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './store/user.context';
import { NotificationContextProvider } from './store/notification.context';
import { DirectoryContextProvider } from './store/directory.context';
import { CodeContextProvider } from './store/code.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <NotificationContextProvider>
      <CodeContextProvider>
          <DirectoryContextProvider>
              <UserProvider>
                    <App />
                </UserProvider>
          </DirectoryContextProvider>
        </CodeContextProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
