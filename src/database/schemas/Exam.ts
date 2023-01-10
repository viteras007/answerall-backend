import mongoose from "mongoose";
import Question from './Question';

const Exam = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Question'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Exam", Exam);