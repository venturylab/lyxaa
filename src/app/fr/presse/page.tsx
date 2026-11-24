import type { Metadata } from "next";
import { frPress } from "@/content/fr-press";
import { PressKit } from "@/components/PressKit";

export const metadata: Metadata = {
  title: frPress.title,
  description: frPress.description,
  openGraph: {
    locale: "fr_FR",
  },
  alternates: {
    languages: {
      en: "/press",
      fr: "/fr/presse",
    },
  },
};

export default function FrenchPressPage() {
  return (
    <div className="wrap page">
      <PressKit copy={frPress} lang="fr" />
    </div>
  );
}
