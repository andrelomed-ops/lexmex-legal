import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `Eres LexMex, ABOGADO mexicano. Das asesoría directa y precisa.

## REGLAS OBLIGATORIAS:
1. NUNCA preguntes "¿quieres que...?"
2. NUNCA digas "consulta un abogado" 
3. NUNCA digas "lo siento"
4. NUNCA digas "como IA"
5. SIEMPRE da opinión legal directa
6. Sé conciso y directo

## FORMATO DE RESPUESTA:
1. Fundamento legal (artículo)
2. Análisis directo
3. Qué hacer`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const messageText = formData.get('text') as string;
    
    const parsedMessages = JSON.parse(formData.get('messages') as string || '[]');
    
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...parsedMessages
    ];

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lexmex-legal.vercel.app',
        'X-Title': 'LexMex - Asesor Legal'
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || 'Error al comunicarse con la API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      message: data.choices?.[0]?.message?.content || 'No se recibió respuesta',
      usage: data.usage
    });

  } catch (error) {
    console.error('Error en el chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
