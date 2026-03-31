'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ClientPortal() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState<any>(null);

  useEffect(() => {
    // Simulación de búsqueda por token en Supabase (En Realidad buscaría en la tabla portal_links)
    const fetchPortal = async () => {
      setLoading(true);
      // Mock data for initial implementation
      setTimeout(() => {
        setCaso({
          titulo: 'Divorcio - María G.',
          status: 'activo',
          fechaApertura: '2026-03-15',
          materia: 'familiar',
          eventos: [
            { id: 1, titulo: 'Audiencia de Conciliación', fecha: '2026-04-10', hora: '10:00 AM', lugar: 'Juzgado 5 Familiar' }
          ],
          plazos: [
            { id: 1, descripcion: 'Presentar Pruebas', fechaLimite: '2026-04-05', estado: 'pendiente' }
          ],
          documentos: [
            { id: 1, nombre: 'Demanda Admitida.pdf', tipo: 'PDF', fecha: '2026-03-20' }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    if (token) fetchPortal();
  }, [token]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0f19' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '20px' }} />
      <p style={{ color: 'var(--primary)', fontFamily: 'Playfair Display' }}>Accediendo a TuAbogadoIA...</p>
    </div>
  );

  if (!caso) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0f19', color: '#fff' }}>
      <h1>Acceso No Válido</h1>
      <p>El enlace ha expirado o no es correcto.</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f19', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
           <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--primary)', fontSize: '32px', margin: 0 }}>TuAbogadoIA</h1>
           <p style={{ opacity: 0.6, fontSize: '14px', marginTop: '8px' }}>Portal de Transparencia del Cliente</p>
        </header>

        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(197,162,39,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: '24px' }}>{caso.titulo}</h2>
            <span style={{ padding: '4px 12px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderRadius: '20px', fontSize: '12px', border: '1px solid #22c55e' }}>{caso.status.toUpperCase()}</span>
          </div>

          <p style={{ opacity: 0.7, fontSize: '15px', marginBottom: '40px' }}>
            Bienvenido a su escritorio digital. Aquí podrá consultar el avance de su proceso legal en tiempo real con total transparencia.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '16px' }}>📅 PRÓXIMAS CITAS</h3>
              {caso.eventos.map((e: any) => (
                <div key={e.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontWeight: 600, margin: '0 0 4px' }}>{e.titulo}</p>
                  <p style={{ fontSize: '13px', opacity: 0.6, margin: 0 }}>{e.fecha} • {e.hora}</p>
                  {e.lugar && <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px' }}>📍 {e.lugar}</p>}
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '16px' }}>📄 DOCUMENTOS CLAVE</h3>
              {caso.documentos.map((d: any) => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '20px' }}>📄</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{d.nombre}</p>
                    <p style={{ fontSize: '11px', opacity: 0.5, margin: 0 }}>{d.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer style={{ marginTop: '60px', textAlign: 'center', opacity: 0.4, fontSize: '12px' }}>
          <p>© 2026 TuAbogadoIA - Protegido por encriptación avanzada</p>
        </footer>
      </div>
    </div>
  );
}
