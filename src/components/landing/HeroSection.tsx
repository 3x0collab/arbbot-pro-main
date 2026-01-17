import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartFree = () => {
    if (user) {
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Trusted by 70,000+ traders</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">The best tools to make money</span>
          <br />
          <span className="text-primary">with arbitrage</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Arbbot Pro is a leading analytical platform for crypto arbitrage traders, offering powerful tools for identifying market inefficiencies and profitable spreads on Spot, CEX, DEX, and Futures markets, with 24/7 monitoring of thousands of assets.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={handleStartFree}
            size="lg" 
            className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start For Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border-border hover:bg-muted">
            <a href="#features">Explore Now</a>
          </Button>
        </div>
        
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Experienced arbitrageur or beginner trader? Arbbot Pro offers a wide range of tools suitable for users with different experience. Try something new or use our services to increase your profits!
        </p>
      </div>
    </section>
  );
};
