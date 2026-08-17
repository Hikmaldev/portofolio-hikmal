import Link from "next/link";

const menus = [
  { href: "/panel-x7k2", label: "Dashboard" },
  { href: "/panel-x7k2/profile", label: "Profile" },
  { href: "/panel-x7k2/projects", label: "Projects" },
  { href: "/panel-x7k2/skills", label: "Skills" },
  { href: "/panel-x7k2/experience", label: "Experience" },
];

export function AdminNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {menus.map((menu) => (
        <Link key={menu.href} href={menu.href} className="rounded-full border border-black/15 px-4 py-2 text-sm">
          {menu.label}
        </Link>
      ))}
      <form action="/api/admin/logout" method="post">
        <button type="submit" className="rounded-full bg-black px-4 py-2 text-sm text-white">
          Logout
        </button>
      </form>
    </nav>
  );
}
