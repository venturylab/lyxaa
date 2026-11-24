import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: en.notFound.title,
  description: en.notFound.description,
};

export default function NotFound() {
  return (
    <div className="wrap page">
      <h1>{en.notFound.heading}</h1>
      <p className="lede">{en.notFound.body}</p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/" className="text-link">
          {en.notFound.home}
        </Link>
      </p>
    </div>
  );
}
