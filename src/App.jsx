import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, HomeLayout, Landing, Register } from "./Pages";

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
    path:"/login",
    element: <Register />,
    errorElement: <Error />,
  }
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
