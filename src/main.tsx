import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/router'
import Auth from './Auth'
import App from './App'

const queryClient = new QueryClient()

const rootRoute = new RootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <Outlet />
    </>
  )
}

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Auth,
})
const chatsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'chats',
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute, chatsRoute])

// Create the router using your route tree
const router = new Router({ routeTree })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
