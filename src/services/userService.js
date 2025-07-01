import { httpaxios } from "../helper/httphelper.js";

export const loginUser = async (userData) => {
  console.log("Logging in with data:", userData);
  try {
    const response = await httpaxios.post("/api/login", userData, {
      withCredentials: true, 
    });
    console.log("Login response in user service:", response);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const currentUser = async () => {
  try {
    const response = await httpaxios.get("/api/current");
    console.log("Current user response in user service:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await httpaxios.post("/api/signup", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await httpaxios.post("/api/logout", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("userLogout error:", error);
    throw error;
  }
};

export async function getUser() {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}
