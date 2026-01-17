import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LandingNav } from '@/components/landing/LandingNav';

const Calculators = () => {
  // Calculator 1: Percentage Difference
  const [buyPrice, setBuyPrice] = useState<string>('100');
  const [sellPrice, setSellPrice] = useState<string>('100.96');

  // Calculator 2: Percentage Increase
  const [baseNumber, setBaseNumber] = useState<string>('1000');
  const [increasePercent, setIncreasePercent] = useState<string>('5');

  // Calculator 1 Result
  const percentDifference = useMemo(() => {
    const num1 = parseFloat(buyPrice) || 0;
    const num2 = parseFloat(sellPrice) || 0;
    if (num1 === 0) return 0;
    return ((num2 - num1) / num1) * 100;
  }, [buyPrice, sellPrice]);

  // Calculator 2 Result
  const increasedValue = useMemo(() => {
    const base = parseFloat(baseNumber) || 0;
    const percent = parseFloat(increasePercent) || 0;
    return base * (1 + percent / 100);
  }, [baseNumber, increasePercent]);

  // Dynamic Table Data
  const tableData = useMemo(() => {
    const base = parseFloat(baseNumber) || 0;
    const upside = [];
    const downside = [];

    for (let i = 10; i >= 1; i--) {
      upside.push({
        percent: i,
        value: (base * (1 + i / 100)).toFixed(2),
      });
    }

    for (let i = 1; i <= 10; i++) {
      downside.push({
        percent: i,
        value: (base * (1 - i / 100)).toFixed(2),
      });
    }

    return { upside, downside };
  }, [baseNumber]);

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      {/* Header Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calculator className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Earn Money on Funding Arbitrage
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Maximize your profits with expert funding arbitrage strategies!
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/#pricing">
              Explore Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Calculator 1: Percentage Difference */}
            <Card className="border-border/50 bg-card shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Percentage Difference
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Calculate the profit/loss percentage between buy and sell prices
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">Buy Price</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      step="any"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">Sell Price</Label>
                    <Input
                      id="sellPrice"
                      type="number"
                      step="any"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      placeholder="100.96"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Result</p>
                    <p
                      className={`text-3xl font-bold ${
                        percentDifference >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {percentDifference >= 0 ? '+' : ''}
                      {percentDifference.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculator 2: Percentage Increase */}
            <Card className="border-border/50 bg-card shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="h-5 w-5 text-primary" />
                  Percentage Increase
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Calculate a value after applying a percentage increase
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseNumber">Base Number</Label>
                    <Input
                      id="baseNumber"
                      type="number"
                      step="any"
                      value={baseNumber}
                      onChange={(e) => setBaseNumber(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="increasePercent">Increase by %</Label>
                    <Input
                      id="increasePercent"
                      type="number"
                      step="any"
                      value={increasePercent}
                      onChange={(e) => setIncreasePercent(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Result</p>
                    <p className="text-3xl font-bold text-primary">
                      {increasedValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic Reference Table */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Percentages of a Number
              </h2>
              <p className="text-muted-foreground">
                Real-time calculation of potential price movements for{' '}
                <span className="font-semibold text-primary">
                  {parseFloat(baseNumber) || 0}
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Upside Column */}
              <Card className="border-border/50 bg-card shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-500">
                    <TrendingUp className="h-5 w-5" />
                    Upside (Profit)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tableData.upside.map((row) => (
                      <div
                        key={`up-${row.percent}`}
                        className="flex justify-between items-center py-2 px-3 rounded-md bg-green-500/5 border border-green-500/20"
                      >
                        <span className="text-green-500 font-medium">
                          +{row.percent}%
                        </span>
                        <span className="font-mono text-foreground">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Downside Column */}
              <Card className="border-border/50 bg-card shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-red-500">
                    <TrendingDown className="h-5 w-5" />
                    Downside (Loss)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tableData.downside.map((row) => (
                      <div
                        key={`down-${row.percent}`}
                        className="flex justify-between items-center py-2 px-3 rounded-md bg-red-500/5 border border-red-500/20"
                      >
                        <span className="text-red-500 font-medium">
                          -{row.percent}%
                        </span>
                        <span className="font-mono text-foreground">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Access our professional arbitrage scanners and start capitalizing on market inefficiencies today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/#pricing">View Pricing Plans</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/futures">Learn About Funding</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;
