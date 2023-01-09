import { Router } from "express";
import QuestionController from "../Controller/QuestionController";

const routes = Router();

routes.get("/list", QuestionController.find);
routes.get("/list/:id", QuestionController.findOne);
routes.post("/create", QuestionController.create);
routes.put("/update/:id", QuestionController.update);
routes.delete("/delete/:id", QuestionController.delete);

export default routes;
