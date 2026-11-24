import Link from "next/link";
import { en } from "@/content/en";
import { Wordmark } from "@/design/Wordmark";
import { ArtistLinks } from "@/components/ArtistLinks";
import { isSiteIndexable } from "@/lib/indexing";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          <Wordmark />
        </p>
        <nav aria-label={en.footer.navLabel}>
          <ul className="footer-links">
            {en.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/legal">{en.footer.legal}</Link>
            </li>
            <li>
              <Link href="/privacy">{en.footer.privacy}</Link>
            </li>
            <li>
              <Link href="/fr/presse" hrefLang="fr" lang="fr">
                {en.footer.frenchPress}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer-span">
          <ArtistLinks label={en.footer.listen} />
        </div>
        <div className="footer-meta">
          <p className="secondary">{en.footer.copyright}</p>
          {isSiteIndexable() ? null : <p className="secondary">{en.footer.preview}</p>}
        </div>
      </div>
    </footer>
  );
}
