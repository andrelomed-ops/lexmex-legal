import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    let doc: Document;

    switch (type) {
      case 'demanda':
        doc = createDemandaDocument(data);
        break;
      case 'contrato':
        doc = createContratoDocument(data);
        break;
      case 'contrato-texto':
        doc = createContratoFromText(data);
        break;
      case 'expediente':
        doc = createExpedienteDocument(data);
        break;
      case 'informe':
        doc = createInformeDocument(data);
        break;
      default:
        doc = createGeneralDocument(data);
    }

    const buffer = await Packer.toBuffer(doc);
    const base64 = buffer.toString('base64');

    return NextResponse.json({
      success: true,
      document: base64,
      filename: `${type}_${new Date().toISOString().split('T')[0]}.docx`
    });

  } catch (error) {
    console.error('Word generation error:', error);
    return NextResponse.json(
      { error: 'Error generating Word document' },
      { status: 500 }
    );
  }
}

function createDemandaDocument(data: any): Document {
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'PODER JUDICIAL DEL ESTADO DE MEXICO',
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1
        }),
        new Paragraph({
          text: 'JUZGADO CIVIL',
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_2
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'C. JUEZ DE LO CIVIL',
          heading: HeadingLevel.HEADING_3
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: `${data.actor || '[ACTOR]'}, por mi propio derecho, ante usted atentamente comparezco y digo:`, break: 1 })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: `Que por medio del presente escrito promuevo DEMANDA en contra de ${data.demandado || '[DEMANDADO]'}, en materia de ${data.materia || '[MATERIA]'},`, bold: true })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'HECHOS:',
          heading: HeadingLevel.HEADING_4
        }),
        new Paragraph({
          children: [new TextRun({ text: data.hechos || '1. [HECHO 1]\n2. [HECHO 2]' })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'FUNDAMENTO LEGAL:',
          heading: HeadingLevel.HEADING_4
        }),
        new Paragraph({
          children: [new TextRun({ text: data.fundamentos || 'Artículo 1 y ss. del Código Civil Federal.' })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'PETICIÓN:',
          heading: HeadingLevel.HEADING_4
        }),
        new Paragraph({
          children: [new TextRun({ text: data.petitorio || '1. [PETICIÓN 1]\n2. [PETICIÓN 2]' })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: `Lugar y fecha: ${data.lugar || '[LUGAR]'}, ${data.fecha || '[FECHA]'}` })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: '_______________________________',
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [new TextRun({ text: data.actor || '[ACTOR]' })],
          alignment: AlignmentType.CENTER
        }),
      ],
    }],
  });
}

function createContratoDocument(data: any): Document {
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: data.titulo || 'CONTRATO DE [TIPO]',
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'CONTRATANTES:',
          heading: HeadingLevel.HEADING_3
        }),
        new Paragraph({
          children: [new TextRun({ text: data.partes || 'Parte 1: [NOMBRE]\nParte 2: [NOMBRE]' })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'CLAUSULAS:',
          heading: HeadingLevel.HEADING_3
        }),
        ...(data.clausulas || []).map((c: any, i: number) => [
          new Paragraph({
            text: `${i + 1}. ${c.titulo || 'CLAUSULA'}`,
            heading: HeadingLevel.HEADING_4
          }),
          new Paragraph({
            children: [new TextRun({ text: c.contenido || '[CONTENIDO]' })]
          }),
          new Paragraph({ text: '' }),
        ]).flat(),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: `En ${data.lugar || '[LUGAR]'}, a ${data.fecha || '[FECHA]'}.` })]
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: '_______________________________        _______________________________',
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Parte 1                                    Parte 2' })],
          alignment: AlignmentType.CENTER
        }),
      ],
    }],
  });
}

function createExpedienteDocument(data: any): Document {
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Campo', bold: true })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Valor', bold: true })] })] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Cliente')] }),
        new TableCell({ children: [new Paragraph(data.cliente || 'N/A')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Caso')] }),
        new TableCell({ children: [new Paragraph(data.caso || 'N/A')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Materia')] }),
        new TableCell({ children: [new Paragraph(data.materia || 'N/A')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Status')] }),
        new TableCell({ children: [new Paragraph(data.status || 'N/A')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Fecha de apertura')] }),
        new TableCell({ children: [new Paragraph(data.fechaApertura || 'N/A')] }),
      ],
    }),
  ];

  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: `EXPEDIENTE: ${data.expediente || 'EXP-001'}`,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({ text: '' }),
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'DOCUMENTOS:',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.documentos || '• Documento 1\n• Documento 2' })],
        }),
      ],
    }],
  });
}

function createInformeDocument(data: any): Document {
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'INFORME LEGAL',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: `Asunto: ${data.asunto || '[ASUNTO]'}`,
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'RESUMEN:',
          heading: HeadingLevel.HEADING_4,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.resumen || '[RESUMEN DEL CASO]' })],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'ANÁLISIS:',
          heading: HeadingLevel.HEADING_4,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.analisis || '[ANÁLISIS JURÍDICO]' })],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'RECOMENDACIONES:',
          heading: HeadingLevel.HEADING_4,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.recomendaciones || '[RECOMENDACIONES LEGALES]' })],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: `Fecha de elaboración: ${data.fecha || new Date().toLocaleDateString('es-MX')}` })]
        }),
      ],
    }],
  });
}

function createGeneralDocument(data: any): Document {
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: data.titulo || 'Documento Legal',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [new TextRun({ text: data.contenido || 'Contenido del documento...' })],
        }),
      ],
    }],
  });
}

function createContratoFromText(data: any): Document {
  const contenido = data.contenido || '';
  const lineas = contenido.split('\n').filter((l: string) => l.trim());
  
  const children: any[] = [];
  
  for (const linea of lineas) {
    const trimmedLine = linea.trim();
    if (!trimmedLine) {
      children.push(new Paragraph({ text: '' }));
      continue;
    }
    
    const isHeading = /^[A-ZÁÉÍÓÚÑ\s]+:?$/.test(trimmedLine) || trimmedLine.startsWith('##') || trimmedLine.startsWith('**');
    const isNumbered = /^\d+[\.\)]/.test(trimmedLine);
    const cleanText = trimmedLine.replace(/^#+\s*/, '').replace(/\*\*/g, '');
    
    if (isHeading && !isNumbered) {
      children.push(new Paragraph({
        text: cleanText.replace(':', ''),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 100 }
      }));
    } else {
      children.push(new Paragraph({
        children: [new TextRun({ 
          text: cleanText,
          font: 'Arial',
          size: 22
        })],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { 
          line: 276,
          before: isNumbered ? 100 : 50,
          after: 100
        },
        indent: isNumbered ? { left: 720, hanging: 720 } : undefined
      }));
    }
  }
  
  children.push(new Paragraph({ text: '' }));
  children.push(new Paragraph({ text: '' }));
  children.push(new Paragraph({
    text: '_______________________________        _______________________________',
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 }
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: 'Parte 1                                                    Parte 2', font: 'Arial', size: 20 })],
    alignment: AlignmentType.CENTER
  }));
  
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'DOCUMENTO LEGAL',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        }),
        ...children
      ],
    }],
  });
}
