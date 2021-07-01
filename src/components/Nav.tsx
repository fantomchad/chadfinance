import {
  Link
} from "react-router-dom";

const Nav: React.FC = () => {
  return (
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
  )
}

export default Nav