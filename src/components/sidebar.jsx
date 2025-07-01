"use client";
import { HomeIcon, UserIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
    { href: "/profile", icon: UserIcon, label: "Profile" },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 px-6 py-8 flex flex-col bg-gradient-to-b from-[#1e1e1e] via-black to-[#0a0a0a] shadow-lg border-r border-gray-800">
      <h1 className="text-white text-3xl font-bold mb-12 tracking-tight">
        AI Interviewer
      </h1>

      <nav className="flex flex-col gap-4 text-sm">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
              pathname === href
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto text-xs text-gray-500 px-2">
        &copy; {new Date().getFullYear()} AI Interviewer
      </div>
    </aside>
  );
}
