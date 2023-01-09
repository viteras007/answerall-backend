import { Router } from "express";
import UserController from "../Controller/UserController";

const routes = Router();

routes.get("/list", UserController.find);

export default routes;
