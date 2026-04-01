import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/v1/')) {
    const apiKey = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('api_key');

    if (!apiKey) {
      return NextResponse.json(
        { error: 'No autorizado. Se requiere x-api-key en los headers.' },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
       return NextResponse.json({ error: 'Configuración del servidor API incompleta.' }, { status: 500 });
    }
    
    try {
        // --- 1. Validar Key y Obtener Uso ---
        const keyResponse = await fetch(`${supabaseUrl}/rest/v1/user_api_keys?key_hash=eq.${apiKey}&is_active=eq.true&select=id,user_email,usage_count,last_reset_date`, {
            method: 'GET',
            headers: {
               'apikey': supabaseAnonKey,
               'Authorization': `Bearer ${supabaseAnonKey}`
            }
        });
        
        const keys = await keyResponse.json();
        
        if (!keys || keys.length === 0) {
            return NextResponse.json({ error: 'API Key inválida o revocada.' }, { status: 401 });
        }

        const currentKey = keys[0];
        const userEmail = currentKey.user_email;

        // --- 2. Obtener Suscripción del Usuario ---
        const profileResponse = await fetch(`${supabaseUrl}/rest/v1/perfiles?correo=eq.${userEmail}&select=suscripcion`, {
            method: 'GET',
            headers: {
               'apikey': supabaseAnonKey,
               'Authorization': `Bearer ${supabaseAnonKey}`
            }
        });

        const profiles = await profileResponse.json();
        const tier = profiles?.[0]?.suscripcion || 'free'; // Default a free si no hay perfil

        // --- 3. Definir Límites por Nivel ---
        const limits: Record<string, number> = {
            'free': 5,
            'pro': 500,
            'enterprise': 10000
        };

        const maxRequests = limits[tier] || 5;

        // --- 4. Control de Reseteo Diario ---
        const today = new Date().toISOString().split('T')[0];
        let currentUsage = currentKey.usage_count || 0;

        if (currentKey.last_reset_date !== today) {
            currentUsage = 0; // Resetear contador si es un nuevo día
        }

        if (currentUsage >= maxRequests) {
            return NextResponse.json({ 
                error: `Límite de cuota excedido para nivel ${tier.toUpperCase()}.`,
                limit: maxRequests,
                reset_date: today
            }, { status: 429 });
        }

        // --- 5. Incrementar Uso e Insertar Logs (Fire-and-forget) ---
        const logData = {
           api_key_id: currentKey.id,
           endpoint: req.nextUrl.pathname,
           method: req.method,
           status_code: 200,
           user_email: userEmail,
           ip_address: req.ip || 'desconocida'
        };

        // Increment Uso
        fetch(`${supabaseUrl}/rest/v1/user_api_keys?id=eq.${currentKey.id}`, {
            method: 'PATCH',
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ 
                usage_count: currentUsage + 1,
                last_reset_date: today,
                last_used_at: new Date().toISOString() 
            })
        }).catch(() => {});

        // Insert Log
        fetch(`${supabaseUrl}/rest/v1/api_logs`, {
            method: 'POST',
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(logData)
        }).catch(() => {});

        return NextResponse.next();
    } catch (e) {
        return NextResponse.json({ error: 'Error interno validando cuotas de API.' }, { status: 500 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/v1/:path*'],
};
