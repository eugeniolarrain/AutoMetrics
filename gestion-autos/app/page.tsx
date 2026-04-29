"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-primary/80 backdrop-blur-md fixed w-full z-50 border-b border-neutral-border">
      <h1 className="text-xl font-bold text-accent">AutoMetrics</h1>
      <div className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-neutral-subtext hover:text-neutral-text transition">Características</a>
        <a href="#benefits" className="text-neutral-subtext hover:text-neutral-text transition">Beneficios</a>
        <a href="#pricing" className="text-neutral-subtext hover:text-neutral-text transition">Precios</a>
        <a href="#contact" className="text-neutral-subtext hover:text-neutral-text transition">Contacto</a>
      </div>
      <div className="flex items-center gap-3">
        <a href="/api/auth/signin" className="text-neutral-subtext hover:text-neutral-text transition hidden md:block">
          Iniciar sesión
        </a>
        <a href="/api/auth/signin" className="bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition">
          Comenzar gratis
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 px-6 bg-gradient-to-br from-primary-dark via-primary-dark to-primary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm mb-6">
            Más de 1.000 usuarios confiando en nosotros
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Controla tus vehículos como un profesional
          </h1>
          <p className="text-neutral-subtext text-lg mb-8 max-w-lg">
            Gestiona tu flota de vehículos, controla gastos, recibe recordatorios de mantención y mantén todo bajo control en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/api/auth/signin" className="bg-accent hover:bg-accent-hover px-6 py-3 rounded-lg font-medium text-center transition">
              Comenzar gratis
            </a>
            <button className="border border-neutral-border hover:border-accent px-6 py-3 rounded-lg font-medium transition">
              Ver demo
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-primary-light rounded-2xl p-6 border border-neutral-border shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">BMW M4</span>
              <span className="text-success text-sm">● Activo</span>
            </div>
            <div className="space-y-3">
              <div className="bg-primary-dark rounded-lg p-3">
                <p className="text-neutral-subtext text-xs">Kilometraje</p>
                <p className="text-xl font-semibold">45.200 km</p>
              </div>
              <div className="bg-primary-dark rounded-lg p-3">
                <p className="text-neutral-subtext text-xs">Última mantención</p>
                <p className="text-xl font-semibold">15 Mar 2024</p>
              </div>
              <div className="bg-primary-dark rounded-lg p-3">
                <p className="text-neutral-subtext text-xs">Gastos mes</p>
                <p className="text-xl font-semibold text-error">$450.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-primary-light p-6 rounded-2xl border border-neutral-border hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-subtext">{description}</p>
    </div>
  );
}

function Features() {
  const features = [
    { icon: "🚗", title: "Gestión completa", description: "Registra y adminstra todos tus vehículos en un solo lugar." },
    { icon: "💰", title: "Control de gastos", description: "Registra combustible, mantenciones y más." },
    { icon: "🔔", title: "Recordatorios", description: "Recibe alertas de mantenciones y seguros." },
  ];

  return (
    <section id="features" className="py-20 px-6 bg-primary-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Características</h2>
        <p className="text-neutral-subtext text-center mb-12 max-w-2xl mx-auto">
          Todo lo que necesitas para gestionar tus vehículos de forma profesional.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="benefits" className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tu dashboard profesional</h2>
          <p className="text-neutral-subtext text-lg mb-8">
            Visualiza el estado de tu flota en tiempo real.KPIs, gráficos y más herramientas para que tomes mejores decisiones.
          </p>
          <a href="/api/auth/signin" className="bg-accent hover:bg-accent-hover px-6 py-3 rounded-lg font-medium inline-block transition">
            Empieza hoy mismo
          </a>
        </div>
        <div className="bg-primary-light rounded-2xl p-6 border border-neutral-border shadow-2xl">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-neutral-subtext text-xs">Vehículos</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-neutral-subtext text-xs">Gastos mes</p>
              <p className="text-2xl font-bold text-error">$1.2M</p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-neutral-subtext text-xs">Total km</p>
              <p className="text-2xl font-bold">234K</p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <p className="text-neutral-subtext text-xs">Próxima mantención</p>
              <p className="text-2xl font-bold text-accent">5 Abr</p>
            </div>
          </div>
          <div className="bg-primary-dark rounded-lg p-4">
            <p className="text-neutral-subtext text-xs mb-2">Gastos últimos 6 meses</p>
            <div className="flex items-end gap-1 h-24">
              {[40, 65, 45, 80, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-accent rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-20 px-6 bg-primary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Empieza hoy mismo</h2>
        <p className="text-neutral-subtext text-lg mb-8">
          Únete a más de 1.000 usuarios que ya confían en AutoMetrics.
        </p>
        <a href="/api/auth/signin" className="bg-accent hover:bg-accent-hover px-8 py-4 rounded-lg font-medium text-lg inline-block transition">
          Comenzar gratis
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    { title: "Producto", links: ["Características", "Beneficios", "Precios"] },
    { title: "Recursos", links: ["Documentación", "API", "Tutoriales"] },
    { title: "Compañía", links: ["Sobre nosotros", "Blog", "Contacto"] },
  ];

  return (
    <footer className="py-16 px-6 bg-primary-dark border-t border-neutral-border">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-accent mb-4">AutoMetrics</h3>
          <p className="text-neutral-subtext text-sm">Gestiona tus vehículos como un profesional.</p>
        </div>
        {columns.map((col, i) => (
          <div key={i}>
            <h4 className="font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="text-neutral-subtext hover:text-neutral-text text-sm transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-neutral-subtext text-sm mb-3">Recibe noticias y actualizaciones.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-primary-light border border-neutral-border rounded-l-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-accent"
            />
            <button className="bg-accent hover:bg-accent-hover px-3 py-2 rounded-r-lg text-sm transition">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-border text-center text-neutral-subtext text-sm">
        © 2024 AutoMetrics. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function VehicleCard({ vehicle }: { vehicle: { id: string; marca: string; modelo: string; anio: number; placa: string; kilometros: number } }) {
  return (
    <div className="bg-primary-light p-5 rounded-2xl border border-neutral-border shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{vehicle.marca} {vehicle.modelo}</h3>
        <span className="bg-success/20 text-success px-2 py-1 rounded-full text-xs">Activo</span>
      </div>
      <p className="text-neutral-subtext">Año: {vehicle.anio}</p>
      <p className="text-neutral-subtext">Placa: {vehicle.placa}</p>
      <p className="text-neutral-subtext">KM: {vehicle.kilometros.toLocaleString()}</p>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/vehicles")
        .then((res) => res.json())
        .then((data) => {
          setVehicles(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-primary-dark text-neutral-text flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-primary-dark text-neutral-text">
        <Navbar />
        <Hero />
        <Features />
        <DashboardPreview />
        <CTA />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark text-neutral-text">
      <Navbar />
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Mis Vehículos</h2>
            <a href="/vehicles/new" className="bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg font-medium transition">
              Agregar vehículo
            </a>
          </div>
          {vehicles.length === 0 ? (
            <p className="text-neutral-subtext text-lg">No hay vehículos listados</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map((vehicle: any) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}