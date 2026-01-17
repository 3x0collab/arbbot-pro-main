import { motion } from 'framer-motion';
import { Download, Globe, Bell } from 'lucide-react';

const features = [
  {
    icon: Download,
    title: 'API & CSV Export',
    description: 'Download full market depth instantly. Compatible with Python/Node.js bots.',
  },
  {
    icon: Globe,
    title: '26+ Exchanges',
    description: 'Binance, Bybit, OKX, and extensive DEX coverage including Hyperliquid and dYdX.',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Zero latency updates. Get notified the second a spread crosses your threshold.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesGrid = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-6 md:grid-cols-3"
    >
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={itemVariants}
          className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            
            <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
