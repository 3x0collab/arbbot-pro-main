import { motion } from 'framer-motion';

const opportunities = [
  {
    asset: 'BTC',
    buyExchange: 'Binance',
    buyPrice: '43,256.80',
    sellExchange: 'Bybit',
    sellPrice: '43,412.50',
    profit: '+0.36%',
  },
  {
    asset: 'ETH',
    buyExchange: 'OKX',
    buyPrice: '2,284.15',
    sellExchange: 'Hyperliquid',
    sellPrice: '2,298.42',
    profit: '+0.62%',
  },
  {
    asset: 'SOL',
    buyExchange: 'dYdX',
    buyPrice: '98.45',
    sellExchange: 'Binance',
    sellPrice: '99.28',
    profit: '+0.84%',
  },
  {
    asset: 'ARB',
    buyExchange: 'Bybit',
    buyPrice: '1.142',
    sellExchange: 'OKX',
    sellPrice: '1.156',
    profit: '+1.22%',
  },
  {
    asset: 'AVAX',
    buyExchange: 'Hyperliquid',
    buyPrice: '35.82',
    sellExchange: 'dYdX',
    sellPrice: '36.15',
    profit: '+0.92%',
  },
];

const exchangeColors: Record<string, string> = {
  Binance: 'bg-yellow-500/20 text-yellow-400',
  Bybit: 'bg-orange-500/20 text-orange-400',
  OKX: 'bg-blue-500/20 text-blue-400',
  Hyperliquid: 'bg-cyan-500/20 text-cyan-400',
  dYdX: 'bg-purple-500/20 text-purple-400',
};

export const LivePreviewTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-lg border border-border bg-card"
    >
      {/* Live indicator */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
        <span className="text-xs text-success">LIVE</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-table-header">
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Asset
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Buy At
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Sell At
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Profit %
              </th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp, index) => (
              <tr
                key={opp.asset}
                className={`border-b border-border transition-colors hover:bg-table-row-hover ${
                  index % 2 === 1 ? 'bg-table-row-alt' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">{opp.asset}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${exchangeColors[opp.buyExchange]}`}>
                      {opp.buyExchange}
                    </span>
                    <span className="text-sm text-foreground">${opp.buyPrice}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${exchangeColors[opp.sellExchange]}`}>
                      {opp.sellExchange}
                    </span>
                    <span className="text-sm text-foreground">${opp.sellPrice}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-semibold text-success">{opp.profit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
