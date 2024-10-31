import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link className= "nav-item nav-link" to={`/`}>Home</Link>
        </li>
        <li>
          <Link className= "nav-item nav-link" to={`/SavedCandidates`}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
