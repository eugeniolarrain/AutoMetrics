import LoginButton from "./login-button"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <main className="flex flex-col items-center justify-center gap-8 py-32 px-16 text-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Gestión de Automóviles
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Sistema integral para administrar tu flota de vehículos
          </p>
        </div>
        
        <LoginButton />
        
        <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
            Funcionalidades
          </h2>
          <ul className="text-left text-slate-700 dark:text-slate-300 space-y-2">
            <li>✓ Registro y seguimiento de vehículos</li>
            <li>✓ Gestión de mantenimiento</li>
            <li>✓ Control de costos</li>
            <li>✓ Reportes detallados</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
