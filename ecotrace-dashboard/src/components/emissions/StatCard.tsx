import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { CSSProperties } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  className?: string;
  style?: CSSProperties;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className, style }: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:glow-gold',
        className
      )}
      style={style}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="font-display text-3xl font-semibold text-foreground">
            {typeof value === 'number' ? value.toFixed(2) : value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              trend >= 0 ? 'bg-destructive/10 text-destructive' : 'bg-chart-2/10 text-chart-2'
            )}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
