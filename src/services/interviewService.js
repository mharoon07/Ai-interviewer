import { httpaxios } from "../helper/httphelper.js";

export const ApplyForJob = async (jobdata) => {
  try {
    const response = await httpaxios.post("/api/Applyforjob", jobdata, {
      withCredentials: true,
    });
    console.log(response + "Response only ");
    console.log(response.data + "Response data ");
    return response.data;
  } catch (error) {
    console.error("ApplyForJob :", error);
    throw error;
  }
};
export const getappliedjobs = async () => {
  try {
    const response = await httpaxios.get("/api/getappliedjobs", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("getappliedjobs:", error);
    throw error;
  }
};

export const CheckSession = async (data) => {
  try {
    console.log(data + "Data")
    if (!data) { return; }
    const response = await httpaxios.post("/api/stepAnalysis", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("ResumeAnalyzer Error:", error?.response?.data || error.message);
    throw error;
  }
};
export const ResumeAnalysis = async (file) => {
  try {
    const response = await httpaxios.post("/api/ResumeAnalyzer", file, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("ResumeAnalyzer Error:", error);
    throw error;
  }
};
