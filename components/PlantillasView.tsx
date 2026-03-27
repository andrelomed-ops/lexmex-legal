'use client';

import { useState } from 'react';
import { plantillas, materiasDisponibles, type Plantilla } from '@/data/plantillas';

export default function PlantillasView() {
  const [search, setSearch] = useState('');
  const [materia, setMateria] = useState('');
  const [selected, setSelected] = useState<Plantilla | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = plantillas.filter(p => {
    const matchSearch = !search || p.nombre.toLowerCase().includes(search.toLowerCase()) || p.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchMateria = !materia || p.materia === materia;
    return matchSearch && matchMateria;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async (plantilla: Plantilla) => {
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'documento',
          datos: {
            titulo: plantilla.nombre,
            contenido: plantilla.contenido
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + data.pdf;
        link.download = data.filename;
        link.click();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📄 Plantillas Jurídicas</h2>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar plantilla..."
          style={{ marginBottom: '12px', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
        />
        <select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }}
        >
          <option value="">Todas las materias</option>
          {materiasDisponibles.map(m => (<option key={m.value} value={m.value}>{m.label}</option>))}
        </select>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={{
              padding: '16px', background: selected?.id === p.id ? 'var(--surface-hover)' : 'var(--surface)',
              border: '1px solid', borderColor: selected?.id === p.id ? 'var(--secondary)' : 'var(--border)',
              borderRadius: '8px', marginBottom: '12px', cursor: 'pointer'
            }}>
              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--accent)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{materiasDisponibles.find(m => m.value === p.materia)?.label}</span>
              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{p.tipo}</span>
              <h3 style={{ fontSize: '14px', marginTop: '8px', marginBottom: '4px' }}>{p.nombre}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--secondary)' }}>{selected.nombre}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => downloadPDF(selected)}
                style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                📄 PDF
              </button>
              <button
                onClick={() => copyToClipboard(selected.contenido)}
                style={{ padding: '8px 16px', background: copied ? '#22c55e' : 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>{selected.descripcion}</p>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '12px', 
            fontFamily: 'monospace', 
            background: 'var(--bg)', 
            padding: '16px', 
            borderRadius: '8px',
            maxHeight: '60vh',
            overflow: 'auto'
          }}>
            {selected.contenido}
          </pre>
        </div>
      )}
    </div>
  );
}
