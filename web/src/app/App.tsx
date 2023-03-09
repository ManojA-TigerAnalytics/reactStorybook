import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import routes from './constants/routes.config'
import store from './store'

const GlobalRoutes = () => useRoutes(routes)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SnackbarProvider>
          <GlobalRoutes />
        </SnackbarProvider>
      </Router>
    </Provider>
  )
}

export default App
