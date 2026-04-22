"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/hero", label: "Hero" },
  { href: "/admin/dashboard/about", label: "About" },
  { href: "/admin/dashboard/education", label: "Education" },
  { href: "/admin/dashboard/certificates", label: "Certificates" },
  { href: "/admin/dashboard/projects", label: "Projects" },
  { href: "/admin/dashboard/skills", label: "Skills" },
  { href: "/admin/dashboard/contact", label: "Contact" },
  { href: "/admin/dashboard/social-links", label: "Social Links" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <aside className="w-64 bg-slate-800 border-r border-white/10 flex flex-col p-6">
        <h2 className="text-xl font-bold text-purple-400 mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
