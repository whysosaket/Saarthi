import { Router, Response } from "express";

import { createUser, loginUser } from "../controllers/authController";

export default (router: Router) => {
    router.route("/api/auth/login").post((req: any, res: Response)=>loginUser(req, res));
    router.route("/api/auth/createuser").post((req: any, res: Response)=>createUser(req, res));
}