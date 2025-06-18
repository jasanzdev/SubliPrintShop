import Image from "next/image";
import { carouselImages } from "@/features/products/lib/images";
import Link from "next/link";

const Gallery = () => {
  return (
    <section className="p-6">
      <div className="flex flex-col place-content-center text-center space-y-4">
        <div className="space-y-4">
          <h1
            className="animate-bg-color font-nacelle text-3xl font-semibold text-transparent 
          md:text-4xl tracking-tighter sm:text-5xl xl:text-6xl/none"
          >
            Transforma tus Ideas en Realidad
          </h1>

          <p className="text-muted-foreground md:text-xl">
            Transformamos tus ideas en productos personalizados de alta calidad.
            Especialistas en sublimación, impresión digital y merchandising.
          </p>
        </div>
        <div className="py-4 space-x-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg font-bold bg-indigo-300 hover:bg-violet-400 transition-colors shadow-lg"
          >
            Nuestros servicios
          </Link>
          <Link
            href="/"
            className="mt-4 px-4 py-2 shadow-lg rounded-lg bg-transparent hover:bg-muted transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-4 mb-4">
          <div className="flex md:col-span-2 md:row-span-4 h-full relative rounded-lg overflow-hidden transition-color hover:border-2 hover:border-blue-600">
            <Image
              src="/articulos-personalizados-sublimacion.png"
              alt="Image with logo name and inputs of sublimation"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="row-span-4 md:col-start-3">
            <div className="grid grid-cols-1 grid-rows-4 gap-4">
              <div className="row-span-2">
                <div className="h-60 relative rounded-lg overflow-hidden transition-color hover:border-2 hover:border-blue-600">
                  <Image
                    src="/sublimated-products.webp"
                    alt="Image with personalized items"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="row-span-2 row-start-3">
                <div className="h-60 relative rounded-lg overflow-hidden transition-color hover:border-2 hover:border-blue-600">
                  <Image
                    src="/Sublimation-Printing.png"
                    alt="Image with more personalized items"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    className="w-80 h-40 flex-shrink-0 relative rounded-lg overflow-hidden transition-color hover:border-2 hover:border-blue-600"
                  >
                    <Image
                      src={info.url}
                      alt={info.alt}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
