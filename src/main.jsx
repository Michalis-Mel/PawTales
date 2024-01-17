import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { StoriesProvider } from './Context/StoriesContext.jsx';
import { HomeMsgProvider } from './Context/HomeMsgContext.jsx';

import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StoriesProvider>
        <HomeMsgProvider>
          <App />
        </HomeMsgProvider>
      </StoriesProvider>
    </AuthProvider>
  </React.StrictMode>
);
