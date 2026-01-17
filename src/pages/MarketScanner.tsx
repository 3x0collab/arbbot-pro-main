import { Header } from '@/components/Header';
import { ExternalLink, Info } from 'lucide-react';

const MarketScanner = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Market Scanner</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time funding rates visualization powered by Loris Tools
            </p>
          </div>
          <a 
            href="https://loris.tools" 
            target="_blank" 
            rel="noopener noreferrer"
            className="export-btn flex items-center gap-1.5"
          >
            <ExternalLink className="w-3 h-3" />
            Open Full View
          </a>
        </div>

        {/* Info Banner */}
        <div className="mb-4 px-3 py-2 bg-secondary/50 border border-border rounded flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p>This embedded scanner shows funding rates from Binance, Bybit, and OKX with 8-hour intervals.</p>
            <p className="mt-1">Click on any row to see detailed historical data and trends.</p>
          </div>
        </div>

        {/* Embed Container */}
        <div className="flex-1 min-h-[800px] border border-border rounded-lg overflow-hidden bg-card">
          <iframe
            src="https://loris.tools/embed?exchanges=binance%2Cbybit%2Cokx&interval=8h&theme=dark&font=system&fontSize=14"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ 
              border: '1px solid hsl(var(--border))', 
              borderRadius: '8px', 
              minHeight: '800px',
              background: 'hsl(var(--card))'
            }}
            title="Loris Tools Market Scanner"
            loading="lazy"
          />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Data provided by Loris Tools • Updates every 5 minutes</span>
          <a 
            href="https://loris.tools" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            loris.tools
          </a>
        </div>
      </main>
    </div>
  );
};

export default MarketScanner;
