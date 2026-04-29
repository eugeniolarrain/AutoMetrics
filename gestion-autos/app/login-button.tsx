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
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Iniciar sesión con Google
    </button>
  );
}