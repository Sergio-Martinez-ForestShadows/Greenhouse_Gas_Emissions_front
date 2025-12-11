import { useEmissions } from '@/hooks/useEmissions';
import { Header } from '@/components/emissions/Header';
import { StatCard } from '@/components/emissions/StatCard';
import { FilterBar } from '@/components/emissions/FilterBar';
import { EmissionsChart } from '@/components/emissions/EmissionsChart';
import { DataTable } from '@/components/emissions/DataTable';
import { LoadingState } from '@/components/emissions/LoadingState';
import { ErrorState } from '@/components/emissions/ErrorState';
import { Activity, TrendingDown, Database, Layers } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const queryClient = useQueryClient();
  const {
    emissions,
    aggregatedData,
    statistics,
    filterOptions,
    filters,
    updateFilter,
    clearFilters,
    isLoading,
    error,
  } = useEmissions();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        error={error as Error}
        onRetry={() => queryClient.invalidateQueries({ queryKey: ['emissions'] })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Greenhouse Gas
            <span className="text-gradient-gold"> Emissions</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Track and analyze annual greenhouse gas emissions data across countries, 
            activities, and emission types.
          </p>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Emissions"
              value={`${statistics.totalEmissions.toFixed(1)} Mt`}
              subtitle="Metric tonnes"
              icon={Activity}
              className="animate-fade-in"
              style={{ animationDelay: '0ms' } as React.CSSProperties}
            />
            <StatCard
              title="Average per Record"
              value={`${statistics.avgEmissions.toFixed(2)} Mt`}
              subtitle="Per data point"
              icon={Layers}
              className="animate-fade-in"
              style={{ animationDelay: '100ms' } as React.CSSProperties}
            />
            <StatCard
              title="YoY Change"
              value={`${statistics.yoyChange >= 0 ? '+' : ''}${statistics.yoyChange.toFixed(1)}%`}
              subtitle="Year over year"
              icon={TrendingDown}
              trend={statistics.yoyChange}
              className="animate-fade-in"
              style={{ animationDelay: '200ms' } as React.CSSProperties}
            />
            <StatCard
              title="Data Points"
              value={statistics.recordCount}
              subtitle="Filtered records"
              icon={Database}
              className="animate-fade-in"
              style={{ animationDelay: '300ms' } as React.CSSProperties}
            />
          </div>
        )}

        {/* Filter Bar */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <FilterBar
            filters={filters}
            options={filterOptions}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Chart Section with Tabs */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <Tabs defaultValue="total" className="w-full">
            <TabsList className="mb-4 bg-secondary">
              <TabsTrigger value="total">Total Emissions</TabsTrigger>
              <TabsTrigger value="byType">By Emission Type</TabsTrigger>
            </TabsList>
            <TabsContent value="total">
              <EmissionsChart data={aggregatedData} showByType={false} />
            </TabsContent>
            <TabsContent value="byType">
              <EmissionsChart data={aggregatedData} showByType={true} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Data Table */}
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <DataTable data={emissions} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>GHG Analytics Dashboard • Data visualization for greenhouse gas emissions</p>
          <p className="mt-2">
            Developed by <span className="font-medium text-primary">Sergio Martinez</span> • Senior Full Stack Developer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
