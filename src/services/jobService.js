import { httpaxios } from "../helper/httphelper.js";

export const postJob = async (jobdata) => {
  try {
    const response = await httpaxios.post("/api/postjob", jobdata, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("postJob:", error);
    throw error;
  }
};
export const getJobsByRecruiter = async () => {
  try {
    const response = await httpaxios.get("/api/getrecuiterjob", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("getJobsByRecruiter", error);
    throw error;
  }
};
export const getAllJobs = async () => {
  try {
    const response = await httpaxios.get("/api/allJobs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("getAllJobs :", error);
    throw error;
  }
};
export const jobApplicants = async (jobid) => {
  try {
   
    const response = await httpaxios.post("/api/jobapplicants", jobid, {
      withCredentials: true,
    })
    console.log(JSON.stringify(response) + "response");
    return response.data;
  } catch (error) {
    console.error("jobApplicants :", error);
    throw error;
  }
};
