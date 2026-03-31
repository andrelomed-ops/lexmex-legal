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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#FCD34D', fontFamily: 'Playfair Display' }}>📁 Tus Clientes</h2>
        <button
          onClick={() => setShowNewCliente(true)}
          className="btn-premium"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          + Nuevo Cliente
        </button>
      </div>
      
      {showNewCliente && (
        <form onSubmit={onAddCliente} className="glass-card animate-fade" style={{ padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--primary)' }}>
          <input name="nombre" placeholder="Nombre completo o Razón Social" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} />
          <input name="correo" placeholder="Correo electrónico" type="email" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} />
          <input name="telefono" placeholder="Teléfono" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} />
          <input name="direccion" placeholder="Dirección física" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} />
          <input name="rfc" placeholder="RFC (Opcional)" style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-premium" style={{ flex: 1, justifyContent: 'center' }}>Guardar</button>
            <button type="button" onClick={() => setShowNewCliente(false)} className="nav-item glass-card" style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', border: '1px solid var(--border)' }}>Cancelar</button>
          </div>
        </form>
      )}
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
        {clientes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: '12px' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>👥</span>
            No hay clientes registrados.<br/>Comienza agregando uno nuevo.
          </div>
        ) : (
          clientes.map(cliente => {
            const isSelected = selectedCliente?.id === cliente.id;
            return (
              <div 
                key={cliente.id} 
                onClick={() => onSelectCliente(cliente)} 
                className="glass-card nav-item-fidelity"
                style={{
                  padding: '16px 20px', 
                  background: isSelected ? 'rgba(201,162,39,0.1)' : 'var(--surface)',
                  border: '1px solid', 
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: isSelected ? 'var(--primary)' : 'var(--text)' }}>{cliente.nombre}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>✉️ {cliente.correo || 'N/A'}</span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                      {getCasosByCliente(cliente.id).length} caso{getCasosByCliente(cliente.id).length !== 1 && 's'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteCliente(cliente.id); }} 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', opacity: 0.7, padding: '4px' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                >
                  🗑️
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
