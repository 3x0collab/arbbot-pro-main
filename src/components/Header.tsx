import { NavLink } from '@/components/NavLink';
import { Zap, BarChart3, Radio } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary">Arb</span>
              <span className="text-foreground">bot</span>
              <span className="text-muted-foreground ml-1 text-sm font-normal">Pro</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <NavLink 
              to="/" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded"
              activeClassName="bg-secondary text-foreground"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Pro Scanner
            </NavLink>
            <NavLink 
              to="/market-scanner" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded"
              activeClassName="bg-secondary text-foreground"
            >
              <Radio className="w-3.5 h-3.5" />
              Market Scanner
            </NavLink>
          </nav>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] uppercase text-success font-medium">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
