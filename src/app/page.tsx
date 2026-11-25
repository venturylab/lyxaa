import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/en";
import {
  lightLine,
  manifestoAfter,
  manifestoBefore,
  manifestoClose,
} from "@/content/lines";
import { release } from "@/content/links";
import { TrackIndex } from "@/components/TrackIndex";
import { Wordmark } from "@/design/Wordmark";
import { artistName, showLightLine } from "@/site.config";

export const metadata: Metadata = {
  title: { absolute: artistName },
  description: en.home.description,
  openGraph: {
    title: artistName,
    description: en.home.description,
  },
};

export default function HomePage() {
  const manifesto = [
    ...manifestoBefore,
    "",
    ...manifestoAfter,
    ...(showLightLine ? [lightLine] : []),
    manifestoClose,
  ].join("\n");

  return (
    <div className="wrap page stack">
      <h1 className="sr-only">{artistName}</h1>

      <div className="hero-frame" role="img" aria-label="Full-face portrait placeholder">
        <span className="hero-photo-label">PHOTO</span>
        <div className="hero-mark">
          <Wordmark variant="hero" />
        </div>
      </div>

      <div className="home-column">
        <p className="lede">{en.home.tagline}</p>
        <p className="manifesto">{manifesto}</p>
        <p>{en.home.intro}</p>
      </div>

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
