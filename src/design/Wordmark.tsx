/* The brand book requires the drawn wordmark, as an image, not typed text. */
/* eslint-disable @next/next/no-img-element */
import { artistName, wordmarks } from "@/site.config";

type WordmarkProps = {
  variant?: "header" | "hero";
};

export function Wordmark({ variant = "header" }: WordmarkProps) {
  if (variant === "hero") {
    return (
      <img className="logo-fendu" src={wordmarks.fenduOnDark} alt={artistName} />
    );
  }

  return <img className="logo-small" src={wordmarks.smallOnDark} alt={artistName} />;
}
