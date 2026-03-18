import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    const allowedDomains = [
      'diputados.gob.mx',
      'dof.gob.mx',
      'scjn.gob.mx',
      'sjf2.scjn.gob.mx',
      'congresocdmx.gob.mx',
      'shcp.gob.mx',
      'sat.gob.mx',
      'biblio.juridicas.unam.mx',
      'notarios.org.mx'
    ];

    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      
      if (!allowedDomains.some(d => domain.includes(d))) {
        return NextResponse.json({ 
          error: `Dominio no permitido. Solo se permiten: ${allowedDomains.join(', ')}` 
        }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: 'URL inválida' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Error al acceder: ${response.status}` }, { status: response.status });
    }

    const html = await response.text();

    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const extractedText = text.slice(0, 8000);

    return NextResponse.json({
      success: true,
      url,
      content: extractedText,
      domain: new URL(url).hostname
    });

  } catch (error) {
    console.error('Error extracting URL:', error);
    return NextResponse.json({ error: 'Error al procesar la URL' }, { status: 500 });
  }
}
