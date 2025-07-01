import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  candidateId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  recruiterId: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["in-person", "virtual"],
    default: "virtual",
  },
  location: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interview =
  mongoose.models.Interview || mongoose.model("Interview", interviewSchema);
export default Interview;
