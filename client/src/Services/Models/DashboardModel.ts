export interface YearlyStatsModel {
  x: string | number;
  y: string | number;
}

export interface OverallPopulationModel {
  labels: Array<number>;
  death: Array<YearlyStatsModel>;
  alive: Array<YearlyStatsModel>;
}

export interface StatsDataSetModel {
  labels: Array<number>;
  data_set: Array<YearlyStatsModel>;
}

export interface StatsModel {
  label: Array<string>;
  total: Array<YearlyStatsModel>;
  backgroundColor: Array<string>;
}

export interface DashboardFilterInterface {
  year_1: string;
  year_2: string;
  year?: string;
  purok: Array<string>;
}

export interface PieModel {
  label?: string;
  total?: number;
}
