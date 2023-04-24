import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {Route} from 'wouter'
import Auth from './Auth'
import App from './App'
import Chats from './Chats'
import ChatId from './chatId'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Route path='/' component={App}>Default User</Route>
    <Route path='/admin' component={Auth}>Admin</Route>
    <Route path='/chats' component={Chats}>Admin</Route>
    <Route path='/chats/:userFP' component={ChatId}>Admin</Route>
  </QueryClientProvider>
)
