"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
];

export default function Nav() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  if (isLoggedIn) {
    links.push({ href: "/profile", label: "Profile" });
  }
  const pathname = usePathname();

  return (
    <nav className="flex flex-row justify-around p-6 font-semibold text-background">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-accent ${
              isActive
                ? "underline decoration-accent decoration-2 underline-offset-4"
                : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
