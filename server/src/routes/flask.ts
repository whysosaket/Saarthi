import { checkPlagarism, getMarks } from "../controllers/flaskController";
import { Response, Router } from "express";

export default (router: Router) => {
    router.route("/api/flask/checkplagarism").post((req: any, res: Response)=>checkPlagarism(req, res));
    router.route("/api/flask/getmarks").post((req: any, res: Response)=>getMarks(req, res));
    // router.route("/api/flask/getaifeedback").post((req: any, res: Response)=>getAIfeedback(req, res));
}