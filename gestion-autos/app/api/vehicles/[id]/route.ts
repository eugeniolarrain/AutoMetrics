import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

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

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { marca, modelo, anio, placa, kilometros, userId } = body;

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Vehículo no encontrado' },
        { status: 404 }
      );
    }

    if (placa && placa !== existingVehicle.placa) {
      const duplicate = await prisma.vehicle.findUnique({
        where: { placa },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: 'Ya existe un vehículo con esa placa' },
          { status: 409 }
        );
      }
    }

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
        marca,
        modelo,
        anio: anio ? parseInt(anio) : undefined,
        placa,
        kilometros: kilometros !== undefined ? parseInt(kilometros) : undefined,
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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