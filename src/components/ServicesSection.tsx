import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Zap } from "lucide-react";

export const SERVICES = [
  { name: "Oil Change", price: "$40–$60", icon: "🔧" },
  { name: "Brakes", price: "$100–$180", icon: "⚙️" },
  { name: "Rotors + Pads", price: "$200–$400", icon: "🔩" },
  { name: "Diagnostics", price: "$50–$100", icon: "🔍" },
  { name: "Battery", price: "$50–$100", icon: "⚡" },
  { name: "Suspension", price: "$100+", icon: "🚗" },
  { name: "Timing Jobs", price: "$600–$1,800", icon: "⏱️" },
  { name: "Engine Rebuilds", price: "$800–$3,000", icon: "🏎️" },
  { name: "Custom Performance Build", price: "Price Varies", icon: "🔥", featured: true },
];

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`service-card rounded-sm p-4 md:p-5 flex items-center justify-between group cursor-default ${
        service.featured
          ? "col-span-1 md:col-span-2"
          : ""
      }`}
      style={{
        background: service.featured
          ? "linear-gradient(135deg, rgba(232, 97, 10, 0.12) 0%, rgba(26, 18, 8, 0.9) 100%)"
          : "rgba(26, 18, 8, 0.85)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div
          className="w-9 h-9 md:w-10 md:h-10 rounded-sm flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: "rgba(232, 97, 10, 0.12)", border: "1px solid rgba(232, 97, 10, 0.25)" }}
        >
          {service.icon}
        </div>
        <span
          className="font-oswald text-base md:text-lg font-semibold uppercase tracking-wide text-gray-200 group-hover:text-white transition-colors"
          style={{ letterSpacing: "0.06em" }}
        >
          {service.name}
        </span>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <span
          className="font-archivo text-base md:text-lg font-black"
          style={{
            background: service.featured
              ? "linear-gradient(135deg, #F0A500, #E8610A)"
              : "linear-gradient(135deg, #E8610A, #F0A500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {service.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0705 0%, #110d06 30%, #16100a 60%, #0a0705 100%)",
      }}
    >
      {/* Decorative top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #E8610A 30%, #F0A500 50%, #E8610A 70%, transparent 100%)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232, 97, 10, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(232, 97, 10, 0.15)", border: "1px solid rgba(232, 97, 10, 0.4)" }}
            >
              <Wrench className="w-4 h-4 text-orange-500" />
            </div>
            <span
              className="font-space text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "#E8610A" }}
            >
              Services & Pricing
            </span>
          </div>
          <h2
            className="font-oswald text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #C8C8D0 50%, #a0a0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
            }}
          >
            Performance Automotive
          </h2>
          <p className="font-space text-gray-500 text-sm md:text-base max-w-md mx-auto">
            Transparent pricing. Quality work. Built for your vehicle.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-2 mt-4"
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <p
            className="font-space text-sm text-center"
            style={{ color: "#C8C8D0" }}
          >
            Custom Performance Build Available —{" "}
            <span style={{ color: "#F0A500" }} className="font-semibold">
              Price Varies
            </span>
          </p>
          <Zap className="w-4 h-4 text-amber-500" />
        </motion.div>
      </div>

      {/* Decorative bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #E8610A 30%, #F0A500 50%, #E8610A 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
