import { useState, useMemo } from 'react';
import { useFundingData, ProcessedArbitrageData } from '@/hooks/useFundingData';
import { Download, Copy, RefreshCw, TrendingUp, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const formatRate = (rate: number): string => {
  const prefix = rate >= 0 ? '+' : '';
  return `${prefix}${rate.toFixed(4)}%`;
};

const formatExchange = (exchange: string): string => {
  return exchange.charAt(0).toUpperCase() + exchange.slice(1);
};

const getTimeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
};

interface TableRowProps {
  item: ProcessedArbitrageData;
  index: number;
  onAnalyze: (symbol: string) => void;
}

const TableRow = ({ item, index, onAnalyze }: TableRowProps) => {
  const [timeSince, setTimeSince] = useState(getTimeSince(item.lastUpdated));

  // Update time every second
  useMemo(() => {
    const interval = setInterval(() => {
      setTimeSince(getTimeSince(item.lastUpdated));
    }, 1000);
    return () => clearInterval(interval);
  }, [item.lastUpdated]);

  const isAlt = index % 2 === 1;

  return (
    <tr className={`data-grid-row ${isAlt ? 'data-grid-row-alt' : ''}`}>
      {/* Asset */}
      <td className="data-grid-cell font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-foreground">{item.symbol}</span>
          <span className={`rank-badge ${
            item.oiRankLabel === 'High' ? 'rank-high' : 
            item.oiRankLabel === 'Mid' ? 'rank-mid' : 'rank-low'
          }`}>
            #{item.oiRank}
          </span>
        </div>
      </td>

      {/* Long Exchange */}
      <td className="data-grid-cell">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[10px]">{formatExchange(item.longExchange)}</span>
          <span className={item.longRate >= 0 ? 'text-rate-positive' : 'text-rate-negative'}>
            {formatRate(item.longRate)}
          </span>
        </div>
      </td>

      {/* Short Exchange */}
      <td className="data-grid-cell">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[10px]">{formatExchange(item.shortExchange)}</span>
          <span className={item.shortRate >= 0 ? 'text-rate-positive' : 'text-rate-negative'}>
            {formatRate(item.shortRate)}
          </span>
        </div>
      </td>

      {/* Net Spread */}
      <td className="data-grid-cell">
        <span className="neon-gold font-bold">{formatRate(item.netSpread)}</span>
      </td>

      {/* Annualized Return */}
      <td className="data-grid-cell">
        <span className="text-success font-medium">{item.annualizedReturn.toFixed(2)}%</span>
      </td>

      {/* Daily Profit */}
      <td className="data-grid-cell">
        <span className="text-foreground">{item.dailyProfit.toFixed(4)}%</span>
      </td>

      {/* OI Rank */}
      <td className="data-grid-cell">
        <span className={`rank-badge ${
          item.oiRankLabel === 'High' ? 'rank-high' : 
          item.oiRankLabel === 'Mid' ? 'rank-mid' : 'rank-low'
        }`}>
          {item.oiRankLabel}
        </span>
      </td>

      {/* Opportunity Age */}
      <td className="data-grid-cell text-muted-foreground">
        {timeSince}
      </td>

      {/* Action */}
      <td className="data-grid-cell">
        <button 
          className="analyze-btn"
          onClick={() => onAnalyze(item.symbol)}
        >
          Analyze
        </button>
      </td>

      {/* Status */}
      <td className="data-grid-cell">
        <div className="flex items-center justify-center">
          <div className="live-dot" title="Live" />
        </div>
      </td>
    </tr>
  );
};

export const ProScannerTable = () => {
  const { data, isLoading, error, lastFetch, refetch } = useFundingData(60000);

  const handleAnalyze = (symbol: string) => {
    toast({
      title: `Analyzing ${symbol}`,
      description: `Opening detailed analysis for ${symbol} arbitrage opportunity.`,
    });
  };

  const exportToCSV = () => {
    const headers = ['Symbol', 'Long Exchange', 'Long Rate', 'Short Exchange', 'Short Rate', 'Net Spread', 'APY'];
    const rows = data.map(item => [
      item.symbol,
      formatExchange(item.longExchange),
      formatRate(item.longRate),
      formatExchange(item.shortExchange),
      formatRate(item.shortRate),
      formatRate(item.netSpread),
      `${item.annualizedReturn.toFixed(2)}%`
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `arbbot-scan-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: 'CSV Downloaded',
      description: `Exported ${data.length} arbitrage opportunities.`,
    });
  };

  const copyJSON = () => {
    const exportData = data.map(item => ({
      symbol: item.symbol,
      long: { exchange: item.longExchange, rate: item.longRate },
      short: { exchange: item.shortExchange, rate: item.shortRate },
      spread: item.netSpread,
      apy: item.annualizedReturn,
      oiRank: item.oiRank
    }));

    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    
    toast({
      title: 'JSON Copied',
      description: 'Raw data copied to clipboard.',
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Funding Rate Arbitrage Scanner</h2>
          <div className="flex items-center gap-1.5 ml-2">
            <div className="live-dot" />
            <span className="text-[10px] uppercase text-success font-medium">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {lastFetch ? `Updated: ${getTimeSince(lastFetch)}` : 'Loading...'}
          </span>
          <button 
            onClick={refetch}
            className="export-btn flex items-center gap-1.5"
            disabled={isLoading}
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">Export Data:</span>
        <button onClick={exportToCSV} className="export-btn flex items-center gap-1.5">
          <Download className="w-3 h-3" />
          Download CSV
        </button>
        <button onClick={copyJSON} className="export-btn flex items-center gap-1.5">
          <Copy className="w-3 h-3" />
          Copy JSON
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3 h-3" />
          <span>{data.length} opportunities found</span>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 px-3 py-2 bg-warning/10 border border-warning/30 rounded text-xs text-warning">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="data-grid rounded-md overflow-hidden scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="data-grid-header">
              <th className="data-grid-cell text-left">Asset</th>
              <th className="data-grid-cell text-left">Long (Buy)</th>
              <th className="data-grid-cell text-left">Short (Sell)</th>
              <th className="data-grid-cell text-left">Net Spread</th>
              <th className="data-grid-cell text-left">APY</th>
              <th className="data-grid-cell text-left">Daily %</th>
              <th className="data-grid-cell text-left">OI Rank</th>
              <th className="data-grid-cell text-left">Age</th>
              <th className="data-grid-cell text-center">Action</th>
              <th className="data-grid-cell text-center w-12">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="data-grid-row">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j} className="data-grid-cell">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              data.map((item, index) => (
                <TableRow 
                  key={item.symbol} 
                  item={item} 
                  index={index}
                  onAnalyze={handleAnalyze}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 px-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Data refreshes every 60 seconds • Spread = Short Rate - Long Rate</span>
        <span>APY = Spread × 3 × 365 (3 funding payments/day)</span>
      </div>
    </div>
  );
};
