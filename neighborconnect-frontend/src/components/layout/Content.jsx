import { Routes, Route } from 'react-router-dom';
import Users from "../Users";
import Businesses from "../Businesses";
import Business from "../Business";
import Offers from "../Offers";
import HomePage from '../../pages/HomePage';
import BusinessList from '../BusinessList';

export default function Content() {
    return (
        <main className="content">
            <Routes>
                {/* Home Page */}
                <Route path="/" element={<HomePage />} />

                {/* Category page */}
                <Route path="/categories/:categoryId" element={<BusinessList />}></Route>

                {/* Admin pages */}
                <Route path="/users" element={<Users />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/businesses/:id" element={<Business />} />
                <Route path="/offers" element={<Offers />} />
            </Routes>
        </main>
    );
}