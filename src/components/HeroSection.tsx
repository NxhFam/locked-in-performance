import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  hue: number;
}

function EmberParticle({ ember }: { ember: Ember }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${ember.x}%`,
        top: `${ember.y}%`,
        width: `${ember.size}px`,
        height: `${ember.size}px`,
        background: `radial-gradient(circle, hsl(${ember.hue}, 100%, 60%) 0%, hsl(${ember.hue}, 80%, 40%) 60%, transparent 100%)`,
        animation: `ember-float ${ember.duration}s ease-out ${ember.delay}s infinite`,
        opacity: 0.7,
      }}
    />
  );
}

export default function HeroSection() {
  const embersRef = useRef<Ember[]>([]);

  if (embersRef.current.length === 0) {
    embersRef.current = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 40 + Math.random() * 50,
      size: 2 + Math.random() * 5,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      hue: 20 + Math.random() * 30,
    }));
  }

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(232, 97, 10, 0.18) 0%, rgba(26, 18, 8, 0) 70%), radial-gradient(ellipse 120% 80% at 50% 80%, rgba(240, 165, 0, 0.08) 0%, transparent 70%), linear-gradient(180deg, #0d0a05 0%, #1a1208 30%, #120d05 70%, #0a0705 100%)",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* Ember particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {embersRef.current.map((ember) => (
          <EmberParticle key={ember.id} ember={ember} />
        ))}
      </div>

      {/* Orange radial glow behind logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(232, 97, 10, 0.22) 0%, rgba(240, 165, 0, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 pb-8 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-6"
        >
          <img
            src="/images/logo.png"
            alt="Locked In Performance"
            className="w-full max-w-[480px] md:max-w-[600px] drop-shadow-2xl"
            style={{
              filter:
                "drop-shadow(0 0 30px rgba(232, 97, 10, 0.5)) drop-shadow(0 0 60px rgba(232, 97, 10, 0.2))",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-4"
        >
          <div
            className="font-oswald tracking-[0.3em] text-sm md:text-base font-medium uppercase"
            style={{ color: "#C8C8D0", letterSpacing: "0.35em" }}
          >
            Garage Builds / Limited Mobile
          </div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-64 h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E8610A, #F0A500, #E8610A, transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-space text-gray-400 text-sm md:text-base max-w-sm mb-10 leading-relaxed"
        >
          Performance you can trust. Built in the garage. Delivered on the road.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToBooking}
          className="btn-fire animate-pulse-glow font-oswald text-white font-bold text-lg md:text-xl px-10 md:px-14 py-4 rounded-sm uppercase tracking-widest cursor-pointer border-0 outline-none"
          style={{
            letterSpacing: "0.2em",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Book an Appointment
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToBooking}
        >
          <span className="font-space text-xs text-gray-500 tracking-widest uppercase">
            View Services
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-orange-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10, 7, 5, 0.95))",
        }}
      />
    </section>
  );
}
