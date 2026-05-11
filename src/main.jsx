import React from 'react'
import ReactDOM from 'react-dom/client'
import './services/i18n' // 👈 یہ لائن سب سے اوپر ہونی چاہیے تاکہ i18next پہلے لوڈ ہو جائے
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'
import { UserProvider } from './context/UserContext'
import { SearchProvider } from './context/SearchContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
