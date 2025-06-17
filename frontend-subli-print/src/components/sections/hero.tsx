import Image from "next/image";
import Link from "next/link";

const Hero = () => {
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
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary opacity-80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-4">
                  <div className="p-2 rounded-lg shadow-2xl transform rotate-[-5deg]">
                    <div className="w-70 h-50 rounded-lg flex items-center justify-center">
                      <Image
                        src="/mugs-others.jpeg"
                        alt="Image of a personalized mug and canteen"
                        className="object-cover rounded-lg"
                        fill
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg shadow-lg transform rotate-[5deg]">
                    <div className="w-70 h-50 rounded flex items-center justify-center">
                      <Image
                        src="/mug-canteen.jpeg"
                        alt="Image of a personalized mugs and other products"
                        className="object-cover rounded-lg"
                        fill
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg shadow-lg transform rotate-[3deg]">
                    <div className="w-70 h-50 rounded flex items-center justify-center">
                      <Image
                        src="/products-sublimation.png"
                        alt="Image of a personalized sublimation products"
                        className="object-cover rounded-lg"
                        fill
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg shadow-lg transform rotate-[-3deg]">
                    <div className="w-70 h-50 rounded flex items-center justify-center">
                      <Image
                        src="/Sublimation-small-format.png"
                        alt="Image of a personalized small format sublimation products"
                        className="object-cover rounded-lg"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
