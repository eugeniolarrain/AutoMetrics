import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, marca, modelo, anio, placa, kilometros } = body;

    if (!userId || !marca || !modelo || !anio || !placa) {
      return NextResponse.json(
        { error: 'Campos requeridos: userId, marca, modelo, anio, placa' },
        { status: 400 }
      );
    }

    const existing = await prisma.vehicle.findUnique({
      where: { placa },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe un vehículo con esa placa' },
        { status: 409 }
      );
    }

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
        marca,
        modelo,
        anio: parseInt(anio),
        placa,
        kilometros: kilometros ? parseInt(kilometros) : 0,
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