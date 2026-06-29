import { Routes, Route } from 'react-router-dom';
import Users from "../Users";
import Businesses from "../Businesses";
import Offers from "../Offers";

export default function Content() {
    return (
        <main className="content">
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/offers" element={<Offers />} />
            </Routes>
        </main>
    );
}