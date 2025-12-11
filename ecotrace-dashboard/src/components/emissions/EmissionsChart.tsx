import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { AggregatedEmission } from '@/types/emissions';

interface EmissionsChartProps {
  data: AggregatedEmission[];
  showByType?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm">
        <p className="mb-2 font-display text-lg font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.value.toFixed(2)} Mt
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function EmissionsChart({ data, showByType = false }: EmissionsChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-border bg-card">
        <p className="text-muted-foreground">No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 font-display text-xl font-semibold text-foreground">
        Emissions Over Time
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        {showByType ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(43, 74%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(43, 74%, 53%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorN2O" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCH4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
            <XAxis
              dataKey="year"
              stroke="hsl(0, 0%, 60%)"
              tick={{ fill: 'hsl(0, 0%, 60%)' }}
            />
            <YAxis
              stroke="hsl(0, 0%, 60%)"
              tick={{ fill: 'hsl(0, 0%, 60%)' }}
              tickFormatter={(value) => `${value} Mt`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-foreground">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="byType.CO2"
              name="CO₂"
              stroke="hsl(43, 74%, 53%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCO2)"
            />
            <Area
              type="monotone"
              dataKey="byType.N2O"
              name="N₂O"
              stroke="hsl(160, 60%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorN2O)"
            />
            <Area
              type="monotone"
              dataKey="byType.CH4"
              name="CH₄"
              stroke="hsl(200, 70%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCH4)"
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(40, 70%, 40%)" />
                <stop offset="50%" stopColor="hsl(43, 74%, 53%)" />
                <stop offset="100%" stopColor="hsl(45, 80%, 65%)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
            <XAxis
              dataKey="year"
              stroke="hsl(0, 0%, 60%)"
              tick={{ fill: 'hsl(0, 0%, 60%)' }}
            />
            <YAxis
              stroke="hsl(0, 0%, 60%)"
              tick={{ fill: 'hsl(0, 0%, 60%)' }}
              tickFormatter={(value) => `${value} Mt`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-foreground">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Emissions"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: 'hsl(43, 74%, 53%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(45, 80%, 65%)', stroke: 'hsl(43, 74%, 53%)' }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
