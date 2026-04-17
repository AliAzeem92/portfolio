import Link from "next/link";

const sections = [
  { href: "/admin/dashboard/hero", label: "Hero", description: "Edit name, bio, roles, profile image" },
  { href: "/admin/dashboard/about", label: "About", description: "Edit bio, stats, location, resume" },
  { href: "/admin/dashboard/education", label: "Education", description: "Add, edit, delete education entries" },
  { href: "/admin/dashboard/projects", label: "Projects", description: "Add, edit, delete projects" },
  { href: "/admin/dashboard/skills", label: "Skills", description: "Add, edit, delete skills" },
  { href: "/admin/dashboard/contact", label: "Contact", description: "Edit email, phone, location" },
  { href: "/admin/dashboard/social-links", label: "Social Links", description: "Add, edit, delete social links" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome, Ali Azeem</h1>
      <p className="text-gray-400 mb-8">Manage your portfolio content from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-slate-800 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
          >
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {section.label}
            </h2>
            <p className="text-gray-400 text-sm">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
