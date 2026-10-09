import Offers from "./Offers";

import { useEffect, useState } from "react";

function BusinessesPage() {

    const [businesses, setBusinesses] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const [ownerId, setOwnerId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [errors, setErrors] = useState({});

    // UseEffect
    useEffect(() => {
        loadUsers();
        loadBusinesses();
        loadCategories();
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

    // Refresh Categories
    const loadCategories = async () => {
        const response = await fetch("http://localhost:8080/categories");
        const data = await response.json();
        setCategories(data);
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
            name, address, city, state, zipCode, phone, email, description, logo, website, ownerId, categoryId
        };
        const newErrors = {};

        // We dont need to error on a blank description:
        if (!newBusiness.name.trim()) {
            newErrors.name = "Business name is required.";
        }
        if (!newBusiness.email.trim()) {
            newErrors.email = "Business email is required.";
        }
        if (!newBusiness.ownerId) {
            newErrors.ownerId = "Please select an owner.";
        }
        if (!newBusiness.categoryId) {
            newErrors.categoryId = "Please select a category.";
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
                setAddress("");
                setCity("");
                setState("");
                setZipCode("");
                setPhone("");
                setEmail("");
                setDescription("");
                setLogo("");
                setOwnerId("");
                setCategoryId("");
                setWebsite("");
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
        setEditingId(business.id);
        setName(business.name);
        setAddress(business.address || "");
        setCity(business.city || "");
        setState(business.state || "");
        setZipCode(business.zipCode || "");
        setPhone(business.phone || "");
        setWebsite(business.website || "");
        setEmail(business.email);
        setDescription(business.description || "");
        setLogo(business.logo || "");
        setOwnerId(business.owner.id);
        setCategoryId(business.category.id);
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
            name, address, city, state, zipCode, phone, email, description, logo, website, ownerId, categoryId
        };
        const newErrors = {};

        // We dont need to error on a blank description:
        if (!updatedBusiness.name.trim()) {
            newErrors.name = "Business name is required.";
        }
        if (!updatedBusiness.email.trim()) {
            newErrors.email = "Business email is required.";
        }
        if (!updatedBusiness.ownerId) {
            newErrors.ownerId = "Please select an owner.";
        }
        if (!updatedBusiness.categoryId) {
            newErrors.categoryId = "Please select an category.";
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
                setAddress("");
                setCity("");
                setState("");
                setZipCode("");
                setPhone("");
                setEmail("");
                setWebsite("");
                setDescription("");
                setLogo("");
                setOwnerId("");
                setCategoryId("");
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

           <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>

                {categories.map(category =>
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                )}
            </select>
            {errors.categoryId && (<div className="text-danger">{errors.categoryId}</div>)}            

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            {errors.name && (<div className="text-danger">{errors.name}</div>)}


            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
            />
            <p></p>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
            />
            <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
            />
            <input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip Code"
            />
            <input
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="Logo"
            />
            <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
            />

            <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
            />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            {errors.email && (<div className="text-danger">{errors.email}</div>)}
            <p>&nbsp;</p>

            <label for="description">Business Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="4" cols="50">
            </textarea>

            <br />

            <button onClick={saveBusiness}>
                {editingId ? "Update Business" : "Add Business"}
            </button>

            {
                // Display Businesses
            }
            <p>&nbsp;</p>
            <h3>List of Businesses:</h3>
            <ul>
                {businesses.map(business =>
                    <li key={business.id}>
                        Name = {business.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Email = {business.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Owner = {business.owner.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Category = {business.category.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="button-row">
                        <button onClick={() => deleteBusiness(business.id)}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => editBusiness(business)}>Update</button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default BusinessesPage;