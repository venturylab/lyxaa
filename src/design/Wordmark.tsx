/* The brand book requires the drawn wordmark, as an image, not typed text. */
/* eslint-disable @next/next/no-img-element */
import { artistName, wordmarks } from "@/site.config";

type WordmarkProps = {
  variant?: "header" | "hero";
};

export function Wordmark({ variant = "header" }: WordmarkProps) {
  const wide = variant === "hero" ? "logo logo-hero" : "logo logo-header";
  return (
    <span className={wide}>
      <img className="logo-small" src={wordmarks.smallOnDark} alt={artistName} />
      <img className="logo-fendu" src={wordmarks.fenduOnDark} alt={artistName} />
    </span>
  );
}
