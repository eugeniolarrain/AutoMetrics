"use client";

import { useSession } from "next-auth/react";
import { LoginButton } from "./login-button";
import { useEffect, useState } from "react";

interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
  kilometros: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchVehicles();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      if (res.ok) {
        const data = await res.json();
        setVehicles(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-primary-dark text-neutral-text flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-primary-dark text-neutral-text flex items-center justify-center">
        <div className="text-center p-8 bg-primary-light rounded-2xl border border-neutral-border shadow-lg">
          <h1 className="text-4xl font-bold mb-8">AutoMetrics</h1>
          <LoginButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary-dark text-neutral-text">
      <nav className="flex justify-between items-center px-6 py-4 bg-primary">
        <h1 className="text-xl font-bold">AutoMetrics</h1>
        <LoginButton />
      </nav>

      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Mis Vehículos</h2>
          <a
            href="/vehicles/new"
            className="bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition"
          >
            Agregar vehículo
          </a>
        </div>

        {vehicles.length === 0 ? (
          <p className="text-neutral-subtext text-lg">No hay vehículos listados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-primary-light p-5 rounded-2xl border border-neutral-border shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {vehicle.marca} {vehicle.modelo}
                </h3>
                <p className="text-neutral-subtext">Año: {vehicle.anio}</p>
                <p className="text-neutral-subtext">Placa: {vehicle.placa}</p>
                <p className="text-neutral-subtext">KM: {vehicle.kilometros}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}