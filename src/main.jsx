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
import MyHabit from './Pages/MyHabit'
import PublicHabits from './Pages/PublicHabits'
import PageNotFound from './Pages/PageNotFound'

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
        path:'/publichabits',
        element:<PublicHabits></PublicHabits>
      },
      {
        path: '/habitDetails/:id',
        element: (
          <PrivateRoute><HabitDetails /></PrivateRoute>
        )
      },
      {
        path:'/addhabit',
        element:(
          <PrivateRoute>
            <AddHabit></AddHabit>
          </PrivateRoute>
        )
      },
      {
        path:'/myhabit',
        element:(
          <PrivateRoute>
            <MyHabit></MyHabit>
          </PrivateRoute>
        )
      }
    ],
  },
  {
    
    path: '/auth/signup',
    element: <SignUp />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path:'/pagenotfoune',
    element:<PageNotFound></PageNotFound>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)