'use client';

import { useState } from 'react';

export default function CitasView({ 
  citas, 
  clientes, 
  onAdd,
  onUpdateStatus, 
  onDelete, 
  onShowNew, 
  onSyncCalendar 
}: {
  citas: any[], 
  clientes: any[], 
  onAdd: (e: React.FormEvent<HTMLFormElement>) => void,
  onUpdateStatus: (citaId: string, status: string) => void, 
  onDelete: (id: string) => void, 
  onShowNew: () => void, 
  onSyncCalendar: (cita: any) => void
}) {
  const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split('T')[0]);
  const citaTipoColores: any = { consulta: '#3b82f6', seguimiento: '#22c55e', audiencia: '#ef4444', otra: '#6b7280' };
  
  const citasFiltradas = citas.filter(c => c.fecha === fechaFiltro);
  const proximasCitas = citas.filter(c => new Date(c.fecha) >= new Date()).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📆 Citas</h2>
          <button onClick={onShowNew} style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Nueva</button>
        </div>
        <input type="date" value={fechaFiltro} onChange={(e) => setFechaFiltro(e.target.value)} style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }} />
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Citas del día</h3>
          {citasFiltradas.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay citas</p>
          ) : (
            citasFiltradas.map((c: any) => (
              <div key={c.id} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px', borderLeft: `3px solid ${citaTipoColores[c.tipo]}` }}>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>{c.titulo}</p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{c.hora} - {c.tipo}</p>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Próximas citas</h3>
          {proximasCitas.slice(0, 10).map((c: any, i: number) => (
            <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(c.fecha).toLocaleDateString('es-MX')} a las {c.hora}</p>
              <p style={{ fontSize: '13px', fontWeight: 600 }}>{c.titulo}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>Todas las citas ({citas.length})</h3>
        {citas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📆</div>
            <p>No hay citas programadas</p>
          </div>
        ) : (
          citas.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map((c: any, i: number) => {
            const cliente = clientes.find(cl => cl.id === c.clienteId);
            return (
              <div key={i} style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '12px', borderLeft: `4px solid ${citaTipoColores[c.tipo]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(c.fecha).toLocaleDateString('es-MX')} a las {c.hora}</p>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{c.titulo}</h4>
                    {cliente && <p style={{ fontSize: '13px', color: 'var(--secondary)', marginTop: '4px' }}>Cliente: {cliente.nombre}</p>}
                    {c.notas && <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{c.notas}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onSyncCalendar(c)} title="Sincronizar con Google Calendar" style={{ padding: '6px 10px', background: '#4285f4', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#fff' }}>📅</button>
                    <select value={c.status} onChange={(e) => onUpdateStatus(c.id, e.target.value)} style={{ padding: '6px', fontSize: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}>
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                    <button onClick={() => onDelete(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
