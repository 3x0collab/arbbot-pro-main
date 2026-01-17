import { Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/Month',
    description: 'Simple and free tools',
    features: [
      'Markets & currencies',
      'Prices & spreads',
      'Calculators & converters',
      'Bank exchange rates',
    ],
    cta: 'Start Free',
    highlighted: false,
    sale: null,
  },
  {
    name: 'Standard',
    price: '$99',
    period: '/Month',
    description: 'For Market analytics and arbitrage',
    features: [
      'Improved statistics',
      'Order book constructor',
      'Taker signals',
      'SWIFT Transfer Analysis',
    ],
    cta: 'Get Started',
    highlighted: false,
    sale: null,
  },
  {
    name: 'DEX/CEX + Funding',
    price: '$99.5',
    period: '/Month',
    description: 'For CEX, DEX and Funding',
    features: [
      'Funding arbitrage',
      'USD Stables Arbitrage',
      'Telegram notifications',
    ],
    cta: 'Get Started',
    highlighted: true,
    sale: { text: '-50%', timer: 'Only 24 min 39 sec left!' },
  },
  {
    name: 'Ultimate',
    price: '$198.5',
    period: '/Month',
    description: 'VIP access to all instruments without restrictions',
    features: [
      'All Funding tools',
      'All DEX tools',
      'All CEX tools',
      'All Market tools',
    ],
    cta: 'Go Ultimate',
    highlighted: false,
    sale: { text: '-33%', timer: 'Only 24 min 39 sec left!' },
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlanClick = (plan: typeof plans[0]) => {
    const planData = {
      planName: plan.name,
      price: parseFloat(plan.price.replace('$', '')),
    };
    
    if (user) {
      navigate('/payment', { state: planData });
    } else {
      navigate('/login', { state: { redirectTo: '/payment', planData } });
    }
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">Choose the plan that fits your trading style</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 ${
                plan.highlighted
                  ? 'border-primary bg-primary/5 shadow-[0_0_40px_-12px_hsl(var(--primary))]'
                  : 'border-border bg-card'
              }`}
            >
              {plan.sale && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Sale! {plan.sale.text}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
                
                {plan.sale && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                    <Clock className="w-3 h-3" />
                    <span>{plan.sale.timer}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-primary' : 'text-success'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanClick(plan)}
                className={`w-full ${
                  plan.highlighted
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-secondary hover:bg-muted text-foreground'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
