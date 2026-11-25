import Link from "next/link";
import { en } from "@/content/en";
import { Wordmark } from "@/design/Wordmark";
import { PrimaryNav } from "@/components/PrimaryNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="wordmark-link">
          <Wordmark />
        </Link>
        <PrimaryNav items={en.nav} />
      </div>
    </header>
  );
}
