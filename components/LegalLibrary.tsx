'use client';

import { useState } from 'react';
import { materias, type Ley, type Articulo, type Jurisprudencia } from '@/data/leyes';
import { tratadosInternacionales, tratadosBilaterales } from '@/data/tratados';

export default function LegalLibrary({ 
  searchTerm, 
  setSearchTerm, 
  materiaFilter, 
  setMateriaFilter,
  filteredLeyes,
  filteredJurisprudencias,
  activeSubTab,
  setActiveSubTab
}: any) {
  const [selectedLey, setSelectedLey] = useState<Ley | null>(null);
  const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
  const [selectedJurisprudencia, setSelectedJurisprudencia] = useState<Jurisprudencia | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <button onClick={() => setActiveSubTab('leyes')} style={{ padding: '8px 16px', background: activeSubTab === 'leyes' ? 'var(--secondary)' : 'var(--surface)', color: activeSubTab === 'leyes' ? '#0D1117' : 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Leyes</button>
        <button onClick={() => setActiveSubTab('jurisprudencia')} style={{ padding: '8px 16px', background: activeSubTab === 'jurisprudencia' ? 'var(--secondary)' : 'var(--surface)', color: activeSubTab === 'jurisprudencia' ? '#0D1117' : 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Jurisprudencia</button>
        <button onClick={() => setActiveSubTab('tratados')} style={{ padding: '8px 16px', background: activeSubTab === 'tratados' ? 'var(--secondary)' : 'var(--surface)', color: activeSubTab === 'tratados' ? '#0D1117' : 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Tratados</button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <input
          type="search"
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          style={{ flex: 1, padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
        />
        <select
          value={materiaFilter || ''}
          onChange={(e) => setMateriaFilter(e.target.value)}
          style={{ width: '200px', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
        >
          <option value="">Todas las materias</option>
          {materias.map(m => (<option key={m} value={m}>{m}</option>))}
        </select>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeSubTab === 'leyes' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedArticulo ? '1fr 1fr' : '1fr', gap: '24px', height: '100%' }}>
            <div style={{ overflowY: 'auto' }}>
              {filteredLeyes.map((ley: any) => (
                <div key={ley.id} onClick={() => { setSelectedLey(ley); setSelectedArticulo(null); }} style={{
                  padding: '16px', background: selectedLey?.id === ley.id ? 'var(--surface-hover)' : 'var(--surface)',
                  border: '1px solid', borderColor: selectedLey?.id === ley.id ? 'var(--secondary)' : 'var(--border)',
                  borderRadius: '8px', marginBottom: '12px', cursor: 'pointer'
                }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px', color: 'var(--secondary)' }}>{ley.abreviatura}</h3>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{ley.titulo}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{ley.materia} • {ley.articulos.length} artículos</p>
                </div>
              ))}
            </div>
            {selectedLey && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', maxHeight: '200px', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--secondary)' }}>Artículos de {selectedLey.abreviatura}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedLey.articulos.map((art: any) => (
                      <button key={art.numero} onClick={() => setSelectedArticulo(art)} style={{
                        padding: '6px 12px', fontSize: '12px',
                        background: selectedArticulo?.numero === art.numero ? 'var(--primary)' : 'var(--surface-hover)',
                        border: '1px solid', borderColor: selectedArticulo?.numero === art.numero ? 'var(--secondary)' : 'var(--border)',
                        borderRadius: '6px', color: 'var(--text)', cursor: 'pointer'
                      }}>Art. {art.numero}</button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  {selectedArticulo ? (
                    <div>
                      <h2 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '16px' }}>Artículo {selectedArticulo.numero}</h2>
                      <div style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '15px' }}>{selectedArticulo.contenido}</div>
                    </div>
                  ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Selecciona un artículo</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Similar logic for Jurisprudencia and Tratados */}
        {activeSubTab === 'jurisprudencia' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedJurisprudencia ? '1fr 1fr' : '1fr', gap: '24px', height: '100%' }}>
            <div style={{ overflowY: 'auto' }}>
              {filteredJurisprudencias.map((jur: any) => (
                <div key={jur.id} onClick={() => setSelectedJurisprudencia(jur)} style={{ padding: '16px', background: selectedJurisprudencia?.id === jur.id ? 'var(--surface-hover)' : 'var(--surface)', border: '1px solid', borderColor: selectedJurisprudencia?.id === jur.id ? 'var(--secondary)' : 'var(--border)', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '10px', padding: '3px 8px', background: jur.tipo === 'JR' ? 'var(--accent)' : 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{jur.tipo}</span>
                  <h3 style={{ fontSize: '14px', marginTop: '8px', marginBottom: '4px' }}>{jur.titulo}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{jur.materia}</p>
                </div>
              ))}
            </div>
            {selectedJurisprudencia && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--secondary)' }}>{selectedJurisprudencia.titulo}</h2>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>TESIS</h4>
                  <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', borderLeft: '3px solid var(--secondary)', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>{selectedJurisprudencia.tesis}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>PRECEDENTE</h4>
                  <p style={{ fontSize: '14px' }}>{selectedJurisprudencia.precedente}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'tratados' && (
          <div style={{ overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {[...tratadosInternacionales, ...tratadosBilaterales].map((tratado: any) => (
                <div key={tratado.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--secondary)' }}>{tratado.nombre}</h3>
                    <span style={{ fontSize: '10px', padding: '4px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)' }}>{tratado.materia}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>{tratado.resumen}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
