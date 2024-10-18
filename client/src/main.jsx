import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import Dashboard from './pages/dashboard.jsx'
import LoginPage from './pages/loginPage.jsx'
import TimeOffPage from './pages/timeOffPage.jsx'
import EmployeesPage from './pages/employeesPage.jsx'
// import './index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:'/login',
        element:<LoginPage />
      },
      {
        path:'/requests',
        element:<TimeOffPage/>
      },
      {
        path:'/EmployeeInfo',
        element:<EmployeesPage/>
      }
    ]
  }
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
