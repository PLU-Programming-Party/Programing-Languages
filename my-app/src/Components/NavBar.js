import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css'
export default function NavBar() {
    return (
        <nav className="nav">
           <ul>
              <li>
                 <NavLink to="/">Home</NavLink>
              </li>
              <li>
                 <NavLink to="/StudyPlan">Study Plan</NavLink>
              </li>
           </ul>
        </nav>
     );
}