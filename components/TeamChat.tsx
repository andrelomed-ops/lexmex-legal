'use client';

import { useState, useRef, useEffect } from 'react';

export default function TeamChat({ 
  messages, 
  teamMembers, 
  onSendMessage, 
  isLoading 
}: any) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const getAutor = (id: string) => {
    return teamMembers.find((m: any) => m.id === id) || { nombre: 'Sistema', rol: 'Bot' };
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      background: 'rgba(16, 20, 28, 0.4)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1.5px solid rgba(197, 160, 89, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Chat Header */}
      <div style={{ 
        padding: '20px 24px', 
        borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💬</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>Chat del Despacho</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--primary)', letterSpacing: '0.05em' }}>{teamMembers.length} MIEMBROS EN LÍNEA</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.3 }}>
            <span style={{ fontSize: '48px' }}>⚖️</span>
            <p style={{ fontSize: '14px', marginTop: '12px' }}>Inicia la conversación con el equipo</p>
          </div>
        ) : (
          messages.map((msg: any, i: number) => {
            const autor = getAutor(msg.autor_id);
            return (
              <div key={msg.id || i} className="tuabogadoia-fade" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  background: 'var(--surface-opaque)', 
                  border: '1px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  {autor.nombre.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>{autor.nombre}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{autor.rol}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>
                      {new Date(msg.creado_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div style={{ 
                    padding: '12px 16px', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '0 12px 12px 12px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {msg.contenido}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)' }}>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          gap: '12px',
          background: 'rgba(255,255,255,0.05)',
          padding: '8px 12px',
          borderRadius: '16px',
          border: '1px solid rgba(197, 160, 89, 0.2)'
        }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje al equipo..."
            style={{ 
              flex: 1, 
              background: 'none', 
              border: 'none', 
              outline: 'none', 
              color: '#fff',
              fontSize: '14px',
              padding: '8px'
            }}
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            style={{ 
              background: 'var(--primary)', 
              color: '#000', 
              border: 'none', 
              borderRadius: '12px',
              padding: '8px 16px',
              fontWeight: 700,
              cursor: 'pointer',
              opacity: !input.trim() ? 0.5 : 1
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
