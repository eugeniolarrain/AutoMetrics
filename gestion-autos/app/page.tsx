
"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <button onClick={() => signIn("google")}>
        Login con Google
      </button>
    )
  }

  return (
    <>
      <p>Hola {session.user?.name}</p>
      <button onClick={() => signOut()}>
        Cerrar sesión
      </button>
    </>
  )
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-white">
        AutoMetrics
      </h1>
    </div>
  );
}