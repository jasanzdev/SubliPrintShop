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
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-purple-600">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Consulta</h3>
            <p className="text-foreground">
              Nos cuentas tu idea y juntos analizamos la mejor solución.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Diseño</h3>
            <p className="text-foreground">
              Creamos el diseño según tus especificaciones y lo revisamos de
              forma iterativa.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Producción</h3>
            <p className="text-foreground">
              Fabricamos tu producto con la más alta calidad
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">4</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Entrega</h3>
            <p className="text-foreground">
              Recibe tu producto terminado en el tiempo acordado y con la
              calidad que esperabas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Process;
