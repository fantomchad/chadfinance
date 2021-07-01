import {
  Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom'

import Logo from "./Logo"
import Back from "./Back"

const Nav: React.FC = () => {
  let path = useLocation().pathname;

  const navStyle = {
    backgroundColor: "#004FCE",
    fontFamily: "Tempest"
  }

  return (
    <nav className="flex justify-between items-center  text-2xl px-4 md:px-8 py-1" style={navStyle}>
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="md:hidden">
          {path == "/" && <img src="/images/fantomlogo.svg" alt="Fantom Logo" />}
          {path != "/" && <Back />}
      </div>
      <div className="flex items-center">
        <div className="flex items-center space-x-6 text-white text-4xl">
          <ul className="flex items-center space-x-6">
            <li className={`md:flex hidden ${path === "/" ? "text-gray-900" : ""}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`md:flex hidden ${path === "/farms" ? "text-gray-900" : ""}`}>
              <Link to="/farms">FARMS</Link>
            </li>
            <li className={`md:flex hidden ${path === "/chad" ? "text-gray-900" : ""}`}>
              <Link to="/chad">$CHAD</Link>
            </li>
          </ul>
          <div className="border hover:bg-gray-900 border-white border-solid rounded-lg px-6 text-center text-base cursor-pointer" >
              <span className="text-white text-xl md:text-4xl">
                  0xas..819
              </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
// onClick={() => setToggle(true)}
export default Nav