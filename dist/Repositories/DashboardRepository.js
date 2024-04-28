"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const DatabaseConfig_1 = require("../Configurations/DatabaseConfig");
const useErrorMessage_1 = require("../Hooks/useErrorMessage");
const overallPopulation = (purok) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        let current_year = (0, moment_1.default)().year();
        const years = [];
        const alive_stats = [];
        const death_stats = [];
        for (let i = 0; i < 10; i++) {
            const alive = yield con.QuerySingle(`
      SELECT  COUNT(*) total FROM resident WHERE YEAR(resident_date) = '${current_year}' and purok in @purok
      `, {
                purok: purok,
            });
            alive_stats.push({
                x: current_year,
                y: alive.total,
            });
            const death = yield con.QuerySingle(`
      SELECT COUNT(*) as total FROM resident WHERE YEAR(died_date) = '${current_year}' and purok in @purok
      `, {
                purok: purok,
            });
            death_stats.push({
                x: current_year,
                y: death.total,
            });
            years.push(current_year);
            current_year = current_year - 1;
        }
        con.Commit();
        const result_data = {
            labels: years,
            death: death_stats,
            alive: alive_stats,
        };
        return {
            success: true,
            data: result_data,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const total_population = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const db_res = yield con.QuerySingle(`
      select count(*) as total from resident where died_date is  null AND YEAR(resident_date) = @year  AND purok in @purok ;
    `, filters);
        con.Commit();
        return {
            success: true,
            data: db_res.total,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const total_death = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const db_res = yield con.QuerySingle(`
      select count(*) as total from resident where died_date is not null AND YEAR(resident_date) = @year  and purok in @purok
    `, filters);
        con.Commit();
        return {
            success: true,
            data: db_res.total,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const total_pwd = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const db_res = yield con.QuerySingle(`
      select count(*) as total from resident where died_date is  null  and with_disability = 'y' AND YEAR(resident_date) = @year    and purok in @purok
    `, filters);
        con.Commit();
        return {
            success: true,
            data: db_res.total,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const total_sc = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const db_res = yield con.QuerySingle(`
      SELECT count(*) as total FROM (
        SELECT  FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365) AS age
        FROM resident WHERE died_date IS NULL  AND YEAR(resident_date) = @year  AND purok IN @purok
        ) AS tmp
        WHERE  age >= 60 
    `, filters);
        con.Commit();
        return {
            success: true,
            data: db_res.total,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const ageGroupStats = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        console.log(`year`, filters.year);
        const ages = yield con.Query(`
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
          `, filters);
        const labels = [];
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
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const lifeStageStats = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const life_stage_stats = yield con.Query(`
      SELECT 'infant' AS 'x', COUNT(*) AS 'y' FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) <= 1 AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'children' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) > 1 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) < 18  AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'adult' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) > 18 AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) < 60  AND YEAR(resident_date) = @year  AND purok IN @purok
      UNION ALL
      SELECT 'senior citizen' AS 'x', COUNT(*) AS 'y'  FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND (FLOOR(DATEDIFF(DATE(NOW()), birth_date)/365)) >= 60  AND YEAR(resident_date) = @year  AND purok IN @purok
         `, filters);
        con.Commit();
        return {
            success: true,
            data: {
                labels: ["infant", "children", "adult", "senior citizen"],
                data_set: life_stage_stats,
            },
        };
    }
    catch (error) {
        yield con.Rollback();
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const genderStats = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const total_male = yield con.QuerySingle(`
      SELECT COUNT(*) AS total FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year)  AND gender = 'm'   AND YEAR(resident_date) = @year  AND purok in @purok
          `, filters);
        const total_female = yield con.QuerySingle(`
      SELECT COUNT(*) AS total FROM resident WHERE (died_date IS NULL OR YEAR(died_date) > @year) AND gender = 'f'   AND YEAR(resident_date) = @year  AND purok in @purok
          `, filters);
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
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const statsComplaint = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT  s.sts_desc as label,s.sts_color backgroundColor,COUNT(c.sts_pk) total FROM complaint c JOIN status s ON c.sts_pk = s.sts_pk GROUP BY c.sts_pk
          `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const statsNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT  s.sts_desc AS label,s.sts_backgroundColor backgroundColor,COUNT(c.sts_pk) total FROM news c JOIN status s ON c.sts_pk = s.sts_pk GROUP BY c.sts_pk
          `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const StatsBiktikmaPangabuso = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT COUNT(descrip) AS total ,descrip label FROM family_biktima_pangabuso AS label GROUP BY descrip
      `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const StatsKahimtangKomunidad = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT COUNT(descrip) AS total ,descrip label FROM family_kahimtanang_komunidad AS label GROUP BY descrip
      `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const StatsMatangBasura = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT COUNT(descrip) AS total ,descrip label FROM family_matang_basura AS label GROUP BY descrip
      `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const StatsMatangKasilyas = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT COUNT(descrip) AS total ,descrip label FROM family_matang_kasilyas AS label GROUP BY descrip
      `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
const StatsPasilidadKuryente = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const stats_complaint = yield con.Query(`
      SELECT COUNT(descrip) AS total ,descrip label FROM family_pasilidad_kuryente AS label GROUP BY descrip
      `, null);
        con.Commit();
        return {
            success: true,
            data: stats_complaint,
        };
    }
    catch (error) {
        yield con.Rollback();
        console.error(`error`, error);
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
exports.default = {
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
//# sourceMappingURL=DashboardRepository.js.map