import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interviews", // or your actual model name
    required: true,
  },
  steps: [
    {
      stepName: String,
      status: {
        type: String,
        enum: ["pending", "completed", "skipped"],
        default: "pending",
      },
      score: Number,
      remarks: String,
    }
  ],
  overallScore: Number,
  capabilityStatus: {
    type: String,
    enum: ["fit", "needs_review", "not_fit"],
  },
  feedback: String,
});

// ✅ Fix: Use existing model if already defined
export default mongoose.models.InterviewSession ||
  mongoose.model("InterviewSession", interviewSessionSchema);
