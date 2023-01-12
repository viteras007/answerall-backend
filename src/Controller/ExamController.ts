import { Request, Response } from "express";
import Exam from "../database/schemas/Exam";

class ExamController {
  async find(request: any, response: Response) {
    const { userId } = request.decoded;
    try {
      const page = request.query.page || 1;
      const limit = request.query.limit || 10;
      const skip = (page - 1) * limit;
      const exams = await Exam.find({ owner: userId }).populate(['questions']).skip(skip).limit(limit);
      const totalDocs = await Exam.countDocuments();
      return response.json({
        docs: exams,
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
      if (!title || !questions) {
        return response.status(400).json({ error: 'Missing fields', message: 'Please fill them'});
      }
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

  async update(request: any, response: Response) {
    const { id } = request.params;
    const { title, questions } = request.body;
    try {
      if (!title || !questions) {
        return response.status(400).json({ error: 'Missing fields', message: 'Please fill them'});
      }
      const exam = await Exam.findById(id);
      if (!exam) {
        return response.status(404).json({
          error: "Exam not found",
        });
      }

      const updatedExam = await Exam.findOneAndUpdate(
        { _id: id },
        { $set: { title, questions } },
        { new: true }
      );

      return response.json(updatedExam);
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
      const exam = await Exam.findById(id);
      if (!exam) {
        return response.status(404).json({
          error: "Exam not found",
        });
      }

      const deletedExam = await Exam.deleteOne({ _id: id });

      return response.json(deletedExam);
    } catch (error) {
      return response.status(500).json({
        error: "Something went wrong, please try again",
        message: error,
      });
    }
  }
}

export default new ExamController();
