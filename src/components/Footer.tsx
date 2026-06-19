import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/40 bg-sea/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-wide">
            Z Vysočiny do Kundy
          </p>
          <p className="mt-1 max-w-md text-sm text-muted">
            Parta kamarádů z Vysočiny. Každé léto na kolech o kus dál — všechny
            fotky jsou naše vlastní, přímo z cest.
          </p>
        </div>
        <nav aria-label="Patička">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href="/#cesty" className="text-muted transition-colors duration-200 hover:text-ink">
                Naše cesty
              </Link>
            </li>
            <li>
              <Link href="/prednasky" className="text-muted transition-colors duration-200 hover:text-ink">
                Přednášky
              </Link>
            </li>
            <li>
              <Link href="/#o-nas" className="text-muted transition-colors duration-200 hover:text-ink">
                O nás
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line/30">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted sm:px-6">
          © 2026 · Z Vysočiny do Kundy · Léto co léto, kilometr po kilometru.
        </p>
      </div>
    </footer>
  );
}
