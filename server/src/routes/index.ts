import { Router } from "express";
import auth from "./auth";
import classroom from "./classroom";


const router = Router();

export default (): Router => {
  auth(router);
  classroom(router);
  return router;
};