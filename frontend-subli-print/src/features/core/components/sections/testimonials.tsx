import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                Excelente servicio de sublimación. Las tazas quedaron perfectas
                y el diseño superó mis expectativas.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold">MA</span>
                </div>
                <div>
                  <p className="font-semibold">María Alejandra</p>
                  <p className="text-sm text-gray-600">Emprendedora</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                Repararon mi laptop en tiempo récord. Servicio técnico muy
                profesional y precios justos.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">CR</span>
                </div>
                <div>
                  <p className="font-semibold">Carlos Rodríguez</p>
                  <p className="text-sm text-gray-600">Contador</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                Las tarjetas de presentación quedaron increíbles. Calidad
                premium y entrega súper rápida.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold">LM</span>
                </div>
                <div>
                  <p className="font-semibold">Laura Martínez</p>
                  <p className="text-sm text-gray-600">Diseñadora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
