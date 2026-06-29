import Businesses from "./Businesses";

import { useEffect, useState } from "react";

function UsersPage() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [deleteError, setDeleteError] = useState("");

    // UseEffect
    useEffect(() => {
        loadUsers();
    }, []);

    // Refresh Users
    const loadUsers = async () => {
        const response = await fetch("http://localhost:8080/users");
        const data = await response.json();
        setUsers(data);
    };

    // Delete a User
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setDeleteError("");
                loadUsers();
            } else {
                const errorMessage = await response.text();
                setDeleteError(errorMessage);
            }
        } catch (err) {
            setDeleteError("Unable to connect to the server.");
            console.error(err);
        }
    };

    //Add New User:
    const handleSubmit = async () => {
        const newUser = {
            name,
            email
        };
        const newErrors = {};

        if (!newUser.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!newUser.email.trim()) {
            newErrors.email = "Email is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                setName("");
                setEmail("");
                loadUsers();
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

    //Edit User:
    const editUser = (user) => {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
    };

    //Update User:
    const saveUser = async () => {
        if (editingId) {
            await handleUpdateSubmit(editingId);
        } else {
            await handleSubmit();
        }
    };

    const handleUpdateSubmit = async (id) => {
        const updatedUser = {
            name,
            email
        };
        const newErrors = {};

        if (!updatedUser.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!updatedUser.email.trim()) {
            newErrors.email = "Email is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                setName("");
                setEmail("");
                loadUsers();
                setEditingId(null);
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
            <h2>Users</h2>
            {deleteError && (
                <div className="text-danger mb-3">
                    {deleteError}
                </div>
            )}

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
            <button onClick={saveUser}>
                {editingId ? "Update User" : "Add User"}
            </button>

            {
                // Display Users
            }
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        Name = {user.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Email = {user.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteUser(user.id)}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => editUser(user)}>Update</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default UsersPage;