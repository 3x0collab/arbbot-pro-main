import { Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Arbbot Pro</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              API Documentation
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Status
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Telegram Community
            </a>
          </nav>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Arbbot Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
