import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './firebase/firebase.ts'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
