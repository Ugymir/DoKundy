"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Obal nad next/link, který spolehlivě odscrolluje na kotvu (#id) i tehdy,
 * když už jsme na cílové stránce. Řeší chybu App Routeru, kdy odkaz na kotvu
 * na stejné stránce zabere až na druhé či třetí kliknutí.
 * Pro odkazy na jinou stránku i běžné odkazy se chová jako obyčejný <Link>.
 */
export default function SmartLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (typeof href !== "string") return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const targetPath = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);
    // Jen když jsme už na cílové stránce – jinak nech navigaci na Next.js.
    if (targetPath !== pathname) return;

    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView(); // respektuje scroll-behavior: smooth i scroll-padding-top z globals.css
    history.pushState(null, "", `#${id}`);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
