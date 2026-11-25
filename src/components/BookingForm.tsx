"use client";

import { useState, type FormEvent } from "react";
import { budgetOptions, en, eventTypeOptions } from "@/content/en";
import { validateBooking, type BookingErrors } from "@/lib/booking-validate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Values = {
  name: string;
  company: string;
  email: string;
  eventType: string;
  date: string;
  city: string;
  budget: string;
  message: string;
  consent: boolean;
  website: string;
};

const emptyValues: Values = {
  name: "",
  company: "",
  email: "",
  eventType: "",
  date: "",
  city: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

const fieldOrder = [
  "name",
  "company",
  "email",
  "eventType",
  "date",
  "city",
  "budget",
  "message",
  "consent",
] as const;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "errors"; errors: BookingErrors }
  | { kind: "success"; mode: "preview" | "sent" };

function fieldId(name: string): string {
  return `booking-${name}`;
}

export function BookingForm() {
  const copy = en.booking;
  const [values, setValues] = useState<Values>(emptyValues);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errors = status.kind === "errors" ? status.errors : {};

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validated = validateBooking(values);
    if (!validated.ok) {
      setStatus({ kind: "errors", errors: validated.errors });
      const first = fieldOrder.find((key) => validated.errors[key]);
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      const payload: unknown = await response.json();
      if (
        payload &&
        typeof payload === "object" &&
        "ok" in payload &&
        payload.ok === true &&
        "mode" in payload &&
        (payload.mode === "preview" || payload.mode === "sent")
      ) {
        setValues(emptyValues);
        setStatus({ kind: "success", mode: payload.mode });
        return;
      }
      if (
        payload &&
        typeof payload === "object" &&
        "ok" in payload &&
        payload.ok === false &&
        "errors" in payload &&
        payload.errors &&
        typeof payload.errors === "object"
      ) {
        const serverErrors = payload.errors as BookingErrors;
        setStatus({ kind: "errors", errors: serverErrors });
        const first = fieldOrder.find((key) => serverErrors[key]);
        if (first) document.getElementById(fieldId(first))?.focus();
        return;
      }
      setStatus({ kind: "errors", errors: { form: copy.errors.send } });
    } catch {
      setStatus({ kind: "errors", errors: { form: copy.errors.send } });
    }
  }

  if (status.kind === "success") {
    return (
      <p className="success" role="status">
        {status.mode === "sent" ? copy.successSent : copy.successPreview}
      </p>
    );
  }

  const errorEntries = fieldOrder.flatMap((key) => {
    const message = errors[key];
    return message ? [{ key, message }] : [];
  });

  return (
    <form className="form" action="/api/booking" method="post" onSubmit={onSubmit} noValidate>
      {errors.form || errorEntries.length > 0 ? (
        <div className="form-alert" role="alert">
          <p>{errors.form ?? copy.errorSummary}</p>
          {errorEntries.length > 0 ? (
            <ul>
              {errorEntries.map((entry) => (
                <li key={entry.key}>
                  <a href={`#${fieldId(entry.key)}`}>{entry.message}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="hp" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="field">
        <Label htmlFor={fieldId("name")}>{copy.name}</Label>
        <Input
          id={fieldId("name")}
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
        {errors.name ? (
          <p id="booking-name-error" className="field-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("company")}>{copy.company}</Label>
        <Input
          id={fieldId("company")}
          name="company"
          autoComplete="organization"
          value={values.company}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "booking-company-error" : undefined}
          onChange={(event) => update("company", event.target.value)}
        />
        {errors.company ? (
          <p id="booking-company-error" className="field-error">
            {errors.company}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("email")}>{copy.email}</Label>
        <Input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "booking-email-error" : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
        {errors.email ? (
          <p id="booking-email-error" className="field-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("eventType")}>{copy.eventType}</Label>
        <select
          id={fieldId("eventType")}
          className="text-field"
          name="eventType"
          value={values.eventType}
          aria-invalid={Boolean(errors.eventType)}
          aria-describedby={errors.eventType ? "booking-eventType-error" : undefined}
          onChange={(event) => update("eventType", event.target.value)}
        >
          <option value="">{copy.eventTypePlaceholder}</option>
          {eventTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.eventType ? (
          <p id="booking-eventType-error" className="field-error">
            {errors.eventType}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("date")}>{copy.date}</Label>
        <Input
          id={fieldId("date")}
          name="date"
          type="date"
          value={values.date}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "booking-date-error" : undefined}
          onChange={(event) => update("date", event.target.value)}
        />
        {errors.date ? (
          <p id="booking-date-error" className="field-error">
            {errors.date}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("city")}>{copy.city}</Label>
        <Input
          id={fieldId("city")}
          name="city"
          autoComplete="address-level2"
          value={values.city}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? "booking-city-error" : undefined}
          onChange={(event) => update("city", event.target.value)}
        />
        {errors.city ? (
          <p id="booking-city-error" className="field-error">
            {errors.city}
          </p>
        ) : null}
      </div>

      <div className="field">
        <Label htmlFor={fieldId("budget")}>{copy.budget}</Label>
        <select
          id={fieldId("budget")}
          className="text-field"
          name="budget"
          value={values.budget}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby="booking-budget-hint"
          onChange={(event) => update("budget", event.target.value)}
        >
          <option value="">{copy.budgetPlaceholder}</option>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p id="booking-budget-hint" className={errors.budget ? "field-error" : "secondary"}>
          {errors.budget ?? copy.budgetOptional}
        </p>
      </div>

      <div className="field">
        <Label htmlFor={fieldId("message")}>{copy.message}</Label>
        <Textarea
          id={fieldId("message")}
          name="message"
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "booking-message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message ? (
          <p id="booking-message-error" className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="consent-row">
        <Checkbox
          id={fieldId("consent")}
          name="consent"
          value="yes"
          checked={values.consent}
          onCheckedChange={(checked) => update("consent", checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "booking-consent-error" : undefined}
        />
        <Label htmlFor={fieldId("consent")}>{copy.consent}</Label>
      </div>
      {errors.consent ? (
        <p id="booking-consent-error" className="field-error">
          {errors.consent}
        </p>
      ) : null}

      <Button type="submit" disabled={status.kind === "submitting"}>
        {status.kind === "submitting" ? copy.sending : copy.submit}
      </Button>
    </form>
  );
}
