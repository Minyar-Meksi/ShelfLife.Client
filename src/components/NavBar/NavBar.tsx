import { IoBookOutline } from "react-icons/io5";

import "./NavBar.css"

interface NavBarProps {
  onHomeClick: () => void;
  onAddClick: () => void;
}

const NavBar = ({onHomeClick, onAddClick}: NavBarProps) => {

  return (
    <nav>
      <div className="nav-heading">
        <IoBookOutline />
      </div>
      <div className="nav-links-container">
        <ul className="nav-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onAddClick}>Add</button>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar