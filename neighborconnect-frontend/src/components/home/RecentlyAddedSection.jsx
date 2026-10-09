import star from '../../assets/images/star.png';

// TODO:  Get from database and public folder in the future
const recentlyAdded = [
    { name: 'Chani Rosenblatt Babysitting Service', icon: star },
    { name: 'Number One Repairs, LLC Plumbing', icon: star },
    { name: 'New Java Programming Opportunity for updating Seven Mile Market\'s Website!', icon: star },
    { name: 'Faige Kramer Tutoring Services for Bais Yaakov students', icon: star }
];



export default function RecentlyAddedSection() {
    return (
        <section>
            <h3 className="mb-4">Recently Added</h3>
            <div className="row g-4">
                {recentlyAdded.map((item) => (
                    <div className="col-md-4" key={item.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="trust-item">
                                <img src={item.icon} className="item-icon" alt={item.name} />
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}