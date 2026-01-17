export const LiveWidget = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Live Market Widget</h2>
        <span className="text-xs text-muted-foreground">Powered by Loris Tools</span>
      </div>
      
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <iframe
          src="https://loris.tools/embed?exchanges=binance%2Cbybit%2Cokx&interval=8h&theme=dark"
          style={{ width: '100%', height: 'calc(100vh - 200px)', border: 'none' }}
          title="Loris Market Widget"
        />
      </div>
    </div>
  );
};
