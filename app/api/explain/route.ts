import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  try {
    const { text, type } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const systemPrompt = `Eres un experto abogado mexicano especializado en lenguaje ciudadano. 
    Tu tarea es recibir un fragmento de ley, artículo o término jurídico complejo y explicarlo de forma sencilla, clara y directa para una persona que no sabe de leyes.
    
    Reglas:
    1. No uses tecnicismos sin explicarlos.
    2. Usa analogías si es necesario.
    3. Mantén un tono profesional pero muy accesible.
    4. Sé breve y estructurado.
    5. Indica qué implicación práctica tiene esto para el ciudadano.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Explícame este texto legal de forma sencilla: \n\n${text}` }
      ],
      temperature: 0.5,
    });

    const explanation = response.choices[0].message.content;

    return NextResponse.json({ explanation });
  } catch (error: any) {
    console.error('Error in AI explanation:', error);
    return NextResponse.json({ error: 'Error generating explanation' }, { status: 500 });
  }
}
