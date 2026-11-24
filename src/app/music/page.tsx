import type { Metadata } from "next";
import { en } from "@/content/en";
import { release } from "@/content/links";
import { ArtistLinks } from "@/components/ArtistLinks";
import { TrackLinks } from "@/components/TrackLinks";

export const metadata: Metadata = {
  title: en.music.title,
  description: en.music.description,
};

export default function MusicPage() {
  return (
    <div className="wrap page stack">
      <header>
        <p className="kicker">{en.music.kicker}</p>
        <h1>{release.title}</h1>
        <p className="lede">{en.music.lede}</p>
        <p className="secondary" style={{ marginTop: "1rem" }}>
          {en.music.spotifyNote}
        </p>
      </header>
      <TrackLinks />
      <section aria-labelledby="artist">
        <h2 id="artist">{en.music.artistHeading}</h2>
        <ArtistLinks label={en.music.artistLabel} />
      </section>
    </div>
  );
}
