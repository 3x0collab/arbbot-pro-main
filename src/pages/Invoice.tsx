import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Copy, Check, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const WALLET_ADDRESS = '0x5f34b457B116113B3FFd2D52DAf8bD8C07CB452b';

interface InvoiceData {
  id: string;
  status: 'pending' | 'paid' | 'declined';
}

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [status, setStatus] = useState<'pending' | 'paid' | 'declined'>('pending');

  const { plan, period, amount, method } = location.state || {
    plan: 'Standard',
    period: '1 Month',
    amount: 99,
    method: { label: 'USDT BSC', network: 'BNB Smart Chain (BEP20)', asset: 'USDT' },
  };

  // Create invoice on mount
  useEffect(() => {
    const createInvoice = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          user_email: user.email || '',
          plan_name: plan,
          period: period,
          amount: amount,
          crypto_amount: `${amount} ${method?.asset}`,
          payment_method: method?.label || 'USDT BSC',
          network: method?.network || 'BNB Smart Chain (BEP20)',
          asset: method?.asset || 'USDT',
          wallet_address: WALLET_ADDRESS,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating invoice:', error);
      } else if (data) {
        setInvoiceId(data.id);
      }
    };

    createInvoice();
  }, [user, plan, period, amount, method]);

  // Listen for real-time status updates
  useEffect(() => {
    if (!invoiceId) return;

    const channel = supabase
      .channel(`invoice-${invoiceId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'invoices',
          filter: `id=eq.${invoiceId}`,
        },
        (payload) => {
          const newStatus = (payload.new as InvoiceData).status;
          setStatus(newStatus);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [invoiceId]);

  const copyToClipboard = async (text: string, type: 'address' | 'amount') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
      toast({
        title: 'Copied!',
        description: `${type === 'address' ? 'Wallet address' : 'Amount'} copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = async () => {
    if (invoiceId) {
      await supabase.from('invoices').delete().eq('id', invoiceId);
    }
    navigate('/payment');
  };

  // Success State
  if (status === 'paid') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-card border border-success/30 rounded-xl p-8 shadow-[0_0_60px_-12px_hsl(var(--success))] text-center">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Payment Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your {plan} plan is now active for {period}.
            </p>
            
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-success hover:bg-success/90 text-success-foreground py-6"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Declined State
  if (status === 'declined') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-card border border-destructive/30 rounded-xl p-8 shadow-[0_0_60px_-12px_hsl(var(--destructive))] text-center">
            <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Payment Declined</h1>
            <p className="text-muted-foreground mb-8">
              Please check your transaction or contact support.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/payment')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full border-border py-6"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pending State (Default)
  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Arbbot Pro</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Invoice</h1>
          <p className="text-muted-foreground">
            {plan} for {period}
          </p>
        </div>

        {/* Transfer Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">Transfer Details</h2>

          <div className="space-y-5">
            {/* Wallet Address */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Make a transfer to:
              </Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-sm font-mono break-all">
                  {WALLET_ADDRESS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(WALLET_ADDRESS, 'address')}
                  className="shrink-0"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Amount:</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-input border border-border rounded-lg px-4 py-3">
                  <span className="text-lg font-semibold">
                    {amount} {method?.asset}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`${amount}`, 'amount')}
                  className="shrink-0"
                >
                  {copiedAmount ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Network */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Network:</Label>
              <div className="bg-input border border-border rounded-lg px-4 py-3">
                <span className="font-medium">{method?.network}</span>
              </div>
            </div>

            {/* Asset */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Asset for transfer:
              </Label>
              <div className="bg-input border border-border rounded-lg px-4 py-3">
                <span className="font-medium">{method?.asset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-card border border-primary/30 rounded-xl p-6 shadow-[0_0_40px_-12px_hsl(var(--primary))]">
          <h2 className="text-lg font-semibold mb-6">Payment verification:</h2>

          <div className="flex flex-col items-center text-center py-8">
            {/* Spinning Loader */}
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
              <Loader2 className="absolute inset-0 w-16 h-16 text-primary animate-spin" />
            </div>

            <p className="text-lg font-medium mb-2">We are checking your payment...</p>
            <p className="text-sm text-muted-foreground">
              Current status:{' '}
              <span className="text-warning">no transactions found...</span>
            </p>
          </div>
        </div>

        {/* Cancel Link */}
        <div className="text-center mt-8">
          <button
            onClick={handleCancel}
            className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium"
          >
            Cancel invoice
          </button>
        </div>
      </main>
    </div>
  );
};

// Label component for this page
const Label = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-sm font-medium ${className}`}>{children}</span>
);

export default Invoice;
