'use client';

import { useState } from 'react';

export default function CasesManager({ 
  clientes, 
  casos, 
  onAddCliente, 
  onDeleteCliente, 
  onSelectCliente, 
  selectedCliente,
  onSelectCaso,
  showNewCliente,
  setShowNewCliente,
  getCasosByCliente
}: {
  clientes: any[],
  casos: any[],
  onAddCliente: (e: React.FormEvent<HTMLFormElement>) => void,
  onDeleteCliente: (id: string) => void,
  onSelectCliente: (cliente: any) => void,
  selectedCliente: any,
  onSelectCaso: (caso: any) => void,
  showNewCliente: boolean,
  setShowNewCliente: (show: boolean) => void,
  getCasosByCliente: (clienteId: string) => any[]
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      {/* Lista de clientes */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📁 Clientes</h2>
          <button
            onClick={() => setShowNewCliente(true)}
            style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            + Nuevo Cliente
          </button>
        </div>
        
        {showNewCliente && (
          <form onSubmit={onAddCliente} style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border)' }}>
            <input name="nombre" placeholder="Nombre del cliente" required style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
            <input name="correo" placeholder="Correo electrónico" type="email" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
            <input name="telefono" placeholder="Teléfono" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
            <input name="direccion" placeholder="Dirección" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
            <input name="rfc" placeholder="RFC (opcional)" style={{ width: '100%', padding: '10px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ flex: 1, padding: '10px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Guardar</button>
              <button type="button" onClick={() => setShowNewCliente(false)} style={{ flex: 1, padding: '10px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        )}
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {clientes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No hay clientes registrados</div>
          ) : (
            clientes.map(cliente => (
              <div key={cliente.id} onClick={() => onSelectCliente(cliente)} style={{
                padding: '16px', background: selectedCliente?.id === cliente.id ? 'var(--surface-hover)' : 'var(--surface)',
                border: '1px solid', borderColor: selectedCliente?.id === cliente.id ? 'var(--secondary)' : 'var(--border)',
                borderRadius: '8px', marginBottom: '8px', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{cliente.nombre}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{cliente.correo || 'Sin correo'}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{getCasosByCliente(cliente.id).length} caso(s)</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteCliente(cliente.id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Aquí irá el CaseDetail */}
      <div id="case-detail-container">
        {/* Este componente se inyectará desde el padre o se moverá aquí */}
      </div>
    </div>
  );
}
