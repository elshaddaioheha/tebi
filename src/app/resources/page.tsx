import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">
        Resources
      </span>
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Resources</h1>
      <p className="mt-4 text-foreground/60 max-w-xl">
        Guides, tools, and free downloads are coming soon.
      </p>
    </main>
  );
}
