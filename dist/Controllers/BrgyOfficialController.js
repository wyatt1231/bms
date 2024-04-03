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
const BarangayOfficialRepository_1 = __importDefault(require("../Repositories/BarangayOfficialRepository"));
const BrgyOfficialController = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const router = (0, express_1.Router)();
    router.post("/getBrgyOfficialDataTable", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield BarangayOfficialRepository_1.default.getBrgyOfficialDataTable(payload));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/getBrgyOfficialList", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield BarangayOfficialRepository_1.default.getBrgyOfficialList());
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/addBarangayOfficial", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = req.body;
            res.json(yield BarangayOfficialRepository_1.default.addBarangayOfficial(payload, req.user_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    router.post("/removeBarangayOfficial", (0, Authorize_1.default)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const official_pk = (_a = req.body) === null || _a === void 0 ? void 0 : _a.official_pk;
            res.json(yield BarangayOfficialRepository_1.default.removeBarangayOfficial(official_pk));
        }
        catch (error) {
            res.json(500);
        }
    }));
    app.use("/api/official/", router);
});
exports.default = BrgyOfficialController;
//# sourceMappingURL=BrgyOfficialController.js.map