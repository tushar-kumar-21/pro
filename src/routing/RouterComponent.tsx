import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";

function RouterComponent() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default RouterComponent;
