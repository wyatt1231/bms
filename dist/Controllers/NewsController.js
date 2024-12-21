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
const express_1 = require("express");
const Authorize_1 = __importDefault(require("../Middlewares/Authorize"));
const NewsRepository_1 = __importDefault(require("../Repositories/NewsRepository"));
const NewsController = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const router = (0, express_1.Router)();
    router.post("/getNewsComments", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news_pk = req.body.news_pk;
            res.json(yield NewsRepository_1.default.getNewsComments(news_pk));
        }
        catch (error) {
            res.json(error);
        }
    }));
    router.post("/getNewsDataTable", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.getNewsDataTable(payload));
        }
        catch (error) {
            res.json(error);
        }
    }));
    router.post("/getNewsFiles", (0, Authorize_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body.news_pk;
            res.json(yield NewsRepository_1.default.getNewsFiles(payload));
        }
        catch (error) {
            res.json(error);
        }
    }));
    router.post("/getNewsDataPublished", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield NewsRepository_1.default.getNewsDataPublished());
        }
        catch (error) {
            res.json(error);
        }
    }));
    router.post("/addNews", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const payload = req.body;
            let files = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.uploaded_files) !== null && _b !== void 0 ? _b : [];
            if (!(files instanceof Array)) {
                files = [files];
            }
            res.json(yield NewsRepository_1.default.addNews(payload, files instanceof Array ? files : [files], req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/addNewsFiles", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const payload = req.body;
            let files = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.uploaded_files) !== null && _d !== void 0 ? _d : [];
            if (!(files instanceof Array)) {
                files = [files];
            }
            if (files.length <= 0) {
                res.json({
                    success: false,
                    message: "Please add at least one file!",
                });
            }
            else {
                res.json(yield NewsRepository_1.default.addNewsFiles(payload, files, req.user_pk));
            }
        }
        catch (error) {
            console.error(error);
            res.json(500);
        }
    }));
    router.post("/updateNews", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.updateNews(payload, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/republishNews", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news_pk = req.body.news_pk;
            res.json(yield NewsRepository_1.default.republishNews(news_pk, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/unpublishNews", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news_pk = req.body.news_pk;
            res.json(yield NewsRepository_1.default.unpublishNews(news_pk, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/getSingleNews", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news_pk = req.body.news_pk;
            res.json(yield NewsRepository_1.default.getSingleNews(news_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/getSingleNewsWithPhoto", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news_pk = req.body.news_pk;
            res.json(yield NewsRepository_1.default.getSingleNewsWithPhoto(news_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/addNewsComment", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.addNewsComment(payload, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/addNewsReaction", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.addNewsReaction(payload, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/toggleLike", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = Object.assign(Object.assign({}, req.body), { liked_by: req.user_pk });
            res.json(yield NewsRepository_1.default.toggleLike(payload));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/updateNewsReaction", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.updateNewsReaction(payload, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/getNewsLatest", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield NewsRepository_1.default.getNewsLatest());
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/deleteNewsFile", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield NewsRepository_1.default.deleteNewsFile(payload));
        }
        catch (error) {
            res.json(500);
        }
    }));
    app.use("/api/news/", router);
});
exports.default = NewsController;
//# sourceMappingURL=NewsController.js.map