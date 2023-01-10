import { Request, Response } from "express";
import Exam from "../database/schemas/Exam";

class ExamController {
  async find(request: any, response: Response) {
    const { userId } = request.decoded;
    try {
      const exams = await Exam.find({ owner: userId }).populate(['questions']);
      return response.json(exams);
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
      const exam = await Exam.findOne({ _id: id }).populate(['questions']);
      return response.json(exam);
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }

  async create(request: any, response: Response) {
    const { userId } = request.decoded;
    const { title, questions } = request.body;
    try {
      const exam = await Exam.create({
        title,
        owner: userId,
        questions
      });
      return response.json(exam);
    } catch (error) {
      return response.status(500).json({
        error: "Create exam failed",
        message: error,
      });
    }
  }

  // async update(request: any, response: Response) {
  //   const { id } = request.params;
  //   const { title, text, alternatives, level, content, correctAnswer } =
  //     request.body;
  //   try {
  //     const question = await Question.findById(id);
  //     if (!question) {
  //       return response.status(404).json({
  //         error: "Question not found",
  //       });
  //     }

  //     const updatedQuestion = await Question.findOneAndUpdate(
  //       { _id: id },
  //       { $set: { title, text, alternatives, level, content, correctAnswer } },
  //       { new: true }
  //     );

  //     return response.json(updatedQuestion);
  //   } catch (error) {
  //     return response.status(500).json({
  //       error: "Something went wrong, please try again",
  //       message: error,
  //     });
  //   }
  // }

  // async delete(request: any, response: Response) {
  //   const { id } = request.params;

  //   try {
  //     const question = await Question.findById(id);
  //     if (!question) {
  //       return response.status(404).json({
  //         error: "Question not found",
  //       });
  //     }

  //     const deletedQuestion = await Question.deleteOne({ _id: id });

  //     return response.json(deletedQuestion);
  //   } catch (error) {
  //     return response.status(500).json({
  //       error: "Something went wrong, please try again",
  //       message: error,
  //     });
  //   }
  // }
}

export default new ExamController();
