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
const addComplaint = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const sql_add_complaint = yield con.Insert(`
          INSERT INTO complaint SET
          reported_by=@reported_by,
          title=@subject,
          body=@body,
          sts_pk="P";
           `, payload);
        if (sql_add_complaint.insertedId > 0) {
            for (const file of files) {
                const file_res = yield (0, useFileUploader_1.UploadFile)("/Files/Complaints/", file);
                if (!file_res.success) {
                    con.Rollback();
                    return file_res;
                }
                const news_file_payload = {
                    file_path: file_res.data.path,
                    file_name: file_res.data.name,
                    mimetype: file_res.data.mimetype,
                    complaint_pk: sql_add_complaint.insertedId,
                };
                const sql_add_news_file = yield con.Insert(`INSERT INTO complaint_file SET
               complaint_pk=@complaint_pk,
               file_name=@file_name,
               file_path=@file_path,
               mimetype=@mimetype;`, news_file_payload);
                if (sql_add_news_file.affectedRows < 1) {
                    con.Rollback();
                    return {
                        success: false,
                        message: "The process has been terminated when trying to save the file!",
                    };
                }
            }
            con.Commit();
            return {
                success: true,
                message: "The complaint has been saved successfully!",
            };
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while saving the complaint",
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
const addComplaintMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const sql_add_complaint_msg = yield con.Insert(`
              INSERT into complaint_message SET
              complaint_pk=@complaint_pk,
              body=@body,
              sent_by=@sent_by;
               `, payload);
        if (sql_add_complaint_msg.affectedRows > 0) {
            con.Commit();
            return {
                success: true,
                message: "The complaint has been updated successfully!",
            };
        }
        else {
            con.Rollback();
            return {
                success: false,
                message: "No affected rows while updating the complaint",
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
const getSingleComplaint = (complaint_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.QuerySingle(`SELECT * from complaint where complaint_pk = @complaint_pk`, {
            complaint_pk: complaint_pk,
        });
        data.complaint_file = yield con.Query(`
              select * from complaint_file where complaint_pk=@complaint_pk
            `, {
            complaint_pk: complaint_pk,
        });
        data.user = yield con.QuerySingle(`Select * from vw_users where user_pk = @user_pk`, {
            user_pk: data.reported_by,
        });
        data.user.pic = yield (0, useFileUploader_1.GetUploadedImage)(data.user.pic);
        data.status = yield con.QuerySingle(`Select * from status where sts_pk = @sts_pk;`, {
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
const getComplaintList = (reported_by) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        yield con.BeginTransaction();
        const data = yield con.Query(`SELECT complaint_pk,reported_by,DATE_FORMAT(reported_at,'%Y-%m-%d %H:%m %p') AS reported_at,title,body,sts_pk FROM complaint where reported_by=@reported_by`, {
            reported_by: reported_by,
        });
        for (const file of data) {
            file.complaint_file = yield con.Query(`
        select * from complaint_file where complaint_file_pk=@complaint_pk
        `, {
                complaint_pk: file.complaint_pk,
            });
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
const getComplaintMessage = (complaint_pk) => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield (0, DatabaseConfig_1.DatabaseConnection)();
    try {
        const table_messages = yield con.Query(` SELECT * FROM complaint_message WHERE  complaint_pk =@complaint_pk;`, {
            complaint_pk: complaint_pk,
        });
        for (const message of table_messages) {
            message.user = yield con.QuerySingle(`SELECT * from vw_users where user_pk = @user_pk`, {
                user_pk: message.sent_by,
            });
            message.user.pic = yield (0, useFileUploader_1.GetUploadedImage)(message.user.pic);
        }
        con.Commit();
        return {
            success: true,
            data: table_messages,
        };
    }
    catch (error) {
        console.error(`error`, error);
        con.Rollback();
        return {
            success: false,
            message: (0, useErrorMessage_1.ErrorMessage)(error),
        };
    }
});
exports.default = {
    addComplaintMessage,
    getComplaintList,
    getComplaintMessage,
    addComplaint,
    getSingleComplaint,
};
//# sourceMappingURL=ComplaintsMobileRepository.js.map