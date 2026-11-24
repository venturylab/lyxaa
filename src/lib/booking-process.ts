import { en } from "@/content/en";
import {
  bookingPlainText,
  validateBooking,
  type BookingData,
  type BookingErrors,
} from "@/lib/booking-validate";

export type BookingEnv = {
  webhookUrl?: string;
  resendKey?: string;
  from?: string;
  to?: string;
};

export type BookingDelivery = {
  webhookUrl?: string;
  webhookBody?: BookingData;
  email?: {
    from: string;
    to: string;
    subject: string;
    text: string;
  };
};

export type ProcessResult =
  | { ok: true; mode: "preview" | "sent" }
  | { ok: false; status: number; errors: BookingErrors };

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export async function deliverBooking(delivery: BookingDelivery): Promise<void> {
  if (delivery.webhookUrl && delivery.webhookBody) {
    const response = await fetch(delivery.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(delivery.webhookBody),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("webhook failed");
  }

  if (delivery.email) {
    const key = clean(process.env.RESEND_API_KEY);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: delivery.email.from,
        to: [delivery.email.to],
        subject: delivery.email.subject,
        text: delivery.email.text,
      }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("email failed");
  }
}

export async function processBooking(
  input: unknown,
  env: BookingEnv,
  deliver: (delivery: BookingDelivery) => Promise<void> = deliverBooking,
): Promise<ProcessResult> {
  const validated = validateBooking(input);
  if (!validated.ok) return { ok: false, status: 400, errors: validated.errors };
  if (validated.honeypot) return { ok: true, mode: "preview" };

  const webhookUrl = clean(env.webhookUrl);
  const resendKey = clean(env.resendKey);
  const from = clean(env.from);
  const to = clean(env.to);

  if (!webhookUrl && !resendKey) return { ok: true, mode: "preview" };

  if (webhookUrl && !isHttpsUrl(webhookUrl)) {
    return { ok: false, status: 500, errors: { form: en.booking.errors.config } };
  }
  if (resendKey && (!from || !to)) {
    return { ok: false, status: 500, errors: { form: en.booking.errors.config } };
  }

  const delivery: BookingDelivery = {};
  if (webhookUrl) {
    delivery.webhookUrl = webhookUrl;
    delivery.webhookBody = validated.data;
  }
  if (resendKey) {
    delivery.email = {
      from,
      to,
      subject: "Booking request — LYXAA",
      text: bookingPlainText(validated.data),
    };
  }

  try {
    await deliver(delivery);
  } catch {
    return { ok: false, status: 502, errors: { form: en.booking.errors.send } };
  }

  return { ok: true, mode: "sent" };
}
