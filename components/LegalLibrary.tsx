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
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const getAiExplanation = async (text: string) => {
    setIsExplaining(true);
    setAiExplanation(null);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      if (data.explanation) {
        setAiExplanation(data.explanation);
      }
    } catch (error) {
      console.error('Error getting AI explanation:', error);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      {/* Sub-Tabs - Fidelity Edition */}
      <div style={{ 
        display: 'flex', 
        gap: '6px', 
        marginBottom: '24px',
        padding: '4px',
        background: 'rgba(16, 20, 28, 0.4)',
        borderRadius: '12px',
        width: 'fit-content',
        border: '1px solid var(--border)'
      }}>
        {['leyes', 'jurisprudencia', 'tratados'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveSubTab(tab)} 
            style={{ 
              padding: '10px 20px', 
              background: activeSubTab === tab ? 'var(--primary)' : 'transparent', 
              color: activeSubTab === tab ? '#000' : 'var(--text-secondary)', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'capitalize',
              boxShadow: activeSubTab === tab ? '0 4px 12px rgba(197, 160, 89, 0.2)' : 'none'
            }}
          >
            {tab === 'jurisprudencia' ? 'Jurisprudencia' : tab}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        gap: '12px',
        alignItems: 'center'
      }}>
        <div className="pill-search" style={{ flex: 1, width: 'auto', border: '1.5px solid var(--border)' }}>
          <span style={{ fontSize: '18px', opacity: 0.6 }}>🔍</span>
          <input
            type="search"
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar leyes, artículos o tratados..."
          />
        </div>
        
        <select
          value={materiaFilter || ''}
          onChange={(e) => setMateriaFilter(e.target.value)}
          style={{ 
            width: '240px', 
            padding: '12px 16px', 
            background: 'var(--surface-opaque)', 
            border: '1.5px solid var(--border)', 
            borderRadius: '12px', 
            color: 'var(--text)',
            outline: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundImage: `linear-gradient(45deg, transparent 50%, var(--primary) 50%), linear-gradient(135deg, var(--primary) 50%, transparent 50%)`,
            backgroundPosition: `calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)`,
            backgroundSize: `5px 5px, 5px 5px`,
            backgroundRepeat: `no-repeat`
          }}
        >
          <option value="">Todas las materias</option>
          {materias.map(m => (<option key={m} value={m}>{m}</option>))}
        </select>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeSubTab === 'leyes' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedArticulo ? '1fr 1fr' : '1fr', gap: '24px', height: '100%' }}>
            <div style={{ overflowY: 'auto', paddingRight: '8px' }}>
              {filteredLeyes.map((ley: any) => (
                <div 
                  key={ley.id} 
                  onClick={() => { setSelectedLey(ley); setSelectedArticulo(null); }} 
                  style={{
                    padding: '20px', 
                    background: selectedLey?.id === ley.id ? 'rgba(197, 160, 89, 0.05)' : 'var(--surface)',
                    border: '1.5px solid', 
                    borderColor: selectedLey?.id === ley.id ? 'var(--primary)' : 'var(--border)',
                    borderRadius: '16px', 
                    marginBottom: '16px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedLey?.id === ley.id ? 'var(--shadow-gold)' : 'none'
                  }}
                  className="hover-lift"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--primary)', letterSpacing: '0.05em' }}>{ley.abreviatura}</h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ley.articulos.length} Art.</span>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{ley.titulo}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{ley.materia}</p>
                </div>
              ))}
            </div>
            
            {selectedLey && (
              <div style={{ 
                background: 'var(--surface-opaque)', 
                border: '1.5px solid var(--border)', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}>
                <div style={{ 
                  padding: '20px', 
                  borderBottom: '1px solid var(--border)', 
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)' }}>
                    Artículos de {selectedLey.abreviatura}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    maxHeight: '160px',
                    overflowY: 'auto',
                    padding: '4px'
                  }}>
                    {selectedLey.articulos.map((art: any) => (
                      <button 
                        key={art.numero} 
                        onClick={() => setSelectedArticulo(art)} 
                        style={{
                          padding: '8px 14px', 
                          fontSize: '13px',
                          background: selectedArticulo?.numero === art.numero ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                          border: '1px solid', 
                          borderColor: selectedArticulo?.numero === art.numero ? 'var(--primary)' : 'transparent',
                          borderRadius: '10px', 
                          color: selectedArticulo?.numero === art.numero ? '#000' : 'var(--text)', 
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.2s'
                        }}
                      >
                        Art. {art.numero}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                  {selectedArticulo ? (
                    <article>
                      <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: 'var(--primary)' }}>§</span> Artículo {selectedArticulo.numero}
                        </div>
                        <button 
                          onClick={() => getAiExplanation(selectedArticulo.contenido)}
                          style={{ 
                            fontSize: '11px', 
                            padding: '8px 16px', 
                            background: 'rgba(197, 160, 89, 0.15)', 
                            border: '1.5px solid var(--primary)', 
                            borderRadius: '12px', 
                            color: 'var(--primary)', 
                            fontWeight: 700, 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          ✨ EXPLICAR CON IA
                        </button>
                      </h2>
                      <div style={{ 
                        lineHeight: 1.8, 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.9)',
                        fontFamily: "'Source Sans Pro', sans-serif"
                      }}>
                        {selectedArticulo.contenido}
                      </div>
                    </article>
                  ) : (
                    <div style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      gap: '16px'
                    }}>
                      <span style={{ fontSize: '40px', opacity: 0.3 }}>⚖️</span>
                      <p>Selecciona un artículo para visualizar su contenido</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'jurisprudencia' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedJurisprudencia ? '1fr 1fr' : '1fr', gap: '24px', height: '100%' }}>
            <div style={{ overflowY: 'auto' }}>
              {filteredJurisprudencias.map((jur: any) => (
                <div 
                  key={jur.id} 
                  onClick={() => setSelectedJurisprudencia(jur)} 
                  style={{ 
                    padding: '20px', 
                    background: selectedJurisprudencia?.id === jur.id ? 'rgba(197, 160, 89, 0.05)' : 'var(--surface)', 
                    border: '1.5px solid', 
                    borderColor: selectedJurisprudencia?.id === jur.id ? 'var(--primary)' : 'var(--border)', 
                    borderRadius: '16px', 
                    marginBottom: '16px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ 
                    fontSize: '10px', 
                    padding: '4px 10px', 
                    background: jur.tipo === 'JR' ? 'var(--primary)' : 'rgba(197, 160, 89, 0.2)', 
                    borderRadius: '6px', 
                    color: jur.tipo === 'JR' ? '#000' : 'var(--primary)',
                    fontWeight: 700,
                    marginRight: '8px',
                    letterSpacing: '0.05em'
                  }}>{jur.tipo}</span>
                  <h3 style={{ fontSize: '15px', marginTop: '12px', marginBottom: '8px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{jur.titulo}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{jur.materia}</p>
                </div>
              ))}
            </div>
            {selectedJurisprudencia && (
              <div style={{ 
                background: 'var(--surface-opaque)', 
                border: '1.5px solid var(--border)', 
                borderRadius: '24px', 
                padding: '32px', 
                overflowY: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px', gap: '20px' }}>
                  <h2 style={{ fontSize: '20px', margin: 0, color: '#fff', lineHeight: 1.4, flex: 1 }}>{selectedJurisprudencia.titulo}</h2>
                  <button 
                    onClick={() => getAiExplanation(selectedJurisprudencia.tesis)}
                    style={{ 
                      fontSize: '11px', 
                      padding: '8px 16px', 
                      background: 'rgba(197, 160, 89, 0.15)', 
                      border: '1.5px solid var(--primary)', 
                      borderRadius: '12px', 
                      color: 'var(--primary)', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ✨ EXPLICAR CON IA
                  </button>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '11px', color: 'var(--primary)', marginBottom: '12px', letterSpacing: '0.1em', fontWeight: 700 }}>TESIS</h4>
                  <div style={{ 
                    padding: '24px', 
                    background: 'rgba(197, 160, 89, 0.05)', 
                    borderRadius: '16px', 
                    borderLeft: '4px solid var(--primary)', 
                    fontSize: '15px', 
                    lineHeight: 1.8, 
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.9)'
                  }}>{selectedJurisprudencia.tesis}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: '11px', color: 'var(--primary)', marginBottom: '12px', letterSpacing: '0.1em', fontWeight: 700 }}>PRECEDENTE</h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>{selectedJurisprudencia.precedente}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'tratados' && (
          <div style={{ overflowY: 'auto', height: '100%', paddingRight: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {[...tratadosInternacionales, ...tratadosBilaterales].map((tratado: any) => (
                <div 
                  key={tratado.id} 
                  style={{ 
                    background: 'var(--surface)', 
                    border: '1.5px solid var(--border)', 
                    borderRadius: '20px', 
                    padding: '24px',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  className="hover-lift"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#fff', flex: 1, paddingRight: '12px' }}>{tratado.nombre}</h3>
                    <span style={{ 
                      fontSize: '10px', 
                      padding: '4px 10px', 
                      background: 'rgba(197, 160, 89, 0.1)', 
                      borderRadius: '6px', 
                      color: 'var(--primary)',
                      fontWeight: 700
                    }}>{tratado.materia}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>{tratado.resumen}</p>
                  <button style={{ 
                    background: 'none', 
                    border: '1px solid var(--primary)', 
                    color: 'var(--primary)', 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>Ver detalles</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* AI Explanation Modal/Overlay */}
      {(isExplaining || aiExplanation) && (
        <div className="glass-panel animate-fade" style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '500px',
          zIndex: 3000,
          padding: '32px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          border: '1.5px solid var(--primary)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '18px', fontWeight: 700 }}>✨ Claridad Legal IA</h3>
            <button onClick={() => { setAiExplanation(null); setIsExplaining(false); }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>
          
          {isExplaining ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="shimmer" style={{ width: '100%', height: '20px', marginBottom: '12px', borderRadius: '4px' }} />
              <div className="shimmer" style={{ width: '80%', height: '20px', marginBottom: '12px', borderRadius: '4px' }} />
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>TuAbogadoIA está sintetizando el lenguaje legal...</p>
            </div>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#fff', whiteSpace: 'pre-wrap' }}>{aiExplanation}</p>
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(197, 162, 39, 0.05)', borderRadius: '12px', border: '1px solid rgba(197, 162, 39, 0.1)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>💡 NOTA TUABOGADOIA</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>Esta explicación es una simplificación asistida por IA para fines informativos.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Background Overlay for Modal */}
      {(isExplaining || aiExplanation) && (
        <div 
          onClick={() => { setAiExplanation(null); setIsExplaining(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 2999 }}
        />
      )}
    </div>
  );
}
