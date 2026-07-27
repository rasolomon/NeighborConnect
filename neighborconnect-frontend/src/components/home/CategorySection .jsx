import homeServices from '../../assets/images/home_services.png'; 
import family from '../../assets/images/family.png';
import food from '../../assets/images/food.png'; 
import automotive from '../../assets/images/auto.png'; 
import health from '../../assets/images/health.png'; 
import jobs from '../../assets/images/jobs.png'; 
import technology from '../../assets/images/technology.png'; 
import professionalServices from '../../assets/images/professional_services.png'; 
import community from '../../assets/images/community.png'; 

export default function CategorySection() {
    return (
        <section>
            <h3>Browse All Categories</h3>
            <ul className="category-list">
                <li><img src={homeServices} className="category-icon" alt="Home Services" /> Home Services</li>
                <li><img src={family} className="category-icon" alt="Family" /> Family</li>
                <li><img src={food} className="category-icon" alt="Food" /> Food</li>
                <li><img src={automotive} className="category-icon" alt="Automotive" /> Automotive</li>
                <li><img src={health} className="category-icon" alt="Health" /> Health</li>
                <li><img src={community} className="category-icon" alt="Community" /> Community</li>
                <li><img src={jobs} className="category-icon" alt="Jobs" /> Jobs</li>
                <li><img src={technology} className="category-icon" alt="Technology" /> Technology</li>
                <li><img src={professionalServices} className="category-icon" alt="Professional Services" /> Professional Services</li>
            </ul>
        </section>
    );
}