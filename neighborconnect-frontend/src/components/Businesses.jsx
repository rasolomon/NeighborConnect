import Offers from "./Offers";

import { useEffect, useState } from "react";

function BusinessesPage() {

    const [businesses, setBusinesses] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [users, setUsers] = useState([]);

    const [ownerId, setOwnerId] = useState("");
    const [errors, setErrors] = useState({});

    // UseEffect
    useEffect(() => {
        loadUsers();
        loadBusinesses();
    }, []);

    // Refresh Businesses
    const loadBusinesses = () => {
        fetch("http://localhost:8080/businesses")
            .then(response => response.json())
            .then(data => setBusinesses(data));
    };

    // Refresh Users
    const loadUsers = async () => {
        const response = await fetch("http://localhost:8080/users");
        const data = await response.json();
        setUsers(data);
    };

    // Delete a Business
    const deleteBusiness = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/businesses/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setDeleteError("");
                loadBusinesses();
            } else {
                const errorMessage = await response.text();
                setDeleteError(errorMessage);

            }
        } catch (err) {
            setDeleteError("Unable to connect to the server.");
            console.error(err);
        }
    };

    //Add New Business:
    const handleSubmit = async () => {
        const newBusiness = {
            name,
            email,
            ownerId
        };
        const newErrors = {};

        if (!newBusiness.name.trim()) {
            newErrors.name = "Business name is required.";
        }
        if (!newBusiness.email.trim()) {
            newErrors.email = "Business email is required.";
        }
        if (!newBusiness.ownerId) {
            newErrors.ownerId = "Please select an owner.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            const response = await fetch("http://localhost:8080/businesses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBusiness)
            });

            if (response.ok) {
                setName("");
                setEmail("");
                setOwnerId("");
                loadBusinesses();
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

    //Edit Business:
    const editBusiness = (business) => {
        console.log("Owner ==> " + business.owner.id);

        setEditingId(business.id);
        setName(business.name);
        setEmail(business.email);
        setOwnerId(business.owner.id);
    };

    //Update Business:
    const saveBusiness = async () => {
        if (editingId) {
            await handleUpdateSubmit(editingId);
        } else {
            await handleSubmit();
        }
    };

    const handleUpdateSubmit = async (id) => {
        const updatedBusiness = {
            name,
            email,
            ownerId
        };
        const newErrors = {};

        if (!updatedBusiness.name.trim()) {
            newErrors.name = "Business name is required.";
        }
        if (!updatedBusiness.email.trim()) {
            newErrors.email = "Business email is required.";
        }
        if (!updatedBusiness.ownerId) {
            newErrors.ownerId = "Please select an owner.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            const response = await fetch(`http://localhost:8080/businesses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBusiness)
            });

            if (response.ok) {
                loadBusinesses();
                setEditingId(null);
                setName("");
                setEmail("");
                setOwnerId("");
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
            <h2>Businesses</h2>
            {deleteError && (
                <div className="text-danger mb-3">
                    {deleteError}
                </div>
            )}

            <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
            >
                <option value="">Select Owner</option>

                {users.map(user =>
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                )}
            </select>
            {errors.ownerId && (<div className="text-danger">{errors.ownerId}</div>)}
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            {errors.name && (<div className="text-danger">{errors.name}</div>)}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            {errors.email && (<div className="text-danger">{errors.email}</div>)}
            <button onClick={saveBusiness}>
                {editingId ? "Update Business" : "Add Business"}
            </button>

            {
                // Display Businesses
            }
            <ul>
                {businesses.map(business =>
                    <li key={business.id}>
                        Name = {business.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Email = {business.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Owner = {business.owner.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteBusiness(business.id)}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => editBusiness(business)}>Update</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default BusinessesPage;