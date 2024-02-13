import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Booking from "../pages/Booking";
import Appointments from "../pages/Appointments";
import ProtectedRoute from "../components/ProtectedRoute";
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },

  {
    path: "/booking",
    element: (
      <ProtectedRoute>
        <Booking />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/appointments",
    element: <Appointments />,
  },
  {
    path: "/logout",
    element: <Booking />,
  },
]);
export default routes;
