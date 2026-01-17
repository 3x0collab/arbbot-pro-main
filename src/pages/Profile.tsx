import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Copy, Users, BarChart3, Send } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { LandingNav } from '@/components/landing/LandingNav';
import { toast } from 'sonner';
import { useState } from 'react';

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'settings'>('account');

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

  const referralLink = `https://arbbotpro.com/r/E3mnixuD`;
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--grid-line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--grid-line))_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === 'account' ? 'default' : 'outline'}
            onClick={() => setActiveTab('account')}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Account
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Button>
        </div>

        {activeTab === 'account' && (
          <div className="space-y-6">
            {/* Account Info Card */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{userName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Subscription Plans</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">P2P plan</p>
                      <p className="font-medium text-foreground">-</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">DEX/CEX plan</p>
                      <p className="font-medium text-foreground">-</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">ULTIMATE plan</p>
                      <p className="font-medium text-foreground">-</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Program Card */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Referral link:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 rounded-lg bg-muted/50 font-mono text-sm truncate">
                        {referralLink}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyReferralLink}
                        className="shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">% of reward</p>
                      <p className="font-medium text-primary">10-50%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Count of referrals</p>
                      <p className="font-medium">0 pcs.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Statistics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Telegram News Card */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Arbbot Pro News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Subscribe to our Telegram news channel to stay up to date with important news and notifications about new useful features.
                </p>
                <Button 
                  asChild 
                  className="w-full sm:w-auto"
                >
                  <a 
                    href="https://example.com/telegram/demo_channel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings options coming soon.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
