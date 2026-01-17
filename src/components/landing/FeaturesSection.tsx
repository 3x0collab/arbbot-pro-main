import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeftRight, Building2, BookOpen, BarChart3, Star, Globe } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Funding Arbitrage',
    description: 'Funding rate scanner for cryptocurrency arbitrage in futures markets.',
  },
  {
    icon: ArrowLeftRight,
    title: 'DEX/CEX Arbitrage',
    description: 'Arbitration between DEX and CEX exchanges with checking the possibility of deposit/withdrawal and comparison of order books.',
  },
  {
    icon: Building2,
    title: 'CEX/CEX Arbitrage',
    description: 'Inter-exchange arbitrage without bank cards with verification of deposit/withdrawal possibilities.',
  },
  {
    icon: BookOpen,
    title: 'Order Books',
    description: 'A professional Order Book constructor allows you to quickly analyze market depth and find arbitrage opportunities.',
  },
  {
    icon: BarChart3,
    title: 'Market Spreads',
    description: 'Opportunity to quickly check spreads on various exchanges.',
  },
  {
    icon: Star,
    title: 'Platform Ratings',
    description: 'Unique rating of trading platforms with detailed data.',
  },
  {
    icon: Globe,
    title: 'International Spreads',
    description: 'Analytics of arbitrage between countries. Search for profitable countries and directions for arbitrage.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Every Trader</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our comprehensive suite of arbitrage tools designed to maximize your trading profits.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
      </div>
    </section>
  );
};
