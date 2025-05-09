import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './PostContext/ContextProvider.tsx'
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ContextProvider>
         <App />
      </ContextProvider>
    </BrowserRouter>
  
)
