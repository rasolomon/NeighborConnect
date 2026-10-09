import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <Header />

            <div className="row">
                <div className="col-3"><Sidebar /></div>
                <div className="col-9"><Content /></div>
            </div>

            <Footer />
        </div>
    );
}