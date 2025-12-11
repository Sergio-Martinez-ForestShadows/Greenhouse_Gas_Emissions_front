export interface EmissionRecord {
  year: number;
  emissions: number;
  emission_type: EmissionType;
  country: string;
  activity: string;
}

export type EmissionType = 'CO2' | 'N2O' | 'CH4';

export interface EmissionFilters {
  country: string | null;
  emissionType: EmissionType | null;
  activity: string | null;
}

export interface AggregatedEmission {
  year: number;
  total: number;
  byType: Record<EmissionType, number>;
}
