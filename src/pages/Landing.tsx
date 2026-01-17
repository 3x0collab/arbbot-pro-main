import { LandingNav } from '@/components/landing/LandingNav';
import { HeroSection } from '@/components/landing/HeroSection';
import { LiveTicker } from '@/components/landing/LiveTicker';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TeaserTable } from '@/components/landing/TeaserTable';
import { PricingSection } from '@/components/landing/PricingSection';
import { LandingFooter } from '@/components/landing/LandingFooter';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <LiveTicker />
      <FeaturesSection />
      <TeaserTable />
      <PricingSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
