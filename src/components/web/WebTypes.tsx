import { ArrowLeft, Check, Quote } from "lucide-react";
import { webReviews, webTypes } from "./content";

/** The four kinds of site as a comparison: when each one fits, what it includes and where it already exists. */
export const WebTypes = () => (
  <section id="types" aria-labelledby="types-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <h2 id="types-title" className="a-h2 max-w-3xl">
        איזה אתר אתם צריכים?
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--a-muted)]">
        מבחינתי כל אלה אותו דבר: מוצר ווב שצריך לעבוד טוב. ההבדל הוא מה הוא צריך לעשות בשבילכם.
      </p>
      <ul className="mt-12">
        {webTypes.map((type) => (
          <li
            key={type.title}
            className="grid gap-5 border-t border-[var(--a-line)] py-8 last:border-b md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
          >
            <div>
              <h3 className="text-2xl font-semibold text-[var(--a-ink)]">{type.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--a-muted)]">{type.when}</p>
            </div>
            <ul className="space-y-2 max-md:mx-auto max-md:w-fit">
              {type.includes.map((item) => (
                <li key={item} className="flex items-start justify-start gap-2 text-start text-[16px] leading-snug text-[var(--a-ink)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-accent)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">{type.example.text}</p>
              <a href={type.example.href} className="mt-2 inline-flex items-center gap-1 text-[15px] text-[var(--a-accent)] underline-offset-2 hover:underline">
                {type.example.label}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const WebReviews = () => (
  <section aria-labelledby="reviews-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <h2 id="reviews-title" className="a-h2">
        מה אומרים עליי
      </h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
        {webReviews.map((r) => (
          <li key={r.name}>
            <figure>
              <Quote className="h-6 w-6 text-[var(--a-accent)] max-md:mx-auto" aria-hidden="true" />
              <blockquote className="mt-3 text-xl leading-relaxed text-[var(--a-ink)]">{r.quote}</blockquote>
              <figcaption className="mt-3 text-[15px] text-[var(--a-muted)]">
                <bdi>{r.name}</bdi>
                {r.source && (
                  <>
                    {" · "}
                    <bdi>{r.source}</bdi>
                  </>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
