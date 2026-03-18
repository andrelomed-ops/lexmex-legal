import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let file: File | null = null;
  
  try {
    const formData = await req.formData();
    file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });
    }

    console.log('Processing file:', file.name, file.size);

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp'];
    const fileName = file.name.toLowerCase();
    const ext = '.' + fileName.split('.').pop();
    
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ 
        error: `Tipo de archivo no soportado: ${ext}. Usa PDF, Word, PNG, JPG o JPEG.` 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';
    let type = ext.slice(1);

    if (ext === '.pdf') {
      const pdfParser = new PDFParse({ data: buffer });
      const textResult = await pdfParser.getText();
      extractedText = textResult.text || '';
      type = 'pdf';
      await pdfParser.destroy();
    } else if (ext === '.doc' || ext === '.docx') {
      const result = await mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value || '';
      type = 'docx';
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      const base64 = buffer.toString('base64');
      const mimeType = ext === '.jpg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : `image/${ext.slice(1)}`;
      extractedText = `[IMAGEN_EN_BASE64:${mimeType};base64:${base64}]`;
    }

    if (!extractedText || extractedText.trim() === '') {
      return NextResponse.json({ error: 'No se pudo extraer texto del documento. Está vacío o protegido.' }, { status: 400 });
    }

    const finalText = extractedText.slice(0, 15000);

    return NextResponse.json({
      success: true,
      type,
      text: finalText,
      originalName: file.name
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: `Error al procesar: ${error}` }, { status: 500 });
  }
}
