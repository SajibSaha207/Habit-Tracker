import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AuthProvider from './Provider/AuthProvider'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home'
import HomeLayout from './Layout/AuthLayout'
import HabitDetails from './Pages/HabitDetails'
import AuthLayout from './Layout/AuthLayout'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'

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
        path: '/auth/signup',
        element: <SignUp></SignUp>,
      },
    {
      path:'/habitDetails/:id',
      element:<HabitDetails></HabitDetails>
    },
  ],
},
   {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>,
      },
     
    ],
    
},
 
])
createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>

  </StrictMode>,
)
