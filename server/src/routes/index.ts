import { Router } from "express";
import auth from "./auth";
import classroom from "./classroom";
import assignment from "./assignment";


const router = Router();

export default (): Router => {
  auth(router);
  classroom(router);
  assignment(router);
  return router;
};