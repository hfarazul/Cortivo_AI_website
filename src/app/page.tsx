import {
  Navbar,
  Hero,
  Clients,
  Services,
  Process,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Clients />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
