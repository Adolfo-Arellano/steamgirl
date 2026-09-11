const pillars = [
  {
    letter: "M",
    bg: "var(--color-cobalto)",
    color: "white",
    title: "Misión",
    description:
      "Creamos espacios seguros de intercambio, contención y aprendizaje. Compartimos herramientas, recursos y oportunidades para el desarrollo profesional.",
  },
  {
    letter: "V",
    bg: "var(--color-rosa)",
    color: "var(--color-indigo)",
    title: "Visión",
    description:
      "Ser una comunidad referente en tecnología, donde nadie tenga que transitar sola o solo su formación, inserción o crecimiento profesional.",
  },
  {
    letter: "P",
    bg: "var(--color-menta)",
    color: "var(--color-indigo)",
    title: "Propósito",
    description:
      "Acompañar, conectar y ser una red de sostén para quienes forman parte del mundo IT, impulsando su desarrollo en una industria donde la diversidad todavía es un desafío.",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-310 px-10">
        <div className="mb-14 max-w-160">
          <span className="mb-3.5 block font-semibold text-cobalto">
            misión, visión y propósito
          </span>
          <h2 className="font-display text-[38px] font-extrabold leading-tight">
            Nadie transita sola o solo su camino
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[20px] border border-gris-20 bg-white p-9"
            >
              <div
                className="mb-5.5 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-extrabold"
                style={{ backgroundColor: pillar.bg, color: pillar.color }}
              >
                {pillar.letter}
              </div>
              <h3 className="mb-3 text-xl font-bold">{pillar.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-gris-50">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
