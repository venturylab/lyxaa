import { en } from "@/content/en";
import { processBooking, type ProcessResult } from "@/lib/booking-process";

export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlPage(result: ProcessResult): string {
  const title = result.ok
    ? result.mode === "sent"
      ? en.booking.successSent
      : en.booking.successPreview
    : Object.values(result.errors).filter(Boolean).join(" ");
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${escapeHtml(en.live.title)} — LYXAA</title>
  </head>
  <body style="margin:0;background:#fff;color:#000;font-family:Georgia,serif;padding:3rem 1.25rem">
    <main style="max-width:36rem">
      <h1 style="font-weight:400;font-size:2.4rem">LYXAA</h1>
      <p>${escapeHtml(title)}</p>
      <p><a href="/live#booking">${escapeHtml(en.booking.htmlBack)}</a></p>
    </main>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let input: unknown = null;
  let asHtml = false;

  try {
    if (contentType.includes("application/json")) {
      input = await request.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      asHtml = true;
      const form = await request.formData();
      input = {
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        eventType: form.get("eventType"),
        date: form.get("date"),
        city: form.get("city"),
        budget: form.get("budget"),
        message: form.get("message"),
        consent: form.get("consent"),
        website: form.get("website"),
      };
    }
  } catch {
    input = null;
  }

  const result = await processBooking(input, {
    webhookUrl: process.env.BOOKING_WEBHOOK_URL,
    resendKey: process.env.RESEND_API_KEY,
    from: process.env.BOOKING_FROM_EMAIL,
    to: process.env.BOOKING_TO_EMAIL,
  });

  const headers = { "cache-control": "no-store" };
  if (asHtml) {
    return new Response(htmlPage(result), {
      status: result.ok ? 200 : result.status,
      headers: { ...headers, "content-type": "text/html; charset=utf-8" },
    });
  }

  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: result.status, headers });
  }
  return Response.json({ ok: true, mode: result.mode }, { headers });
}
