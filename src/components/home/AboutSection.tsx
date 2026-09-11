const values = [
  {
    title: "Acompañamiento real",
    description:
      "Espacios seguros de intercambio y contención entre pares.",
  },
  {
    title: "Oportunidades concretas",
    description:
      "Compartimos recursos, herramientas y ofertas laborales verificadas.",
  },
  {
    title: "Visibilidad",
    description:
      "Amplificamos las voces, los proyectos y el talento de nuestras integrantes.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-310 grid-cols-1 gap-16 px-10 lg:grid-cols-2">
        <div>
          <span className="mb-3.5 block font-semibold text-cobalto">
            sobre nosotras
          </span>
          <h2 className="mb-5 font-display text-[34px] font-extrabold leading-tight">
            Una comunidad, no una plataforma más
          </h2>
          <p className="mb-5 text-[17px] leading-relaxed text-grafito">
            STEAM Girls nació de un grupo de personas que empezó a
            encontrarse en eventos de tecnología. Esos encuentros se
            transformaron en vínculos, amistad y una comunidad creada para
            acompañarse y crecer juntas dentro del ecosistema tecnológico.
          </p>
          <p className="mb-5 text-[17px] leading-relaxed text-grafito">
            Hoy somos una red abierta a cualquier persona en cualquier etapa:
            estudiando, dando sus primeros pasos o ya trabajando en el
            sector.
          </p>
          <div className="mt-8 flex flex-col">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`flex gap-4.5 py-5 ${
                  i === 0 ? "" : "border-t border-gris-20"
                } ${i === values.length - 1 ? "border-b" : ""}`}
              >
                <span className="min-w-7 pt-0.5 font-mono text-[13px] text-rosa">
                  0{i + 1}
                </span>
                <div>
                  <b className="mb-1 block text-base">{value.title}</b>
                  <span className="text-sm text-gris-50">
                    {value.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-105 lg:h-130">
          <div className="absolute left-37.5 top-50 -z-10 h-130 w-130 rounded-full bg-lila" />
          <div className="absolute right-10 top-0 h-85 w-70 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80"
              alt="Personas en un encuentro de tecnología"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-57.5 w-50 overflow-hidden rounded-2xl border-6 border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80"
              alt="Personas presentando en un evento tech"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
