
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["candidate", "recruiter"],
    default: "candidate",
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  appliedInterviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
