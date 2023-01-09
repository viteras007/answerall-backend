import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: Number, // 1 - admin, 2 - usuario
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

User.pre('save', async function(next){
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
})

export default mongoose.model("User", User);