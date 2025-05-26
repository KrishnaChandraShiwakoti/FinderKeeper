import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, HomeLayout, Landing, Login, Register } from "./Pages";

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
    ],
  },
  {
    path:"/Register",
    element: <Register />,
    errorElement: <Error />,
  },{
    path:"/login",
    errorElement: <Error />,

    element: <Login/>

  }
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
