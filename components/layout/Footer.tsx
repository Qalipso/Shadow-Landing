"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-10 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span
            className="relative inline-block w-4 h-4 rounded-full flex-shrink-0"
            style={{
              background: "radial-gradient(circle at 35% 35%, #2a1f3a 0%, #050507 70%)",
              boxShadow: "0 0 8px 1px rgba(124,92,255,0.4)",
            }}
          />
          <span className="text-sm text-text-tertiary">
            Shadow &copy; {year}
          </span>
        </div>

        {/* Links */}
        <nav aria-label="Footer" className="flex items-center gap-6 flex-wrap justify-center">
          <a
            href="/privacy"
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Terms
          </a>
          <a
            href="mailto:hi@shadow.so"
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
