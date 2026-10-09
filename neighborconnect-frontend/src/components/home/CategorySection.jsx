import { useEffect, useState } from "react";

/*
import homeServices from '../../assets/images/home_services.png';
import family from '../../assets/images/family.png';
import food from '../../assets/images/food.png';
import automotive from '../../assets/images/auto.png';
import health from '../../assets/images/health.png';
import community from '../../assets/images/community.png';
import jobs from '../../assets/images/jobs.png';
import technology from '../../assets/images/technology.png';
import professionalServices from '../../assets/images/professional_services.png';
*/
/*
const categories = [
    { name: 'Home Services', icon: homeServices, message: 'Find trusted businesses for your home.' },
    { name: 'Family', icon: family, message: 'Find services and resources for your family.' },
    { name: 'Food', icon: food, message: 'Discover local food, restaurants, and more.' },
    { name: 'Automotive', icon: automotive, message: 'Find reliable automotive services nearby.' },
    { name: 'Health', icon: health, message: 'Find health, wellness, and care services.' },
    { name: 'Community', icon: community, message: 'Connect with businesses and services in your community.' },
    { name: 'Jobs', icon: jobs, message: 'Find local jobs and employment opportunities.' },
    { name: 'Technology', icon: technology, message: 'Find technology services and local experts.' },
    { name: 'Professional Services', icon: professionalServices, message: 'Find trusted professionals for your needs.' }
];
*/

export default function CategorySection() {
    const [categories, setCategories] = useState([]);
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
        setSelectedCategory(category);
        setShowModal(true);
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