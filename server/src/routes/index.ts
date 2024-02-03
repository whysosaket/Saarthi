import { Router } from "express";
import auth from "./auth";
import classroom from "./classroom";
import assignment from "./assignment";
import student from "./student";
import flask from "./flask";


const router = Router();

export default (): Router => {
  auth(router);
  classroom(router);
  assignment(router);
  student(router);
  flask(router);
  return router;
};