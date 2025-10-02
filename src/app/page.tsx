import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Decorative gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-transparent">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">IdeaBoard</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
            <a href="#features" className="hover:text-foreground cursor-pointer">Features</a>
            <a href="#testimonials" className="hover:text-foreground cursor-pointer">Testimonials</a>
            <a href="#faq" className="hover:text-foreground cursor-pointer">FAQ</a>
          </nav>
          <Link href="/app" className="ml-4 inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 cursor-pointer">
            Open App
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Spark ideas. Vote what matters.
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
              A lightweight, real-time board to capture ideas and crowdsource priorities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/app"
                className="inline-flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 text-base font-medium shadow-lg hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 cursor-pointer"
              >
                Try the Idea Board
              </Link>
              <a
                href="#features"
                className="inline-flex justify-center items-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-neutral-500/40 cursor-pointer"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-fuchsia-500/20 blur-2xl" />
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-xl overflow-hidden">
              <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-2 flex items-center gap-1 text-neutral-400 text-xs">
                <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-2">Live preview</span>
              </div>
              <div className="relative">
                <iframe
                  title="IdeaBoard preview"
                  src="/app"
                  loading="lazy"
                  className="w-full h-[420px] md:h-[460px] bg-white dark:bg-neutral-950"
                  style={{ pointerEvents: "none" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-neutral-950/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="Trusted by" className="py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
            <span className="opacity-70">Trusted by teams at</span>
            {['Acme','Globex','Umbrella','Stark','Wayne'].map((name) => (
              <span key={name} className="px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">{name}</span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Instant Capture",
                desc: "Post ideas quickly with a simple, clean input.",
                icon: "📝",
              },
              {
                title: "Community Upvotes",
                desc: "Surface the best ideas with transparent upvoting.",
                icon: "⬆️",
              },
              {
                title: "Live Feedback",
                desc: "See updates as they happen with fast re-fetching.",
                icon: "⚡",
              },
              {
                title: "Anonymous by Default",
                desc: "Encourage candor without sign-ups or profiles.",
                icon: "🎭",
              },
              {
                title: "Responsive Design",
                desc: "Beautiful on phones, tablets, and desktops.",
                icon: "📱",
              },
              {
                title: "Dockerized Stack",
                desc: "One command to run locally with Postgres.",
                icon: "🐳",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-6 backdrop-blur"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-neutral-600 dark:text-neutral-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: 'Ideas posted', v: '12k+' },
              { k: 'Upvotes cast', v: '240k+' },
              { k: 'Teams onboarded', v: '350+' },
              { k: 'Avg setup time', v: '< 2 min' },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-5 text-center">
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="text-sm text-neutral-500 mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-14">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-blue-500/5 to-fuchsia-500/5 p-8">
            <h2 className="text-2xl font-semibold text-center">What people say</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "We aligned our roadmap in a day. The upvotes made priorities obvious.",
                  author: "Product Lead",
                },
                {
                  quote:
                    "The simplest way I've found to gather feedback across the company.",
                  author: "Engineering Manager",
                },
                {
                  quote:
                    "Fast, clean, and it just works. Exactly what we needed.",
                  author: "Founder",
                },
              ].map((t) => (
                <figure key={t.author} className="rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 p-6">
                  <blockquote className="text-neutral-700 dark:text-neutral-200">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm text-neutral-500">— {t.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-14">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
              <h3 className="text-lg font-semibold">Hobby</h3>
              <p className="mt-1 text-sm text-neutral-500">For personal projects</p>
              <div className="mt-4 text-3xl font-bold">$0</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Unlimited ideas</li>
                <li>• Upvotes</li>
                <li>• Community support</li>
              </ul>
            </div>
            <div className="relative rounded-2xl border-2 border-blue-500 p-6 bg-gradient-to-b from-blue-500/10 to-transparent">
              <span className="absolute -top-3 right-4 text-xs rounded-full bg-blue-600 text-white px-2 py-0.5">Popular</span>
              <h3 className="text-lg font-semibold">Team</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Best for startups</p>
              <div className="mt-4 text-3xl font-bold">$19<span className="text-base font-medium text-neutral-500">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Everything in Hobby</li>
                <li>• Team spaces</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
              <h3 className="text-lg font-semibold">Business</h3>
              <p className="mt-1 text-sm text-neutral-500">For growing orgs</p>
              <div className="mt-4 text-3xl font-bold">$49<span className="text-base font-medium text-neutral-500">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• SSO</li>
                <li>• Audit logs</li>
                <li>• SLA support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-14">
          <h2 className="text-2xl font-semibold text-center">FAQ</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Is it real-time?",
                a: "We re-fetch on actions and on a short interval for a live feel.",
              },
              {
                q: "Do I need an account?",
                a: "No, posting and upvoting are anonymous by default.",
              },
              {
                q: "Can I self-host?",
                a: "Yes, it's fully containerized with Docker Compose.",
              },
              {
                q: "Which database is used?",
                a: "PostgreSQL via Prisma ORM.",
              },
            ].map((item) => (
              <details key={item.q} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/70">
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-semibold">Ready to collect ideas?</h2>
          <Link
            href="/app"
            className="mt-6 inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 text-base font-medium shadow-lg hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 cursor-pointer"
          >
            Go to the App
          </Link>
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} IdeaBoard
      </footer>
    </div>
  );
}
