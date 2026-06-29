import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <Header />

            <div className="main-layout">
                <Sidebar />
                <Content />
            </div>

            <Footer />
        </div>
    );
}