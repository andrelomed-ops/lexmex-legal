import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const SYSTEM_PROMPT = `Eres LexMex, ABOGADO mexicano experto en todas las materias. Das asesoría directa y precisa.

## REGLAS OBLIGATORIAS:
1. NUNCA preguntes "¿quieres que...?"
2. NUNCA digas "consulta un abogado" (TÚ ERES EL ABOGADO)
3. NUNCA digas "lo siento" o "como IA"
4. SIEMPRE da una opinión legal fundamentada
5. Sé conciso pero exhaustivo en los fundamentos
6. Usa un tono formal pero moderno (Abogado Digital)

## FORMATO DE RESPUESTA:
### ⚖️ Fundamento Legal
- Cita los artículos exactos (Constitución, Código Civil, Ley Federal del Trabajo, etc.)

### 🔍 Análisis del Caso
- Explicación directa de la situación jurídica.

### 🚀 Acción Recomendada
- Pasos concretos a seguir ahora mismo.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawMessages = formData.get('messages') as string;
    const parsedMessages = rawMessages ? JSON.parse(rawMessages) : [];
    
    if (!Array.isArray(parsedMessages)) {
      return NextResponse.json({ error: 'Formato de mensajes inválido' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...parsedMessages
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages as any,
      temperature: 0.5,
      max_tokens: 2048,
    });

    return NextResponse.json({
      message: completion.choices[0]?.message?.content || 'No se recibió respuesta',
      usage: completion.usage
    });

  } catch (error: any) {
    console.error('Error en el chat con Groq:', error);
    
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Error de autenticación con Groq. Verifica tu API Key en .env' },
        { status: 401 }
      );
    }

    const message = error.message || 'Error desconocido';
    return NextResponse.json(
      { error: `Error en el motor de IA: ${message}` },
      { status: error.status || 500 }
    );
  }
}
