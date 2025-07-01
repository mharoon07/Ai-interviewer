import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/TestDb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected...");
    console.log("connected with host:", connection.connection.host);
  } catch (error) {
    console.log("failed to connect with database");
    console.error(error);
  }
};

export default connectDb;


