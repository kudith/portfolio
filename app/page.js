import Hero from "@/components/Hero";
import WhoAmI from "@/components/whoami";
import Skills from "@/components/Skills";
import WhyHireMe from "@/components/WhyHireMe";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonial";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero/>
            <WhoAmI/>
            <Skills/>
            <WhyHireMe/>
            <Portfolio/>
            <Testimonials/>
            <Contact/>
        </div>
    );
}