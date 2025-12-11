import { EmissionRecord, EmissionFilters, AggregatedEmission, EmissionType } from '@/types/emissions';

// Map API emission types to our types
const emissionTypeMap: Record<string, EmissionType> = {
  'CO₂': 'CO2',
  'N₂O': 'N2O',
  'CH₄': 'CH4',
  'CO2': 'CO2',
  'N2O': 'N2O',
  'CH4': 'CH4',
};

interface ApiEmissionRecord {
  id: number;
  year: number;
  emissions: string;
  emission_type: string;
  country: string;
  activity: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiEmissionRecord[];
}

class EmissionsService {
  private baseUrl = 'https://greenhouse-gas-emissions-back.onrender.com/api/emissions';

  async fetchEmissions(): Promise<EmissionRecord[]> {
    const response = await fetch(`${this.baseUrl}/`);
    if (!response.ok) {
      throw new Error(`Error fetching emissions: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    
    return data.results.map(record => ({
      year: record.year,
      emissions: parseFloat(record.emissions),
      emission_type: emissionTypeMap[record.emission_type] || 'CO2',
      country: record.country,
      activity: record.activity,
    }));
  }

  filterEmissions(data: EmissionRecord[], filters: EmissionFilters): EmissionRecord[] {
    return data.filter(record => {
      if (filters.country && record.country !== filters.country) return false;
      if (filters.emissionType && record.emission_type !== filters.emissionType) return false;
      if (filters.activity && record.activity !== filters.activity) return false;
      return true;
    });
  }

  aggregateByYear(data: EmissionRecord[]): AggregatedEmission[] {
    const yearMap = new Map<number, AggregatedEmission>();

    data.forEach(record => {
      if (!yearMap.has(record.year)) {
        yearMap.set(record.year, {
          year: record.year,
          total: 0,
          byType: { CO2: 0, N2O: 0, CH4: 0 },
        });
      }
      const entry = yearMap.get(record.year)!;
      entry.total += record.emissions;
      entry.byType[record.emission_type] += record.emissions;
    });

    return Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
  }

  getUniqueCountries(data: EmissionRecord[]): string[] {
    return [...new Set(data.map(r => r.country))].sort();
  }

  getUniqueActivities(data: EmissionRecord[]): string[] {
    return [...new Set(data.map(r => r.activity))].sort();
  }

  getUniqueEmissionTypes(data: EmissionRecord[]): EmissionType[] {
    return [...new Set(data.map(r => r.emission_type))].sort() as EmissionType[];
  }

  calculateTotalEmissions(data: EmissionRecord[]): number {
    return data.reduce((sum, r) => sum + r.emissions, 0);
  }

  calculateAverageEmissions(data: EmissionRecord[]): number {
    if (data.length === 0) return 0;
    return this.calculateTotalEmissions(data) / data.length;
  }

  calculateYearOverYearChange(aggregated: AggregatedEmission[]): number {
    if (aggregated.length < 2) return 0;
    const latest = aggregated[aggregated.length - 1].total;
    const previous = aggregated[aggregated.length - 2].total;
    return ((latest - previous) / previous) * 100;
  }
}

export const emissionsService = new EmissionsService();
