import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function BusinessList() {
    const { categoryId } = useParams();
    const [businesses, setBusinesses] = useState([]);

    // UseEffect:  when the component loads, fetch the businesses from your backend.
    useEffect(() => {
        loadBusinesses();
    }, []);

    // Refresh Categories
    const loadBusinesses = () => {
        fetch(`http://localhost:8080/categories/${categoryId}/businesses`)
            .then(response => response.json())
            .then(data => setBusinesses(data));
    };
    return (
        <section className="container my-4">
            <div className="row g-4">
                {businesses.map((business) => (
                    <div className="col-md-4" key={business.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{business.name}</h5>
                                <p className="card-text">
                                    {business.message}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleShowBusinessesInCategory(category)}
                                >
                                    Browse
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}