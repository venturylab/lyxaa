import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { platformLabels } from "../src/content/en";
import { noticeEn, noticeFr, oneLinerEn, oneLinerFr } from "../src/content/lines";
import { artistLinks, release } from "../src/content/links";
import { artistName, wordmarks } from "../src/site.config";
import { processBooking } from "../src/lib/booking-process";
import { validateBooking } from "../src/lib/booking-validate";
import { visiblePlatforms } from "../src/lib/streaming";

const expected = [
  {
    numeral: "I",
    title: "Underneath the Strobe Lights",
    released: "11/11/2026",
    appleMusic:
      "https://music.apple.com/fr/album/underneath-the-strobe-lights/6833586652?i=6833586653",
    deezer: "https://www.deezer.com/track/4407964681",
    youtube: "https://www.youtube.com/watch?v=tmXV1Zfir4w",
    tidal: "https://tidal.com/track/578180033",
    amazonMusic: "https://music.amazon.com/albums/B0HRC3L4JG?trackAsin=B0HRC79K16",
  },
  {
    numeral: "II",
    title: "Quiet Fire",
    released: "04/11/2026",
    appleMusic: "https://music.apple.com/fr/album/quiet-fire/6830906618?i=6830906619",
    deezer: "",
    youtube: "https://www.youtube.com/watch?v=GpSiMh4_ei8",
    tidal: "https://tidal.com/track/576090941",
    amazonMusic: "https://music.amazon.com/albums/B0HQG16688?trackAsin=B0HQFB2Q1L",
  },
  {
    numeral: "III",
    title: "Keep the Time",
    released: "01/11/2026",
    appleMusic: "https://music.apple.com/fr/album/keep-the-time/6829503929?i=6829503930",
    deezer: "",
    youtube: "https://www.youtube.com/watch?v=ez_icen0D1k",
    tidal: "https://tidal.com/track/575119028",
    amazonMusic: "https://music.amazon.com/albums/B0HQ1M7NZG?trackAsin=B0HQ19NKNN",
  },
] as const;

const validRequest = {
  name: "Camille Martin",
  company: "Club Example",
  email: "camille@example.com",
  eventType: "club",
  date: "2026-12-12",
  city: "Lyon",
  budget: "",
  message: "We would like a DJ set in December.",
  consent: true,
  website: "",
};

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return [full];
  });
}

test("release titles, order, dates, and addresses stay exact", () => {
  assert.equal(release.title, "TRIPTYQUE");
  assert.equal(release.tracks.length, 3);
  release.tracks.forEach((track, index) => {
    const row = expected[index];
    assert.equal(track.numeral, row.numeral);
    assert.equal(track.title, row.title);
    assert.equal(track.released, row.released);
    assert.equal(track.links.appleMusic, row.appleMusic);
    assert.equal(track.links.deezer, row.deezer);
    assert.equal(track.links.youtube, row.youtube);
    assert.equal(track.links.tidal, row.tidal);
    assert.equal(track.links.amazonMusic, row.amazonMusic);
    assert.equal(track.links.spotify, "");
  });
  assert.deepEqual(
    visiblePlatforms(release.tracks[0].links).map((link) => link.key),
    ["appleMusic", "deezer", "youtube", "tidal", "amazonMusic"],
  );
  assert.equal(visiblePlatforms(release.tracks[1].links).some((link) => link.key === "deezer"), false);
  assert.equal(visiblePlatforms(release.tracks[2].links).some((link) => link.key === "spotify"), false);
  assert.deepEqual(
    visiblePlatforms({
      appleMusic: "",
      deezer: "   ",
      youtube: "javascript:alert(1)",
      tidal: "http://tidal.com/track/1",
      amazonMusic: "",
      spotify: "",
    }),
    [],
  );
});

test("the stage name and the public lines stay in one place", () => {
  assert.equal(artistName, "LYXAA");
  assert.equal(oneLinerEn, "Producer and DJ. Black and white. AI is one of the instruments.");
  assert.equal(noticeEn, "Music and visuals made using AI.");
  assert.equal(oneLinerFr, "Productrice et DJ. Noir et blanc. L'IA fait partie des instruments.");
  assert.equal(noticeFr, "Musique et visuels réalisés au moyen de l'IA.");
  assert.equal(wordmarks.fenduOnDark, `/brand/${artistName}-wordmark-fendu-blanc.svg`);
  assert.equal(wordmarks.smallOnDark, `/brand/${artistName}-wordmark-plein-petites-tailles-blanc.svg`);
});

test("artist pages and platform label", () => {
  assert.equal(platformLabels.youtube, "YouTube");
  assert.equal(JSON.stringify(platformLabels).includes("YouTube Music"), false);
  assert.deepEqual(
    artistLinks.map((link) => link.href),
    [
      "https://music.apple.com/fr/artist/lyxaa/6805384271",
      "https://www.deezer.com/artist/427469121",
    ],
  );
});

test("pages do not embed a player", () => {
  const outbound = readFileSync("src/components/OutboundLink.tsx", "utf8");
  assert.match(outbound, /target="_blank"/);
  assert.match(outbound, /rel="noopener noreferrer"/);
  for (const file of walk("src")) {
    if (!/\.(ts|tsx|css|svg)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    assert.equal(text.includes("<iframe"), false, file);
    assert.equal(text.includes("youtube.com/embed"), false, file);
    assert.equal(text.includes("youtube-nocookie"), false, file);
  }
});

test("booking validation accepts a complete request and rejects mistakes", () => {
  const ok = validateBooking(validRequest);
  assert.equal(ok.ok, true);
  if (ok.ok && !ok.honeypot) assert.equal(ok.data.city, "Lyon");

  const missing = validateBooking({ ...validRequest, email: "not-an-email", consent: false });
  assert.equal(missing.ok, false);
  if (!missing.ok) {
    assert.equal(typeof missing.errors.email, "string");
    assert.equal(typeof missing.errors.consent, "string");
  }

  assert.equal(validateBooking({ ...validRequest, date: "2026-02-31" }).ok, false);
  assert.equal(validateBooking({ ...validRequest, budget: "secret" }).ok, false);
  const trap = validateBooking({ ...validRequest, name: "", website: "filled" });
  assert.equal(trap.ok, true);
  if (trap.ok) assert.equal(trap.honeypot, true);
});

test("preview mode validates and does not deliver", async () => {
  let calls = 0;
  const result = await processBooking(validRequest, {}, async () => {
    calls += 1;
  });
  assert.deepEqual(result, { ok: true, mode: "preview" });
  assert.equal(calls, 0);

  const trapped = await processBooking(
    { ...validRequest, website: "http://spam.example" },
    { webhookUrl: "https://hooks.example/booking" },
    async () => {
      calls += 1;
    },
  );
  assert.deepEqual(trapped, { ok: true, mode: "preview" });
  assert.equal(calls, 0);
});

test("a configured webhook receives the request once", async () => {
  const seen: unknown[] = [];
  const result = await processBooking(
    { ...validRequest, budget: "2000-5000" },
    { webhookUrl: "https://hooks.example/booking" },
    async (delivery) => {
      seen.push(delivery);
    },
  );
  assert.deepEqual(result, { ok: true, mode: "sent" });
  assert.equal(seen.length, 1);
  const delivery = seen[0] as { webhookBody?: { email?: string; website?: string } };
  assert.equal(delivery.webhookBody?.email, "camille@example.com");
  assert.equal("website" in (delivery.webhookBody ?? {}), false);
});

test("a bad provider setup is rejected", async () => {
  const badUrl = await processBooking(validRequest, { webhookUrl: "http://hooks.example/booking" }, async () => {
    throw new Error("should not send");
  });
  assert.equal(badUrl.ok, false);
  if (!badUrl.ok) assert.equal(badUrl.status, 500);

  const missingFrom = await processBooking(validRequest, { resendKey: "test-key", to: "booker@example.com" }, async () => {
    throw new Error("should not send");
  });
  assert.equal(missingFrom.ok, false);
});
