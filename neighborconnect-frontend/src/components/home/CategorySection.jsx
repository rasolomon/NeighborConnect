import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const rootDirectory = '../../assets/images/';

    // UseEffect 1:  when the component loads, fetch the businesses from your backend.
    useEffect(() => {
        loadCategories();
    }, []);


    // Refresh Categories
    const loadCategories = () => {
        fetch("http://localhost:8080/categories")
            .then(response => response.json())
            .then(data => setCategories(data));
    };
    // Show Category Modal (This will eventually be Category.jsx)
    const handleShowBusinessesInCategory = (category) => {
        // Use this to call React Router - in Content.jsx layout section!
        navigate(`/categories/${category.id}`);
    };

    return (
        <section className="container my-4">
            <h3 className="mb-4">Browse All Categories</h3>

            <div className="row g-4">
                {categories.map((category) => (
                    <div className="col-md-4" key={category.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title"><img src={`/images/${category.icon}.png`} className="category-icon" alt={category.name} />{category.name}</h5>
                                <p className="card-text">
                                    {category.message}
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