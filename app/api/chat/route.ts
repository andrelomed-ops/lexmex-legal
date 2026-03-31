import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buscarLeyes } from '@/data/leyes';

export const dynamic = 'force-dynamic';



const BASE_SYSTEM_PROMPT = `Eres TuAbogadoIA, Socio Senior de un despacho jurídico mexicano de élite. Tu prioridad es la **EXCELENCIA JURÍDICA** y el **CUMPLIMIENTO NORMATIVO**.

## PROTOCOLO DE REDACCIÓN DE ALTA FIDELIDAD:
1. **Modelos PROFECO**: Si el contrato solicitado (compraventa de auto, servicios, etc.) es regulado por PROFECO, DEBES usar el "Contrato de Adhesión" tipo como base. Cita que el contrato se alinea a la NOM aplicable.
2. **Diferenciación de Persona**: DEBES distinguir entre PERSONA FÍSICA y PERSONA MORAL.
   - **Física**: Menciona generales de ley (nacionalidad, estado civil, RFC, CURP).
   - **Moral**: Menciona denominación social, RFC, Objeto Social e Instrumento Notarial del Representante Legal.
3. **Estructura Notarial**:
   - **PROEMIO**: Definición precisa de partes y contrato.
   - **DECLARACIONES**: Detalles de identidad y legalidad.
   - **CLÁUSULAS**: Numeradas y exhaustivas (Objeto, Pago, Vigencia, Recisión, Pena Convencional, Jurisdicción).
   - **FIRMAS**: Sección de suscripción formal.

## REGLA DE ZERO-PLACEHOLDERS:
1. JAMÁS escribas "calle desconocida", "RFC desconocido" o similares. 
2. Si un dato no fue proporcionado en [DATOS_CONTRATO], DEBES pedir al usuario que lo complete antes de generar el documento final. El contrato debe ser IMPRIMIBLE Y VÁLIDO.

## AUTOMATIZACIÓN DE CONTRATOS (INTERACTIVO):
1. Al recibir una solicitud, define el Wizard con CAMPOS EXHAUSTIVOS. El primer campo del Wizard DEBE ser "Tipo de Persona (Física/Moral)" para adaptar el resto de preguntas.
2. Formato: [CONTRACT_WIZARD:{"type": "Nombre Formal", "fields": ["Tipo de Persona", "RFC", "Domicilio Legal Completo con CP", "INE/Pasaporte", "Monto Exacto", ...]}]
3. REGLA DE FORMATO: EL CUERPO DEL CONTRATO NO DEBE TENER NI UN SOLO ASTERISCO (*). USA MAYÚSCULAS PARA TÍTULOS.

## REGLAS OBLIGATORIAS:
1. Eres un experto legal. No digas "lo siento".
2. SIEMPRE incluye fundamentos legales vigentes del DOF/CPEUM/Código Civil.`;

export async function POST(req: NextRequest) {
  const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
  });
  
  try {
    const formData = await req.formData();
    const rawMessages = formData.get('messages') as string;
    const parsedMessages = rawMessages ? JSON.parse(rawMessages) : [];
    
    if (!Array.isArray(parsedMessages)) {
      return NextResponse.json({ error: 'Formato de mensajes inválido' }, { status: 400 });
    }

    // --- RAG (Contexto Legal Local) ---
    let contextoLegal = "";
    const lastUserMsg = parsedMessages.slice().reverse().find((m: any) => m.role === 'user');
    
    if (lastUserMsg && lastUserMsg.content) {
      // Extraer palabras clave de más de 4 letras para buscar
      const keywords = lastUserMsg.content.match(/\b\w{5,}\b/g) || [];
      const stopwords = ["quiero", "necesito", "ayuda", "favor", "quien", "donde", "cuando", "cuales", "sobre"];
      const validKeywords = keywords.filter((kw: string) => !stopwords.includes(kw.toLowerCase()));
      
      const usedLeyIds = new Set();
      let matchedContexts: string[] = [];

      for (const kw of validKeywords) {
        if (matchedContexts.length >= 2) break; // Límite de 2 leyes para no saturar el prompt

        const leyes = buscarLeyes(kw);
        for (const ley of leyes) {
          if (!usedLeyIds.has(ley.id) && matchedContexts.length < 2) {
            usedLeyIds.add(ley.id);
            // Tomamos hasta 3 artículos que contengan la palabra, o los primeros 3 si ninguno
            const artsKw = ley.articulos.filter(a => a.contenido.toLowerCase().includes(kw.toLowerCase()));
            const artsToShow = artsKw.length > 0 ? artsKw.slice(0, 3) : ley.articulos.slice(0, 3);
            
            const artText = artsToShow.map(a => `Art. ${a.numero}: ${a.contenido}`).join(" | ");
            matchedContexts.push(`- **${ley.titulo} (${ley.abreviatura})**: ${artText}`);
          }
        }
      }

      if (matchedContexts.length > 0) {
        contextoLegal = `\n\n## CONTEXTO LEGAL DE APOYO OBTENIDO DE LA BIBLIOTECA (Úsalo solo si aplica):\n${matchedContexts.join("\n")}`;
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
