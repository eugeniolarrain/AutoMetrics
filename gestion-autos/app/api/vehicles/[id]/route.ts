import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/vehicles/[id] - Obtener un vehículo por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
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

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehículo no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json(
      { error: 'Error al obtener el vehículo' },
      { status: 500 }
    );
  }
}

// PUT /api/vehicles/[id] - Actualizar un vehículo
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { brand, model, year, licensePlate, mileage, status, userId } = body;

    // Verificar si el vehículo existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Vehículo no encontrado' },
        { status: 404 }
      );
    }

    // Verificar patente única si se está actualizando
    if (licensePlate && licensePlate !== existingVehicle.licensePlate) {
      const duplicate = await prisma.vehicle.findUnique({
        where: { licensePlate },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: 'Ya existe un vehículo con esa patente' },
          { status: 409 }
        );
      }
    }

    // Si se cambia el userId, verificar que el nuevo usuario exista
    if (userId && userId !== existingVehicle.userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Usuario no encontrado' },
          { status: 404 }
        );
      }
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        brand,
        model,
        year: year ? parseInt(year) : undefined,
        licensePlate,
        mileage: mileage !== undefined ? parseInt(mileage) : undefined,
        status,
        userId,
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

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el vehículo' },
      { status: 500 }
    );
  }
}

// DELETE /api/vehicles/[id] - Eliminar un vehículo
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verificar si el vehículo existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Vehículo no encontrado' },
        { status: 404 }
      );
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Vehículo eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el vehículo' },
      { status: 500 }
    );
  }
}
