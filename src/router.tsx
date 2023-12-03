import { Calendar } from './Components/Calendar/Calendar';
import App from './App';
import { createBrowserRouter } from "react-router-dom";
import { Projects } from './Components/Projects/Projects';
import DashBoard from './Components/DashBoard/DashBoard';
import StaffContainer from './Components/Staff/StaffContainer';
import LoginPage from './Components/LoginPage/LoginPage';
import ClientsContainer from './Components/Clients/ClientsContainer';
import SettingsContainer from './Components/Settings/SettingsContainer';
import ClientPage from './Components/Clients/ClientPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ClientsContainer />,
      },

      {
        path: "/client/:clientId",
        element: <ClientPage />,
      },

      /* {
        path: '/newclient',
        element: <Newclient />
      }, */

      {
        path: "/calendar",
        element: <Calendar />,
      },

      {
        path: "/projects",
        element: <Projects />,
      },

      {
        path: "/dashboard",
        element: <DashBoard />,
      },

      {
        path: "/settings/*",
        element: <SettingsContainer />,
      },

      {
        path: "/staff/*",
        element: <StaffContainer />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

    ],
  },
])


