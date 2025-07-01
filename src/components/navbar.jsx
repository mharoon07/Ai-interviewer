"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { currentUser, userLogout } from "../services/userService";
import Usercontext from "../context/userContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(Usercontext);

  const hideOnRoutes = [
    "/login",
    "/signup",
    "/login/candidate",
    "/login/recruiter",
    "/signup/recruiter",
    "/signup/candidate",
  ];

  useEffect(() => {
    setIsMounted(true);
    const checkLogin = async () => {
      try {
        const res = await currentUser();
        if (res.user) {
          setIsLoggedIn(true);
          setUserName(res.user?.name || "User");
        } else {
          setIsLoggedIn(false);
          setUserName("");
        }
      } catch (err) {
        console.error("Error fetching login state:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (!isMounted || isLoading || hideOnRoutes.includes(pathname)) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="p-4 bg-black text-white flex justify-between items-center shadow-md z-50"
    >
      <Link href="/" className="text-xl font-semibold">
        TradeMate
      </Link>
      {isLoggedIn ? (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span className="text-sm">Hi, {userName}</span>
          <button
            onClick={async () => {
              await userLogout();
              location.reload();
            }}
            className="text-red-400 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
