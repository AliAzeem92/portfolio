"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    // We don't necessarily need to set it to false because the page will transition away, 
    // but just in case it takes a moment to redirect.
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-slate-800 p-4 border-b border-white/10 absolute top-0 left-0 right-0 z-20">
        <h2 className="text-xl font-bold text-purple-400">Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 border-r border-white/10 flex flex-col p-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-purple-400 hidden lg:block">
            <Link href="/admin/dashboard">Admin Panel</Link>
          </h2>
          <h2 className="text-xl font-bold text-purple-400 lg:hidden">Menu</h2>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded-lg text-white transition-colors ${
            loading ? "bg-red-800 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </aside>

      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
