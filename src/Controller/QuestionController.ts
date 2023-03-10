import { Request, Response } from "express";
import Question from "../database/schemas/Question";

class QuestionController {
  async find(request: any, response: Response) {
    try {
      const page = request.query.page || 1;
      const limit = request.query.limit || 10;
      const skip = (page - 1) * limit;
      const questions = await Question.find().skip(skip).limit(limit);
      const totalDocs = await Question.countDocuments();
      return response.json({
        docs: questions,
        totalDocs
      });
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }

  async findOne(request: any, response: Response) {
    try {
      const { id } = request.params;
      const question = await Question.findOne({ _id: id });
      return response.json(question);
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }

  async create(request: Request, response: Response) {
    const { title, text, alternatives, level, content, correctAnswer } =
      request.body;
    try {
      if (!title || !text || !alternatives || !level || !content || !correctAnswer) {
        return response.status(400).json({ error: 'Missing fields', message: 'Please fill them'});
      }

      const question = await Question.create({
        title,
        text,
        alternatives,
        level,
        content,
        correctAnswer,
      });
      return response.json(question);
    } catch (error) {
      return response.status(500).json({
        error: "Create question failed",
        message: error,
      });
    }
  }

  async update(request: any, response: Response) {
    const { id } = request.params;
    const { title, text, alternatives, level, content, correctAnswer } =
      request.body;
    try {
      if (!title || !text || !alternatives || !level || !content || !correctAnswer) {
        return response.status(400).json({ error: 'Missing fields', message: 'Please fill them'});
      }
      const question = await Question.findById(id);
      if (!question) {
        return response.status(404).json({
          error: "Question not found",
        });
      }

      const updatedQuestion = await Question.findOneAndUpdate(
        { _id: id },
        { $set: { title, text, alternatives, level, content, correctAnswer } },
        { new: true }
      );

      return response.json(updatedQuestion);
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }

  async delete(request: any, response: Response) {
    const { id } = request.params;

    try {
      const question = await Question.findById(id);
      if (!question) {
        return response.status(404).json({
          error: "Question not found",
        });
      }

      const deletedQuestion = await Question.deleteOne({ _id: id });

      return response.json(deletedQuestion);
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }
}

export default new QuestionController();
