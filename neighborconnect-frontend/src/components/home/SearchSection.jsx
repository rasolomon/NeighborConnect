import popular from '../../assets/images/popular.png';
import homeServices from '../../assets/images/home_services.png';
import family from '../../assets/images/family.png';
import health from '../../assets/images/health.png';
import jobs from '../../assets/images/jobs.png';

export default function SearchSection() {
    return (
        <section>
            <div className='searchArea'>
                <h1>NeighborConnect</h1>
                <h2>Building Stronger Communities</h2>
                <h3>Who can help you today?</h3>
                <input size="70" /><p />
            </div>
            <center>
                <img src={popular} className="category-icon" alt="Popular" />Popular:<br />
                <img src={homeServices} className="category-icon" alt="Home Services" />Home Services
                <img src={family} className="category-icon" alt="Family" />Family
                <img src={health} className="category-icon" alt="Health" />Health
                <img src={jobs} className="category-icon" alt="Jobs" />Jobs<p />
            <button>Browse Businesses</button> <button>Browse Offers</button>
            </center>

        </section>
    );
}