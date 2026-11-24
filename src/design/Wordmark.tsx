export const wordmarkText = "LYXAA";

type WordmarkProps = {
  variant?: "default" | "hero";
};

export function Wordmark({ variant = "default" }: WordmarkProps) {
  const className = variant === "hero" ? "wordmark wordmark-hero" : "wordmark";
  return <span className={className}>{wordmarkText}</span>;
}
