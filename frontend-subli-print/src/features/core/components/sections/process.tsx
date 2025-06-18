import { CardProcess } from "../card-process";

const Process = () => {
  return (
    <section className="py-20 shadow-2xl">
      <div className="container mx-auto p-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ¿Cómo Trabajamos?
          </h2>
          <p className="text-xl text-foreground/90">
            Un proceso simple y transparente para materializar tus ideas.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Process Steps */}
          <CardProcess
            sequence={1}
            title="Consulta"
            description="Nos cuentas tu idea y juntos analizamos la mejor solución."
          />

          <CardProcess
            sequence={2}
            title="Diseño"
            description="Creamos el diseño según tus especificaciones y lo revisamos de forma iterativa."
          />
          <CardProcess
            sequence={3}
            title="Producción"
            description="Fabricamos tu producto con la más alta calidad."
          />

          <CardProcess
            sequence={4}
            title="Entrega"
            description="Recibe tu producto terminado en el tiempo acordado y con la calidad que esperabas."
          />
        </div>
      </div>
    </section>
  );
};
export default Process;
