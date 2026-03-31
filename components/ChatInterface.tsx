'use client';

import { useRef, useEffect, useState } from 'react';
import ContractWizard from './ContractWizard';
import { jsPDF } from 'jspdf';

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
  messagesEndRef,
  isSearchingWeb,
  isMobile
}: any) {
  const [activeWizard, setActiveWizard] = useState<any>(null);

  const sanitizeLegalText = (text: string) => {
    return text
      .replace(/\[DESCARGAR_PDF\]/g, '')
      .replace(/\[CONTRACT_WIZARD:.*?\]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold asterisks
      .replace(/### (.*?)\n/g, '$1\n') // Remove h3 markdown
      .replace(/## (.*?)\n/g, '$1\n')  // Remove h2 markdown
      .replace(/# (.*?)\n/g, '$1\n')   // Remove h1 markdown
      .trim();
  };

  const downloadAsPDF = (content: string, type: string) => {
    // Format: Letter (8.5 x 11 inches) -> 612 x 792 points
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'letter'
    });

    const cleanContent = sanitizeLegalText(content);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const contentWidth = pageWidth - (margin * 2);
    let cursorY = 50;

    const addHeader = () => {
      // Small Logo
      try {
        doc.addImage("/logo.png", "PNG", pageWidth - 100, 30, 50, 50);
      } catch (e) {}
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(197, 160, 89);
      doc.text("TuAbogadoIA", margin, 50);
      
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("AUTOMATIZACIÓN LEGAL DE ALTA FIDELIDAD | MODELOS PROFECO VIGENTES", margin, 62);
      
      doc.setDrawColor(197, 160, 89);
      doc.setLineWidth(0.5);
      doc.line(margin, 70, pageWidth - margin, 70);
      
      cursorY = 100;
    };

    const checkPageBreak = (needed: number) => {
      if (cursorY + needed > pageHeight - margin) {
        doc.addPage();
        addHeader();
      }
    };

    addHeader();

    // Date
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(33, 33, 33);
    const dateStr = `Ciudad de México, a ${new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    doc.text(dateStr, margin, cursorY);
    cursorY += 30;

    // Content Parsing & Rendering
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    const lines = doc.splitTextToSize(cleanContent, contentWidth);
    
    lines.forEach((line: string) => {
      checkPageBreak(15);
      doc.text(line, margin, cursorY);
      cursorY += 15;
    });

    // Signature Area
    cursorY += 40;
    checkPageBreak(60);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(margin + 20, cursorY, margin + 180, cursorY);
    doc.line(pageWidth - margin - 180, cursorY, pageWidth - margin - 20, cursorY);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("P A R T E   A R R E N D A D O R A", margin + 30, cursorY + 15);
    doc.text("P A R T E   A R R E N D A T A R I A", pageWidth - margin - 170, cursorY + 15);

    doc.save(`Contrato_Oficial_${type.replace(/\s+/g, '_')}.pdf`);
    showToast("Documento de Alta Fidelidad Generado", "success");
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent', position: 'relative', minHeight: 0 }}>
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
        padding: isMobile ? '12px 16px' : '20px 32px', 
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
             <img src="/logo.png" alt="Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
           </div>
           <div>
             <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>TuAbogadoIA <span style={{ color: 'var(--primary)', fontWeight: 400 }}>AI</span></h3>
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
        {messages.map((msg: any, i: number) => {
          // Parse for Wizard Trigger - More robust regex to handle Markdown wrapping
          const wizardMatch = msg.content.match(/\[CONTRACT_WIZARD:({.*?})\]/i);
          const hasDownload = msg.content.includes('[DESCARGAR_PDF]');
          
          if (wizardMatch && msg.role === 'assistant') {
            try {
              const config = JSON.parse(wizardMatch[1]);
              return (
                <div key={i} style={{ alignSelf: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: isMobile ? '100%' : 'auto', maxWidth: '100%' }}>
                    <ContractWizard 
                      contractType={config.type} 
                      fields={config.fields} 
                      onComplete={(data: any) => {
                        const dataStr = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join(', ');
                        sendMessage(`[DATOS_CONTRATO] He completado los datos para el contrato de ${config.type}: ${dataStr}`);
                      }}
                      onCancel={() => sendMessage("He cancelado el llenado del contrato.")}
                    />
                  </div>
                </div>
              );
            } catch (e) {
              console.error("Error parsing wizard config", e);
            }
          }

          return (
            <div key={i} className={`${msg.role === 'user' ? 'bubble-user-fidelity' : 'bubble-ai-fidelity'} tuabogadoia-fade`} style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              position: 'relative',
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
                }}>TUABOGADOIA RESPUESTA</div>
              )}
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                fontSize: '15px', 
                lineHeight: 1.6,
                fontFamily: msg.role === 'assistant' ? "'Source Sans Pro', sans-serif" : 'inherit'
              }}>
                {msg.role === 'assistant' ? sanitizeLegalText(msg.content) : msg.content}
              </div>

              {hasDownload && (
                <button 
                  onClick={() => downloadAsPDF(msg.content, "Legal")}
                  className="btn-premium"
                  style={{ 
                    marginTop: '20px', 
                    width: '100%', 
                    justifyContent: 'center',
                    background: 'rgba(197, 160, 89, 0.15)',
                    border: '1.2px solid var(--primary)'
                  }}
                >
                  📥 Descargar Contrato en PDF
                </button>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="bubble-ai-fidelity tuabogadoia-fade" style={{ 
            background: 'rgba(197, 160, 89, 0.05)', 
            border: '1px dashed var(--primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            borderRadius: '16px'
          }}>
            <div className="animate-spin" style={{ fontSize: '18px' }}>⚖️</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
                {isSearchingWeb ? 'Consultando Diario Oficial (DOF) y SCJN...' : 'Procesando fundamentos legales...'}
              </span>
              {isSearchingWeb && (
                <span className="tuabogadoia-fade" style={{ fontSize: '11px', color: 'rgba(197, 160, 89, 0.6)', letterSpacing: '0.05em' }}>
                  Sincronizando vigencia legal en tiempo real
                </span>
              )}
            </div>
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
