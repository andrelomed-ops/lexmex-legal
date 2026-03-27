'use client';

import { useRef, useEffect } from 'react';

export default function ChatInterface({
  messages,
  input,
  setInput,
  isLoading,
  sendMessage,
  selectedImage,
  setSelectedImage,
  isRecording,
  toggleVoiceInput,
  useWebSearch,
  setUseWebSearch,
  handleOCR,
  setShowContractAnalysis,
  setShowDueDiligence,
  selectedCaso,
  clientes,
  setActiveTab,
  setSelectedCliente,
  setSelectedCaso,
  casos,
  showToast,
  fileInputRef,
  messagesEndRef
}: any) {
  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      <div style={{ width: '300px', flexShrink: 0, display: 'var(--sidebar-display, flex)', flexDirection: 'column', gap: '16px' }}>
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '12px', 
          padding: '16px',
          flex: 1,
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '13px', color: 'var(--secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ⚡ Acciones Rápidas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { icon: "📋", label: "Análisis de Documento", action: () => setInput("Analiza el siguiente documento y dime: hechos, pretensiones, fundamentos jurídicos y debilidades:") },
              { icon: "✍️", label: "Contestación de Demanda", action: () => setInput("Redacta una contestación de demanda. Incluye: competencia, personería, hechos, defensas y peticiones:") },
              { icon: "🏛️", label: "Redactar Demanda", action: () => setInput("Redacta una demanda de:") },
              { icon: "📜", label: "Generar Contrato", action: () => sendMessage("Ayúdame a generar un contrato de arrendamiento") },
              { icon: "✅", label: "Due Diligence", action: () => setShowDueDiligence(true) },
              { icon: "📖", label: "Glosario Legal", action: () => setInput("Define el término legal:") },
            ].map((action, i) => (
              <button key={i} onClick={action.action} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: '16px' }}>{action.icon}</span>
                <span style={{ fontSize: '12px', color: 'var(--text)' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {casos.length > 0 && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', maxHeight: '250px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '13px', color: 'var(--secondary)', marginBottom: '12px' }}>📁 Mis Casos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {casos.slice(0, 8).map((c: any) => {
                const cliente = clientes.find((cl: any) => cl.id === c.clienteId);
                return (
                  <div key={c.id} onClick={() => { setSelectedCliente(cliente); setSelectedCaso(c); setActiveTab('casos'); }} style={{ padding: '8px', background: 'var(--bg)', borderRadius: '6px', cursor: 'pointer' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>{c.titulo}</p>
                    <p style={{ fontSize: '10px', color: 'var(--muted)' }}>{cliente?.nombre || 'Sin cliente'} • {c.materia}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedCaso && (
          <div style={{ marginBottom: '12px', padding: '12px', background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>📁 CASO ACTIVO</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{selectedCaso.titulo}</p>
              </div>
              <button onClick={() => setSelectedCaso(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
          </div>
        )}

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          background: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '16px'
        }}>
          {messages.map((msg: any, i: number) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              marginBottom: '12px',
              gap: '8px'
            }}>
              <div style={{
                maxWidth: msg.role === 'user' ? '80%' : '75%',
                padding: '14px 18px',
                borderRadius: '18px',
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '15px'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div style={{ color: 'var(--muted)', fontSize: '12px' }}>LexMex está pensando...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px',
          padding: '16px',
          background: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          alignItems: 'center'
        }}>
          <button onClick={() => fileInputRef.current?.click()} style={{ padding: '12px', background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>📷</button>
          <button onClick={toggleVoiceInput} style={{ padding: '12px', background: isRecording ? '#ef4444' : 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer' }}>{isRecording ? '⏹️' : '🎤'}</button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu consulta legal..."
            style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '12px 20px', color: 'var(--text)' }}
          />
          <button onClick={() => sendMessage()} disabled={isLoading} style={{ width: '48px', height: '48px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>➤</button>
        </div>
      </div>
    </div>
  );
}
