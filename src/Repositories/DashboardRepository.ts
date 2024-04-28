import moment from "moment";
import { DatabaseConnection } from "../Configurations/DatabaseConfig";
import { ErrorMessage } from "../Hooks/useErrorMessage";
import {
  DashboardFilterInterface,
  OverallPopulationModel,
  YearlyStatsModel,
} from "../Models/DashboardModels";
import { ResponseModel } from "../Models/ResponseModels";

const overallPopulation = async (
  purok: Array<string>
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    let current_year = moment().year();

    const years: Array<number> = [];

    const alive_stats: Array<YearlyStatsModel> = [];
    const death_stats: Array<YearlyStatsModel> = [];

    for (let i = 0; i < 10; i++) {
      const alive = await con.QuerySingle(
        `
      SELECT  COUNT(*) total FROM resident WHERE YEAR(resident_date) = '${current_year}' and purok in @purok
      `,
        {
          purok: purok,
        }
      );

      alive_stats.push({
        x: current_year,
        y: alive.total,
      });

      const death = await con.QuerySingle(
        `
      SELECT COUNT(*) as total FROM resident WHERE YEAR(died_date) = '${current_year}' and purok in @purok
      `,
        {
          purok: purok,
        }
      );

      death_stats.push({
        x: current_year,
        y: death.total,
      });

      years.push(current_year);
      current_year = current_year - 1;
    }

    con.Commit();
    const result_data: OverallPopulationModel = {
      labels: years,
      death: death_stats,
      alive: alive_stats,
    };
    return {
      success: true,
      data: result_data,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const total_population = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const db_res = await con.QuerySingle(
      `
      select count(*) as total from resident where died_date is  null AND YEAR(resident_date) = @year  AND purok in @purok ;
    `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: db_res.total,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const total_death = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const db_res = await con.QuerySingle(
      `
      select count(*) as total from resident where died_date is not null AND YEAR(resident_date) = @year  and purok in @purok
    `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: db_res.total,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const total_pwd = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const db_res = await con.QuerySingle(
      `
      select count(*) as total from resident where died_date is  null  and with_disability = 'y' AND YEAR(resident_date) = @year    and purok in @purok
    `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: db_res.total,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const total_sc = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const db_res = await con.QuerySingle(
      `
      SELECT count(*) as total FROM (
        SELECT  FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365) AS age
        FROM resident WHERE died_date IS NULL  AND YEAR(resident_date) = @year  AND purok IN @purok
        ) AS tmp
        WHERE  age >= 60 
    `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: db_res.total,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const ageGroupStats = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    console.log(`year`, filters.year);

    const ages: Array<any> = await con.Query(
      `
        SELECT * FROM 
        (
        SELECT '0-10' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 0 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=10 AND (died_date IS NULL OR YEAR(died_date) > @year)  AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '11-20' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 11 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=20 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '21-30' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 21 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=30 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '31-40' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 31 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=40 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '41-50' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 41 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=50 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '51-60' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 51 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=60 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '61-70' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 61 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=70 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '71-90' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 71 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=80 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '81-90' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 91 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  <=90 AND (died_date IS NULL OR YEAR(died_date) > @year) AND YEAR(resident_date) = @year  AND purok IN @purok
        UNION ALL
        SELECT '100+' AS x, COUNT(*) y FROM resident WHERE (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365))  >= 100 AND died_date IS  NULL AND YEAR(resident_date) = @year  AND purok IN @purok
        ) tmp
          `,
      filters
    );

    const labels: Array<number> = [];

    for (const r of ages) {
      labels.push(r.x);
    }

    con.Commit();
    return {
      success: true,
      data: {
        labels: labels,
        data_set: ages,
      },
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const lifeStageStats = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const life_stage_stats = await con.Query(
      `
      SELECT 'infant' AS 'x', COUNT(*) AS 'y' FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) <= 1 AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'children' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) > 1 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) < 18  AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'adult' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) > 18 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) < 60  AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'senior citizen' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) >= 60  AND YEAR(resident_date) = @year  AND purok IN @purok
         `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: {
        labels: ["infant", "children", "adult", "senior citizen"],
        data_set: life_stage_stats,
      },
    };
  } catch (error) {
    await con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const genderStats = async (
  filters: DashboardFilterInterface
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const total_male = await con.QuerySingle(
      `
      SELECT COUNT(*) AS total FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year)  AND gender = 'm'   AND YEAR(resident_date) = @year  AND purok in @purok
          `,
      filters
    );

    const total_female = await con.QuerySingle(
      `
      SELECT COUNT(*) AS total FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND gender = 'f'   AND YEAR(resident_date) = @year  AND purok in @purok
          `,
      filters
    );

    con.Commit();
    return {
      success: true,
      data: {
        labels: ["lalaki", "babae"],
        data_set: [
          {
            x: "lalaki",
            y: total_male.total,
          },
          {
            x: "babae",
            y: total_female.total,
          },
        ],
      },
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const statsComplaint = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT  s.sts_desc as label,s.sts_color backgroundColor,COUNT(c.sts_pk) total FROM complaint c JOIN status s ON c.sts_pk = s.sts_pk GROUP BY c.sts_pk
          `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const statsNews = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT  s.sts_desc AS label,s.sts_backgroundColor backgroundColor,COUNT(c.sts_pk) total FROM news c JOIN status s ON c.sts_pk = s.sts_pk GROUP BY c.sts_pk
          `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const StatsBiktikmaPangabuso = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT COUNT(descrip) AS total ,descrip label FROM family_biktima_pangabuso AS label GROUP BY descrip
      `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const StatsKahimtangKomunidad = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT COUNT(descrip) AS total ,descrip label FROM family_kahimtanang_komunidad AS label GROUP BY descrip
      `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const StatsMatangBasura = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT COUNT(descrip) AS total ,descrip label FROM family_matang_basura AS label GROUP BY descrip
      `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const StatsMatangKasilyas = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT COUNT(descrip) AS total ,descrip label FROM family_matang_kasilyas AS label GROUP BY descrip
      `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const StatsPasilidadKuryente = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const stats_complaint: Array<any> = await con.Query(
      `
      SELECT COUNT(descrip) AS total ,descrip label FROM family_pasilidad_kuryente AS label GROUP BY descrip
      `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: stats_complaint,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

export default {
  total_population,
  total_death,
  total_pwd,
  total_sc,
  overallPopulation,
  ageGroupStats,
  genderStats,
  lifeStageStats,
  statsComplaint,
  statsNews,
  StatsPasilidadKuryente,
  StatsBiktikmaPangabuso,
  StatsKahimtangKomunidad,
  StatsMatangBasura,
  StatsMatangKasilyas,
};
