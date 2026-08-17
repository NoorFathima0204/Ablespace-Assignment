"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Tasks",
      icon: "☷",
      href: "/",
    },
    {
      label: "Projects",
      icon: "▣",
      href: "/projects",
    },
  ];

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-[var(--border)] bg-[var(--surface)] md:flex md:flex-col">
      {/* Workspace */}
      <div className="flex h-[64px] items-center justify-between border-b border-[var(--border)] px-4">
        <button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#171717] text-xs font-semibold text-white dark:bg-white dark:text-[#171717]">
            D
          </div>

          <span className="text-sm font-medium text-[var(--foreground)]">
            Dexter
          </span>

          <span className="ml-1 text-xs text-[var(--muted)]">
            ▾
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
          Workspace
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-black/5 font-medium text-[var(--foreground)] dark:bg-white/10"
                    : "text-[var(--muted)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/5"
                }`}
              >
                <span className="flex w-4 justify-center text-[16px]">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] p-3">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--muted)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/5">
          <span>⚙</span>
          Settings
        </button>
      </div>
    </aside>
  );
}