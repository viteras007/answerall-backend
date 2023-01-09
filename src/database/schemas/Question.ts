import mongoose from "mongoose";

const Question = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  alternatives: {
    type: [String],
    required: true
  },
  level: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Question", Question);