import { Express } from "express";
import AdminController from "../Controllers/AdminController";
import BrgyOfficialController from "../Controllers/BrgyOfficialController";
import ComplaintController from "../Controllers/ComplaintController";
import DashboardController from "../Controllers/DashboardController";
import NewsController from "../Controllers/NewsController";
import ResidentController from "../Controllers/ResidentController";
import UserController from "../Controllers/UserController";
import PostsController from "../Controllers/PostsController";
import FamilyController from "../Controllers/FamilyController";


import PostsMobileController from "../Controllers/PostsMobileController";
import NewsMobileController from "../Controllers/NewsMobileController";
import ComplaintsMobileController from "../Controllers/ComplaintsMobileController";
import ResidentMobileController from "../Controllers/ResidentMobileController";
import FamilyMobileController from "../Controllers/FamilyMobileController";
export const ControllerRegistry = async (app: Express) => {
  await UserController(app);
  await AdminController(app);
  await ResidentController(app);
  await NewsController(app);
  await ComplaintController(app);
  await BrgyOfficialController(app);
  await DashboardController(app);
  await PostsController(app);

  await PostsMobileController(app);
  await NewsMobileController(app);
  await ResidentMobileController(app);
  await ComplaintsMobileController(app);
  await FamilyController(app);
  await FamilyMobileController(app);
};

export default ControllerRegistry;

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
