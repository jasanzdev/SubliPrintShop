export const metadata = {
  title: "Jasanz SubliShop",
  description: "Customize. Buy. Receive. All in one place: SubliShop.",
};

import Process from "@/features/core/components/sections/process";
import Gallery from "@/features/core/components/sections/gallery";
import Testimonials from "@/features/core/components/sections/testimonials";
import Services from "@/features/core/components/sections/services";
import Footer from "@/features/core/components/layout/footer";
import Navbar from "@/features/core/components/layout/navbar/index";
import PageIllustration from "@/shared/components/page-illustration";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-screen">
      <PageIllustration />
      <Navbar />
      <Gallery />
      <Services />
      <Process />
      <Testimonials />
      <Footer />
    </div>
  );
}
