'use client';

import { useState } from 'react';

export default function CalendarioView({ casos }: { casos: any[] }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);

  const getEventosDelDia = () => {
    return casos.flatMap(c => (c.eventos || []).filter((e: any) => e.fecha === fechaSeleccionada));
  };

  const getProximosEventos = () => {
    const hoy = new Date();
    return casos.flatMap(c => (c.eventos || []).filter((e: any) => new Date(e.fecha) >= hoy).sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())).slice(0, 10);
  };

  const tipoColores: any = {
    audiencia: '#ef4444',
    reunion: '#3b82f6',
    vencimiento: '#f59e0b',
    otro: '#6b7280'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📅 Calendario</h2>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }}
        />
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Eventos del día</h3>
          {getEventosDelDia().length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay eventos</p>
          ) : (
            getEventosDelDia().map((e: any, i: number) => (
              <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px', borderLeft: `3px solid ${tipoColores[e.tipo]}` }}>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>{e.titulo}</p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{e.hora} - {e.tipo}</p>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Próximos eventos</h3>
          {getProximosEventos().map((e: any, i: number) => (
            <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(e.fecha).toLocaleDateString('es-MX')}</p>
              <p style={{ fontSize: '13px', fontWeight: 600 }}>{e.titulo}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>
          Todos los eventos ({casos.reduce((acc, c) => acc + (c.eventos?.length || 0), 0)})
        </h3>
        {casos.flatMap(c => (c.eventos || []).sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <p>No hay eventos programados</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Agrega eventos desde la sección de Casos</p>
          </div>
        ) : (
          casos.flatMap(c => (c.eventos || []).sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())).map((e: any, i: number) => (
            <div key={i} style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '12px', borderLeft: `4px solid ${tipoColores[e.tipo]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(e.fecha).toLocaleDateString('es-MX')} a las {e.hora}</p>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{e.titulo}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{e.descripcion}</p>
                  {e.lugar && <p style={{ fontSize: '12px', color: 'var(--secondary)', marginTop: '4px' }}>📍 {e.lugar}</p>}
                </div>
                <span style={{ fontSize: '10px', padding: '4px 8px', background: tipoColores[e.tipo], borderRadius: '4px', color: '#fff', textTransform: 'capitalize' }}>{e.tipo}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
