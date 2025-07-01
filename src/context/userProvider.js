"use client";
import { useState, useEffect } from "react";
import { currentUser } from "../services/userService";
import UserContext from "./userContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await currentUser();
        console.log("Current user response:", response);
        if (response) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
