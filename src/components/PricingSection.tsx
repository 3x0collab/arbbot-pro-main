import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Observer',
    price: 'Free',
    period: '',
    description: 'Get started with basic market insights',
    features: ['15 min delay on data', 'Top 5 pairs only', 'Basic dashboard access', 'Community support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Arbitrageur',
    price: '$29',
    period: '/mo',
    description: 'Full access for serious traders',
    features: [
      'Real-time data feed',
      'CSV Export',
      'Full API Access',
      'All 26+ exchanges',
      'Custom alerts',
      'Priority support',
    ],
    cta: 'Go Pro',
    popular: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export const PricingSection = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-8 md:grid-cols-2 md:gap-6 lg:gap-8"
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.name}
          variants={itemVariants}
          className={`relative overflow-hidden rounded-lg border bg-card p-6 lg:p-8 ${
            plan.popular ? 'border-primary' : 'border-border'
          }`}
        >
          {plan.popular && (
            <div className="absolute right-0 top-0">
              <div className="bg-primary px-3 py-1 text-[10px] font-semibold uppercase text-primary-foreground">
                Popular
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>

          <ul className="mb-8 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className={`w-full ${
              plan.popular
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border border-border bg-secondary text-foreground hover:bg-muted'
            }`}
          >
            {plan.cta}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};
