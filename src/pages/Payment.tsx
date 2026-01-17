import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  planName?: string;
  price?: number;
}

const paymentMethods = [
  { value: 'usdt-bsc', label: 'USDT BSC', network: 'BNB Smart Chain (BEP20)', asset: 'USDT' },
  { value: 'usdt-trc20', label: 'USDT TRC20', network: 'Tron (TRC20)', asset: 'USDT' },
  { value: 'sol', label: 'Solana (SOL)', network: 'Solana', asset: 'SOL' },
  { value: 'btc', label: 'Bitcoin (BTC)', network: 'Bitcoin', asset: 'BTC' },
  { value: 'eth', label: 'Ethereum (ETH)', network: 'Ethereum', asset: 'ETH' },
];

const periodPrices: Record<string, { price: number; label: string }> = {
  '1': { price: 99, label: '1 Month' },
  '3': { price: 267, label: '3 Month' },
  '6': { price: 474, label: '6 Month' },
  '12': { price: 828, label: '12 Month' },
};

const Payment = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  const [planName, setPlanName] = useState(state?.planName || 'Standard');
  const [basePrice, setBasePrice] = useState(state?.price || 99);
  const [period, setPeriod] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('usdt-bsc');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Update prices based on selected plan's base price
  const periodMultipliers: Record<string, { multiplier: number; label: string }> = {
    '1': { multiplier: 1, label: '1 Month' },
    '3': { multiplier: 2.7, label: '3 Month' },
    '6': { multiplier: 4.8, label: '6 Month' },
    '12': { multiplier: 8.4, label: '12 Month' },
  };

  useEffect(() => {
    if (state?.planName) setPlanName(state.planName);
    if (state?.price) setBasePrice(state.price);
  }, [state]);

  const selectedMethod = paymentMethods.find((m) => m.value === paymentMethod);
  const subtotal = Math.round(basePrice * periodMultipliers[period].multiplier * 100) / 100;
  const total = subtotal - discount;
  const totalInCrypto = total.toFixed(5);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleProceed = () => {
    navigate('/invoice', {
      state: {
        plan: planName,
        period: periodMultipliers[period].label,
        amount: total,
        method: selectedMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Arbbot Pro</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Payment Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Payment details</h1>
              <p className="text-muted-foreground">Complete your subscription</p>
            </div>

            {/* Plan Name */}
            <div className="bg-card border border-border rounded-xl p-6">
              <Label className="text-sm text-muted-foreground">Selected Plan</Label>
              <p className="text-xl font-semibold mt-1">{planName}</p>
              <p className="text-sm text-muted-foreground mt-1">${basePrice}/month base price</p>
            </div>

            {/* Plan Period */}
            <div className="bg-card border border-border rounded-xl p-6">
              <Label className="mb-4 block">Plan Period</Label>
              <RadioGroup value={period} onValueChange={setPeriod} className="grid grid-cols-2 gap-4">
                {Object.entries(periodMultipliers).map(([key, { label }]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={`period-${key}`} />
                    <Label htmlFor={`period-${key}`} className="cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="bg-card border border-border rounded-xl p-6">
              <Label className="mb-2 block">Payment Method</Label>
              <p className="text-sm text-muted-foreground mb-4">
                We accept payments in cryptocurrency only.
              </p>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full bg-input border-border">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-primary/30 rounded-xl p-8 shadow-[0_0_40px_-12px_hsl(var(--primary))]">
              <h2 className="text-2xl font-bold mb-6">Order summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t border-border">
                  <Label className="mb-2 block text-sm">Discount Promocode</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-input border-border"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleApplyPromo}
                      className="shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-primary">
                  <span>Total in {selectedMethod?.asset}</span>
                  <span className="font-semibold">
                    {totalInCrypto} {selectedMethod?.asset}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleProceed}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
              >
                Proceed To Payment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
