
import CategorySection from '../components/home/CategorySection';
import SearchSection from '../components/home/SearchSection';
import TrustedBusinessesSection from '../components/home/TrustedBusinessesSection';
import CommunityStandardsSection from '../components/home/CommunityStandardsSection';
import RecentlyAddedSection from '../components/home/RecentlyAddedSection';

export default function HomePage() {
    return (
        <>
            <SearchSection />
            <CategorySection />
            <TrustedBusinessesSection />
            <RecentlyAddedSection />
            <CommunityStandardsSection />
        </>
    );
}