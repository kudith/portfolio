import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import FloatingChatButton from "@/components/floating-button";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FloatingChatButton/>
    </div>
  );
}
