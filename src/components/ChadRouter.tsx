import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../pages/Home'
import Farms from '../pages/Farms'
import Chad from '../pages/Chad'
import Nav from "./Nav"

const ChadRouter: React.FC = () => {
  return (
    <Router>
      <div>
        <Nav />

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
  )
}

export default ChadRouter