import { ApolloProvider } from '@apollo/client';
import client from '@nc-core/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import '@nc-core/styles/global.sass';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
