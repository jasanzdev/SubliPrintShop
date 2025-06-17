import { Suspense } from "react";
import Skeleton from "./skeleton";
import Image from "next/image";
import { carouselImages } from "@/lib/images";

const Gallery = () => {
  return (
    <div className="container mx-auto p-6 shadow-2xl">
      <Suspense fallback={<Skeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-4 mb-4">
          <div className="flex md:col-span-2 md:row-span-4 h-full relative rounded-lg overflow-hidden">
            <Image
              src="/sublimacion.jpg"
              alt="Image with logo name and inputs of sublimation"
              fill
              className="object-cover"
            />
          </div>
          <div className="row-span-4 md:col-start-3">
            <div className="grid grid-cols-1 grid-rows-4 gap-4">
              <div className="row-span-2">
                <div className="h-60 relative rounded-lg overflow-hidden">
                  <Image
                    src="/articulos-personalizados-sublimacion.jpg"
                    alt="Image with personalized items"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="row-span-2 row-start-3">
                <div className="h-60 relative rounded-lg overflow-hidden">
                  <Image
                    src="/Sublimation-small-format.png"
                    alt="Image with more personalized items"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              <div className="flex flex-nowrap min-w-full gap-4">
                {[...carouselImages, ...carouselImages].map((info, index) => (
                  <div
                    key={`img-${index}`}
                    className="w-80 h-40 flex-shrink-0 relative rounded-lg overflow-hidden"
                  >
                    <Image
                      src={info.url}
                      alt={info.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Gallery;
