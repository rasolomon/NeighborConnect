import { NavLink } from "react-router-dom";
import CategorySection from '../../components/home/CategorySection ';
import RecentlyAddedSection from '../../components/home/RecentlyAddedSection';
import TestimonialSection from '../../components/home/CommunityStandardsSection';
import CommunityStandardsSection from '../../components/home/CommunityStandardsSection';
import TrustedBusinessesSection from '../../components/home/TrustedBusinessesSection';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <CategorySection />
            <TrustedBusinessesSection />
            <RecentlyAddedSection />
            <CommunityStandardsSection />
        
        { /*  This stuff has routing that is implemented in layout/Content.jsx   
            <ul>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/businesses">Businesses</NavLink></li>
            <li><NavLink to="/offers">Offers</NavLink></li> 
            <hr />
            <li><NavLink to="#">Profile</NavLink></li> 
            <li><NavLink to="#">Logout</NavLink></li>
            </ul> 
            */
        }
        </aside>
    );
}