import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-background transition-colors duration-300">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-16 px-6">
        {/* Hero */}
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            src="/images/logo.jpg"
            alt="Off The Worldly Road logo"
            width={260}
            height={260}
            className="rounded-2xl object-contain shadow-lg"
            priority
          />
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Off The Worldly Road
            </h1>
            <p className="text-lg text-muted max-w-md mx-auto leading-relaxed">
              Faith, wilderness, and the beauty of creation.
            </p>
          </div>

          {/* CTA Buttons — themed */}
          <div className="flex gap-3 mt-2">
            <button className="px-6 py-2.5 rounded-lg bg-primary text-inverse font-medium hover:bg-primary-muted transition-colors">
              Explore
            </button>
            <button className="px-6 py-2.5 rounded-lg border border-border bg-surface text-foreground font-medium hover:bg-surface-elevated transition-colors">
              Read the Blog
            </button>
          </div>
        </div>

        {/* Theme preview cards */}
        <section className="w-full mt-20 grid md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="h-3 w-12 rounded-full bg-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Photography
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Landscapes captured in the wild places where earth meets sky.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="h-3 w-12 rounded-full bg-secondary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Faith & Purpose
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Reflections on walking closely with God through the wilderness.
            </p>
          </div>
        </section>

        {/* Footer hint */}
        <p className="mt-16 text-xs text-muted text-center max-w-sm">
          Toggle the switcher in the top-right to see both color themes.
          Your choice is saved to localStorage.
        </p>
      </main>
    </div>
  );
}
