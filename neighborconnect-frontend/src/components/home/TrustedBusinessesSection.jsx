import { useEffect, useState } from "react";
import BusinessModal from "../../components/BusinessModal";


export default function TrustedBusinessesSection() {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // UseEffect 1:  when the component loads, fetch the businesses from your backend.
    useEffect(() => {
        loadBusinesses();
    }, []);

    // UseEffect 2:  when the modal is open, listen for the keyboard and respond to Escape.
    useEffect(() => {
        if (!showModal) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowModal(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal]);

    // Refresh Businesses
    const loadBusinesses = () => {
        fetch("http://localhost:8080/businesses")
            .then(response => response.json())
            .then(data => setBusinesses(data));
    };

    // Show Business Modal (This will be Business.jsx)
    const handleShowBusiness = (business) => {
        setSelectedBusiness(business);
        setShowModal(true);
    };

    return (
        <section>
            <h3 className="mb-4">Trusted Businesses</h3>
            <div className="row g-4">
                {businesses.map((business) => (
                    <div className="col-md-4" key={business.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{business.name}</h5>
                                <p className="card-text">
                                    {business.description}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleShowBusiness(business)}
                                >
                                    View Business
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedBusiness && (
                <BusinessModal
                    business={selectedBusiness}
                    onClose={() => setShowModal(false)}
                />
            )}

        </section>
    );
}