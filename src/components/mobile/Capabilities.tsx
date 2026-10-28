import { Bell, CreditCard, Database, Image, MessagesSquare, Sparkles, Store, Users } from "lucide-react";
import { capabilities } from "./content";

const ICONS = {
  users: Users,
  chat: MessagesSquare,
  card: CreditCard,
  bell: Bell,
  sparkles: Sparkles,
  image: Image,
  database: Database,
  store: Store,
} as const;

export const Capabilities = () => (
  <section aria-labelledby="caps-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <h2 id="caps-title" className="a-h2 text-center">
        מה אפשר לשים באפליקציה
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-relaxed text-[var(--a-muted)]">
        כל אחד מאלה כבר עובד באחת האפליקציות שלמעלה.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <li key={c.title} className="a-card flex items-center gap-4 !p-5 max-md:flex-col max-md:gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgba(191,149,249,0.12)] text-[var(--a-accent)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[17px] font-medium leading-snug text-[var(--a-ink)]">{c.title}</h3>
                <p className="mt-0.5 text-[14px] text-[var(--a-muted)]">{c.where}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
