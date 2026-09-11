import { SubscribeForm } from "../../components/newsletter/SubscribeForm";

export function FinalCtaSection() {
  return (
    <section className="bg-techblack py-28 text-center">
      <div className="mx-auto max-w-310 px-10">
        <span className="mb-5 block font-semibold text-menta">sumate</span>
        <h2 className="mx-auto mb-7.5 max-w-160 font-display text-[38px] font-extrabold leading-tight text-white sm:text-[44px]">
          Recibí el newsletter directo en tu correo
        </h2>
        <p className="mb-9.5 text-[17px] text-[#9A9CC4]">
          Eventos, oportunidades e investigaciones de la comunidad, sin
          necesidad de crear una cuenta.
        </p>
        <SubscribeForm variant="dark" />
        <p className="mt-4 text-xs text-[#7678A8]">
          Sin spam. Podés darte de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
