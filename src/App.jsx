import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Router from "./routes/Routes";


export default function App({}) {
  return (
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={Router}/>
        </AlertProvider>
    </AuthProvider>
  )
}

