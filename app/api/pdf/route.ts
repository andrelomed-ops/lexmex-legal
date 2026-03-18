import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tipo, datos } = body;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    switch (tipo) {
      case 'demanda':
        generarDemanda(doc, datos, pageWidth);
        break;
      case 'contrato':
        generarContrato(doc, datos, pageWidth);
        break;
      case 'escrito':
        generarEscrito(doc, datos, pageWidth);
        break;
      case 'cartapoder':
        generarCartaPoder(doc, datos, pageWidth);
        break;
      case 'acta':
        generarActa(doc, datos, pageWidth);
        break;
      default:
        generarDocumentoGeneral(doc, datos, pageWidth);
    }

    const pdfBase64 = doc.output('datauristring').split(',')[1];
    
    return NextResponse.json({
      success: true,
      pdf: pdfBase64,
      filename: `${tipo}_${new Date().toISOString().split('T')[0]}.pdf`
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Error al generar el PDF' },
      { status: 500 }
    );
  }
}

function generarDemanda(doc: jsPDF, datos: any, pageWidth: number) {
  const { actor, demandado, juicio, hechos, fundamentos, petitorio, lugar, fecha } = datos;
  
  let y = 20;
  
  doc.setFontSize(12);
  doc.text('PODER JUDICIAL DEL ESTADO DE', pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.text('JUZGADO', pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  doc.setFontSize(14);
  doc.text('C. JUEZ', 20, y);
  y += 10;
  
  doc.setFontSize(11);
  doc.text(actor.nombre + ',', 20, y);
  y += 7;
  doc.text('por mi propio derecho, ante usted atentamente comparezco y digo:', 20, y);
  y += 15;
  
  doc.setFontSize(12);
  doc.text('Que por medio del presente escrito promuevo DEMANDA', 20, y);
  y += 10;
  doc.setFontSize(11);
  doc.text('en contra de ' + demandado.nombre + ',', 20, y);
  y += 10;
  doc.text('en materia de ' + juicio.materia + ',', 20, y);
  y += 15;
  
  doc.text('EXPONIENDO:', 20, y);
  y += 10;
  
  if (hechos && Array.isArray(hechos)) {
    hechos.forEach((h: string, i: number) => {
      doc.text(`${i + 1}. ${h}`, 25, y);
      y += 7;
    });
  }
  y += 10;
  
  doc.text('FUNDAMENTANDO MI ACCIÓN EN:', 20, y);
  y += 10;
  
  if (fundamentos && Array.isArray(fundamentos)) {
    fundamentos.forEach((f: string, i: number) => {
      doc.text(`${i + 1}. ${f}`, 25, y);
      y += 7;
    });
  }
  y += 10;
  
  doc.text('PROTESTANDO LO NECESARIO:', 20, y);
  y += 10;
  doc.text('Por lo anteriormente expuesto, alhöral atentamente pido:', 20, y);
  y += 10;
  
  if (petitorio && Array.isArray(petitorio)) {
    petitorio.forEach((p: string, i: number) => {
      doc.text(`${i + 1}. ${p}`, 25, y);
      y += 7;
    });
  }
  y += 15;
  
  doc.text('PROTESTANDO LO NECESARIO.', 20, y);
  y += 20;
  
  doc.text('Lugar y fecha: ' + lugar + ', ' + fecha, 20, y);
  y += 20;
  
  doc.text('_______________________________', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text(actor.nombre, pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  doc.setFontSize(9);
  doc.text('NOTA: Este documento es un modelo y debe ser revisado por un abogado.', 20, y);
}

function generarContrato(doc: jsPDF, datos: any, pageWidth: number) {
  const { titulo, partes, clausulas, lugar, fecha } = datos;
  
  let y = 20;
  
  doc.setFontSize(16);
  doc.text(titulo || 'CONTRATO', pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  doc.setFontSize(11);
  doc.text('Que celebran:', 20, y);
  y += 10;
  
  if (partes && Array.isArray(partes)) {
    partes.forEach((p: any) => {
      doc.text(p.nombre + ',', 25, y);
      doc.text(p.descripcion, 25, y + 7);
      y += 20;
    });
  }
  y += 10;
  
  doc.text('CLAUSULAS:', 20, y);
  y += 10;
  
  if (clausulas && Array.isArray(clausulas)) {
    clausulas.forEach((c: any, i: number) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${c.titulo}`, 20, y);
      y += 8;
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(c.contenido, pageWidth - 40);
      doc.text(lines, 25, y);
      y += lines.length * 5 + 10;
    });
  }
  
  y += 15;
  doc.text('En ' + lugar + ', a ' + fecha, 20, y);
  y += 25;
  
  if (partes && Array.isArray(partes)) {
    partes.forEach((p: any) => {
      doc.text('_______________________________', 20, y);
      doc.text(p.nombre, 20, y + 7);
    });
  }
  
  y += 30;
  doc.setFontSize(8);
  doc.text('Documento generado por LexMex - Asesor Legal Inteligente', pageWidth / 2, y, { align: 'center' });
}

function generarEscrito(doc: jsPDF, datos: any, pageWidth: number) {
  const { destinatario, asunto, contenido, lugar, fecha, remitente } = datos;
  
  let y = 20;
  
  doc.setFontSize(11);
  doc.text('浙江省杭州市', 20, y);
  y += 10;
  doc.text(destinatario || 'DESTINATARIO', 20, y);
  y += 10;
  doc.text('Presente', 20, y);
  y += 20;
  
  doc.text('Asunto: ' + (asunto || 'ASUNTO'), 20, y);
  y += 15;
  
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(contenido || 'Contenido del escrito...', pageWidth - 40);
  doc.text(lines, 20, y);
  y += lines.length * 5 + 20;
  
  doc.text('Atentamente,', 20, y);
  y += 20;
  
  doc.text(remitente || 'REMITENTE', 20, y);
  y += 15;
  
  doc.text(lugar + ', ' + fecha, 20, y);
}

function generarCartaPoder(doc: jsPDF, datos: any, pageWidth: number) {
  const { otorgante, apoderado, poderes, lugar, fecha } = datos;
  
  let y = 25;
  
  doc.setFontSize(14);
  doc.text('CARTA PODER', pageWidth / 2, y, { align: 'center' });
  y += 20;
  
  doc.setFontSize(11);
  doc.text('Que subscribe el(la) C. ' + otorgante.nombre + ',', 20, y);
  y += 10;
  doc.text('en su calidad de ' + otorgante.caracter + ',', 20, y);
  y += 15;
  
  doc.text('OTORGA PODER GENERAL PARA:', 20, y);
  y += 10;
  
  if (poderes && Array.isArray(poderes)) {
    poderes.forEach((p: string, i: number) => {
      doc.text(`${i + 1}. ${p}`, 25, y);
      y += 7;
    });
  }
  y += 15;
  
  doc.text('A favor del(la) C. ' + (apoderado?.nombre || 'APODERADO'), 20, y);
  y += 15;
  
  doc.text('Lugar y fecha: ' + lugar + ', ' + fecha, 20, y);
  y += 25;
  
  doc.text('_______________________________', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('Otorgante', pageWidth / 2, y, { align: 'center' });
  y += 20;
  
  doc.text('_______________________________', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('Testigo 1', pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  doc.text('_______________________________', pageWidth / 2, y, { align: 'center' });
  y += 7;
  doc.text('Testigo 2', pageWidth / 2, y, { align: 'center' });
}

function generarActa(doc: jsPDF, datos: any, pageWidth: number) {
  const { tipo, elementos, comparecientes, objeto, lugar, fecha, hora } = datos;
  
  let y = 20;
  
  doc.setFontSize(14);
  doc.text('ACTA ' + (tipo || 'CONSTITUTIVA'), pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  doc.setFontSize(11);
  doc.text('En la ciudad de ' + lugar + ', siendo las ' + hora + ' horas del día ' + fecha + ',', 20, y);
  y += 15;
  
  doc.text('COMPARECEN:', 20, y);
  y += 10;
  
  if (comparecientes && Array.isArray(comparecientes)) {
    comparecientes.forEach((c: any, i: number) => {
      doc.text(`${i + 1}. ${c.nombre}`, 25, y);
      doc.text(`   ${c.caracter}`, 25, y + 7);
      y += 15;
    });
  }
  y += 10;
  
  doc.text('OBJETO:', 20, y);
  y += 10;
  
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(objeto || '', pageWidth - 40);
  doc.text(lines, 20, y);
  y += lines.length * 5 + 15;
  
  if (elementos && Array.isArray(elementos)) {
    doc.setFontSize(11);
    doc.text('ELEMENTOS:', 20, y);
    y += 10;
    elementos.forEach((e: any, i: number) => {
      doc.text(`${i + 1}. ${typeof e === 'string' ? e : e.nombre}`, 25, y);
      y += 7;
    });
  }
  
  y += 20;
  doc.text('FIRMAS:', 20, y);
  y += 15;
  
  if (comparecientes && Array.isArray(comparecientes)) {
    comparecientes.forEach((c: any) => {
      doc.text('_______________________________', 20, y);
      doc.text(c.nombre, 20, y + 7);
    });
  }
}

function generarDocumentoGeneral(doc: jsPDF, datos: any, pageWidth: number) {
  const { titulo, contenido, lugar, fecha } = datos;
  
  let y = 20;
  
  if (titulo) {
    doc.setFontSize(14);
    doc.text(titulo, pageWidth / 2, y, { align: 'center' });
    y += 15;
  }
  
  doc.setFontSize(11);
  if (contenido) {
    const lines = doc.splitTextToSize(contenido, pageWidth - 40);
    doc.text(lines, 20, y);
  }
  
  y += 30;
  doc.text('Lugar y fecha: ' + (lugar || 'Ciudad de México') + ', ' + (fecha || new Date().toLocaleDateString('es-MX')), 20, y);
}
