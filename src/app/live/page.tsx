import type { Metadata } from "next";
import { en } from "@/content/en";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: en.live.title,
  description: en.live.description,
};

export default function LivePage() {
  return (
    <div className="wrap page stack">
      <header>
        <p className="kicker">{en.live.kicker}</p>
        <h1>{en.live.heading}</h1>
        <p className="lede">{en.live.lede}</p>
        <p className="measure" style={{ marginTop: "1rem" }}>
          {en.live.body}
        </p>
      </header>

      <section aria-labelledby="dates-heading" id="dates">
        <h2 id="dates-heading">{en.live.datesHeading}</h2>
        <div className="empty-state">
          <p>{en.live.datesEmpty}</p>
          <p className="secondary">{en.live.datesNote}</p>
        </div>
      </section>

      <section aria-labelledby="booking-heading" id="booking">
        <h2 id="booking-heading">{en.live.bookingHeading}</h2>
        <p className="measure" style={{ marginTop: "1rem" }}>
          {en.live.bookingIntro}
        </p>
        <BookingForm />
      </section>
    </div>
  );
}
