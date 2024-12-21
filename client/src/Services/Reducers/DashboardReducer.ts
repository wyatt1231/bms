import { DashboardReducerModel, DashboardReducerTypes } from "../Types/DashboardTypes";

const defaultState: DashboardReducerModel = {};

const DashboardReducer = (state: DashboardReducerModel = defaultState, action: DashboardReducerTypes): DashboardReducerModel => {
  switch (action.type) {
    case "overall_population": {
      return {
        ...state,
        overall_population: action.overall_population,
      };
    }
    case "fetch_overall_population": {
      return {
        ...state,
        fetch_overall_population: action.fetch_overall_population,
      };
    }
    //
    case "age_group_stats_year_1": {
      return {
        ...state,
        age_group_stats_year_1: action.age_group_stats_year_1,
      };
    }
    case "age_group_stats_year_2": {
      return {
        ...state,
        age_group_stats_year_2: action.age_group_stats_year_2,
      };
    }
    case "fetch_age_group_stats": {
      return {
        ...state,
        fetch_age_group_stats: action.fetch_age_group_stats,
      };
    }
    //
    case "gender_stats": {
      return {
        ...state,
        gender_stats: action.gender_stats,
      };
    }
    case "fetch_gender_stats": {
      return {
        ...state,
        fetch_gender_stats: action.fetch_gender_stats,
      };
    }

    case "life_stage_stats": {
      return {
        ...state,
        life_stage_stats: action.life_stage_stats,
      };
    }
    case "fetch_life_stage_stats": {
      return {
        ...state,
        fetch_life_stage_stats: action.fetch_life_stage_stats,
      };
    }
    //
    case "complaint_stats": {
      return {
        ...state,
        complaint_stats: action.complaint_stats,
      };
    }
    case "fetch_complaint_stats": {
      return {
        ...state,
        fetch_complaint_stats: action.fetch_complaint_stats,
      };
    }
    //
    case "news_stats": {
      return {
        ...state,
        news_stats: action.news_stats,
      };
    }
    case "fetch_news_stats": {
      return {
        ...state,
        fetch_news_stats: action.fetch_news_stats,
      };
    }
    //
    case "total_population": {
      return {
        ...state,
        total_population: action.total_population,
      };
    }
    case "fetch_total_population": {
      return {
        ...state,
        fetch_total_population: action.fetch_total_population,
      };
    }
    //
    case "total_death": {
      return {
        ...state,
        total_death: action.total_death,
      };
    }
    case "fetch_total_death": {
      return {
        ...state,
        fetch_total_death: action.fetch_total_death,
      };
    }
    //
    case "total_sc": {
      return {
        ...state,
        total_sc: action.total_sc,
      };
    }
    case "fetch_total_sc": {
      return {
        ...state,
        fetch_total_sc: action.fetch_total_sc,
      };
    }
    //
    case "total_pwd": {
      return {
        ...state,
        total_pwd: action.total_pwd,
      };
    }
    case "fetch_total_pwd": {
      return {
        ...state,
        fetch_total_pwd: action.fetch_total_pwd,
      };
    }

    //
    case "stats_biktima_pangabuso_year_1": {
      return {
        ...state,
        stats_biktima_pangabuso_year_1: action.stats_biktima_pangabuso_year_1,
      };
    }
    case "stats_biktima_pangabuso_year_2": {
      return {
        ...state,
        stats_biktima_pangabuso_year_2: action.stats_biktima_pangabuso_year_2,
      };
    }
    case "fetch_stats_biktima_pangabuso": {
      return {
        ...state,
        fetch_stats_biktima_pangabuso: action.fetch_stats_biktima_pangabuso,
      };
    }
    //
    case "stats_kahimtang_komunidad": {
      return {
        ...state,
        stats_kahimtang_komunidad: action.stats_kahimtang_komunidad,
      };
    }
    case "fetch_stats_kahimtang_komunidad": {
      return {
        ...state,
        fetch_stats_kahimtang_komunidad: action.fetch_stats_kahimtang_komunidad,
      };
    }
    //
    case "stats_matang_basura": {
      return {
        ...state,
        stats_matang_basura: action.stats_matang_basura,
      };
    }
    case "fetch_stats_matang_basura": {
      return {
        ...state,
        fetch_stats_matang_basura: action.fetch_stats_matang_basura,
      };
    }
    //
    case "stats_matang_kasilyas": {
      return {
        ...state,
        stats_matang_kasilyas: action.stats_matang_kasilyas,
      };
    }
    case "fetch_stats_matang_kasilyas": {
      return {
        ...state,
        fetch_stats_matang_kasilyas: action.fetch_stats_matang_kasilyas,
      };
    }
    //
    case "stats_pasilidad_kuryente": {
      return {
        ...state,
        stats_pasilidad_kuryente: action.stats_pasilidad_kuryente,
      };
    }
    case "fetch_stats_pasilidad_kuryente": {
      return {
        ...state,
        fetch_stats_pasilidad_kuryente: action.fetch_stats_pasilidad_kuryente,
      };
    }

    default:
      return state;
  }
};

export default DashboardReducer;
