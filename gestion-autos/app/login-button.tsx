"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={session.user?.image || ""}
          alt={session.user?.name || "Usuario"}
          className="w-10 h-10 rounded-full"
        />
        <span className="text-white">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition"
    >
      Iniciar sesión con Google
    </button>
  );
}