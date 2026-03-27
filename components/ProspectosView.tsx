'use client';

import { useState } from 'react';

export default function ProspectosView({ 
  prospectos, 
  clientes, 
  onAdd, 
  onUpdateStatus, 
  onDelete, 
  onConvert, 
  onShowNew 
}: {
  prospectos: any[],
  clientes: any[],
  onAdd: (e: React.FormEvent<HTMLFormElement>) => void,
  onUpdateStatus: (id: string, status: string) => void,
  onDelete: (id: string) => void,
  onConvert: (prospecto: any) => void,
  onShowNew: () => void
}) {
  const prospectoStatusColors: any = { nuevo: '#3b82f6', contactado: '#f59e0b', interesado: '#22c55e', no_interesado: '#ef4444', cliente: '#8b5cf6' };
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>🤝 Prospectos</h2>
          <button onClick={onShowNew} style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Nuevo</button>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--secondary)' }}>{prospectos.length}</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Total prospectos</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {prospectos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No hay prospectos</div>
          ) : (
            prospectos.map(p => (
              <div key={p.id} style={{ padding: '14px', background: 'var(--surface)', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{p.nombre}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.correo}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{p.telefono}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '10px', padding: '3px 8px', background: prospectoStatusColors[p.status], borderRadius: '4px', color: '#fff' }}>{p.status}</span>
                    <button onClick={() => onDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                  </div>
                </div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  <select 
                    value={p.status} 
                    onChange={(e) => onUpdateStatus(p.id, e.target.value)}
                    style={{ padding: '4px', fontSize: '10px', background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px' }}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="interesado">Interesado</option>
                    <option value="no_interesado">No Interesado</option>
                    <option value="cliente">Cliente</option>
                  </select>
                  {p.status === 'interesado' && (
                    <button 
                      onClick={() => onConvert(p)}
                      style={{ padding: '4px 8px', fontSize: '10px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Convertir a Cliente
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>Pipeline de Prospectos</h3>
        {prospectos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
            <p>No hay prospectos registrados</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Agrega prospectos para hacer seguimiento</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {['nuevo', 'contactado', 'interesado', 'no_interesado', 'cliente'].map(status => (
              <div key={status} style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: prospectoStatusColors[status], marginBottom: '12px', textTransform: 'capitalize' }}>{status.replace('_', ' ')} ({prospectos.filter(p => p.status === status).length})</p>
                {prospectos.filter(p => p.status === status).map(p => (
                  <div key={p.id} style={{ padding: '10px', background: 'var(--surface)', borderRadius: '6px', marginBottom: '8px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600 }}>{p.nombre}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{p.motivo}</p>
                    <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>{new Date(p.fecha).toLocaleDateString('es-MX')}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
