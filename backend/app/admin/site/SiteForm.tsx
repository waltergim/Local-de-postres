"use client";

import { useActionState, useState } from "react";
import type { HoursRow, SiteConfig } from "@/lib/db/schema";
import { updateSite, type SiteFormState } from "@/app/actions/site";

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900";

export function SiteForm({ site }: { site: SiteConfig }) {
  const [state, formAction, pending] = useActionState<SiteFormState, FormData>(
    updateSite,
    {},
  );
  const [hours, setHours] = useState<HoursRow[]>(site.hours ?? []);
  const errors = state.fieldErrors ?? {};

  function updateRow(index: number, key: keyof HoursRow, value: string) {
    setHours((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  }

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" defaultValue={site.name} error={errors.name} required />
        <Field
          label="Nombre corto"
          name="shortName"
          defaultValue={site.shortName}
          error={errors.shortName}
          required
        />
      </div>

      <Field label="Frase / eslogan" name="tagline" defaultValue={site.tagline} error={errors.tagline} />
      <Field
        label="Descripción"
        name="description"
        defaultValue={site.description}
        error={errors.description}
        textarea
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ubicación" name="location" defaultValue={site.location} error={errors.location} />
        <Field label="Dirección" name="address" defaultValue={site.address} error={errors.address} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Teléfono (para mostrar)"
          name="phoneDisplay"
          defaultValue={site.phoneDisplay}
          error={errors.phoneDisplay}
        />
        <Field
          label="WhatsApp (solo números)"
          name="whatsapp"
          defaultValue={site.whatsapp}
          error={errors.whatsapp}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Instagram (URL)" name="instagram" defaultValue={site.instagram} error={errors.instagram} />
        <Field label="Facebook (URL)" name="facebook" defaultValue={site.facebook} error={errors.facebook} />
      </div>

      <Field label="Email" name="email" defaultValue={site.email} error={errors.email} />

      <div className="space-y-2">
        <span className="block text-sm font-medium">Horarios</span>
        <div className="space-y-2">
          {hours.map((row, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                name="days"
                value={row.days}
                onChange={(event) => updateRow(index, "days", event.target.value)}
                placeholder="Lunes a Viernes"
                className={inputClass}
              />
              <input
                name="time"
                value={row.time}
                onChange={(event) => updateRow(index, "time", event.target.value)}
                placeholder="19:00 - 00:00"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() =>
                  setHours((rows) => rows.filter((_, i) => i !== index))
                }
                className="shrink-0 rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setHours((rows) => [...rows, { days: "", time: "" }])}
          className="text-sm text-neutral-700 hover:underline"
        >
          + Agregar horario
        </button>
      </div>

      {state.success && (
        <p className="text-sm text-green-700">Cambios guardados.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar cambios"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  required,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string[];
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          defaultValue={defaultValue ?? ""}
          required={required}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          required={required}
          className={inputClass}
        />
      )}
      {error && <p className="text-sm text-red-600">{error[0]}</p>}
    </div>
  );
}
