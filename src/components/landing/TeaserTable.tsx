import { useLorisData } from '@/hooks/useLorisData';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const exchangeLogos: Record<string, string> = {
  binance: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=029',
  bybit: 'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  okx: 'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png',
  deribit: 'https://assets.coingecko.com/markets/images/9/small/deribit.png',
  bitget: 'https://assets.coingecko.com/markets/images/540/small/2023-07-25_21.47.43.jpg',
};

export const TeaserTable = () => {
  const { data, isLoading } = useLorisData(true); // Get all data for teaser
  const { user } = useAuth();
  const isLoggedIn = !!user;

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Loading scanner data...
          </div>
        </div>
      </section>
    );
  }

  const displayData = data.slice(0, 10);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Live Funding Spreads</h2>
          <p className="text-muted-foreground">Real-time arbitrage opportunities across major exchanges</p>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <table className="w-full">
            <thead>
              <tr className="bg-table-header border-b border-border">
                <th className="text-left px-4 py-3 text-xs uppercase text-muted-foreground font-medium">Asset</th>
                <th className="text-left px-4 py-3 text-xs uppercase text-muted-foreground font-medium">Long Exchange</th>
                <th className="text-left px-4 py-3 text-xs uppercase text-muted-foreground font-medium">Short Exchange</th>
                <th className="text-right px-4 py-3 text-xs uppercase text-muted-foreground font-medium">Spread</th>
                <th className="text-right px-4 py-3 text-xs uppercase text-muted-foreground font-medium">APY</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => {
                const isBlurred = !isLoggedIn && index >= 3;
                
                return (
                  <tr
                    key={row.symbol}
                    className={`border-b border-border hover:bg-table-row-hover transition-colors ${
                      index % 2 === 1 ? 'bg-table-row-alt' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-foreground">{row.symbol}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-2 ${isBlurred ? 'blur-sm select-none' : ''}`}>
                        <img
                          src={exchangeLogos[row.longExchange] || '/placeholder.svg'}
                          alt={row.longExchange}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="capitalize text-sm">{row.longExchange}</span>
                        <span className="text-destructive text-xs font-mono">
                          {(row.longRate * 100).toFixed(3)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-2 ${isBlurred ? 'blur-sm select-none' : ''}`}>
                        <img
                          src={exchangeLogos[row.shortExchange] || '/placeholder.svg'}
                          alt={row.shortExchange}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="capitalize text-sm">{row.shortExchange}</span>
                        <span className="text-success text-xs font-mono">
                          +{(row.shortRate * 100).toFixed(3)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-mono font-semibold ${
                        row.netSpread > 0.05 ? 'text-warning' : 'text-primary'
                      }`}>
                        {(row.netSpread * 100).toFixed(3)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm text-muted-foreground">
                        {row.annualizedReturn.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Overlay for blurred rows - only show if not logged in */}
          {!isLoggedIn && (
            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none" />
              <div className="flex flex-col items-center justify-center py-8 relative z-10">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm">Login to view all exchange details</span>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/login">Unlock Full Access</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
