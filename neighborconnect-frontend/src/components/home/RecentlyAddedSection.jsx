import star from '../../assets/images/star.png'; 

export default function RecentlyAddedSection() {
    return (
        <section>
            <h3>Recently Added</h3>
            <ul className="category-list">
                <li><img src={star} className="category-icon" alt="Star" /> Chani Rosenblatt Babysitting Service</li>
                <li><img src={star} className="category-icon" alt="Star" /> Number One Repairs, LLC Plumbing</li>
                <li><img src={star} className="category-icon" alt="Star" /> New Java Programming Opportunity for updating Seven Mile Market's Website!</li>
                <li><img src={star} className="category-icon" alt="Star" /> Faige Kramer Tutoring Services for Bais Yaakov students</li>
            </ul>
        </section>
    );
}