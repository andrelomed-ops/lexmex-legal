import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    const formData = await req.formData();
    const imageData = formData.get('image') as string;
    
    if (!imageData) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // 1. OCR Extraction (Tesseract)
    const result = await Tesseract.recognize(imageData, 'spa');
    const text = result.data.text;
    
    // 2. Deep Legal Audit (OpenAI)
    const analysis = await analyzeLegalTextWithAI(text, openai);
    
    return NextResponse.json({
      success: true,
      text: text,
      analysis: analysis
    });

  } catch (error: any) {
    console.error('OCR Error:', error);
    return NextResponse.json({ error: 'Error processing document' }, { status: 500 });
  }
}

async function analyzeLegalTextWithAI(text: string, openai: OpenAI) {
  try {
    const systemPrompt = `Eres un Auditor Legal Senior especializado en derecho mexicano. 
    Tu tarea es analizar el texto extraído de un documento legal y generar un informe de auditoría profundo.
    
    Detecta y extrae en formato JSON:
    - detectedType: Tipo de documento (ej. Contrato Arrendamiento, Demanda Laboral).
    - entities: { dates: [], amounts: [], names: [], addresses: [] }
    - risks: Lista de riesgos detectados (ej. "Cláusula penal excesiva", "Falta de jurisdicción clara").
    - keyClauses: Cláusulas críticas encontradas.
    - summary: Resumen ejecutivo del documento.
    - legalityScore: Puntuación de 1 a 100 sobre la solidez/riesgo del documento.
    
    Sé extremadamente profesional y minucioso. El texto puede tener errores de OCR, interprétalo con inteligencia.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analiza este texto legal:\n\n${text}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (err) {
    console.error('AI Analysis failed, falling back to basic analysis:', err);
    return fallbackAnalysis(text);
  }
}

function fallbackAnalysis(text: string) {
  // Basic Regex fallback if AI fails
  return {
    detectedType: text.toLowerCase().includes('contrato') ? 'Contrato' : 'Documento General',
    entities: { dates: [], amounts: [], names: [], addresses: [] },
    risks: ['Error en auditoría IA - Análisis básico aplicado'],
    summary: 'No se pudo realizar el análisis por IA. Se detectó texto base.',
    legalityScore: 50
  };
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
