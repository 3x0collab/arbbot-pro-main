import { Link } from 'react-router-dom';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  BarChart3, 
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const exchanges = [
  'Binance Futures', 'OKX Futures', 'Bybit Futures', 'BingX Futures',
  'Bitget Futures', 'KuCoin Futures', 'Gate.io Futures', 'HTX Futures',
  'MEXC Futures', 'Deribit Futures', 'BitMEX Futures', 'WhiteBIT Futures',
  'CoinEx Futures', 'Poloniex Futures', 'XT.COM Futures', 'LBank Futures',
  'BitMart Futures'
];

const faqBasics = [
  {
    question: "What is the funding rate?",
    answer: "A funding rate is a periodic payment used in perpetual futures contracts to keep their price closely aligned with the spot price of the underlying asset. Since perpetual futures have no expiration date, funding rates help balance the price difference ('spread') between spot and futures prices."
  },
  {
    question: "Who pays the funding rate, and who receives it?",
    answer: "If Positive: LONG (buy) pays SHORT (sell). If Negative: SHORT (sell) pays LONG (buy)."
  },
  {
    question: "How often is the funding rate settled?",
    answer: "Most commonly every 8 hours. Some exchanges settle every 4 hours, 2 hours, or 1 hour."
  },
  {
    question: "How long before settlement do I need to open a trade?",
    answer: "You only need a position open even one minute before the designated funding settlement time to receive the payment. Arbbot Pro alerts can remind you 15-30 minutes before settlement."
  }
];

const faqStrategy = [
  {
    question: "What does 'Long' and 'Short' mean?",
    answer: "LONG: Buying a contract expecting the price to rise. SHORT: Selling a contract expecting the price to fall. By holding both simultaneously on different exchanges, you neutralize price movement risk."
  },
  {
    question: "What strategies can I use?",
    answer: "Long-term: Holding positions for days/weeks while spreads remain profitable. Short-term: Opening positions 5-15 minutes before settlement to collect the fee, then closing immediately after."
  },
  {
    question: "Can I get liquidated doing funding arbitrage?",
    answer: "Liquidation won't occur if you constantly monitor positions. For example, at X3 leverage, liquidation happens at ±33% price movement. If one side is losing, the other is winning. To manage risk, simply transfer profits from the winning exchange to the losing exchange to rebalance your margin."
  }
];

const faqRisk = [
  {
    question: "What leverage should I choose?",
    answer: "X1 (No Leverage): Recommended for beginners. High safety. X3 (Recommended): Comfortable balance. Price must move ~33% before liquidation issues arise. X5-X10 (Medium Risk): Requires constant monitoring. Used for short-term capture. Above X10 (High Risk): Not recommended for this strategy unless highly experienced."
  },
  {
    question: "How much capital do I need to earn $100 per day?",
    answer: "Earnings depend on capital size and leverage. Example: With $2,000 capital ($1,000 per exchange) and a 1% daily funding rate: X1 Leverage = $20/day profit. X5 Leverage = $100/day profit. X10 Leverage = $200/day profit. Note: Higher leverage increases liquidation risk."
  },
  {
    question: "What guidelines should I follow to trade safely?",
    answer: "Check Liquidity: Ensure there is enough market volume to open positions on both exchanges instantly. Check Position Limits: Ensure both exchanges allow the size of the trade you want to place. Limit Orders: Use Limit orders 90% of the time to avoid slippage. Set Alerts: Use Arbbot Pro Telegram alerts for price swings and spread closures."
  },
  {
    question: "How should beginners start?",
    answer: "Start small. We recommend a deposit of no more than $200 total ($100 per exchange) using X1 leverage. Trade consistently for one week to learn the interfaces and mechanics before increasing capital or leverage."
  }
];

export default function Futures() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Crypto Funding Rate{' '}
              <span className="text-primary">Arbitrage Scanner</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover profitable crypto arbitrage opportunities with our advanced funding rate scanner. 
              Track and analyze cryptocurrency futures market funding rates effortlessly.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Crypto funding rate arbitrage is an exciting and lucrative strategy gaining popularity among traders. 
              The Arbbot Pro tool allows you to monitor and analyze funding rates from over{' '}
              <span className="text-primary font-semibold">15+ major crypto exchanges</span> to capitalize on market inefficiencies.
            </p>
            <div className="pt-4">
              <Button size="lg" className="gap-2">
                <Play className="w-4 h-4" />
                Watch Video Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          {/* What is Funding Rate */}
          <Card className="mb-8 border-border/50">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">What is a Funding Rate?</h3>
              <p className="text-muted-foreground">
                A funding rate is a recurring payment exchanged between traders holding Long and Short positions 
                in perpetual futures contracts. This mechanism ensures the futures price stays aligned with the 
                underlying spot price.
              </p>
            </CardContent>
          </Card>

          {/* How Payments Work */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <h4 className="font-semibold">Positive Rates (+)</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  The futures price is higher than the spot price.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-destructive/20 text-destructive font-medium">LONG</span>
                  <span className="text-muted-foreground">pays</span>
                  <span className="px-2 py-1 rounded bg-success/20 text-success font-medium">SHORT</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                  <h4 className="font-semibold">Negative Rates (-)</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  The futures price is lower than the spot price.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-success/20 text-success font-medium">SHORT</span>
                  <span className="text-muted-foreground">pays</span>
                  <span className="px-2 py-1 rounded bg-destructive/20 text-destructive font-medium">LONG</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How to Earn */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                How to Earn Profit
              </h3>
              <p className="text-muted-foreground mb-6">
                The Arbbot Pro scanner tracks funding rate spreads 24/7. By opening opposite positions 
                (one Long, one Short) on different exchanges, you can earn passive income with minimal risk.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Reduced Risk</p>
                    <p className="text-xs text-muted-foreground">Delta Neutral strategy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Potential Returns</p>
                    <p className="text-xs text-muted-foreground">+10.1% in 7 days (unleveraged)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our tool simplifies and automates the research and detection of profitable arbitrage opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Historical Funding Data</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize market trends with clear charts and tables segmented by time intervals. 
                  Compare spreads over time to make data-driven decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss a profitable interval. Get alerted via Telegram minutes before funding 
                  payments occur to adjust your positions instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Volatility & Spread Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor asset price swings and funding spread changes in real-time. 
                  Receive immediate alerts if a spread turns unfavorable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Exchanges */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Supported Exchanges</h2>
          <p className="text-muted-foreground mb-8">
            We track data across <span className="text-primary font-semibold">17+ top liquidity providers</span> in the market
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {exchanges.map((exchange) => (
              <span 
                key={exchange}
                className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium hover:border-primary/50 transition-colors"
              >
                {exchange}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Access Required</h2>
              <p className="text-muted-foreground mb-6">
                To access the Futures Funding Scanner functionality, you need to subscribe to a DEX/CEX plan.
              </p>
              <Button asChild size="lg">
                <Link to="/payment">Upgrade Plan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          {/* Basics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-primary">Basics</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqBasics.map((faq, index) => (
                <AccordionItem key={index} value={`basics-${index}`} className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Strategy */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-primary">Strategy</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqStrategy.map((faq, index) => (
                <AccordionItem key={index} value={`strategy-${index}`} className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Risk Management */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Risk Management</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqRisk.map((faq, index) => (
                <AccordionItem key={index} value={`risk-${index}`} className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
