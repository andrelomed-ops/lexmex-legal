'use client';

import { useState } from 'react';

export default function CalendarioView({ casos }: { casos: any[] }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);

  // Combined array of Plazos and Eventos
  const todosEventos = casos.flatMap(c => {
    const evts = (c.eventos || []).map((e: any) => ({ ...e, esPlazo: false, caso: c.titulo }));
    const plzs = (c.plazos || []).map((p: any) => ({ ...p, fecha: p.fechaLimite, esPlazo: true, caso: c.titulo, tipo: p.estado === 'cumplido' ? 'cumplido' : 'vencimiento' }));
    return [...evts, ...plzs];
  }).sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const getEventosDelDia = () => {
    return todosEventos.filter((e: any) => e.fecha === fechaSeleccionada);
  };

  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  
  const getProximosEventos = () => {
    return todosEventos.filter((e: any) => new Date(e.fecha) >= hoy && !e.esPlazo).slice(0, 10);
  };

  // Alertas de plazos críticos (< 7 días y no cumplidos)
  const getAlertasPlazos = () => {
    const proximaSemana = new Date(hoy);
    proximaSemana.setDate(hoy.getDate() + 7);
    
    return todosEventos.filter(e => {
       if (!e.esPlazo) return false;
       if (e.estado === 'cumplido') return false;
       const fechaEvento = new Date(e.fecha);
       return fechaEvento >= hoy && fechaEvento <= proximaSemana;
    });
  };

  const getPlazosVencidos = () => {
    return todosEventos.filter(e => {
       if (!e.esPlazo) return false;
       if (e.estado === 'cumplido') return false;
       const fechaEvento = new Date(e.fecha);
       return fechaEvento < hoy;
    });
  };

  const tipoColores: any = {
    audiencia: '#ef4444',
    reunion: '#3b82f6',
    vencimiento: '#f59e0b',
    cumplido: '#22c55e',
    otro: '#6b7280'
  };

  const alertas = getAlertasPlazos();
  const vencidos = getPlazosVencidos();

  return (
    <div className="tuabogadoia-fade" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 400px) 1fr', gap: '24px', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '8px' }}>
        <h2 style={{ fontSize: '24px', color: '#FCD34D', fontFamily: 'Playfair Display' }}>📅 Centro de Plazos y Agenda</h2>
        
        {/* Panel de Alertas Críticas */}
        {(alertas.length > 0 || vencidos.length > 0) ? (
          <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid #ef4444', background: 'rgba(239,68,68,0.1)' }}>
             <h3 style={{ fontSize: '14px', color: '#ef4444', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span className="pulse-dot" style={{ background: '#ef4444' }}></span> ALERTAS CRÍTICAS DE TÉRMINOS
             </h3>
             {vencidos.length > 0 && (
               <div style={{ marginBottom: '12px' }}>
                 <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>VENCIDOS Y NO CUMPLIDOS</p>
                 {vencidos.map((v, i) => (
                   <div key={i} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '6px', borderLeft: '3px solid #ef4444' }}>
                     <p style={{ fontSize: '13px', color: '#fff' }}><strong>{v.caso}</strong>: {v.descripcion}</p>
                     <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>Venció: {new Date(v.fecha).toLocaleDateString('es-MX')}</p>
                   </div>
                 ))}
               </div>
             )}
             {alertas.length > 0 && (
               <div>
                 <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '8px' }}>PRÓXIMOS 7 DÍAS</p>
                 {alertas.map((a, i) => {
                    const diffDays = Math.ceil((new Date(a.fecha).getTime() - hoy.getTime()) / (1000 * 3600 * 24));
                    return (
                     <div key={i} style={{ padding: '10px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px', marginBottom: '6px', borderLeft: '3px solid #f59e0b' }}>
                       <p style={{ fontSize: '13px', color: '#fff' }}><strong>{a.caso}</strong>: {a.descripcion}</p>
                       <p style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px' }}>Vence en {diffDays} día(s) ({new Date(a.fecha).toLocaleDateString('es-MX')})</p>
                     </div>
                    )
                 })}
               </div>
             )}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid #22c55e', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>✅</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>Sin términos en riesgo</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No tienes plazos críticos para los próximos 7 días.</p>
            </div>
          </div>
        )}

        {/* Citas del Día */}
        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600, letterSpacing: '0.05em' }}>ACTIVIDAD DEL DÍA - {new Date(fechaSeleccionada).toLocaleDateString('es-MX')}</h3>
          <input
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            className="glass-card"
            style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: '16px', outline: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {getEventosDelDia().length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Día despejado.</p>
            ) : (
              getEventosDelDia().map((e: any, i: number) => (
                <div key={i} style={{ padding: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `4px solid ${tipoColores[e.tipo] || '#fff'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', marginBottom: '6px', display: 'inline-block' }}>{e.caso}</span>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{e.esPlazo ? e.descripcion : e.titulo}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{e.esPlazo ? 'Vencimiento de término' : `${e.hora} - ${e.tipo}`}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
      
      {/* Todo el calendario de eventos */}
      <div className="glass-card" style={{ borderRadius: '16px', border: '1px solid var(--border)', padding: '28px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '24px', fontFamily: 'Playfair Display' }}>
          Línea de Tiempo Legal ({todosEventos.length} registros)
        </h3>
        
        {todosEventos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🕰️</div>
            <p style={{ fontSize: '18px' }}>No hay actividad programada</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>Los plazos y audiencias que agregues en los casos aparecerán aquí.</p>
          </div>
        ) : (
          <div style={{ position: 'relative', paddingLeft: '24px' }}>
             {/* Línea conectora */}
             <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border)' }}></div>
             
             {todosEventos.map((e: any, i: number) => {
               const isPast = new Date(e.fecha) < hoy;
               return (
                <div key={i} style={{ position: 'relative', marginBottom: '24px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-24px', 
                    top: '4px', 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    background: tipoColores[e.tipo] || '#6b7280',
                    border: '4px solid #0D1117',
                    boxShadow: '0 0 0 1px var(--border)'
                  }}></div>
                  
                  <div className="glass-card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', opacity: isPast && !e.esPlazo ? 0.6 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: tipoColores[e.tipo] || '#fff' }}>
                          {new Date(e.fecha).toLocaleDateString('es-MX')} {e.hora ? `• ${e.hora}` : ''}
                        </span>
                        <span style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {e.esPlazo ? 'PLAZO/TÉRMINO' : 'EVENTO'}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{e.caso}</span>
                    </div>
                    
                    <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '8px' }}>
                      {e.esPlazo ? e.descripcion : e.titulo}
                    </h4>
                    
                    {!e.esPlazo && e.descripcion && (
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '8px' }}>{e.descripcion}</p>
                    )}
                    
                    {!e.esPlazo && e.lugar && (
                      <p style={{ fontSize: '12px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>📍</span> {e.lugar}
                      </p>
                    )}
                  </div>
                </div>
               );
             })}
          </div>
        )}
      </div>
    </div>
  );
}
