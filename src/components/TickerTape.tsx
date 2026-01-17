import { motion } from 'framer-motion';

const tickerData = [
  { pair: 'BTC/USDT', rate: '+0.04%', positive: true },
  { pair: 'ETH/USDT', rate: '-0.01%', positive: false },
  { pair: 'SOL/USDT', rate: '+0.12%', positive: true },
  { pair: 'ARB/USDT', rate: '+0.08%', positive: true },
  { pair: 'DOGE/USDT', rate: '-0.03%', positive: false },
  { pair: 'AVAX/USDT', rate: '+0.05%', positive: true },
  { pair: 'MATIC/USDT', rate: '+0.02%', positive: true },
  { pair: 'LINK/USDT', rate: '-0.02%', positive: false },
  { pair: 'OP/USDT', rate: '+0.15%', positive: true },
  { pair: 'INJ/USDT', rate: '+0.09%', positive: true },
];

export const TickerTape = () => {
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className="w-full overflow-hidden border-y border-border bg-card/50 py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{item.pair}:</span>
            <span className={item.positive ? 'text-success' : 'text-destructive'}>
              {item.rate}
            </span>
            <span className="text-border">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
