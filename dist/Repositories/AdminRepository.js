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
const useDateParser_1 = require("../Hooks/useDateParser");
const useErrorMessage_1 = require("../Hooks/useErrorMessage");
const useFileUploader_1 = require("../Hooks/useFileUploader");
const useValidator_1 = require("../Hooks/useValidator");
const addAdmin = (payload, user_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const user_payload = {
            full_name: `${payload.lastname}, ${payload.firstname}`,
            email: payload.email,
            user_type: "admin",
            encoder_pk: user_pk,
        };
        const sql_insert_user = yield con.Insert(`INSERT user SET
      email=@email,
      password=AES_ENCRYPT(@email,@email),
      user_type=@user_type,
      full_name=@full_name,
      encoder_pk=@encoder_pk;
      `, user_payload);
        if (sql_insert_user.insertedId > 0) {
            if ((0, useValidator_1.isValidPicture)(payload.pic)) {
                const upload_result = yield (0, useFileUploader_1.UploadImage)({
                    base_url: "./Files/Images/",
                    extension: "jpg",
                    file_name: sql_insert_user.insertedId,
                    file_to_upload: payload.pic,
                });
                if (upload_result.success) {
                    payload.pic = upload_result.data;
                }
                else {
                    return upload_result;
                }
            }
            const admin_payload = Object.assign(Object.assign({}, payload), { user_pk: sql_insert_user.insertedId, encoder_pk: user_pk });
            const sql_add_admin = yield con.Insert(`INSERT INTO administrator SET
         user_pk=@user_pk,
         pic=@pic,
         email=@email,
         phone=@phone,
         firstname=@firstname,
         lastname=@lastname,
         gender=@gender,
         encoder_pk=@encoder_pk;`, admin_payload);
            if (sql_add_admin.insertedId > 0) {
                con.Commit();
                return {
                    success: true,
                    message: "The administrator has been added successfully",
                };
            }
            else {
                con.Rollback();
                return {
                    success: false,
                    message: "No affected rows while adding the administrator",
                };
            }
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while adding the user",
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
const updateAdmin = (payload, user_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        if ((0, useValidator_1.isValidPicture)(payload.pic)) {
            const upload_result = yield (0, useFileUploader_1.UploadImage)({
                base_url: "./Files/Images/",
                extension: "jpg",
                file_name: payload.user_pk,
                file_to_upload: payload.pic,
            });
            if (upload_result.success) {
                payload.pic = upload_result.data;
            }
            else {
                return upload_result;
            }
        }
        const admin_payload = Object.assign(Object.assign({}, payload), { encoder_pk: user_pk });
        const sql_edit_admin = yield con.Modify(`UPDATE administrator SET
         pic=@pic,
         email=@email,
         phone=@phone,
         firstname=@firstname,
         lastname=@lastname,
         gender=@gender
         WHERE
         admin_pk=@admin_pk;`, admin_payload);
        if (sql_edit_admin > 0) {
            con.Commit();
            return {
                success: true,
                message: "The administrator has been updated successfully",
            };
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while updating the administrator",
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
const changeAdminStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const sql_edit_admin = yield con.Modify(`UPDATE administrator SET
         sts_pk=@sts_pk,
         encoder_pk=@encoder_pk
         WHERE
         admin_pk=@admin_pk;`, payload);
        if (sql_edit_admin > 0) {
            con.Commit();
            return {
                success: true,
                message: "The administrator status has been updated successfully",
            };
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while updating the administrator's status",
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
const getAdminDataTable = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.QueryPagination(`
      SELECT * FROM (SELECT a.*,CONCAT(firstname,' ',lastname) fullname,s.sts_desc  FROM administrator a 
      LEFT JOIN status s ON s.sts_pk = a.sts_pk) tmp
      WHERE 
      firstname like concat('%',@firstname,'%')
      AND lastname like concat('%',@lastname,'%')
      AND gender IN @gender
      AND sts_pk IN @sts_pk
      AND admin_pk != 1
      AND encoded_at >= ${(0, useDateParser_1.sqlFilterDate)(payload.filters.encoded_from, "encoded_at")}
      AND encoded_at <= ${(0, useDateParser_1.sqlFilterDate)(payload.filters.encoded_to, "encoded_at")}
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
const getSingleAdmin = (admin_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.QuerySingle(`select * from administrator where admin_pk = @admin_pk`, {
            admin_pk,
        });
        if (!!(data === null || data === void 0 ? void 0 : data.pic)) {
            data.pic = data.pic = yield (0, useFileUploader_1.GetUploadedImage)(data.pic);
        }
        data.status = yield con.QuerySingle(`select * from status where sts_pk=@sts_pk`, {
            sts_pk: data.sts_pk,
        });
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
    addAdmin,
    updateAdmin,
    getAdminDataTable,
    getSingleAdmin,
    changeAdminStatus,
};
//# sourceMappingURL=AdminRepository.js.map