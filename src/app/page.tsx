import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/en";
import { signature } from "@/content/lines";
import { release } from "@/content/links";
import { TrackIndex } from "@/components/TrackIndex";
import { Wordmark } from "@/design/Wordmark";
import { artistName } from "@/site.config";

export const metadata: Metadata = {
  title: { absolute: artistName },
  description: en.home.description,
  openGraph: {
    title: artistName,
    description: en.home.description,
  },
};

export default function HomePage() {
  return (
    <div className="wrap page stack">
      <header className="hero">
        <h1>
          <Wordmark variant="hero" />
        </h1>
        <p className="lede">{en.home.tagline}</p>
      </header>

      <p className="signature">
        {signature.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <p className="measure">{en.home.intro}</p>

      <section aria-labelledby="release">
        <p className="kicker">{en.home.releaseKicker}</p>
        <h2 id="release">{release.title}</h2>
        <TrackIndex />
        <p style={{ marginTop: "1.25rem" }}>
          <Link href="/music" className="text-link">
            {en.home.viewRelease}
          </Link>
        </p>
      </section>

      <nav aria-label={en.home.indexLabel}>
        <ul className="page-index">
          {en.home.index.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span className="index-label">{item.label}</span>
                <span className="secondary">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
