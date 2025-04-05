// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import OthelloBoard from './OthelloBoard';
import './index.css'; // Tailwindやスタイル

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OthelloBoard />
  </React.StrictMode>
);
