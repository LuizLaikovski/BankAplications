import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import Login from './routes/Login.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import Home from './routes/Home.tsx'

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
)
