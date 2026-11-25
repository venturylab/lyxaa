import type { Metadata } from "next";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: en.privacy.title,
  description: en.privacy.description,
};

export default function PrivacyPage() {
  return (
    <div className="wrap page">
      <p className="kicker">{en.privacy.kicker}</p>
      <h1>{en.privacy.heading}</h1>
      <p className="lede">{en.privacy.lede}</p>
      <p className="long" style={{ marginTop: "1.25rem" }}>
        {en.privacy.body}
      </p>
    </div>
  );
}
