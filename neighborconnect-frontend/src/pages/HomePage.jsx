import CategorySection from '../components/home/CategorySection ';
import RecentlyAddedSection from '../components/home/RecentlyAddedSection';
import ReferralSection from '../components/home/ReferralSection';
import SearchSection from '../components/home/SearchSection';
import TestimonialSection from '../components/home/CommunityStandardsSection';
import CommunityStandardsSection from '../components/home/CommunityStandardsSection';
import TrustedBusinessesSection from '../components/home/TrustedBusinessesSection';

export default function HomePage() {
    return (
        <>
            <SearchSection />
            <CategorySection />
            <TrustedBusinessesSection />
            <RecentlyAddedSection />
            <ReferralSection />
            <CommunityStandardsSection />
        </>
    );
}