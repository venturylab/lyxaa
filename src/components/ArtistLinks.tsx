import { OutboundLink } from "@/components/OutboundLink";
import { visibleArtistLinks } from "@/lib/streaming";

export function ArtistLinks({ label }: { label: string }) {
  const links = visibleArtistLinks();
  if (links.length === 0) return null;

  return (
    <nav aria-label={label}>
      <ul className="link-row">
        {links.map((link) => (
          <li key={link.href}>
            <OutboundLink href={link.href} className="link-button">
              {link.label}
            </OutboundLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
