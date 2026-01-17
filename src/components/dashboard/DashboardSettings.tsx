import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Mail, Calendar } from 'lucide-react';

export const DashboardSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account and subscription</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground uppercase">Email</label>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase">Account Created</label>
            <p className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Subscription
          </CardTitle>
          <CardDescription>Your current plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Pro Plan</span>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Full access to all features and real-time data
              </p>
            </div>
            <span className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
          </div>
          
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Plan Features</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li>✓ 26+ Exchanges</li>
              <li>✓ Real-time Data</li>
              <li>✓ CSV & JSON Export</li>
              <li>✓ Advanced Filters</li>
              <li>✓ API Access</li>
              <li>✓ Priority Support</li>
            </ul>
          </div>

          <Button variant="outline" className="w-full mt-4">
            Manage Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
