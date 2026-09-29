import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Roadmap from "./components/Roadmap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-app-black pt-[5.75rem] sm:pt-[6rem] lg:pt-[6.5rem]">
        <Header />
        <Hero />
        <About />
        <Services />
        <Roadmap />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
