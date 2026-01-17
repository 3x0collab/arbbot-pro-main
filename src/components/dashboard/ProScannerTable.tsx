import { useState } from 'react';
import { useLorisData, ProcessedArbitrageData } from '@/hooks/useLorisData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Copy, RefreshCw, Filter, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const exchangeLogos: Record<string, string> = {
  binance: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=029',
  bybit: 'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  okx: 'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png',
  deribit: 'https://assets.coingecko.com/markets/images/9/small/deribit.png',
  bitget: 'https://assets.coingecko.com/markets/images/540/small/2023-07-25_21.47.43.jpg',
};

export const ProScannerTable = () => {
  const { data, isLoading, lastFetch, refetch } = useLorisData(true);
  const [minSpread, setMinSpread] = useState('');
  const { toast } = useToast();

  const filteredData = minSpread
    ? data.filter((row) => row.netSpread * 100 >= parseFloat(minSpread))
    : data;

  const exportCSV = () => {
    const headers = ['Symbol', 'Long Exchange', 'Long Rate %', 'Short Exchange', 'Short Rate %', 'Spread %', 'APY %', 'Daily Profit %'];
    const rows = filteredData.map((row) => [
      row.symbol,
      row.longExchange,
      (row.longRate * 100).toFixed(4),
      row.shortExchange,
      (row.shortRate * 100).toFixed(4),
      (row.netSpread * 100).toFixed(4),
      row.annualizedReturn.toFixed(2),
      row.dailyProfit.toFixed(4),
    ]);
    
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arbbot-pro-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: 'CSV Exported',
      description: `${filteredData.length} rows exported successfully.`,
    });
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
    toast({
      title: 'JSON Copied',
      description: 'Data copied to clipboard.',
    });
  };

  const getRankBadge = (label: 'High' | 'Mid' | 'Low') => {
    const classes = {
      High: 'rank-badge rank-high',
      Mid: 'rank-badge rank-mid',
      Low: 'rank-badge rank-low',
    };
    return <span className={classes[label]}>{label}</span>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Min spread %"
            value={minSpread}
            onChange={(e) => setMinSpread(e.target.value)}
            className="w-32 h-8 text-sm bg-input border-border"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={refetch} className="h-8">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="h-8">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={copyJSON} className="h-8">
            <Copy className="w-4 h-4 mr-2" />
            Copy JSON
          </Button>
        </div>
        
        {lastFetch && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="live-dot" />
            <span>Updated {lastFetch.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Data Grid */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="bg-table-header border-b border-border">
                <th className="text-left px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Asset</th>
                <th className="text-left px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">OI Rank</th>
                <th className="text-left px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Long Exchange</th>
                <th className="text-left px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Short Exchange</th>
                <th className="text-right px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Spread</th>
                <th className="text-right px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">APY</th>
                <th className="text-right px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Daily Profit</th>
                <th className="text-center px-3 py-2 text-[11px] uppercase text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => {
                const isHighSpread = row.netSpread * 100 > 0.5;
                
                return (
                  <tr
                    key={row.symbol}
                    className={`border-b border-border hover:bg-table-row-hover transition-colors ${
                      index % 2 === 1 ? 'bg-table-row-alt' : ''
                    }`}
                  >
                    <td className="px-3 py-2">
                      <span className="font-semibold text-foreground text-sm">{row.symbol}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">#{row.oiRank}</span>
                        {getRankBadge(row.oiRankLabel)}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={exchangeLogos[row.longExchange] || '/placeholder.svg'}
                          alt={row.longExchange}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="capitalize text-xs">{row.longExchange}</span>
                        <span className="text-destructive text-xs font-mono">
                          {(row.longRate * 100).toFixed(3)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={exchangeLogos[row.shortExchange] || '/placeholder.svg'}
                          alt={row.shortExchange}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="capitalize text-xs">{row.shortExchange}</span>
                        <span className="text-success text-xs font-mono">
                          +{(row.shortRate * 100).toFixed(3)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span
                        className={`font-mono font-semibold text-sm ${
                          isHighSpread ? 'text-warning animate-pulse' : 'text-primary'
                        }`}
                      >
                        {(row.netSpread * 100).toFixed(3)}%
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="font-mono text-xs text-foreground">
                        {row.annualizedReturn.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="font-mono text-xs text-muted-foreground">
                        ${(row.dailyProfit * 1000).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button size="sm" className="analyze-btn h-6 text-[10px]">
                        Analyze
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredData.length} of {data.length} pairs • Data refreshes every 60 seconds
      </div>
    </div>
  );
};
