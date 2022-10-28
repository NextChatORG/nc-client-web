import { ApolloProvider } from '@apollo/client';
import client from '@nc-core/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App, { AppContexts } from './App';
import router from './Router';

import '@nc-core/styles/global.sass';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppContexts>
      <ApolloProvider client={client}>
        <App>
          <RouterProvider router={router} />
          <ToastContainer
            hideProgressBar
            position="bottom-center"
            theme="colored"
          />
        </App>
      </ApolloProvider>
    </AppContexts>
  </React.StrictMode>,
);
