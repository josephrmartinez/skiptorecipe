import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import GetRecipe from './routes/GetRecipe.jsx';
import Account from './routes/Account.jsx';
import SavedRecipes from './routes/SavedRecipes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <GetRecipe />,
        index: true
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/saved",
        element: <SavedRecipes />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)