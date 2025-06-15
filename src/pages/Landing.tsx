
import LandingHeader from "@/components/landing/LandingHeader";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import { PageTransition } from "@/components/common/PageTransition";

const Landing = () => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <LandingHeader />
        <main className="flex-grow">
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Landing;
