import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { emissionsService } from '@/services/emissionsService';
import { EmissionFilters, EmissionType } from '@/types/emissions';

export function useEmissions() {
  const [filters, setFilters] = useState<EmissionFilters>({
    country: null,
    emissionType: null,
    activity: null,
  });

  const { data: emissions, isLoading, error } = useQuery({
    queryKey: ['emissions'],
    queryFn: () => emissionsService.fetchEmissions(),
  });

  const filteredData = useMemo(() => {
    if (!emissions || !Array.isArray(emissions)) return [];
    return emissionsService.filterEmissions(emissions, filters);
  }, [emissions, filters]);

  const aggregatedData = useMemo(() => {
    return emissionsService.aggregateByYear(filteredData);
  }, [filteredData]);

  const statistics = useMemo(() => {
    if (!emissions) return null;
    const totalEmissions = emissionsService.calculateTotalEmissions(filteredData);
    const avgEmissions = emissionsService.calculateAverageEmissions(filteredData);
    const yoyChange = emissionsService.calculateYearOverYearChange(aggregatedData);
    const recordCount = filteredData.length;

    return { totalEmissions, avgEmissions, yoyChange, recordCount };
  }, [emissions, filteredData, aggregatedData]);

  const filterOptions = useMemo(() => {
    if (!emissions || !Array.isArray(emissions)) return { countries: [], activities: [], emissionTypes: [] };
    return {
      countries: emissionsService.getUniqueCountries(emissions),
      activities: emissionsService.getUniqueActivities(emissions),
      emissionTypes: emissionsService.getUniqueEmissionTypes(emissions),
    };
  }, [emissions]);

  const updateFilter = (key: keyof EmissionFilters, value: string | EmissionType | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ country: null, emissionType: null, activity: null });
  };

  return {
    emissions: filteredData,
    aggregatedData,
    statistics,
    filterOptions,
    filters,
    updateFilter,
    clearFilters,
    isLoading,
    error,
  };
}
