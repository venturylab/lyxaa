import { release } from "@/content/links";

export function TrackIndex() {
  return (
    <ol className="rule-list">
      {release.tracks.map((track) => (
        <li key={track.numeral}>
          <span className="numeral">{track.numeral}</span>
          <span>{track.title}</span>
          <span className="secondary date">{track.released}</span>
        </li>
      ))}
    </ol>
  );
}
