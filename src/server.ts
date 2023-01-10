import express, { Request } from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
const app = express();

mongoose.connect('mongodb://localhost/answerall-dev')

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('🔥listening on port 3000');
})
