import { platformLabels, en } from "@/content/en";
import { release } from "@/content/links";
import { OutboundLink } from "@/components/OutboundLink";
import { visiblePlatforms } from "@/lib/streaming";

export function TrackLinks() {
  return (
    <div className="tracks">
      {release.tracks.map((track) => {
        const links = visiblePlatforms(track.links);
        const headingId = `track-${track.numeral}`;
        return (
          <article key={track.numeral} className="track" aria-labelledby={headingId}>
            <div className="track-head">
              <h2 id={headingId}>
                <span className="numeral">{track.numeral}</span>
                <span className="title">{track.title}</span>
              </h2>
              <p className="secondary released">
                {en.music.released} {track.released}
              </p>
            </div>
            {links.length > 0 ? (
              <ul className="link-row" aria-label={`${en.music.linksLabel}: ${track.title}`}>
                {links.map((link) => (
                  <li key={link.key}>
                    <OutboundLink href={link.href} className="link-button">
                      {platformLabels[link.key]}
                    </OutboundLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="secondary empty-links">
                <span>{en.music.comingSoon}</span>
                <span lang="fr">{en.music.comingSoonAlso}</span>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
