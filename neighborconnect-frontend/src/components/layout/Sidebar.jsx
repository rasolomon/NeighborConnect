import { NavLink } from "react-router-dom";


export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/businesses">Businesses</NavLink></li>
            <li><NavLink to="/offers">Offers</NavLink></li> 
            <hr />
            <li><NavLink to="#">Profile</NavLink></li> 
            <li><NavLink to="#">Logout</NavLink></li>
            </ul> 
        </aside>
    );
}