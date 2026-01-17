import { Zap } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Arbbot Pro</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Arbbot Pro is an analytical service for crypto arbitrageurs and traders who are searching for market inefficiencies. Our servers have been operating 24/7 for over three years. Our journey began in 2022.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-center">
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2022-2025 Arbbot Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
