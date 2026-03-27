import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import Tesseract from 'tesseract.js';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageData = formData.get('image') as string;
    
    if (!imageData) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const result = await Tesseract.recognize(imageData, 'spa', {
      logger: m => console.log(m)
    });

    const text = result.data.text;
    
    // Analyze the extracted text
    const analysis = analyzeLegalText(text);
    
    return NextResponse.json({
      success: true,
      text: text,
      analysis: analysis
    });

  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    );
  }
}

function analyzeLegalText(text: string) {
  const analysis = {
    keywords: [] as string[],
    detectedType: 'general',
    entities: {
      dates: [] as string[],
      amounts: [] as string[],
      names: [] as string[],
      addresses: [] as string[]
    },
    risks: [] as string[],
    summary: ''
  };

  // Detect keywords
  const legalKeywords = [
    'demanda', 'contrato', 'pagaré', 'letra de cambio', 'cheque',
    'arrendamiento', 'compraventa', 'donación', 'hipoteca', 'prenda',
    'divorcio', 'pensión', 'alimentos', 'custodia', 'tutela',
    'despido', 'liquidación', 'indemnización', 'aguinaldo', 'vacaciones',
    'ROBO', 'FRAUDE', 'LESIONES', 'HOMICIDIO', 'EXTORSIÓN',
    'demanda', 'contestación', 'reconvención', 'apelación', 'amparo',
    'arrendatario', 'arrendador', 'demandante', 'demandado', 'actor',
    'plazo', 'prescripción', 'caducidad', 'tercio', 'mesada'
  ];

  analysis.keywords = legalKeywords.filter(kw => 
    text.toLowerCase().includes(kw.toLowerCase())
  );

  // Detect document type
  if (text.toLowerCase().includes('demanda') && text.toLowerCase().includes('actor')) {
    analysis.detectedType = 'demanda';
  } else if (text.toLowerCase().includes('contrato') || text.toLowerCase().includes('convenio')) {
    analysis.detectedType = 'contrato';
  } else if (text.toLowerCase().includes('pagaré') || text.toLowerCase().includes('letra')) {
    analysis.detectedType = 'titulo-credito';
  } else if (text.toLowerCase().includes('divorcio') || text.toLowerCase().includes('pensión')) {
    analysis.detectedType = 'familiar';
  } else if (text.toLowerCase().includes('despido') || text.toLowerCase().includes('laboral')) {
    analysis.detectedType = 'laboral';
  }

  // Extract dates
  const dateRegex = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g;
  analysis.entities.dates = text.match(dateRegex) || [];

  // Extract amounts (Mexican pesos)
  const amountRegex = /\$[\d,]+(\.\d{2})?/g;
  analysis.entities.amounts = text.match(amountRegex) || [];

  // Risk detection
  if (text.toLowerCase().includes('sin garantía') || text.toLowerCase().includes('sin responsab')) {
    analysis.risks.push('Documento sin garantía - riesgo de incumplimiento');
  }
  if (text.toLowerCase().includes('penalidad') || text.toLowerCase().includes('multa')) {
    analysis.risks.push('Contiene cláusulas penalidades - revisar legitimidad');
  }
  if (!text.toLowerCase().includes('firma') && !text.toLowerCase().includes('firmado')) {
    analysis.risks.push('No menciona firmas - verificar autenticidad');
  }
  if (text.toLowerCase().includes('plazo') && text.toLowerCase().includes('prescripci')) {
    analysis.risks.push('Plazo de prescripción involucrado - verificar términos');
  }

  // Generate summary
  analysis.summary = `Documento tipo: ${analysis.detectedType.toUpperCase()}. 
Se detectaron ${analysis.keywords.length} términos legales clave.
Fechas encontradas: ${analysis.entities.dates.length}.
Montos mencionados: ${analysis.entities.amounts.length}.
Riesgos identificados: ${analysis.risks.length}.`;

  if (analysis.risks.length > 0) {
    analysis.summary += ' ⚠️ Se recomienda revisión legal.';
  }

  return analysis;
}
