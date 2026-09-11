import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadImage, type ImageBucket } from "../../lib/storage";

interface ImageUploadFieldProps {
  bucket: ImageBucket;
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  aspect?: "square" | "wide";
}

/**
 * Input de imagen con preview: sube el archivo elegido a Supabase Storage
 * (bucket "avatars" o "post-covers") y devuelve la URL pública vía onChange.
 */
export function ImageUploadField({
  bucket,
  label,
  value,
  onChange,
  aspect = "wide",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const result = await uploadImage(bucket, file);

    setUploading(false);

    if (result.url) {
      onChange(result.url);
    } else {
      setError(result.error ?? "No pudimos subir la imagen.");
    }

    // Permite volver a elegir el mismo archivo si hace falta reintentar
    e.target.value = "";
  }

  const previewShape =
    aspect === "square" ? "h-24 w-24 rounded-full" : "h-32 w-full rounded-xl";

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-grafito">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {value ? (
          <img
            src={value}
            alt="Vista previa"
            className={`${previewShape} border border-gris-20 object-cover`}
          />
        ) : (
          <div
            className={`${previewShape} flex items-center justify-center border-[1.5px] border-dashed border-gris-20 text-gris-50`}
          >
            <Upload size={18} />
          </div>
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border-[1.5px] border-indigo px-4 py-2 text-[13px] font-bold text-indigo disabled:opacity-60"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Subiendo...
            </span>
          ) : value ? (
            "Cambiar imagen"
          ) : (
            "Subir imagen"
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-rosa">{error}</p>}
    </div>
  );
}
