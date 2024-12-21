import { OverallPopulationModel, PieModel, StatsDataSetModel, StatsModel } from "../Models/DashboardModel";

export type DashboardReducerTypes =
  | {
      type: "overall_population";
      overall_population?: OverallPopulationModel;
    }
  | {
      type: "fetch_overall_population";
      fetch_overall_population?: boolean;
    }
  //
  | {
      type: "age_group_stats_year_1";
      age_group_stats_year_1?: StatsDataSetModel;
    }
  | {
      type: "age_group_stats_year_2";
      age_group_stats_year_2?: StatsDataSetModel;
    }
  | {
      type: "fetch_age_group_stats";
      fetch_age_group_stats?: boolean;
    }
  //
  | {
      type: "gender_stats";
      gender_stats?: StatsDataSetModel;
    }
  | {
      type: "fetch_gender_stats";
      fetch_gender_stats?: boolean;
    }
  | {
      type: "life_stage_stats";
      life_stage_stats?: StatsDataSetModel;
    }
  | {
      type: "fetch_life_stage_stats";
      fetch_life_stage_stats?: boolean;
    }
  //
  | {
      type: "complaint_stats";
      complaint_stats?: Array<StatsModel>;
    }
  | {
      type: "fetch_complaint_stats";
      fetch_complaint_stats?: boolean;
    }
  //
  | {
      type: "news_stats";
      news_stats?: Array<StatsModel>;
    }
  | {
      type: "fetch_news_stats";
      fetch_news_stats?: boolean;
    }
  //
  | {
      type: "total_population";
      total_population?: number;
    }
  | {
      type: "fetch_total_population";
      fetch_total_population?: boolean;
    }
  //
  | {
      type: "total_death";
      total_death?: number;
    }
  | {
      type: "fetch_total_death";
      fetch_total_death?: boolean;
    }
  //
  | {
      type: "total_sc";
      total_sc?: number;
    }
  | {
      type: "fetch_total_sc";
      fetch_total_sc?: boolean;
    }
  //
  | {
      type: "total_pwd";
      total_pwd?: number;
    }
  | {
      type: "fetch_total_pwd";
      fetch_total_pwd?: boolean;
    }
  //
  | {
      type: "stats_biktima_pangabuso_year_1";
      stats_biktima_pangabuso_year_1?: PieModel[];
    }
  | {
      type: "stats_biktima_pangabuso_year_2";
      stats_biktima_pangabuso_year_2?: PieModel[];
    }
  | {
      type: "fetch_stats_biktima_pangabuso";
      fetch_stats_biktima_pangabuso?: boolean;
    }
  //
  | {
      type: "stats_kahimtang_komunidad";
      stats_kahimtang_komunidad?: Array<StatsModel>;
    }
  | {
      type: "fetch_stats_kahimtang_komunidad";
      fetch_stats_kahimtang_komunidad?: boolean;
    }
  //
  | {
      type: "stats_matang_basura";
      stats_matang_basura?: Array<StatsModel>;
    }
  | {
      type: "fetch_stats_matang_basura";
      fetch_stats_matang_basura?: boolean;
    }
  //
  | {
      type: "stats_matang_kasilyas";
      stats_matang_kasilyas?: Array<StatsModel>;
    }
  | {
      type: "fetch_stats_matang_kasilyas";
      fetch_stats_matang_kasilyas?: boolean;
    }
  //
  | {
      type: "stats_pasilidad_kuryente";
      stats_pasilidad_kuryente?: Array<StatsModel>;
    }
  | {
      type: "fetch_stats_pasilidad_kuryente";
      fetch_stats_pasilidad_kuryente?: boolean;
    };

export interface DashboardReducerModel {
  overall_population?: OverallPopulationModel;
  fetch_overall_population?: boolean;

  age_group_stats_year_1?: StatsDataSetModel;
  age_group_stats_year_2?: StatsDataSetModel;
  fetch_age_group_stats?: boolean;

  gender_stats?: StatsDataSetModel;
  fetch_gender_stats?: boolean;

  life_stage_stats?: StatsDataSetModel;
  fetch_life_stage_stats?: boolean;

  complaint_stats?: Array<StatsModel>;
  fetch_complaint_stats?: boolean;

  news_stats?: Array<StatsModel>;
  fetch_news_stats?: boolean;

  //
  total_population?: number;
  fetch_total_population?: boolean;
  //
  total_death?: number;
  fetch_total_death?: boolean;
  //
  total_sc?: number;
  fetch_total_sc?: boolean;
  //
  total_pwd?: number;
  fetch_total_pwd?: boolean;

  //
  stats_biktima_pangabuso_year_1?: PieModel[];
  stats_biktima_pangabuso_year_2?: PieModel[];
  fetch_stats_biktima_pangabuso?: boolean;
  //
  stats_kahimtang_komunidad?: Array<StatsModel>;
  fetch_stats_kahimtang_komunidad?: boolean;
  //
  stats_matang_basura?: Array<StatsModel>;
  fetch_stats_matang_basura?: boolean;
  //
  stats_matang_kasilyas?: Array<StatsModel>;
  fetch_stats_matang_kasilyas?: boolean;
  //
  stats_pasilidad_kuryente?: Array<StatsModel>;
  fetch_stats_pasilidad_kuryente?: boolean;
}
