import { useEffect, useState } from "react";

function OffersPage() {

    const [offers, setOffers] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [businessId, setBusinessId] = useState("");
    const [errors, setErrors] = useState({});
    const [deleteError, setDeleteError] = useState("");
    const [businesses, setBusinesses] = useState([]);

    // UseEffect
    useEffect(() => {
        loadBusinesses();
        loadOffers();
    }, []);

    // Refresh Offers
    const loadOffers = () => {
        fetch("http://localhost:8080/offers")
            .then(response => response.json())
            .then(data => setOffers(data));
    };

    // Refresh Businesses
    const loadBusinesses = async () => {
        const response = await fetch("http://localhost:8080/businesses");
        const data = await response.json();
        setBusinesses(data);
    };

    // Delete a Offer
    const deleteOffer = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/offers/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setDeleteError("");
            } else {
                const errorMessage = await response.text();
                setDeleteError(errorMessage);
            }
        } catch (err) {
            setDeleteError("Unable to connect to the server.");
            console.error(err);
        }
        loadOffers();
    };

    //Add New Offer:
    const handleSubmit = async () => {
        const newOffer = {
            title,
            businessId
        };
        const newErrors = {};

        if (!newOffer.title.trim()) {
            newErrors.title = "Offer title is required.";
        }

        if (!newOffer.businessId) {
            newErrors.businessId = "Please select a business.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            const response = await fetch("http://localhost:8080/offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newOffer)
            });

            if (response.ok) {
                setTitle("");
                setBusinessId("");
                loadOffers();
            } else {
                const errorData = await response.json();
                console.log(errorData);
                setErrors(errorData);
            }
        } catch (err) {
            console.error(err);
            setErrors({ server: "Unable to connect to the server." });
        }
    };

    //Edit Offer:
    const editOffer = (offer) => {
        console.log("Business ==> " + offer.business.id);

        setEditingId(offer.id);
        setTitle(offer.title);
        setBusinessId(offer.business.id);
    };

    //Update Offer:
    const saveOffer = async () => {
        if (editingId) {
            await handleUpdateSubmit(editingId);
        } else {
            await handleSubmit();
        }
    };

    const handleUpdateSubmit = async (id) => {
        const updatedOffer = {
            title,
            businessId
        };
        const newErrors = {};

        if (!updatedOffer.title.trim()) {
            newErrors.title = "Offer title is required.";
        }

        if (!updatedOffer.businessId) {
            newErrors.businessId = "Please select a business.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            const response = await fetch(`http://localhost:8080/offers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedOffer)
            });

            console.log(response);
            if (response.ok) {
                loadOffers();
                setEditingId(null);
                setTitle("");
                setBusinessId("");
            } else {
                const errorData = await response.json();
                console.log(errorData);
                setErrors(errorData);
            }
        } catch (err) {
            console.error(err);
            setErrors({ server: "Unable to connect to the server." });
        }
    };

    // JSX Section:
    return (
        <div>
            <h2>Offers</h2>
            {deleteError && (
                <div className="text-danger mb-3">
                    {deleteError}
                </div>
            )}

            <select
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
            >
                <option value="">Select Business</option>

                {businesses.map(user =>
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                )}
            </select>
            {errors.businessId && (<div className="text-danger">{errors.businessId}</div>)}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            {errors.title && (<div className="text-danger">{errors.title}</div>)}
            <button onClick={saveOffer}>
                {editingId ? "Update Offer" : "Add Offer"}
            </button>

            {
                // Display Offers
            }
            <ul>
                {offers.map(offer =>
                    <li key={offer.id}>
                        Title = {offer.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Business = {offer.business.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteOffer(offer.id)}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => editOffer(offer)}>Update</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default OffersPage;