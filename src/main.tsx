import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Principle from './pages/Principle'
import About from './pages/About'
import Demo from './pages/Demo'
import Effects from './pages/Effects'
import './styles/globals.css'
import './styles/globals.light.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'principle', element: <Principle /> },
  { path: 'about', element: <About /> },
      { path: 'demo', element: <Demo /> },
      { path: 'effects', element: <Effects /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
