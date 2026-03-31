'use client';

import { useRef, useState, useEffect } from 'react';

export default function SignaturePad({ onSave, onCancel }: { onSave: (dataUrl: string) => void, onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(pos.x, pos.y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.lineTo(pos.x, pos.y);
    ctx?.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    setHasSignature(false);
  };

  const save = () => {
    if (!hasSignature) return;
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (dataUrl) onSave(dataUrl);
  };

  return (
    <div className="glass-panel animate-fade" style={{ 
      padding: '32px', 
      maxWidth: '500px', 
      width: '100%', 
      border: '1.5px solid var(--primary)',
      background: 'rgba(10, 15, 25, 0.95)',
      boxShadow: '0 40px 80px rgba(0,0,0,0.8)' 
    }}>
      <h3 style={{ margin: '0 0 8px', color: 'var(--primary)', fontFamily: 'Playfair Display', fontSize: '20px' }}>Firma Autógrafa Digital</h3>
      <p style={{ margin: '0 0 24px', fontSize: '13px', color: 'var(--text-muted)' }}>Capture su firma dentro del recinto dorado de TuAbogadoIA.</p>
      
      <div style={{ 
        background: 'rgba(0,0,0,0.3)', 
        borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.1)', 
        overflow: 'hidden',
        cursor: 'crosshair',
        touchAction: 'none'
      }}>
        <canvas
          ref={canvasRef}
          width={436}
          height={220}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
        <button onClick={clear} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}>Borrar</button>
        <button onClick={save} disabled={!hasSignature} className="btn-premium" style={{ flex: 2, padding: '12px', fontSize: '14px', opacity: hasSignature ? 1 : 0.5 }}>✓ Confirmar Firma</button>
      </div>
      
      <button onClick={onCancel} style={{ width: '100%', marginTop: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Cancelar y volver</button>
      
      <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(197, 162, 39, 0.05)', borderRadius: '8px', border: '1px solid rgba(197, 162, 39, 0.1)' }}>
        <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
          🔒 Estampado de seguridad: Se registrará IP, Fecha y Metadatos de este trazo.
        </p>
      </div>
    </div>
  );
}
