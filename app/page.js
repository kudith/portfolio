import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import ProjectSection from "@/components/project";
import FloatingChatButton from "@/components/floating-button";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <Footer />
      <FloatingChatButton/>
    </div>
  );
}
