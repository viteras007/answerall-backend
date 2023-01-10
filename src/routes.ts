import { Router } from 'express';
import UserController from './Controller/UserController';
import usersRouter from './routes/UserRoutes';
import questionRoutes from './routes/QuestionRoutes';
import examRoutes from './routes/ExamRoutes';
import verifyToken from './middleware/AuthMiddleware';
const routes = Router();

routes.use('/login', UserController.login);
routes.use('/register', UserController.create);

routes.use('/users', verifyToken, usersRouter);
routes.use('/questions', verifyToken, questionRoutes);
routes.use('/exam', verifyToken, examRoutes);

export default routes;