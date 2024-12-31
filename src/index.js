import React from 'react';
import ReactDOM from 'react-dom/client';  // react-dom/client kullanmalısınız
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18'de `createRoot` fonksiyonunu kullanıyoruz
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web vitals (isteğe bağlı)
reportWebVitals();
