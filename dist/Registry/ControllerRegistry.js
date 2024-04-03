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
exports.ControllerRegistry = void 0;
const AdminController_1 = __importDefault(require("../Controllers/AdminController"));
const BrgyOfficialController_1 = __importDefault(require("../Controllers/BrgyOfficialController"));
const ComplaintController_1 = __importDefault(require("../Controllers/ComplaintController"));
const DashboardController_1 = __importDefault(require("../Controllers/DashboardController"));
const NewsController_1 = __importDefault(require("../Controllers/NewsController"));
const ResidentController_1 = __importDefault(require("../Controllers/ResidentController"));
const UserController_1 = __importDefault(require("../Controllers/UserController"));
const PostsController_1 = __importDefault(require("../Controllers/PostsController"));
const FamilyController_1 = __importDefault(require("../Controllers/FamilyController"));
const PostsMobileController_1 = __importDefault(require("../Controllers/PostsMobileController"));
const NewsMobileController_1 = __importDefault(require("../Controllers/NewsMobileController"));
const ComplaintsMobileController_1 = __importDefault(require("../Controllers/ComplaintsMobileController"));
const ResidentMobileController_1 = __importDefault(require("../Controllers/ResidentMobileController"));
const FamilyMobileController_1 = __importDefault(require("../Controllers/FamilyMobileController"));
const ControllerRegistry = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserController_1.default)(app);
    yield (0, AdminController_1.default)(app);
    yield (0, ResidentController_1.default)(app);
    yield (0, NewsController_1.default)(app);
    yield (0, ComplaintController_1.default)(app);
    yield (0, BrgyOfficialController_1.default)(app);
    yield (0, DashboardController_1.default)(app);
    yield (0, PostsController_1.default)(app);
    yield (0, PostsMobileController_1.default)(app);
    yield (0, NewsMobileController_1.default)(app);
    yield (0, ResidentMobileController_1.default)(app);
    yield (0, ComplaintsMobileController_1.default)(app);
    yield (0, FamilyController_1.default)(app);
    yield (0, FamilyMobileController_1.default)(app);
});
exports.ControllerRegistry = ControllerRegistry;
exports.default = exports.ControllerRegistry;
//update family
//view all fam
//add fam
//fix login
// dashboard
//   death chart
// population chart
//age range by year
//total population
//total deaths
//PWD
//senior citizen
//children
//infant
//male female ratio
//pie chart
//infant children sc
//# sourceMappingURL=ControllerRegistry.js.map