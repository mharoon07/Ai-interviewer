import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Software Engineering",
        "UI/UX Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Product Management",
        "Data Science",
        "DevOps",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      required: true,
      default: "open",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
      default: "full-time",
    },
    workMode: {
      type: String,
      enum: ["remote", "in-office", "hybrid"],
      required: true,
      default: "remote",
    },
    salary: {
      type: String,
      default: "",
    },
    timing: {
      type: String,
      default: "",
    },
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
