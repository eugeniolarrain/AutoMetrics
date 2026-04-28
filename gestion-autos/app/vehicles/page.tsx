'use client';

import { useEffect, useState } from 'react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  status: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    mileage: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Vehículo creado correctamente');
        setFormData({ userId: '', brand: '', model: '', year: '', licensePlate: '', mileage: '' });
        fetchVehicles();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al crear el vehículo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este vehículo?')) return;

    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Vehículo eliminado');
        fetchVehicles();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gestión de Vehículos</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Nuevo Vehículo</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ID Usuario"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Marca"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Modelo"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Año"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Patente"
              value={formData.licensePlate}
              onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Kilometraje"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Crear Vehículo
          </button>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>

        {/* Lista */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Vehículos Registrados</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : vehicles.length === 0 ? (
            <p>No hay vehículos registrados</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Marca</th>
                  <th className="text-left py-2">Modelo</th>
                  <th className="text-left py-2">Año</th>
                  <th className="text-left py-2">Patente</th>
                  <th className="text-left py-2">Km</th>
                  <th className="text-left py-2">Estado</th>
                  <th className="text-left py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b">
                    <td className="py-2">{v.brand}</td>
                    <td className="py-2">{v.model}</td>
                    <td className="py-2">{v.year}</td>
                    <td className="py-2">{v.licensePlate}</td>
                    <td className="py-2">{v.mileage}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${v.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
