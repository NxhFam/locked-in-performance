import { MessageSquare, Phone, MapPin } from "lucide-react";

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="Locked In Performance"
              className="h-10 w-auto opacity-80"
            />
          </div>

          {/* Contact number */}
          <div className="text-center">
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
            <p className="font-space text-xs text-gray-600 uppercase tracking-widest mt-0.5">
              Garage Builds / Limited Mobile
            </p>
          </div>

          {/* CTA links */}
          <div className="flex items-center gap-3">
            <a
              href="sms:7178813494"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-space text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(232, 97, 10, 0.15)",
                border: "1px solid rgba(232, 97, 10, 0.4)",
                color: "#E8610A",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(232, 97, 10, 0.25)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(232, 97, 10, 0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(232, 97, 10, 0.15)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(232, 97, 10, 0.4)";
              }}
            >
              <MessageSquare className="w-4 h-4" />
              Text Us
            </a>
            <a
              href="tel:7178813494"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-space text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(200, 200, 208, 0.15)",
                color: "#C8C8D0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.08)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(200, 200, 208, 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.04)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(200, 200, 208, 0.15)";
              }}
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
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
              Pennsylvania — Garage Builds & Limited Mobile
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
