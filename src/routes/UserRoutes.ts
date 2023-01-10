import { Router } from "express";
import UserController from "../controller/UserController";

const routes = Router();

routes.get("/list", UserController.find);

export default routes;
