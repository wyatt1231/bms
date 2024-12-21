import { Dispatch } from "react";
import DashboardApi from "../Api/DashboardApi";
import IServerResponse from "../Interface/IServerResponse";
import { DashboardFilterInterface } from "../Models/DashboardModel";
import { DashboardReducerTypes } from "../Types/DashboardTypes";

const setOverallPopulation = (filters: Array<string>) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_overall_population",
      fetch_overall_population: true,
    });
    const response: IServerResponse = await DashboardApi.overallPopulation(filters);

    if (response.success) {
      dispatch({
        type: "overall_population",
        overall_population: response.data,
      });
    }

    dispatch({
      type: "fetch_overall_population",
      fetch_overall_population: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const setAgeGroupStats = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_age_group_stats",
      fetch_age_group_stats: true,
    });

    var response: IServerResponse = await DashboardApi.ageGroupStats({
      ...filters,
      year: filters.year_1,
    });

    if (response.success) {
      dispatch({
        type: "age_group_stats_year_1",
        age_group_stats_year_1: response.data,
      });
    }

    response = await DashboardApi.ageGroupStats({
      ...filters,
      year: filters.year_2,
    });

    if (response.success) {
      dispatch({
        type: "age_group_stats_year_2",
        age_group_stats_year_2: response.data,
      });
    }

    dispatch({
      type: "fetch_age_group_stats",
      fetch_age_group_stats: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const setGenderStats = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_gender_stats",
      fetch_gender_stats: true,
    });
    const response: IServerResponse = await DashboardApi.genderStats(filters);

    if (response.success) {
      dispatch({
        type: "gender_stats",
        gender_stats: response.data,
      });
    }

    dispatch({
      type: "fetch_gender_stats",
      fetch_gender_stats: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const setLifeStageStats = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_life_stage_stats",
      fetch_life_stage_stats: true,
    });
    const response: IServerResponse = await DashboardApi.lifeStageStats(filters);

    if (response.success) {
      dispatch({
        type: "life_stage_stats",
        life_stage_stats: response.data,
      });
    }

    dispatch({
      type: "fetch_life_stage_stats",
      fetch_life_stage_stats: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const statsComplaint = () => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_complaint_stats",
      fetch_complaint_stats: true,
    });
    const response: IServerResponse = await DashboardApi.statsComplaint();

    if (response.success) {
      dispatch({
        type: "complaint_stats",
        complaint_stats: response.data,
      });
    }

    dispatch({
      type: "fetch_complaint_stats",
      fetch_complaint_stats: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const statsNews = () => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_news_stats",
      fetch_news_stats: true,
    });
    const response: IServerResponse = await DashboardApi.statsNews();

    if (response.success) {
      dispatch({
        type: "news_stats",
        news_stats: response.data,
      });
    }

    dispatch({
      type: "fetch_news_stats",
      fetch_news_stats: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const totalPopulation = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_total_population",
      fetch_total_population: true,
    });
    const response: IServerResponse = await DashboardApi.totalPopulation(filters);

    if (response.success) {
      dispatch({
        type: "total_population",
        total_population: response.data,
      });
    }

    dispatch({
      type: "fetch_total_population",
      fetch_total_population: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const totalDeath = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_total_death",
      fetch_total_death: true,
    });
    const response: IServerResponse = await DashboardApi.totalDeath(filters);

    if (response.success) {
      dispatch({
        type: "total_death",
        total_death: response.data,
      });
    }

    dispatch({
      type: "fetch_total_death",
      fetch_total_death: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const totalSc = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_total_sc",
      fetch_total_sc: true,
    });
    const response: IServerResponse = await DashboardApi.totalSc(filters);

    if (response.success) {
      dispatch({
        type: "total_sc",
        total_sc: response.data,
      });
    }

    dispatch({
      type: "fetch_total_sc",
      fetch_total_sc: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const totalPwd = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_total_pwd",
      fetch_total_pwd: true,
    });
    const response: IServerResponse = await DashboardApi.totalPwd(filters);

    if (response.success) {
      dispatch({
        type: "total_pwd",
        total_pwd: response.data,
      });
    }

    dispatch({
      type: "fetch_total_pwd",
      fetch_total_pwd: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const StatsPasilidadKuryente = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_stats_pasilidad_kuryente",
      fetch_stats_pasilidad_kuryente: true,
    });
    const response: IServerResponse = await DashboardApi.StatsPasilidadKuryente(filters);

    if (response.success) {
      dispatch({
        type: "stats_pasilidad_kuryente",
        stats_pasilidad_kuryente: response.data,
      });
    }

    dispatch({
      type: "fetch_stats_pasilidad_kuryente",
      fetch_stats_pasilidad_kuryente: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const StatsBiktikmaPangabuso = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_stats_biktima_pangabuso",
      fetch_stats_biktima_pangabuso: true,
    });

    // console.log(`filters`, filters);

    let response: IServerResponse = await DashboardApi.StatsBiktikmaPangabuso({
      ...filters,
      year: filters.year_1,
    });

    if (response.success) {
      dispatch({
        type: "stats_biktima_pangabuso_year_1",
        stats_biktima_pangabuso_year_1: response.data,
      });
    }

    console.log(
      `stats_biktima_pangabuso_year_1`,
      {
        ...filters,
        year: filters.year_1,
      },
      response.data
    );

    response = await DashboardApi.StatsBiktikmaPangabuso({
      ...filters,
      year: filters.year_2,
    });

    if (response.success) {
      dispatch({
        type: "stats_biktima_pangabuso_year_2",
        stats_biktima_pangabuso_year_2: response.data,
      });
    }

    console.log(
      `stats_biktima_pangabuso_year_2`,

      {
        ...filters,
        year: filters.year_2,
      },
      response.data
    );

    dispatch({
      type: "fetch_stats_biktima_pangabuso",
      fetch_stats_biktima_pangabuso: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const StatsKahimtangKomunidad = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_stats_kahimtang_komunidad",
      fetch_stats_kahimtang_komunidad: true,
    });
    const response: IServerResponse = await DashboardApi.StatsKahimtangKomunidad(filters);

    if (response.success) {
      dispatch({
        type: "stats_kahimtang_komunidad",
        stats_kahimtang_komunidad: response.data,
      });
    }

    dispatch({
      type: "fetch_stats_kahimtang_komunidad",
      fetch_stats_kahimtang_komunidad: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const StatsMatangBasura = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_stats_matang_basura",
      fetch_stats_matang_basura: true,
    });
    const response: IServerResponse = await DashboardApi.StatsMatangBasura(filters);

    if (response.success) {
      dispatch({
        type: "stats_matang_basura",
        stats_matang_basura: response.data,
      });
    }

    dispatch({
      type: "fetch_stats_matang_basura",
      fetch_stats_matang_basura: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

const StatsMatangKasilyas = (filters: DashboardFilterInterface) => async (dispatch: Dispatch<DashboardReducerTypes>) => {
  try {
    dispatch({
      type: "fetch_stats_matang_kasilyas",
      fetch_stats_matang_kasilyas: true,
    });
    const response: IServerResponse = await DashboardApi.StatsMatangKasilyas(filters);

    if (response.success) {
      dispatch({
        type: "stats_matang_kasilyas",
        stats_matang_kasilyas: response.data,
      });
    }

    dispatch({
      type: "fetch_stats_matang_kasilyas",
      fetch_stats_matang_kasilyas: false,
    });
  } catch (error) {
    console.error(`action error`, error);
  }
};

export default {
  setOverallPopulation,
  setAgeGroupStats,
  setGenderStats,
  setLifeStageStats,
  statsComplaint,
  statsNews,
  totalPopulation,
  totalDeath,
  totalSc,
  totalPwd,
  StatsPasilidadKuryente,
  StatsBiktikmaPangabuso,
  StatsKahimtangKomunidad,
  StatsMatangBasura,
  StatsMatangKasilyas,
};
