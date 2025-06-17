export const metadata = {
  title: "Jasanz SubliShop",
  description: "Customize. Buy. Receive. All in one place: SubliShop.",
};

import Hero from "@/components/sections/hero";
import Process from "@/components/sections/process";
import Gallery from "@/components/sections/gallery/gallery";
import Testimonials from "@/components/sections/testimonials";
import { Suspense } from "react";
import Services from "@/components/sections/services";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import PageIllustration from "@/components/ui/page-illustration";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageIllustration />
      <Navbar />
      <Suspense>
        <Gallery />
        <Hero />
      </Suspense>
      <Services />
      <Process />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
