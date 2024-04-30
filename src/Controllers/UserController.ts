import { Express, Request, Response, Router } from "express";
import Authorize from "../Middlewares/Authorize";
import { UserClaims } from "../Models/UserModels";
import * as user_repo from "../Repositories/UserRepository";

const UserController = async (app: Express): Promise<void> => {
  const router = Router();

  router.get("/test", async (req: Request & UserClaims, res: Response) => {
    // console.log(`28/04/2024 04:17pm - listening to ports ${PORT}`)

    res.json("28/04/2024 04:17pm -The app is running" + __dirname);
  });

  router.post("/login", async (req: Request & UserClaims, res: Response) => {
    try {
      const response = await user_repo.loginUser(req.body);
      // const response = await user_repo.loginUser({
      //   email: "bmsadmin",
      //   password: "bmsadmin",
      // });
      // console.log(`response`, response, req.body);
      res.json(response);
    } catch (error) {
      res.json(500);
    }
  });

  router.get(
    "/currentUser",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const zxc = await user_repo.currentUser(req?.user_pk);
        res.json(zxc);
      } catch (error) {
        res.json(500);
      }
    }
  );

  router.post(
    "/userinfo",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const response = await user_repo.userinfo(req.user_pk);

        res.json(response);
      } catch (error) {
        //marktabang@gmail.com
        console.error(`userinfo`, error);
        res.json(500);
      }
    }
  );

  app.use("/api/user/", router);
};

export default UserController;
