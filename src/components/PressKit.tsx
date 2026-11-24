import Link from "next/link";
import { release } from "@/content/links";
import { pressPhotos } from "@/content/press-photos";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export type PressCopy = {
  kicker: string;
  heading: string;
  languageLabel: string;
  shortHeading: string;
  shortBio: string;
  notice: string;
  longHeading: string;
  longBio: string;
  discoHeading: string;
  discoNote: string;
  released: string;
  riderHeading: string;
  rider: string;
  photosHeading: string;
  photosNote: string;
  photoAlts: readonly string[];
  epkHeading: string;
  epk: string;
  bookingHeading: string;
  booking: string;
  bookingCta: string;
};

export function PressKit({ copy, lang }: { copy: PressCopy; lang: "en" | "fr" }) {
  return (
    <article className="stack" lang={lang}>
      <div>
        <nav className="lang-switch" aria-label={copy.languageLabel}>
          <Link href="/press" hrefLang="en" lang="en" aria-current={lang === "en" ? "page" : undefined}>
            EN
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/fr/presse"
            hrefLang="fr"
            lang="fr"
            aria-current={lang === "fr" ? "page" : undefined}
          >
            FR
          </Link>
        </nav>
        <p className="kicker" style={{ marginTop: "2rem" }}>
          {copy.kicker}
        </p>
        <h1>{copy.heading}</h1>
      </div>

      <section aria-labelledby="short-bio">
        <h2 id="short-bio">{copy.shortHeading}</h2>
        <p className="lede">{copy.shortBio}</p>
        <p className="notice">{copy.notice}</p>
      </section>

      <section aria-labelledby="long-bio">
        <h2 id="long-bio">{copy.longHeading}</h2>
        <p className="placeholder-copy" style={{ marginTop: "1rem" }}>
          {copy.longBio}
        </p>
      </section>

      <section aria-labelledby="disco">
        <h2 id="disco">{copy.discoHeading}</h2>
        <p className="lede">{release.title}</p>
        <ol className="rule-list">
          {release.tracks.map((track) => (
            <li key={track.numeral}>
              <span className="numeral">{track.numeral}</span>
              <span>{track.title}</span>
              <span className="secondary date">
                {copy.released} {track.released}
              </span>
            </li>
          ))}
        </ol>
        <p className="measure" style={{ marginTop: "1rem" }}>
          <Link href="/music">{copy.discoNote}</Link>
        </p>
      </section>

      <section aria-labelledby="rider">
        <h2 id="rider">{copy.riderHeading}</h2>
        <p className="placeholder-copy" style={{ marginTop: "1rem" }}>
          {copy.rider}
        </p>
      </section>

      <section aria-labelledby="photos">
        <h2 id="photos">{copy.photosHeading}</h2>
        <p className="long" style={{ marginTop: "1rem" }}>
          {copy.photosNote}
        </p>
        <div className="photo-grid">
          {pressPhotos.map((photo, index) => (
            <PhotoPlaceholder
              key={photo.id}
              ratio={photo.ratio}
              label={copy.photoAlts[index] ?? copy.photosHeading}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="epk">
        <h2 id="epk">{copy.epkHeading}</h2>
        <p className="placeholder-copy" style={{ marginTop: "1rem" }}>
          {copy.epk}
        </p>
      </section>

      <section aria-labelledby="press-booking">
        <h2 id="press-booking">{copy.bookingHeading}</h2>
        <p className="long" style={{ marginTop: "1rem" }}>
          {copy.booking}
        </p>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/live#booking" className="text-link">
            {copy.bookingCta}
          </Link>
        </p>
      </section>
    </article>
  );
}
