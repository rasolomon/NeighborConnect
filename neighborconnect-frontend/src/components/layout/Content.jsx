import { Routes, Route } from 'react-router-dom';
import Users from "../Users";
import Businesses from "../Businesses";
import Business from "../Business";
import Offers from "../Offers";
import HomePage from '../../pages/HomePage';

export default function Content() {
    return (
        <main className="content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/businesses/:id" element={<Business />} />
                <Route path="/offers" element={<Offers />} />
            </Routes>
        </main>
    );
}