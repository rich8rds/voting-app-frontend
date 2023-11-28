import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { VotesProvider } from './context/votesContext'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/useAuthContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VotesProvider>
          <App />
        </VotesProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
  ,
)
