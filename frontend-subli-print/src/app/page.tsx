export const metadata = {
  title: "Jasanz SubliShop",
  description: "Customize. Buy. Receive. All in one place: SubliShop.",
};

import Process from "@/features/core/components/sections/process";
import Gallery from "@/features/core/components/sections/gallery/gallery";
import Testimonials from "@/features/core/components/sections/testimonials";
import { Suspense } from "react";
import Services from "@/features/core/components/sections/services";
import Footer from "@/features/core/components/layout/footer";
import Navbar from "@/features/core/components/layout/navbar/index";
import PageIllustration from "@/shared/components/page-illustration";
import { WhatsAppFloat } from "@/shared/components/whatsapp-float";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageIllustration />
      <Navbar />
      <Suspense>
        <Gallery />
      </Suspense>
      <Services />
      <Process />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
