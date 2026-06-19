import Link from "next/link";

export type Talk = {
  /** např. „12. 11. 2026“ */
  datum: string;
  /** např. „Kino Dukla, Jihlava“ */
  misto: string;
  /** URL rezervace; bez ní se zobrazí „již brzy“ */
  odkaz?: string;
};

/**
 * Sem stačí přidávat řádky, tabulka se vykreslí sama, např.:
 * { datum: "12. 11. 2026", misto: "Kino Dukla, Jihlava", odkaz: "https://..." }
 */
export const talks: Talk[] = [];

export default function PrednaskyTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line/50">
      <table className="w-full text-left">
        <caption className="sr-only">
          Termíny přednášek: datum, místo a odkaz na rezervaci
        </caption>
        <thead className="bg-raised/60">
          <tr className="font-display text-lg uppercase tracking-wide">
            <th scope="col" className="px-5 py-3.5 font-semibold">
              Datum
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold">
              Místo
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold">
              Rezervace
            </th>
          </tr>
        </thead>
        <tbody>
          {talks.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <div className="px-6 py-16 text-center sm:py-20">
                  <svg
                    className="mx-auto text-muted"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18M9.5 16.5 11 18l3.5-3.5" />
                  </svg>
                  <h2 className="mt-4 font-display text-2xl font-bold uppercase">
                    Zatím žádné termíny
                  </h2>
                  <p className="mx-auto mt-3 max-w-[52ch] text-muted">
                    Po dokončení naší cesty do Kundy pro vás chystáme sérii
                    přednášek. Termíny, místa a odkazy na rezervaci doplníme
                    sem. Už teď se můžete těšit!
                  </p>
                  <Link
                    href="/#cesty"
                    className="mt-6 inline-block font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline"
                  >
                    Mezitím si projděte, kam jsme už dojeli →
                  </Link>
                </div>
              </td>
            </tr>
          ) : (
            talks.map((talk) => (
              <tr
                key={`${talk.datum}-${talk.misto}`}
                className="border-t border-line/40 transition-colors duration-200 hover:bg-raised/40"
              >
                <td className="px-5 py-4 font-medium whitespace-nowrap">{talk.datum}</td>
                <td className="px-5 py-4">{talk.misto}</td>
                <td className="px-5 py-4">
                  {talk.odkaz ? (
                    <a
                      href={talk.odkaz}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Rezervovat místo
                    </a>
                  ) : (
                    <span className="text-muted">již brzy</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
