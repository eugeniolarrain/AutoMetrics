import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/vehicles - Listar todos los vehículos
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Error al obtener los vehículos' },
      { status: 500 }
    );
  }
}

// POST /api/vehicles - Crear un nuevo vehículo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, brand, model, year, licensePlate, mileage, status } = body;

    // Validaciones
    if (!userId || !brand || !model || !year || !licensePlate) {
      return NextResponse.json(
        { error: 'Campos requeridos: userId, brand, model, year, licensePlate' },
        { status: 400 }
      );
    }

    // Verificar si ya existe un vehículo con esa patente
    const existing = await prisma.vehicle.findUnique({
      where: { licensePlate },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe un vehículo con esa patente' },
        { status: 409 }
      );
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        userId,
        brand,
        model,
        year: parseInt(year),
        licensePlate,
        mileage: mileage ? parseInt(mileage) : 0,
        status: status || 'active',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: 'Error al crear el vehículo' },
      { status: 500 }
    );
  }
}
