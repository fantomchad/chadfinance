import './App.css';
import { UseWalletProvider } from 'use-wallet'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home.tsx'
import Farms from './pages/Farms.tsx'
import Chad from './pages/Chad.tsx'

function App() {
  return (
    <UseWalletProvider
    chainId={250}
    >
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/farms">FARMS</Link>
            </li>
            <li>
              <Link to="/chad">$CHAD</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/chad">
            <Chad />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </UseWalletProvider>
  )
}

export default App