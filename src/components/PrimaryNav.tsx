"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/press") return pathname === "/press" || pathname === "/fr/presse";
  return pathname === href;
}

export function PrimaryNav({ items }: { items: readonly Item[] }) {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
