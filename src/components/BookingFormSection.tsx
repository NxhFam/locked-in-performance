import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Flame, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { SERVICES } from "./ServicesSection";

const SERVICE_OPTIONS = SERVICES.map((s) => s.name);

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{10,}$/, "Please enter a valid phone number"),
  vehicleYear: z
    .string()
    .min(4, "Year is required")
    .max(4, "Invalid year")
    .regex(/^\d{4}$/, "Enter a 4-digit year"),
  vehicleMake: z.string().min(2, "Make is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleTrim: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface InputFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
}

function InputField({ label, required, error, children, delay = 0, inView = true }: InputFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-1.5"
    >
      <label
        className="font-space text-xs uppercase tracking-widest font-semibold"
        style={{ color: "#C8C8D0" }}
      >
        {label}
        {required && <span style={{ color: "#E8610A" }}> *</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span className="font-space text-xs text-red-400">{error}</span>
        </div>
      )}
    </motion.div>
  );
}

const inputClass =
  "w-full bg-transparent font-space text-sm text-gray-200 px-4 py-3 rounded-sm outline-none transition-all duration-200 placeholder:text-gray-600 focus:placeholder:text-gray-500";

const inputStyle = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(200, 200, 208, 0.12)",
};

const inputFocusClass = "focus:border-orange-500/60 focus:bg-white/[0.06]";

export default function BookingFormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedService = watch("service");

  const formatSmsMessage = (data: FormData) => {
    const vehicle = `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}${data.vehicleTrim ? ` ${data.vehicleTrim}` : ""}`;
    return `🔧 NEW BOOKING REQUEST — Locked In Performance\n\nName: ${data.fullName}\nPhone: ${data.phone}\nVehicle: ${vehicle}\nService: ${data.service}${data.notes ? `\nNotes: ${data.notes}` : ""}\n\nReply /schedule [mm/dd/yy hh:mm] to confirm.`;
  };

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("loading");
    setErrorMsg("");

    const message = formatSmsMessage(data);

    // Using CallMeBot or Twilio — check for env variables
    const twilioSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
    const twilioToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
    const twilioFrom = import.meta.env.VITE_TWILIO_FROM_NUMBER;
    const shopPhone = "+17178809452";

    if (twilioSid && twilioToken && twilioFrom) {
      try {
        const body = new URLSearchParams({
          To: shopPhone,
          From: twilioFrom,
          Body: message,
        });

        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "SMS failed to send");
        }

        setSubmitStatus("success");
        reset();
      } catch (err: unknown) {
        setSubmitStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Failed to send. Please try again or call/text us directly."
        );
      }
    } else {
      // No SMS API configured — simulate success and log for demo
      console.log("📱 SMS would be sent:", message);
      // Simulate network delay for demo
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitStatus("success");
      reset();
    }
  };

  return (
    <section
      id="booking"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0705 0%, #0d0a06 50%, #0a0705 100%)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 60%, rgba(232, 97, 10, 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{
                background: "rgba(232, 97, 10, 0.15)",
                border: "1px solid rgba(232, 97, 10, 0.4)",
              }}
            >
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <span
              className="font-space text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "#E8610A" }}
            >
              Request Appointment
            </span>
          </div>
          <h2
            className="font-oswald text-4xl md:text-5xl font-black uppercase mb-4"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #C8C8D0 50%, #a0a0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
            }}
          >
            Book an Appointment
          </h2>
          <p className="font-space text-gray-500 text-sm">
            Fill out the form below and we'll reach out to confirm.
          </p>
        </motion.div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-sm p-10 md:p-14 text-center"
              style={{
                background: "rgba(26, 18, 8, 0.95)",
                border: "1px solid rgba(232, 97, 10, 0.4)",
                boxShadow:
                  "0 0 40px rgba(232, 97, 10, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background: "rgba(232, 97, 10, 0.15)",
                  border: "2px solid rgba(232, 97, 10, 0.6)",
                }}
              >
                <Flame className="w-8 h-8 text-orange-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-space text-green-400 text-sm font-medium">
                    Request Sent!
                  </span>
                </div>
                <h3
                  className="font-oswald text-2xl md:text-3xl font-black uppercase mb-4"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #C8C8D0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  You're Locked In
                </h3>
                <p className="font-space text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                  Your request has been sent! Locked In Performance will reach out to confirm your appointment.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 font-space text-xs uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Submit another request →
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-sm p-6 md:p-10"
              style={{
                background: "rgba(26, 18, 8, 0.92)",
                border: "1px solid rgba(200, 200, 208, 0.08)",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
              }}
            >
              <div className="grid grid-cols-1 gap-5">
                {/* Full Name */}
                <InputField
                  label="Full Name"
                  required
                  error={errors.fullName?.message}
                  delay={0.05}
                  inView={inView}
                >
                  <input
                    {...register("fullName")}
                    placeholder="John Smith"
                    className={`${inputClass} ${inputFocusClass}`}
                    style={{
                      ...inputStyle,
                      borderColor: errors.fullName
                        ? "rgba(239, 68, 68, 0.5)"
                        : undefined,
                    }}
                  />
                </InputField>

                {/* Phone */}
                <InputField
                  label="Phone Number"
                  required
                  error={errors.phone?.message}
                  delay={0.1}
                  inView={inView}
                >
                  <input
                    {...register("phone")}
                    placeholder="(555) 867-5309"
                    type="tel"
                    className={`${inputClass} ${inputFocusClass}`}
                    style={{
                      ...inputStyle,
                      borderColor: errors.phone
                        ? "rgba(239, 68, 68, 0.5)"
                        : undefined,
                    }}
                  />
                </InputField>

                {/* Vehicle row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <label
                    className="font-space text-xs uppercase tracking-widest font-semibold mb-1.5 block"
                    style={{ color: "#C8C8D0" }}
                  >
                    Vehicle Info <span style={{ color: "#E8610A" }}>*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("vehicleYear")}
                        placeholder="Year"
                        maxLength={4}
                        className={`${inputClass} ${inputFocusClass} text-center`}
                        style={{
                          ...inputStyle,
                          borderColor: errors.vehicleYear
                            ? "rgba(239, 68, 68, 0.5)"
                            : undefined,
                        }}
                      />
                      {errors.vehicleYear && (
                        <span className="font-space text-xs text-red-400">
                          {errors.vehicleYear.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("vehicleMake")}
                        placeholder="Make"
                        className={`${inputClass} ${inputFocusClass}`}
                        style={{
                          ...inputStyle,
                          borderColor: errors.vehicleMake
                            ? "rgba(239, 68, 68, 0.5)"
                            : undefined,
                        }}
                      />
                      {errors.vehicleMake && (
                        <span className="font-space text-xs text-red-400">
                          {errors.vehicleMake.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("vehicleModel")}
                        placeholder="Model"
                        className={`${inputClass} ${inputFocusClass}`}
                        style={{
                          ...inputStyle,
                          borderColor: errors.vehicleModel
                            ? "rgba(239, 68, 68, 0.5)"
                            : undefined,
                        }}
                      />
                      {errors.vehicleModel && (
                        <span className="font-space text-xs text-red-400">
                          {errors.vehicleModel.message}
                        </span>
                      )}
                    </div>
                    <input
                      {...register("vehicleTrim")}
                      placeholder="Trim (opt.)"
                      className={`${inputClass} ${inputFocusClass}`}
                      style={inputStyle}
                    />
                  </div>
                </motion.div>

                {/* Service dropdown */}
                <InputField
                  label="Service Request"
                  required
                  error={errors.service?.message}
                  delay={0.2}
                  inView={inView}
                >
                  <div className="relative">
                    <select
                      {...register("service")}
                      className={`${inputClass} ${inputFocusClass} appearance-none cursor-pointer pr-10`}
                      style={{
                        ...inputStyle,
                        borderColor: errors.service
                          ? "rgba(239, 68, 68, 0.5)"
                          : undefined,
                        color: selectedService ? "#e2e8f0" : "#4b5563",
                      }}
                    >
                      <option value="" style={{ background: "#1a1208", color: "#9ca3af" }}>
                        Select a service...
                      </option>
                      {SERVICE_OPTIONS.map((svc) => (
                        <option
                          key={svc}
                          value={svc}
                          style={{ background: "#1a1208", color: "#e2e8f0" }}
                        >
                          {svc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "#E8610A" }}
                    />
                  </div>
                </InputField>

                {/* Notes */}
                <InputField
                  label="Additional Notes"
                  delay={0.25}
                  inView={inView}
                >
                  <textarea
                    {...register("notes")}
                    placeholder="Any additional details about your vehicle or service needs..."
                    rows={3}
                    className={`${inputClass} ${inputFocusClass} resize-none`}
                    style={inputStyle}
                  />
                </InputField>

                {/* Error message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-sm"
                    style={{
                      background: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-space text-red-400 text-xs font-medium">
                        Failed to send your request
                      </p>
                      <p className="font-space text-red-400/70 text-xs mt-0.5">
                        {errorMsg || "Please try again or call/text us at 717-880-9452"}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="btn-fire animate-pulse-glow w-full font-oswald text-white font-bold text-lg uppercase tracking-widest px-8 py-4 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:animate-none flex items-center justify-center gap-3 cursor-pointer border-0 outline-none"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5" />
                        Book Appointment
                      </>
                    )}
                  </button>
                </motion.div>

                <p className="font-space text-xs text-gray-600 text-center">
                  We'll reach out within 24 hours to confirm your appointment.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
