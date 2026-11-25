import {
  artistLinks,
  platformOrder,
  type PlatformKey,
  type TrackLinkMap,
} from "@/content/links";

export type VisibleLink = {
  key: PlatformKey;
  href: string;
};

export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function visiblePlatforms(links: TrackLinkMap): VisibleLink[] {
  return platformOrder.flatMap((key) => {
    const href = links[key].trim();
    if (!isHttpsUrl(href)) return [];
    return [{ key, href }];
  });
}

export function visibleArtistLinks(): { label: string; href: string }[] {
  return artistLinks.filter((link) => isHttpsUrl(link.href));
}
