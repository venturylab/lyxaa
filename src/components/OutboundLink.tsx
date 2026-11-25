import type { ReactNode } from "react";
import { en } from "@/content/en";

type OutboundLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function OutboundLink({ href, className, children }: OutboundLinkProps) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> ({en.opensInNewTab})</span>
    </a>
  );
}
