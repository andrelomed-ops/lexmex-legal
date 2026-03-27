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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent', position: 'relative' }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Chat Header - High Fidelity Glass */}
      <div style={{ 
        padding: '20px 32px', 
        borderBottom: '1.5px solid rgba(197, 160, 89, 0.15)', 
        background: 'rgba(16, 20, 28, 0.7)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           <div style={{ 
             width: '44px', 
             height: '44px', 
             borderRadius: '14px', 
             background: 'var(--surface-opaque)',
             border: '1.5px solid var(--primary)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontSize: '22px',
             boxShadow: '0 0 20px rgba(197,160,89,0.25)',
             transform: 'rotate(-5deg)'
           }}>
             ⚖️
           </div>
           <div>
             <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>LexMex <span style={{ color: 'var(--primary)', fontWeight: 400 }}>AI</span></h3>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
               <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ea043', boxShadow: '0 0 8px #2ea043' }} />
               <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SISTEMA ACTIVO</p>
             </div>
           </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="icon-button-gold" style={{ 
            fontSize: '14px', 
            background: 'rgba(197,160,89,0.1)', 
            padding: '8px 16px', 
            borderRadius: '10px',
            border: '1px solid rgba(197,160,89,0.2)',
            fontWeight: 600
          }}>Historial</button>
          <button className="icon-button-gold" style={{ fontSize: '20px' }}>⋯</button>
        </div>
      </div>

      {/* Message Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        background: 'transparent',
        zIndex: 1
      }}>
        {messages.map((msg: any, i: number) => (
          <div key={i} className={msg.role === 'user' ? 'bubble-user-fidelity' : 'bubble-ai-fidelity'} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            position: 'relative',
            animation: 'fadeInUp 0.4s ease-out'
          }}>
            {msg.role === 'assistant' && (
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '0', 
                fontSize: '10px', 
                color: 'var(--primary)', 
                fontWeight: 700,
                letterSpacing: '0.1em'
              }}>LEXMEX RESPUESTA</div>
            )}
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '15px', 
              lineHeight: 1.6,
              fontFamily: msg.role === 'assistant' ? "'Source Sans Pro', sans-serif" : 'inherit'
            }}>{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="bubble-ai-fidelity" style={{ 
            background: 'rgba(197, 160, 89, 0.05)', 
            border: '1px dashed var(--primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div className="animate-spin" style={{ fontSize: '16px' }}>⚖️</div>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Procesando fundamentos legales...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Ultra Fidelity Glass */}
      <div style={{
        padding: '24px 32px',
        background: 'linear-gradient(to top, rgba(10, 13, 20, 0.95), transparent)',
        zIndex: 10
      }}>
        <div className="input-bar-fidelity" style={{ 
          background: 'rgba(22, 27, 34, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(197, 160, 89, 0.25)',
          borderRadius: '20px',
          padding: '12px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="icon-button-gold hover-lift" 
            style={{ fontSize: '20px', opacity: 0.8 }}
            title="Adjuntar documento"
          >
            📎
          </button>
          <button 
            onClick={toggleVoiceInput} 
            className="icon-button-gold hover-lift" 
            style={{ fontSize: '20px', opacity: 0.8, color: isRecording ? '#f85149' : 'var(--primary)' }}
            title="Dictado por voz"
          >
            {isRecording ? '🔴' : '🎤'}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Analizar contrato, ley o jurisprudencia..."
            style={{ 
              flex: 1, 
              background: 'none', 
              border: 'none', 
              outline: 'none', 
              color: 'var(--text)', 
              fontSize: '15px',
              padding: '8px 4px'
            }}
          />
          
          <button 
            onClick={() => sendMessage()} 
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="btn-send-gold hover-lift"
            style={{
              width: '44px',
              height: '44px',
              transition: 'all 0.2s',
              opacity: (isLoading || (!input.trim() && !selectedImage)) ? 0.5 : 1,
              transform: (isLoading || (!input.trim() && !selectedImage)) ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            <span style={{ fontSize: '18px' }}>➤</span>
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', marginTop: '12px', letterSpacing: '0.05em' }}>
          Asistente especializado en Derecho Mexicano. Verifique siempre la vigencia de las normas.
        </p>
      </div>
    </div>
  );
}
