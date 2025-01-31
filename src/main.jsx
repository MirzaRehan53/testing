import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <h1 className='text-center pt-4 text-3xl'>React Supabse Auth and context</h1>
    <AuthContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </AuthContextProvider>
    </>
  </StrictMode>,
)
