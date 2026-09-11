import { getAdmins } from "../../data/admins";
import { useAsync } from "../../hooks/useAsync";

export function TeamSection() {
  const { data: admins, loading } = useAsync(getAdmins, []);

  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-310 px-10">
        <div className="mb-14 max-w-160">
          <span className="mb-3.5 block font-semibold text-cobalto">
            quiénes están detrás
          </span>
          <h2 className="font-display text-[38px] font-extrabold leading-tight">
            El equipo que sostiene la comunidad
          </h2>
        </div>

        {loading && <p className="text-sm text-gris-50">Cargando...</p>}

        <div className="grid grid-cols-2 gap-6.5 sm:grid-cols-4">
          {admins?.map((admin) => (
            <div
              key={admin.id}
              className="overflow-hidden rounded-2xl border border-gris-20 bg-white"
            >
              <div className="h-45 overflow-hidden bg-gris-20 sm:h-52.5">
                {admin.avatarUrl && (
                  <img
                    src={admin.avatarUrl}
                    alt={admin.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <b className="mb-0.5 block text-base">{admin.name}</b>
                <span className="mb-2.5 block font-mono text-[10.5px] text-rosa">
                  {admin.role}
                </span>
                <p className="text-[13px] leading-relaxed text-gris-50">
                  {admin.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
