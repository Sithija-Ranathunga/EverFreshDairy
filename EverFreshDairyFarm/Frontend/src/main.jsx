
/*import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import{AppContextProvider} from './Content/AppContent.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App/>
  </AppContextProvider> 
  </BrowserRouter>,
)*/

// main.jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './Content/AppContent.jsx'
import { AppContextProvider as VetContextProvider } from './Content/AppContentvet.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <VetContextProvider>
        <App/>
      </VetContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)
