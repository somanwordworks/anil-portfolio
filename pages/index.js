import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Vision from "../components/Vision";
import Initiatives from "../components/Initiatives";
import Timeline from "../components/Timeline";
import Gallery from "../components/Gallery";
import Volunteer from "../components/Volunteer";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";


export default function Home() {
  return (
    <>
      <Head>
              <title>Ani Kumar Yadav Maraboina — Politician | Indian National Congress</title>
              <meta name="description" content="Ani Kumar Yadav Maraboina — Politician committed to service, empowerment and inclusive development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

     <div className="min-h-screen flex flex-col relative">
  {/* WATERMARK LAYER */}
  <div className="watermark-overlay"></div>

        <Header />
        <main className="flex-grow">
          <Hero />
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">
            <About />
            <Vision />
            <Initiatives />
            <Timeline />
            <Gallery />
            <Volunteer />
            <Contact />
          </div>
              </main>
              

              <Footer />
              <ScrollToTopButton />
      </div>
    </>
  );
}
