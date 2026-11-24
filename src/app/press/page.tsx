import type { Metadata } from "next";
import { en } from "@/content/en";
import { PressKit } from "@/components/PressKit";

export const metadata: Metadata = {
  title: en.press.title,
  description: en.press.description,
};

export default function PressPage() {
  return (
    <div className="wrap page">
      <PressKit copy={en.press} lang="en" />
    </div>
  );
}
