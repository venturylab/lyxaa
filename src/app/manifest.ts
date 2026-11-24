import type { MetadataRoute } from "next";
import { artistName } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: artistName,
    short_name: artistName,
    display: "standalone",
    background_color: "#0B0B0C",
    theme_color: "#0B0B0C",
    icons: [
      {
        src: "/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
