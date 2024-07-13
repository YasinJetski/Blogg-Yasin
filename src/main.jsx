import React from 'react';
import ReactDOM from 'react-dom/client';

// Styling
import './index.css';
import './MakeBlogg.css';
import './explore.css';
import './Hero.css';


import App from './App';
import AuthWrapper from './comp/AuthWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </React.StrictMode>,
)
