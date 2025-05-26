import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, HomeLayout, Landing } from "./Pages";

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
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
