import { Router } from "express";
import ExamController from "../Controller/ExamController";

const routes = Router();

routes.get("/list", ExamController.find);
routes.get("/list/:id", ExamController.findOne);
routes.post("/create", ExamController.create);
// routes.put("/update/:id", ExamController.update);
// routes.delete("/delete/:id", ExamController.delete);

export default routes;
