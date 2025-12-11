import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { EmissionFilters, EmissionType } from '@/types/emissions';
import { X, Filter } from 'lucide-react';

interface FilterBarProps {
  filters: EmissionFilters;
  options: {
    countries: string[];
    activities: string[];
    emissionTypes: EmissionType[];
  };
  onFilterChange: (key: keyof EmissionFilters, value: string | EmissionType | null) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, options, onFilterChange, onClearFilters }: FilterBarProps) {
  const hasActiveFilters = filters.country || filters.emissionType || filters.activity;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-semibold text-foreground">Filters</h3>
      </div>
      
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[180px] flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Country
          </label>
          <Select
            value={filters.country || 'all'}
            onValueChange={(value) => onFilterChange('country', value === 'all' ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {options.countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[180px] flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Emission Type
          </label>
          <Select
            value={filters.emissionType || 'all'}
            onValueChange={(value) => onFilterChange('emissionType', value === 'all' ? null : value as EmissionType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {options.emissionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'CO2' ? 'CO₂' : type === 'N2O' ? 'N₂O' : 'CH₄'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[180px] flex-1">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Activity
          </label>
          <Select
            value={filters.activity || 'all'}
            onValueChange={(value) => onFilterChange('activity', value === 'all' ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              {options.activities.map((activity) => (
                <SelectItem key={activity} value={activity}>
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="gap-2 border-border text-muted-foreground hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
