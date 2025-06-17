import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const heroImages = [
    {
      src: "/mugs-others.jpeg",
      alt: "Image of a personalized mug and canteen",
      rotation: "rotate-[-5deg]",
      priority: true,
    },
    {
      src: "/mug-canteen.jpeg",
      alt: "Image of a personalized mugs and other products",
      rotation: "rotate-[5deg]",
      priority: false,
    },
    {
      src: "/products-sublimation.png",
      alt: "Image of a personalized sublimation products",
      rotation: "rotate-[3deg]",
      priority: false,
    },
    {
      src: "/Sublimation-small-format.png",
      alt: "Image of a personalized small format sublimation products",
      rotation: "rotate-[-3deg]",
      priority: false,
    },
  ] as const;

  return (
    <section className="w-full py-8 shadow-2xl">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="animate-bg-color font-nacelle text-3xl font-semibold text-transparent md:text-4xl tracking-tighter sm:text-5xl xl:text-6xl/none">
                Transforma tus Ideas en Realidad
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transformamos tus ideas en productos personalizados de alta
                calidad. Especialistas en sublimación, impresión digital y
                merchandising.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/" className="mt-4 px-4 py-2 btn btn-primary">
                Nuestros servicios
              </Link>
              <Link href="/" className="mt-4 px-4 py-2 btn btn-secondary">
                Contactar
              </Link>
            </div>
          </div>
          <div className="flex place-content-center">
            <div className="relative w-full h-[450px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20 rounded-lg pointer-events-none" />
              <div className="grid grid-cols-2 gap-8 p-4 h-full">
                {heroImages.map((image) => (
                  <div
                    key={image.src}
                    className={`relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${image.rotation}`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                      priority={image.priority}
                      loading={image.priority ? "eager" : "lazy"}
                      className="object-cover rounded-lg"
                      quality={85}
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

export default Hero;
