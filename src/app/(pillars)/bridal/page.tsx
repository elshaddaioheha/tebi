import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal",
};

export default function BridalPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">
        Pillar
      </span>
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Bridal</h1>
      <p className="mt-4 text-foreground/60 max-w-xl">
        This pillar is coming soon.
      </p>
    </main>
  );
}
