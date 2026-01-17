import { useLorisData } from '@/hooks/useLorisData';
import { motion } from 'framer-motion';

export const LiveTicker = () => {
  const { data, isLoading } = useLorisData(true); // Use all data for ticker

  if (isLoading) {
    return (
      <div className="bg-card border-y border-border py-3">
        <div className="flex items-center justify-center text-muted-foreground text-sm">
          Loading live data...
        </div>
      </div>
    );
  }

  // Double the data for seamless loop
  const tickerItems = [...data, ...data];

  return (
    <div className="bg-card/50 border-y border-border py-3 overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {tickerItems.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap px-4"
          >
            <span className="font-semibold text-foreground">{item.symbol}</span>
            <span className={`font-mono text-sm ${item.netSpread > 0.05 ? 'text-primary' : 'text-success'}`}>
              +{(item.netSpread * 100).toFixed(3)}%
            </span>
            <span className="text-muted-foreground text-xs">
              ({item.longExchange} → {item.shortExchange})
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
