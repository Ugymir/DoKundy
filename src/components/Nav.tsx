import Link from "next/link";

const links: { href: string; label: string; mobileHidden?: boolean }[] = [
  // „Domů“ na mobilu zastoupí logo
  { href: "/", label: "Domů", mobileHidden: true },
  { href: "/#cesty", label: "Naše cesty" },
  { href: "/prednasky", label: "Přednášky" },
  { href: "/#o-nas", label: "O nás" },
];

export default function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 border-b border-line/40 bg-sea/75 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav
        aria-label="Hlavní navigace"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-wide sm:text-2xl"
        >
          Do Kundy
          <span className="ml-2 align-middle font-display text-sm font-semibold text-accent">
            2026
          </span>
        </Link>
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {links.map((l) => (
            <li key={l.href} className={l.mobileHidden ? "hidden sm:block" : ""}>
              <Link
                href={l.href}
                className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-raised hover:text-ink sm:px-3.5 sm:text-base"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
