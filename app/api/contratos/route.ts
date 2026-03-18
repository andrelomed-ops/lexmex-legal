import { NextRequest, NextResponse } from 'next/server';
import { plantillas } from '@/data/plantillas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tipo, datos } = body;

    const plantilla = plantillas.find(p => p.tipo === 'contrato' && p.id.includes(tipo));
    
    if (!plantilla) {
      return NextResponse.json(
        { error: 'Plantilla no encontrada' },
        { status: 404 }
      );
    }

    let contenido = plantilla.contenido;

    for (const [key, value] of Object.entries(datos)) {
      const regex = new RegExp(`\\[${key.toUpperCase()}\\]`, 'g');
      contenido = contenido.replace(regex, String(value) || `[${key}]`);
    }

    const camposFaltantes = contenido.match(/\[.*?\]/g);
    if (camposFaltantes) {
      const camposUnicos = Array.from(new Set(camposFaltantes));
      return NextResponse.json({
        success: true,
        contenido,
        camposFaltantes: camposUnicos,
        mensaje: ' Algunos campos no fueron completados'
      });
    }

    return NextResponse.json({
      success: true,
      contenido,
      nombre: plantilla.nombre
    });

  } catch (error) {
    console.error('Error generating contrato:', error);
    return NextResponse.json(
      { error: 'Error al generar contrato' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const contratos = plantillas
    .filter(p => p.tipo === 'contrato')
    .map(p => ({
      id: p.id,
      nombre: p.nombre,
      materia: p.materia,
      descripcion: p.descripcion
    }));

  return NextResponse.json({ contratos });
}
