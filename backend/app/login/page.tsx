import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Ingresar al panel",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold">Panel de administración</h1>
        <p className="mb-6 text-sm text-neutral-500">
          Ingresá tu contraseña para continuar.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
