import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AuthProvider from './Provider/AuthProvider'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home'
import HomeLayout from './Layout/HomeLayout'
import HabitDetails from './Pages/HabitDetails'

const router = createBrowserRouter([
  {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path:'/habitDetails/:id',
      element:<HabitDetails></HabitDetails>
    }
  ]
}
])
createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>

  </StrictMode>,
)
