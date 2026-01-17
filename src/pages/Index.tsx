import { motion } from 'framer-motion';
import { Activity, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TickerTape } from '@/components/TickerTape';
import { LivePreviewTable } from '@/components/LivePreviewTable';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid pattern overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--grid-line) / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--grid-line) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Arbbot Pro</span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a href="#features" className="transition-colors hover:text-foreground">Features</a>
              <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
              <a href="#" className="transition-colors hover:text-foreground">Docs</a>
            </nav>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Launch App
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Live Scanning 26+ Exchanges</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              The #1 Funding Rate{' '}
              <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>
                Arbitrage Scanner
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Scrape real-time opportunities from 26+ exchanges. Spot triangular arbitrage and funding discrepancies instantly.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                <Play className="mr-2 h-4 w-4" />
                View Live Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Ticker Tape */}
        <TickerTape />

        {/* Live Preview Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">Live Market Opportunities</h2>
            <p className="text-muted-foreground">Real-time arbitrage spreads across major exchanges</p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <LivePreviewTable />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">Built for Serious Traders</h2>
            <p className="text-muted-foreground">Professional-grade tools for institutional-level arbitrage</p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <FeaturesGrid />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready</p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <PricingSection />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
