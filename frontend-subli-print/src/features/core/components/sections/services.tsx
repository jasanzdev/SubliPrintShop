import React from "react";
import { MonitorIcon, PaletteIcon, PrinterIcon } from "lucide-react";
import CardServices from "@/shared/components/card-service";

const Services = () => {
  const description =
    "We provide a variety of services to cater to your needs, including web development, mobile app development, and digital marketing.";
  const title = "Our Services";
  const sublimation = [
    "Tazas y vasos personalizados",
    "Camisetas y textiles",
    "Placas y reconocimientos",
    "Diseño personalizado incluido",
  ];
  const impresion = [
    "Documentos y reportes",
    "Fotografías de alta calidad",
    "Flyers y material publicitario",
    "Tarjetas de presentación",
  ];
  const it = [
    "Reparación de equipos",
    "Instalación de software",
    "Mantenimiento preventivo",
    "Consultoría tecnológica",
  ];

  return (
    <div className="p-6 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardServices
            icon={
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <PaletteIcon className="w-8 h-8 text-white" />
              </div>
            }
            name="Sublimación Personalizada"
            desc="Artículos únicos con tus diseños e ideas"
            services={sublimation}
            button={{ text: "Ver Productos", link: "/" }}
          />
          <CardServices
            icon={
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <PrinterIcon className="w-8 h-8 text-white" />
              </div>
            }
            name="Impresión Profesional"
            desc="Documentos, fotos y material publicitario"
            services={impresion}
            button={{ text: "Solicitar Cotizacion", link: "/" }}
          />
          <CardServices
            icon={
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MonitorIcon className="w-8 h-8 text-white" />
              </div>
            }
            name="Servicios Informáticos"
            desc="Soluciones integrales de software y hardware"
            services={it}
            button={{ text: "Agendar Servicio", link: "/" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
