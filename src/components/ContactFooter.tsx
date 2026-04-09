import { MapPin } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer
      className="relative"
      style={{
        background: "linear-gradient(180deg, #0a0705 0%, #060403 100%)",
        borderTop: "1px solid rgba(232, 97, 10, 0.3)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #E8610A, #F0A500, #E8610A, transparent)",
          boxShadow: "0 0 20px rgba(232, 97, 10, 0.6)",
        }}
      />

      {/* Contact bar */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-2">
          {/* Contact number */}
          <div
            className="font-oswald text-2xl md:text-3xl font-black italic"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #C8C8D0 50%, #a8a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
              textShadow: "none",
            }}
          >
            717-881-3494
          </div>
          <p className="font-space text-xs text-gray-400 uppercase tracking-widest">
            |🔥Quality work || 💵Fair prices || 🚫No shortcuts |
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}
        >
          <p className="font-space text-xs text-gray-700">
            © 2026 Locked In Performance. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-700" />
            <span className="font-space text-xs text-gray-700">
              York, Pennsylvania — Affordable repairs, maintenance, and upgrades you can trust.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
