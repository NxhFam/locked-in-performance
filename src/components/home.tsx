import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import BookingFormSection from "./BookingFormSection";
import ContactFooter from "./ContactFooter";

function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#0a0705", color: "#e2e8f0" }}
    >
      <HeroSection />
      <ServicesSection />
      <BookingFormSection />
      <ContactFooter />
    </div>
  );
}

export default Home;
