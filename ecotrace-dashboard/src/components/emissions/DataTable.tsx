import { EmissionRecord } from '@/types/emissions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps {
  data: EmissionRecord[];
}

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-border bg-card">
        <p className="text-muted-foreground">No records match the current filters</p>
      </div>
    );
  }

  // Show most recent first and limit to 50 rows
  const sortedData = [...data]
    .sort((a, b) => b.year - a.year)
    .slice(0, 50);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Emission Records
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Showing {sortedData.length} of {data.length} records
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Year</TableHead>
              <TableHead className="text-muted-foreground">Country</TableHead>
              <TableHead className="text-muted-foreground">Activity</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-right text-muted-foreground">Emissions (Mt)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((record, index) => (
              <TableRow
                key={`${record.year}-${record.country}-${record.activity}-${record.emission_type}-${index}`}
                className="border-border transition-colors hover:bg-primary/5"
              >
                <TableCell className="font-medium text-foreground">{record.year}</TableCell>
                <TableCell className="text-foreground">{record.country}</TableCell>
                <TableCell className="text-foreground">{record.activity}</TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {record.emission_type === 'CO2' ? 'CO₂' : record.emission_type === 'N2O' ? 'N₂O' : 'CH₄'}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-foreground">
                  {record.emissions.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
