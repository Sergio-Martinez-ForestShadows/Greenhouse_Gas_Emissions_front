import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">
              GHG Analytics
            </h1>
            <p className="text-xs text-muted-foreground">Emissions Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
