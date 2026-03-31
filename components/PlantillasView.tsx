'use client';

import { useState } from 'react';
import { plantillas, materiasDisponibles, type Plantilla } from '@/data/plantillas';

export default function PlantillasView({ 
  plantillas: propsPlantillas, 
  onSelect,
  clientes = [],
  casos = [],
  selectedCaso = null,
  onAutoSaveDocument
}: { 
  plantillas?: Plantilla[], 
  onSelect?: (p: Plantilla) => void,
  clientes?: any[],
  casos?: any[],
  selectedCaso?: any,
  onAutoSaveDocument?: (filename: string, content: string, casoId: string) => Promise<void>
}) {
  const dataPlantillas = propsPlantillas || plantillas;
  const [search, setSearch] = useState('');
  const [materia, setMateria] = useState('');
  const [selected, setSelected] = useState<Plantilla | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filtered = dataPlantillas.filter(p => {
    const matchSearch = !search || p.nombre.toLowerCase().includes(search.toLowerCase()) || p.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchMateria = !materia || p.materia === materia;
    return matchSearch && matchMateria;
  });

  const getFilledContent = (content: string) => {
    let filled = content;
    
    // 1. Datos del Cliente (Pre-seleccionado o desde el caso)
    const effectiveClienteId = selectedClienteId || selectedCaso?.cliente_id;
    if (effectiveClienteId) {
      const cliente = clientes.find(c => c.id === effectiveClienteId);
      if (cliente) {
        filled = filled.replace(/\[NOMBRE\]/g, cliente.nombre || '[NOMBRE]');
        filled = filled.replace(/\[EL CLIENTE\]/g, cliente.nombre || '[EL CLIENTE]');
        filled = filled.replace(/\[ACTOR\]/g, cliente.nombre || '[ACTOR]');
        filled = filled.replace(/\[DIRECCIÓN\]/g, cliente.direccion || '[DIRECCIÓN]');
        filled = filled.replace(/\[RFC\]/g, cliente.rfc || '[RFC]');
      }
    }

    // 2. Datos del Caso (Si hay uno seleccionado)
    if (selectedCaso) {
      filled = filled.replace(/\[EXPEDIENTE\]/g, selectedCaso.expediente || '[EXPEDIENTE]');
      filled = filled.replace(/\[JUZGADO\]/g, selectedCaso.juzgado || '[JUZGADO]');
      filled = filled.replace(/\[CIUDAD\]/g, selectedCaso.ciudad || 'Ciudad de México');
      filled = filled.replace(/\[MATERIA\]/g, selectedCaso.materia?.toUpperCase() || '[MATERIA]');
      filled = filled.replace(/\[FECHA\]/g, new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }));
    }

    return filled;
  };

  const copyToClipboard = (text: string) => {
    const finalText = getFilledContent(text);
    navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadDOCX = async (plantilla: Plantilla) => {
    setIsGenerating(true);
    try {
      const finalText = getFilledContent(plantilla.contenido);
      const response = await fetch('/api/word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contrato-texto',
          data: {
            contenido: finalText
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        // base64 to blob
        const byteCharacters = atob(data.document);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const docName = `${plantilla.nombre}_${Date.now()}.docx`;
        link.download = docName;
        link.click();

        // Guardado Automático en el Expediente si hay un caso activo
        if (selectedCaso && onAutoSaveDocument) {
          await onAutoSaveDocument(docName, data.document, selectedCaso.id);
        }
      }
    } catch (error) {
      console.error('Error generating DOCX:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#FCD34D', fontFamily: 'Playfair Display' }}>📄 Auto-Completado de Plantillas</h2>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar plantilla..."
          className="glass-card"
          style={{ marginBottom: '16px', padding: '14px', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
        />
        <select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="glass-card"
          style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: '20px', outline: 'none' }}
        >
          <option value="">🏛️ Todas las materias</option>
          {materiasDisponibles.map(m => (<option key={m.value} value={m.value}>{m.label}</option>))}
        </select>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(p => {
             const isSelected = selected?.id === p.id;
             return (
              <div 
                key={p.id} 
                onClick={() => setSelected(p)} 
                className="glass-card nav-item-fidelity"
                style={{
                  padding: '20px', 
                  background: isSelected ? 'rgba(201,162,39,0.1)' : 'var(--surface)',
                  border: '1px solid', 
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isSelected && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--primary)' }} />}
                <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {materiasDisponibles.find(m => m.value === p.materia)?.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(201,162,39,0.2)', borderRadius: '6px', color: '#FCD34D', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {p.tipo.toUpperCase()}
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px', color: isSelected ? '#FCD34D' : '#fff' }}>{p.nombre}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{p.descripcion}</p>
              </div>
          )})}
        </div>
      </div>
      
      {selected && (
        <div className="glass-card scale-up" style={{ border: '1px solid var(--primary)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '20px', color: '#FCD34D', marginBottom: '16px', fontFamily: 'Playfair Display' }}>{selected.nombre}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', display: 'block', fontWeight: 600 }}>AUTO-COMPLETAR CON DATOS DEL CLIENTE</label>
                <select
                  value={selectedClienteId}
                  onChange={(e) => setSelectedClienteId(e.target.value)}
                  className="glass-card"
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                >
                  <option value="">-- No Auto-completar --</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => downloadDOCX(selected)}
                  disabled={isGenerating}
                  className="btn-premium"
                  style={{ flex: 1, padding: '12px', fontSize: '13px', justifyContent: 'center' }}
                >
                  {isGenerating ? '⏳ Obteniendo...' : '📝 Generar DOCX'}
                </button>
                <button
                  onClick={() => copyToClipboard(selected.contenido)}
                  className="nav-item glass-card"
                  style={{ flex: 1, padding: '12px', fontSize: '13px', border: `1px solid ${copied ? '#22c55e' : 'var(--border)'}`, color: copied ? '#22c55e' : 'var(--text)', justifyContent: 'center' }}
                >
                  {copied ? '✓ Contenido Copiado' : '📋 Copiar Texto'}
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              💡 <strong>Instrucciones:</strong> {selected.descripcion}
            </p>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '13px', 
              fontFamily: 'Inter, sans-serif', 
              lineHeight: '1.8',
              color: 'rgba(255,255,255,0.8)'
            }}>
              {getFilledContent(selected.contenido)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
