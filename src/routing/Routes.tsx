import { Outlet } from "react-router-dom";
import DeveloperSignup from "../auth/developer/DeveloperSignUp";
import LoginPage from "../auth/Loginpage";
import UserSignup from "../auth/user/UserSignUp";
import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "../components/layouts/MainLayout";
import AdminDashboard from "../panels/adminPanel/AdminDashboard";
import DeveloperDashboard from "../panels/developerPanel/DeveloperDashboard";
import UserDashboard from "../panels/userPanel/UserDashboard";
import ProjectListing from "../panels/developerPanel/projects/ProjectListing";
import AddProjectForm from "../panels/developerPanel/projects/AddProjectForm";
import AddPropertyForm from "../panels/developerPanel/properties/AddPropertyForm";


const routes = [
  {
    path: "/",
    element: (
      //   <ProtectedMiddleware>
      <AuthLayout />
      //   </ProtectedMiddleware>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        path: "admin",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "developer",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <DeveloperSignup />,
          },
        ],
      },
      {
        path: "user",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <UserSignup />,
          },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      // <ErrorBoundary>
      //   <ProtectedMiddleware>
      <MainLayout />
      //   </ProtectedMiddleware>
      // </ErrorBoundary>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
    ]
  },
  {
    path: "/developer",
    element: (
      // <ErrorBoundary>
      //   <ProtectedMiddleware>
      <MainLayout />
      //   </ProtectedMiddleware>
      // </ErrorBoundary>
    ),
    children: [
      { index: true, element: <DeveloperDashboard /> },
      { path: "dashboard", element: <DeveloperDashboard /> },
      { path: "projects", element: <ProjectListing /> },
      { path: "add-project", element: <AddProjectForm /> },
      { path: "add-property", element: <AddPropertyForm /> },
    ]
  },
  {
    path: "/user",
    element: (
      // <ErrorBoundary>
      //   <ProtectedMiddleware>
      <MainLayout />
      //   </ProtectedMiddleware>
      // </ErrorBoundary>
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "dashboard", element: <UserDashboard /> },
    ]
  }

];

export default routes;
