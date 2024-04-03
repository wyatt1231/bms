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
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConfig_1 = require("../Configurations/DatabaseConfig");
const useErrorMessage_1 = require("../Hooks/useErrorMessage");
const useFileUploader_1 = require("../Hooks/useFileUploader");
const addBarangayOfficial = (payload, user_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        payload.encoder_pk = user_pk;
        const count_existing = yield con.QuerySingle(`SELECT COUNT(*) AS total FROM barangay_official WHERE resident_pk = @resident_pk AND sts_pk = 'A'  LIMIT 1;`, {
            resident_pk: payload.resident_pk,
        });
        if (parseInt(count_existing.total) > 0) {
            con.Rollback();
            return {
                success: false,
                message: "You cannot set this resident as Brgy. Official because he/she has an existing brgy. official position",
            };
        }
        else {
            const sql_add_brgy_official = yield con.Insert(`INSERT INTO barangay_official SET
           resident_pk=@resident_pk,
           position=@position,
           encoder_pk=@encoder_pk;`, payload);
            if (sql_add_brgy_official.insertedId > 0) {
                con.Commit();
                return {
                    success: true,
                    message: "The position has been granted to the brgy. official successfully",
                };
            }
            else {
                con.Rollback();
                return {
                    success: false,
                    message: "No affected rows in the process",
                };
            }
        }
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
const removeBarangayOfficial = (official_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const sql_update = yield con.Modify(`
          UPDATE barangay_official SET
          sts_pk='X'
          where official_pk=@official_pk;
          ;
           `, {
            official_pk: official_pk,
        });
        if (sql_update > 0) {
            con.Commit();
            return {
                success: true,
                message: "The barangay official has been deactivated successfully!",
            };
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while updating the record",
            };
        }
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
const getBrgyOfficialDataTable = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.QueryPagination(`
      SELECT * FROM 
      (SELECT r.first_name,r.resident_pk,r.middle_name,r.last_name,r.suffix,r.pic,r.gender,bo.official_pk,bo.position,bo.encoded_at,bo.sts_pk,s.sts_backgroundColor,s.sts_color,s.sts_desc FROM barangay_official bo 
      JOIN resident r ON bo.resident_pk = r.resident_pk
      LEFT JOIN status s ON s.sts_pk = bo.sts_pk) tmp
      WHERE 
      
      first_name like concat('%',@first_name,'%')
      AND last_name like concat('%',@last_name,'%')
      AND gender IN @gender
      AND sts_pk <> 'X'
      AND sts_pk IN @sts_pk
      `, payload);
        const hasMore = data.length > payload.page.limit;
        if (hasMore) {
            data.splice(data.length - 1, 1);
        }
        const count = hasMore
            ? -1
            : payload.page.begin * payload.page.limit + data.length;
        for (const admin of data) {
            admin.pic = yield (0, useFileUploader_1.GetUploadedImage)(admin.pic);
        }
        con.Commit();
        return {
            success: true,
            data: {
                table: data,
                begin: payload.page.begin,
                count: count,
                limit: payload.page.limit,
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
const getBrgyOfficialList = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.Query(`
      SELECT * FROM 
      (SELECT r.first_name,r.middle_name,r.last_name,r.suffix,r.pic,r.gender,bo.position,bo.encoded_at,bo.sts_pk,s.sts_backgroundColor,s.sts_color,s.sts_desc FROM barangay_official bo 
      JOIN resident r ON bo.resident_pk = r.resident_pk
      LEFT JOIN status s ON s.sts_pk = bo.sts_pk) tmp
      `, null);
        for (const admin of data) {
            admin.pic = yield (0, useFileUploader_1.GetUploadedImage)(admin.pic);
        }
        con.Commit();
        return {
            success: true,
            data: data,
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
    getBrgyOfficialList,
    addBarangayOfficial,
    getBrgyOfficialDataTable,
    removeBarangayOfficial,
};
//# sourceMappingURL=BarangayOfficialRepository.js.map