import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './Provider/AuthProvider'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home'
import AuthLayout from './Layout/AuthLayout'
import HabitDetails from './Pages/HabitDetails'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import AddHabit from './Pages/AddHabit'
import PrivateRoute from './Routes/PrivateRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/habitDetails/:id',
        element: <HabitDetails />
      },
      {
        path:'/addhabit',
        element:(
          <PrivateRoute>
            <AddHabit></AddHabit>
          </PrivateRoute>
        )
      },
    ],
  },
  {
    // HomeLayout এর বাইরে — full width পাবে
    path: '/auth/signup',
    element: <SignUp />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)