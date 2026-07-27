import star from '../../assets/images/star.png'; 
import checkmark from '../../assets/images/checkmark.png'; 

export default function TrustedBusinessesSection() {
    return (
        <section>
            <h3>Trusted Businesses</h3>
            <b>David's Plumbing</b><br />
            <ul className="category-list">
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Serving Baltimore since</li>
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Licensed</li>
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Insured</li>
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Community Recommended</li>
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Verified Business</li>
             </ul>
             [Contact Business]

            <p></p>
            <b>Sarah's Tutoring</b><br />
            <ul className="category-list">
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Supporting and Empowering Students since 2024</li>
             <li><img src={checkmark} className="category-icon" alt="Checkmark" /> Community Recommended </li>
             </ul>
             [Contact Business]<br />
        </section>
    );
}