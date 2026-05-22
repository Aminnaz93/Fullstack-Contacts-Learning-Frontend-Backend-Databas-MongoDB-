import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import AppWithContext from './AppWithContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <AppWithContext />
  </AuthProvider>
  </StrictMode>
)
