import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import CurvedLoop from "./components/CurvedLoop";
import CTA from "./components/CTA";

import { ReactLenis, useLenis } from "lenis/react";
import { TeamSection } from "./components/TeamMember";
import { ClientParallaxGrid } from "./components/TrustedBy";

function App() {
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
      >
        <div className="min-h-screen bg-white w-screen overflow-hidden sm:overflow-visible">
          <Navbar />
          <main>
            {/* Hero Section */}
            <div className="h-screen">
              {/* Explicitly set z-0 on the fixed element */}
              <div className="fixed top-0 left-0 w-full z-0">
                <Hero />
              </div>
            </div>

            {/* Content Section - Added 'relative' and 'z-10' */}
            <div className="relative z-10 pt-32 bg-black rounded-t-full">
              <div className="flex justify-center">
                <div className="bg-black w-[200%] aspect-square rounded-full absolute -top-16 justify-self-center z-[-1100]" />
              </div>
              <Services />
              <div className="-mb-50 -mt-100 sm:mb-0 sm:-mt-120">
                <CurvedLoop
                  marqueeText="Premium ✦ Services ✦ With ✦ Vezos ✦ Digitals ✦"
                  speed={2}
                  curveAmount={400}
                  direction="right"
                  interactive
                  className="custom-text-style"
                />
              </div>
              <Process />
              <ClientParallaxGrid />
              <Testimonials />
              <CTA
                badge="Work With Us"
                title={
                  <>
                    Elevate your{" "}
                    <span className="font-serif italic text-neutral-400">
                      brand presence.
                    </span>
                  </>
                }
                description="Stop guessing. Partner with a team dedicated to turning your complex challenges into measurable growth and seamless digital experiences."
                primaryActionText="Book a Strategy Call"
                secondaryActionText="View Case Studies"
                onPrimaryClick={() => console.log("Consultation booked")}
              />
              <TeamSection />
            </div>
          </main>

          {/* Footer also needs to be relative/z-10 if you want it to sit below the black section */}
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default App;
