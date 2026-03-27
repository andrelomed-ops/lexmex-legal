'use client';

import React, { useState } from 'react';
import { plantillasEscrituras, categoriasEscrituras, type PlantillaEscritura } from '@/data/escrituras';

interface EscriturasViewProps {
  onRedactar: (titulo: string) => void;
  materiaFilter: string;
  setMateriaFilter: (materia: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const notaryCapabilities = [
  { icon: '📜', title: 'Revisión de Proyectos', desc: 'Análisis técnico de proyectos de escritura externa.' },
  { icon: '🔍', title: 'Due Diligence Comprador', desc: 'Verificación integral preventiva para adquisiciones.' },
  { icon: '📋', title: 'Due Diligence Vendedor', desc: 'Preparación de expediente para venta exitosa.' },
  { icon: '✍️', title: 'Redacción de Escrituras', desc: 'Generación de borradores notariales personalizados.' }
];

export const EscriturasView: React.FC<EscriturasViewProps> = ({ 
  onRedactar, 
  materiaFilter, 
  setMateriaFilter, 
  searchTerm, 
  setSearchTerm 
}) => {
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaEscritura | null>(null);

  const filteredPlantillas = plantillasEscrituras.filter(p => 
    (materiaFilter === '' || p.categoria === materiaFilter) &&
    (searchTerm === '' || p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Servicios Notariales</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notaryCapabilities.map((cap, i) => (
              <div 
                key={i} 
                style={{ padding: '14px', background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}
                onClick={() => {
                  const prompts = [
                    "Revisa el siguiente proyecto de escritura:",
                    "Due Diligence comprador - Dame datos:",
                    "Due Diligence vendedor - Dame datos:",
                    "Redacta escritura de:"
                  ];
                  onRedactar(prompts[i]);
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{cap.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{cap.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{cap.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📝 Plantillas de Escrituras</h2>
          <input 
            type="search" 
            value={searchTerm || ''} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Buscar tipo de escritura..." 
            style={{ 
              width: '100%',
              padding: '12px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
              marginBottom: '12px'
            }} 
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoriasEscrituras.map(cat => (
              <button 
                key={cat} 
                onClick={() => setMateriaFilter(materiaFilter === cat ? '' : cat)} 
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '12px', 
                  background: materiaFilter === cat ? 'var(--secondary)' : 'var(--surface)', 
                  color: materiaFilter === cat ? '#0D1117' : 'var(--text)', 
                  border: '1px solid', 
                  borderColor: materiaFilter === cat ? 'var(--secondary)' : 'var(--border)', 
                  borderRadius: '20px', 
                  cursor: 'pointer' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredPlantillas.map(plantilla => (
            <div 
              key={plantilla.id} 
              onClick={() => setSelectedPlantilla(plantilla)} 
              style={{ 
                padding: '16px', 
                background: selectedPlantilla?.id === plantilla.id ? 'var(--surface-hover)' : 'var(--surface)', 
                border: '1px solid', 
                borderColor: selectedPlantilla?.id === plantilla.id ? 'var(--secondary)' : 'var(--border)', 
                borderRadius: '8px', 
                marginBottom: '12px', 
                cursor: 'pointer' 
              }}
            >
              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--accent)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{plantilla.categoria}</span>
              <h3 style={{ fontSize: '16px', marginTop: '8px', marginBottom: '4px' }}>{plantilla.titulo}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{plantilla.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedPlantilla && (
        <div style={{ width: '400px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--secondary)' }}>{selectedPlantilla.titulo}</h2>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>DESCRIPCIÓN</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{selectedPlantilla.descripcion}</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>REQUISITOS</h4>
            <ul style={{ fontSize: '13px', paddingLeft: '16px', lineHeight: 1.8 }}>
              {selectedPlantilla.requisitos.map((req, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{req}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => onRedactar(`Redacta una escritura pública de ${selectedPlantilla.titulo}. Dame los datos necesarios.`)} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: 'linear-gradient(135deg, var(--secondary) 0%, #A88420 100%)', 
              color: '#0D1117', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 600, 
              cursor: 'pointer' 
            }}
          >
            ✍️ Redactar Esta Escritura
          </button>
        </div>
      )}
    </div>
  );
};
