import { RouterProvider } from "react-router-dom";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Router from "./routes/Routes";

export const queryClient = new QueryClient()

export default function App({}) {
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={Router}/>
      </AlertProvider>
    </AuthProvider>
    <ReactQueryDevtools/>
  </QueryClientProvider>
    
  )
}

