import type { Metadata } from "next";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: en.legal.title,
  description: en.legal.description,
};

export default function LegalPage() {
  return (
    <div className="wrap page">
      <p className="kicker">{en.legal.kicker}</p>
      <h1>{en.legal.heading}</h1>
      <p className="lede">{en.legal.lede}</p>
      <p className="measure" style={{ marginTop: "1.25rem" }}>
        {en.legal.body}
      </p>
    </div>
  );
}
