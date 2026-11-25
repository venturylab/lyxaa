import { budgetOptions, en, eventTypeOptions } from "@/content/en";

export type BookingData = {
  name: string;
  company: string;
  email: string;
  eventType: string;
  date: string;
  city: string;
  budget: string;
  message: string;
};

export type BookingErrors = Partial<
  Record<keyof BookingData | "form" | "consent", string>
>;

export type ValidBooking =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; data: BookingData }
  | { ok: false; errors: BookingErrors };

const eventValues = new Set<string>(eventTypeOptions.map((option) => option.value));
const budgetValues = new Set<string>(budgetOptions.map((option) => option.value));

const messages = en.booking.errors;

function asRecord(input: unknown): Record<string, unknown> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  return input as Record<string, unknown>;
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value : "";
}

function readConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "yes";
}

function hasControlCharacter(value: string): boolean {
  return /[\u0000-\u001F]/.test(value);
}

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateBooking(input: unknown): ValidBooking {
  const source = asRecord(input);
  if (!source) return { ok: false, errors: { form: messages.form } };

  if (readString(source, "website").trim()) {
    return { ok: true, honeypot: true };
  }

  const name = readString(source, "name").trim();
  const company = readString(source, "company").trim();
  const email = readString(source, "email").trim();
  const eventType = readString(source, "eventType").trim();
  const date = readString(source, "date").trim();
  const city = readString(source, "city").trim();
  const budget = readString(source, "budget").trim();
  const message = readString(source, "message").trim();
  const consent = readConsent(source.consent);
  const errors: BookingErrors = {};

  if (name.length < 2 || name.length > 80 || hasControlCharacter(name)) {
    errors.name = messages.name;
  }
  if (company.length < 2 || company.length > 120 || hasControlCharacter(company)) {
    errors.company = messages.company;
  }
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    hasControlCharacter(email)
  ) {
    errors.email = messages.email;
  }
  if (!eventValues.has(eventType)) errors.eventType = messages.eventType;
  if (!isCalendarDate(date)) errors.date = messages.date;
  if (city.length < 2 || city.length > 80 || hasControlCharacter(city)) {
    errors.city = messages.city;
  }
  if (budget && !budgetValues.has(budget)) errors.budget = messages.budget;
  if (message.length < 10 || message.length > 4000 || hasControlCharacter(message)) {
    errors.message = messages.message;
  }
  if (!consent) errors.consent = messages.consent;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    honeypot: false,
    data: { name, company, email, eventType, date, city, budget, message },
  };
}

export function bookingPlainText(data: BookingData): string {
  const eventLabel =
    eventTypeOptions.find((option) => option.value === data.eventType)?.label ??
    data.eventType;
  const budgetLabel =
    budgetOptions.find((option) => option.value === data.budget)?.label ??
    "Not specified";

  return [
    `Name: ${data.name}`,
    `Company or venue: ${data.company}`,
    `Email: ${data.email}`,
    `Event type: ${eventLabel}`,
    `Date: ${data.date}`,
    `City: ${data.city}`,
    `Budget range: ${budgetLabel}`,
    "",
    data.message,
  ].join("\n");
}
