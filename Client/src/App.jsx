import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
  Profile,
  Account,
  Settings,
  UpdateProfile,
  ReportItem,
} from "./Pages";
import EmailVerification from "./Components/EmailVerification";
import { useEffect } from "react";
import { checkTokenExpiry } from "./Utlis/jwt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "/reportItem",
        element: <ReportItem />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    errorElement: <Error />,
    element: <Login />,
  },
  {
    path: "/register/verification",
    element: <EmailVerification />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <Error />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <Error />,
  },
]);
function App() {
  useEffect(() => {
    checkTokenExpiry();
  }, []);
  return <RouterProvider router={router} />;
}
export default App;
