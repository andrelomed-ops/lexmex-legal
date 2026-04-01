import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buscarLeyes } from '@/data/leyes';

// Reutilizamos la lógica del sistema original pero adaptada para consumo JSON (puro)
const BASE_SYSTEM_PROMPT = `Eres TuAbogadoIA V1 (Modo B2B). Socio Senior de un despacho jurídico mexicano de élite. 
PROPORCIONAS RESPUESTAS TÉCNICAS Y ESTRUCTURADAS PARA INTEGRACIÓN EN PLATAFORMAS DE TERCEROS.

## REGLAS DE RESPUESTA PARA API:
1. Responde SIEMPRE en formato Markdown estructurado.
2. Incluye fundamentos legales vigentes del DOF/CPEUM/Código Civil.
3. Si la solicitud es para generar un contrato, usa el formato de Cláusulas Notariales.
4. Identifica si el cliente es Persona Física o Moral.
`;

export async function POST(req: NextRequest) {
  const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
  });
  
  try {
    const body = await req.json();
    const { messages: parsedMessages } = body;
    
    if (!parsedMessages || !Array.isArray(parsedMessages)) {
      return NextResponse.json({ error: 'Se requiere el campo "messages" como un arreglo.' }, { status: 400 });
    }

    // --- RAG (Contexto Legal Local) ---
    let contextoLegal = "";
    const lastUserMsg = parsedMessages.slice().reverse().find((m: any) => m.role === 'user');
    
    if (lastUserMsg && lastUserMsg.content) {
      const keywords = lastUserMsg.content.match(/\b\w{5,}\b/g) || [];
      const usedLeyIds = new Set();
      let matchedContexts: string[] = [];

      for (const kw of keywords) {
        if (matchedContexts.length >= 2) break;
        const leyes = buscarLeyes(kw);
        for (const ley of leyes) {
          if (!usedLeyIds.has(ley.id) && matchedContexts.length < 2) {
            usedLeyIds.add(ley.id);
            const artsToShow = ley.articulos.slice(0, 3);
            const artText = artsToShow.map(a => `Art. ${a.numero}: ${a.contenido}`).join(" | ");
            matchedContexts.push(`- **${ley.titulo} (${ley.abreviatura})**: ${artText}`);
          }
        }
      }
      if (matchedContexts.length > 0) {
        contextoLegal = `\n\n## CONTEXTO LEGAL DE APOYO:\n${matchedContexts.join("\n")}`;
      }
    }

    const messages = [
      { role: 'system', content: BASE_SYSTEM_PROMPT + contextoLegal },
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
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens,
        completion_tokens: completion.usage?.completion_tokens,
        total_tokens: completion.usage?.total_tokens
      },
      model: 'tuabogadoia-v1-premium'
    });

  } catch (error: any) {
    console.error('API V1 Error:', error);
    return NextResponse.json(
      { error: `Error en el motor de IA B2B: ${error.message}` },
      { status: 500 }
    );
  }
}
