import { LoginButton } from "./login-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-dark text-neutral-text">
      <nav className="flex justify-between items-center px-6 py-4 bg-primary">
        <h1 className="text-xl font-bold">AutoMetrics</h1>
        <LoginButton />
      </nav>

      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-light p-5 rounded-2xl border border-neutral-border shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Toyota Corolla</h2>
          <p className="text-neutral-subtext">Año: 2020</p>
          <p className="text-neutral-subtext">KM: 45.000</p>
          <button className="mt-4 w-full bg-accent hover:bg-accent-hover py-2 rounded-lg transition">
            Ver detalles
          </button>
        </div>
      </section>
    </main>
  );
}