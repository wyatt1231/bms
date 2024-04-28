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
const PostMobileReporsitory_1 = __importDefault(require("../Repositories/PostMobileReporsitory"));
const PostsController = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const router = (0, express_1.Router)();
    router.post("/getPosts", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = req.body.offset;
        res.json(yield PostMobileReporsitory_1.default.getPosts(req.user_pk, offset));
    }));
    router.post("/getreactions", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const posts_pk = req.body.posts_pk;
        res.json(yield PostMobileReporsitory_1.default.getreactions(posts_pk, req.user_pk));
    }));
    router.post("/getUserPosts", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(yield PostMobileReporsitory_1.default.getUserPosts(req.user_pk));
    }));
    router.post("/getSinglePostWithPhoto", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const posts_pk = req.body.posts_pk;
        res.json(yield PostMobileReporsitory_1.default.getSinglePostWithPhoto(posts_pk, req.user_pk));
    }));
    router.post("/getPostsComments", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts_pk = req.body.posts_pk;
            res.json(yield PostMobileReporsitory_1.default.getPostsComments(posts_pk));
        }
        catch (error) {
            res.json(error);
        }
    }));
    router.post("/addPosts", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const payload = req.body;
        let files = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.uploaded_files) ? (_b = req.files) === null || _b === void 0 ? void 0 : _b.uploaded_files : [];
        res.json(yield PostMobileReporsitory_1.default.addPosts(payload, files instanceof Array ? files : [files], req.user_pk));
    }));
    router.post("/getPostsReaction", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(yield PostMobileReporsitory_1.default.getPostsReaction());
    }));
    router.post("/addPostComment", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = req.body;
        res.json(yield PostMobileReporsitory_1.default.addPostComment(payload, req.user_pk));
    }));
    router.post("/addPostReaction", (0, Authorize_1.default)("admin,resident"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = req.body;
        res.json(yield PostMobileReporsitory_1.default.addPostReaction(payload, req.user_pk));
    }));
    app.use("/api/postsMobile/", router);
});
exports.default = PostsController;
//# sourceMappingURL=PostsMobileController.js.map