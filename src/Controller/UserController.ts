import {Request, Response} from 'express';
import User from '../database/schemas/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {

  async find(request: any, response: Response) {
    try {
      const { decoded } = request;
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({
        error: 'Something went wrong, please try again',
        message: error
      })
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({ email }, { password: 1 });
      if(!user){
        return response.status(404).json({
          error: 'User not found',
          message: 'User not found'
        })
      }

      bcrypt.compare(password, user.password)
      .then((result) => {
        if (!result) {
          response.status(401).json({ message: 'Invalid credentials' });
        }
          const token = jwt.sign({
            userId: user._id,
            email: user.email,
          }, 'my-secret-key', { expiresIn: '10h' });
          response.json({ token });
      })
      .catch((err) => {
        response.status(500).json({
          error: 'Something went wrong, please try again',
          message: err,
        });
      });

    } catch (error) {
      return response.status(500).json({
        error: 'Something went wrong, please try again',
        message: error
      })
    }
  }

  async create(request: Request, response: Response) {
    const { name, email, password, role } = request.body;
    try {
      const userExists = await User.findOne({ email: email});

      if (userExists){
        return response.status(400).json({
          error: 'User already exists',
          message: 'email already exists'
        })
      }

      const user = await User.create({
        name,
        email,
        password,
        role
      });
      return response.json(user);
    } catch (error) {
      return response.status(500).json({
        error: 'Registration failed',
        message: error
      })
    }
  }
}

export default new UserController;