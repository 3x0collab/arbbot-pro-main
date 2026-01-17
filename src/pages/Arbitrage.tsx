import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, BarChart3, DollarSign, Globe, ArrowRight } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";

const Arbitrage = () => {
  const stats = [
    { mode: "One Market (Internal)", taker: "214", maker: "10,634" },
    { mode: "2 Exchanges + Transfer", taker: "18,143", maker: "206,579" },
    { mode: "3 Exchanges + Transfer", taker: "8,179", maker: "121,707" },
    { mode: "4 Exchanges + Transfer", taker: "148,869", maker: "2,701,692" },
  ];

  const strategies = [
    {
      number: "01",
      title: "One Market (Internal Arbitrage)",
      complexity: "Low",
      description: "Search for price discrepancies within a single exchange.",
      bestFor: "Low-liquidity exchanges or highly volatile assets where price inefficiencies exist between pairs on the same platform.",
    },
    {
      number: "02",
      title: "2 Exchanges + Transfer (Classic)",
      complexity: "Medium (Most Popular)",
      description: "Buy on Exchange A ➔ Transfer ➔ Sell on Exchange B.",
      bestFor: "The standard inter-exchange strategy. Capitalize on price differences between two platforms by moving assets to where the price is higher.",
    },
    {
      number: "03",
      title: "3 Exchanges + Transfer",
      complexity: "High",
      description: "Buy on Exchange A ➔ Transfer to Exchange B ➔ Exchange Asset ➔ Sell.",
      bestFor: "For traders seeking complex patterns. This route adds an intermediate exchange step to leverage specific currency pairings or lower transfer fees.",
    },
    {
      number: "04",
      title: "4 Exchanges + Transfer",
      complexity: "Expert",
      description: "Buy on Exchange A ➔ Exchange ➔ Transfer to Exchange B ➔ Exchange ➔ Sell.",
      bestFor: "For fans of complex schemes. This multi-hop strategy connects deeply buried liquidity pools across multiple markets to extract maximum value.",
    },
  ];

  const tier1Exchanges = ["Binance", "Bybit", "OKX", "Coinbase", "Kraken", "KuCoin", "Gate.io", "HTX"];
  const popularExchanges = ["Bitget", "MEXC", "Bitstamp", "Crypto.com", "Gemini", "Poloniex", "WhiteBIT"];
  const regionalExchanges = ["Upbit", "Bithumb", "Coinone", "BtcTurk Pro", "LBank", "CoinEx", "BitMart", "YoBit", "XT.COM"];

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Inter-Exchange Arbitrage Without Banking Cards
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unlock global liquidity. Trade assets across 50+ crypto exchanges with automated analysis of deposit methods, withdrawal fees, and order books—no bank cards required.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/payment">
              Start Arbitrage Scanner <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-muted-foreground text-center mb-12">Why trade inter-exchange arbitrage with our tools?</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Bank Cards Needed</h3>
                <p className="text-sm text-muted-foreground">Pure crypto-to-crypto arbitrage strategies.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Order Book Analysis</h3>
                <p className="text-sm text-muted-foreground">Simultaneous viewing of order books on buy and sell exchanges to verify liquidity depth.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fee Intelligence</h3>
                <p className="text-sm text-muted-foreground">Automated calculation of transfer network fees and deposit/withdrawal status.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Massive Coverage</h3>
                <p className="text-sm text-muted-foreground">Monitor 3,000+ assets across 50+ top cryptocurrency exchanges.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Arbitrage Opportunity Statistics</h2>
          <p className="text-muted-foreground text-center mb-8">
            Current volume of positive spreads detected by our scanner (spreads &gt; 0.01%).
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Strategy Mode</th>
                  <th className="text-right py-4 px-4 text-foreground font-semibold">Taker Opportunities</th>
                  <th className="text-right py-4 px-4 text-foreground font-semibold">Maker Opportunities</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{stat.mode}</td>
                    <td className="py-4 px-4 text-right text-primary font-mono">{stat.taker}</td>
                    <td className="py-4 px-4 text-right text-green-500 font-mono">{stat.maker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center italic">
            Note: These figures represent raw positive spreads excluding trading commissions and specific coin network status checks.
          </p>
        </div>
      </section>

      {/* Trading Strategies */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">4 Trading Strategies</h2>
          <p className="text-muted-foreground text-center mb-12">
            Select the complexity that fits your trading style. All modes support both <strong>Maker</strong> (limit orders) and <strong>Taker</strong> (market orders) strategies.
          </p>
          
          <div className="space-y-6">
            {strategies.map((strategy) => (
              <Card key={strategy.number} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-primary/30">{strategy.number}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{strategy.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {strategy.complexity}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2 font-mono text-sm">{strategy.description}</p>
                      <p className="text-sm text-muted-foreground">{strategy.bestFor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Exchanges */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Supported Markets (40+)</h2>
          <p className="text-muted-foreground text-center mb-12">
            All exchanges feature order book viewing, plus critical analysis of transfer networks and commissions.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tier 1
              </h3>
              <div className="flex flex-wrap gap-2">
                {tier1Exchanges.map((exchange) => (
                  <span key={exchange} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {exchange}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                Popular
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularExchanges.map((exchange) => (
                  <span key={exchange} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                    {exchange}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                Regional & Niche
              </h3>
              <div className="flex flex-wrap gap-2">
                {regionalExchanges.map((exchange) => (
                  <span key={exchange} className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium">
                    {exchange}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Placeholder */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Screenshots</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2 Markets + Transfer Strategy</h3>
              <p className="text-muted-foreground mb-4">Visualizing the spread analysis between two exchanges with transfer fees included.</p>
              <div className="aspect-video bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                <span className="text-muted-foreground">Screenshot placeholder - 2 Markets Dashboard</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1 Market (Internal) & Maker Mode</h3>
              <p className="text-muted-foreground mb-4">Detailed order book analysis for single-exchange opportunities.</p>
              <div className="aspect-video bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                <span className="text-muted-foreground">Screenshot placeholder - Internal Arbitrage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Required CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">DEX/CEX Plan Required</h2>
              <p className="text-muted-foreground mb-6">
                To access the Inter-Exchange Arbitrage Scanner, full order book analysis, and transfer fee intelligence, you must have an active subscription.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/payment">View Pricing Plans</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/futures">Triangular Arbitrage Scanner</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Arbitrage;
