'use client';

import { useState } from 'react';

export default function CaseDetail({ 
  selectedCliente, 
  selectedCaso, 
  casosDelCliente,
  onSelectCaso,
  onAddCaso,
  onDeleteCaso,
  showNewCaso,
  setShowNewCaso,
  // Sub-actions
  onAddPlazo, onTogglePlazo, onDeletePlazo, showNewPlazo, setShowNewPlazo,
  onAddEvento, onDeleteEvento, showNewEvento, setShowNewEvento,
  onAddDocumento, onDeleteDocumento, showNewDocumento, setShowNewDocumento,
  onAddConsulta, showNewConsulta, setShowNewConsulta,
  onAddFactura, onUpdateFacturaStatus, onDeleteFactura, showNewFactura, setShowNewFactura,
  onShowEmail, onShowCall
}: any) {
  if (!selectedCliente) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)' }}>Selecciona un cliente para ver sus casos</div>;

  const statusColors: any = { activo: '#22c55e', pendiente: '#f59e0b', concluso: '#3b82f6', cancelado: '#ef4444' };
  const citaTipoColores: any = { consulta: '#3b82f6', seguimiento: '#22c55e', audiencia: '#ef4444', otra: '#6b7280' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>Casos de {selectedCliente.nombre}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{selectedCliente.telefono} • {selectedCliente.correo}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => onShowCall(selectedCliente.telefono)} style={{ background: 'none', border: 'none', color: '#22c55e', cursor: 'pointer', fontSize: '14px' }}>📞 Llamar</button>
              <button onClick={() => onShowEmail(selectedCliente.correo)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '14px' }}>📧 Email</button>
            </div>
          </div>
        </div>
        <button onClick={() => setShowNewCaso(true)} style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Nuevo Caso</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {casosDelCliente.map((c: any) => (
          <div key={c.id} onClick={() => onSelectCaso(c)} style={{
            padding: '10px 16px', background: selectedCaso?.id === c.id ? 'var(--primary)' : 'var(--surface)',
            border: '1px solid', borderColor: selectedCaso?.id === c.id ? 'var(--secondary)' : 'var(--border)',
            borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            <p style={{ fontSize: '13px', fontWeight: 600 }}>{c.titulo}</p>
            <span style={{ fontSize: '10px', color: statusColors[c.status] }}>● {c.status}</span>
          </div>
        ))}
        {casosDelCliente.length === 0 && <p style={{ fontSize: '13px', color: 'var(--muted)' }}>No hay casos registrados</p>}
      </div>

      {showNewCaso && (
        <form onSubmit={onAddCaso} style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--secondary)' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--secondary)' }}>Nuevo Caso</h3>
          <input name="titulo" placeholder="Título del caso/expediente" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <select name="materia" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
              <option value="civil">Civil</option><option value="mercantil">Mercantil</option><option value="familiar">Familiar</option><option value="laboral">Laboral</option><option value="penal">Penal</option><option value="amparo">Amparo</option>
            </select>
          </div>
          <textarea name="descripcion" placeholder="Descripción breve..." style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', height: '80px' }}></textarea>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Crear Caso</button>
            <button type="button" onClick={() => setShowNewCaso(false)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </form>
      )}

      {selectedCaso ? (
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{selectedCaso.titulo}</h2>
                <span style={{ fontSize: '12px', padding: '4px 12px', background: statusColors[selectedCaso.status] + '22', color: statusColors[selectedCaso.status], borderRadius: '20px', border: `1px solid ${statusColors[selectedCaso.status]}` }}>{selectedCaso.status.toUpperCase()}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Abierto el {new Date(selectedCaso.fechaApertura).toLocaleDateString('es-MX')} • Materia: {selectedCaso.materia.toUpperCase()}</p>
            </div>
            <button onClick={() => onDeleteCaso(selectedCaso.id)} style={{ padding: '8px 16px', background: '#ef444422', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Eliminar Caso</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Plazos y Términos */}
            <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>⏱️ Plazos y Términos</h3>
                <button onClick={() => setShowNewPlazo(true)} style={{ background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '18px', width: '28px', height: '28px', cursor: 'pointer' }}>+</button>
              </div>
              
              {showNewPlazo && (
                <form onSubmit={onAddPlazo} style={{ marginBottom: '16px', padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                  <input name="descripcion" placeholder="Descripción del plazo" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <input name="fechaLimite" type="date" required style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ flex: 1, padding: '6px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Añadir</button>
                    <button type="button" onClick={() => setShowNewPlazo(false)} style={{ flex: 1, padding: '6px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '12px' }}>Cancelar</button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedCaso.plazos || []).length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>Sin plazos registrados</p>
                ) : (
                  selectedCaso.plazos.sort((a: any, b: any) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()).map((p: any) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', opacity: p.estado === 'cumplido' ? 0.6 : 1 }}>
                      <input type="checkbox" checked={p.estado === 'cumplido'} onChange={() => onTogglePlazo(p.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '13px', fontWeight: 500, textDecoration: p.estado === 'cumplido' ? 'line-through' : 'none' }}>{p.descripcion}</p>
                        <p style={{ fontSize: '11px', color: p.estado === 'cumplido' ? 'var(--muted)' : '#ef4444' }}>Vence: {new Date(p.fechaLimite).toLocaleDateString('es-MX')}</p>
                      </div>
                      <button onClick={() => onDeletePlazo(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}>✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Eventos y Audiencias */}
            <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>📅 Eventos y Audiencias</h3>
                <button onClick={() => setShowNewEvento(true)} style={{ background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '18px', width: '28px', height: '28px', cursor: 'pointer' }}>+</button>
              </div>

              {showNewEvento && (
                <form onSubmit={onAddEvento} style={{ marginBottom: '16px', padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                  <input name="titulo" placeholder="Título del evento" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input name="fecha" type="date" required style={{ padding: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                    <input name="hora" type="time" required style={{ padding: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  </div>
                  <select name="tipo" style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }}>
                    <option value="consulta">Consulta</option><option value="audiencia">Audiencia</option><option value="reunion">Reunión</option><option value="otro">Otro</option>
                  </select>
                  <input name="lugar" placeholder="Lugar (Juzgado, Notaría, etc.)" style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ flex: 1, padding: '6px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Añadir</button>
                    <button type="button" onClick={() => setShowNewEvento(false)} style={{ flex: 1, padding: '6px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '12px' }}>Cancelar</button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedCaso.eventos || []).length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>Sin eventos programados</p>
                ) : (
                  selectedCaso.eventos.map((e: any) => (
                    <div key={e.id} style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', borderLeft: `4px solid ${citaTipoColores[e.tipo] || '#6b7280'}`, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600 }}>{e.titulo}</p>
                          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>📅 {new Date(e.fecha).toLocaleDateString('es-MX')} • {e.hora}</p>
                          {e.lugar && <p style={{ fontSize: '11px', color: 'var(--secondary)', marginTop: '4px' }}>📍 {e.lugar}</p>}
                        </div>
                        <button onClick={() => onDeleteEvento(e.id)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}>✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Documentos */}
            <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>📄 Expediente Digital</h3>
                <button onClick={() => setShowNewDocumento(true)} style={{ background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '18px', width: '28px', height: '28px', cursor: 'pointer' }}>+</button>
              </div>

              {showNewDocumento && (
                <form onSubmit={onAddDocumento} style={{ marginBottom: '16px', padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                  <input name="nombre" placeholder="Nombre del documento" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <select name="tipo" style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }}>
                    <option value="demanda">Demanda/Contestación</option><option value="prueba">Prueba/Anexo</option><option value="resolucion">Resolución</option><option value="contrato">Contrato</option><option value="otro">Otro</option>
                  </select>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ flex: 1, padding: '6px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Registrar</button>
                    <button type="button" onClick={() => setShowNewDocumento(false)} style={{ flex: 1, padding: '6px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '12px' }}>Cancelar</button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedCaso.documentos || []).length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>Sin documentos registrados</p>
                ) : (
                  selectedCaso.documentos.map((d: any) => (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ width: '32px', height: '32px', background: 'var(--secondary)22', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📄</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '13px', fontWeight: 500 }}>{d.nombre}</p>
                        <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{d.tipo} • {new Date(d.fecha).toLocaleDateString('es-MX')}</p>
                      </div>
                      <button onClick={() => onDeleteDocumento(d.id)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}>✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Facturación y Cobranza */}
            <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>💰 Honorarios y Facturas</h3>
                <button onClick={() => setShowNewFactura(true)} style={{ background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '18px', width: '28px', height: '28px', cursor: 'pointer' }}>+</button>
              </div>

              {showNewFactura && (
                <form onSubmit={onAddFactura} style={{ marginBottom: '16px', padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                  <input name="numero" placeholder="Nº Factura/Recibo" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <input name="concepto" placeholder="Concepto" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <input name="total" type="number" placeholder="Total $" required style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)', fontSize: '13px' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ flex: 1, padding: '6px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Emitir</button>
                    <button type="button" onClick={() => setShowNewFactura(false)} style={{ flex: 1, padding: '6px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '12px' }}>Cancelar</button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(selectedCaso.facturas || []).length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>Sin facturas registradas</p>
                ) : (
                  <>
                    {selectedCaso.facturas.map((f: any) => (
                      <div key={f.id} style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <p style={{ fontSize: '13px', fontWeight: 600 }}>{f.numero}: {f.concepto}</p>
                          <button onClick={() => onDeleteFactura(f.id)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}>✕</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)' }}>${f.total.toLocaleString('es-MX')}</p>
                          <select value={f.status} onChange={(e) => onUpdateFacturaStatus(f.id, e.target.value)} style={{ padding: '4px 8px', fontSize: '11px', background: f.status === 'pagada' ? '#22c55e22' : '#f59e0b22', color: f.status === 'pagada' ? '#22c55e' : '#f59e0b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            <option value="pendiente">Pendiente</option>
                            <option value="pagada">Pagada</option>
                            <option value="cancelada">Cancelada</option>
                          </select>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '12px', padding: '12px', background: 'var(--secondary)11', borderRadius: '8px', border: '1px dashed var(--secondary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                        <span>Total Facturado:</span>
                        <span style={{ fontWeight: 600 }}>${selectedCaso.facturas.reduce((sum: number, f: any) => sum + f.total, 0).toLocaleString('es-MX')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#22c55e' }}>
                        <span>Pagado:</span>
                        <span style={{ fontWeight: 600 }}>${selectedCaso.facturas.filter((f: any) => f.status === 'pagada').reduce((sum: number, f: any) => sum + f.total, 0).toLocaleString('es-MX')}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
          <p>Selecciona un caso para ver los detalles</p>
          <button onClick={() => setShowNewCaso(true)} style={{ marginTop: '16px', padding: '10px 20px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>+ Crear Primer Caso</button>
        </div>
      )}
    </div>
  );
}
