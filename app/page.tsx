'use client';

import { useState, useRef, useEffect } from 'react';
import { leyesMexicanas, buscarLeyes, materias, jurisprudencias, buscarJurisprudencia, type Ley, type Articulo, type Jurisprudencia } from '@/data/leyes';
import { tratadosInternacionales, tratadosBilaterales, buscarTratados, type Tratado } from '@/data/tratados';
import { plantillasEscrituras, categoriasEscrituras, buscarPlantilla, type PlantillaEscritura } from '@/data/escrituras';
import { plantillas, materiasDisponibles, type Plantilla } from '@/data/plantillas';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const capabilities = [
  { icon: "📋", title: "Análisis de Demandas", desc: "Analiza documentos y encuentra puntos débiles" },
  { icon: "✍️", title: "Contestación de Demandas", desc: "Redacta respuestas profesionales" },
  { icon: "⚖️", title: "Estudio de Fallos", desc: "Encuentra errores en resoluciones" },
  { icon: "📚", title: "Búsqueda de Jurisprudencia", desc: "Encuentra precedentes relevantes" },
  { icon: "🔍", title: "Revisión Notarial", desc: "Revisa proyectos y encuentra inconsistencias" },
  { icon: "📜", title: "Contratos Civiles", desc: "Redacta cualquier contrato civil" },
  { icon: "💼", title: "Contratos Mercantiles", desc: "Redacta contratos comerciales" },
  { icon: "⏱️", title: "Plazos Legales", desc: "Calcula prescripción y términos procesales" },
  { icon: "✅", title: "Due Diligence", desc: "Verifica propiedades, empresas, personas" },
  { icon: "📖", title: "Glosario Legal", desc: "Definiciones de términos jurídicos" },
  { icon: "📋", title: "Guías Procedimentales", desc: "Pasos para juicios y trámites" },
  { icon: "🏛️", title: "Demandas", desc: "Redacta demandas y escritos jurídicos" },
  { icon: "💰", title: "Calculadora Laboral", desc: "Liquidación por despido injustificado" },
  { icon: "💵", title: "Pensión Alimenticia", desc: "Calcula estimación de pensión" },
  { icon: "🏦", title: "ISR e Impuestos", desc: "Estimación de impuestos" },
  { icon: "⚖️", title: "Daños y Perjuicios", desc: "Calcula indemnización civil" }
];

function PlantillasView() {
  const [search, setSearch] = useState('');
  const [materia, setMateria] = useState('');
  const [selected, setSelected] = useState<Plantilla | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = plantillas.filter(p => {
    const matchSearch = !search || p.nombre.toLowerCase().includes(search.toLowerCase()) || p.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchMateria = !materia || p.materia === materia;
    return matchSearch && matchMateria;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async (plantilla: Plantilla) => {
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'documento',
          datos: {
            titulo: plantilla.nombre,
            contenido: plantilla.contenido
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + data.pdf;
        link.download = data.filename;
        link.click();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📄 Plantillas Jurídicas</h2>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar plantilla..."
          style={{ marginBottom: '12px' }}
        />
        <select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }}
        >
          <option value="">Todas las materias</option>
          {materiasDisponibles.map(m => (<option key={m.value} value={m.value}>{m.label}</option>))}
        </select>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={{
              padding: '16px', background: selected?.id === p.id ? 'var(--surface-hover)' : 'var(--surface)',
              border: '1px solid', borderColor: selected?.id === p.id ? 'var(--secondary)' : 'var(--border)',
              borderRadius: '8px', marginBottom: '12px', cursor: 'pointer'
            }}>
              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--accent)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{materiasDisponibles.find(m => m.value === p.materia)?.label}</span>
              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{p.tipo}</span>
              <h3 style={{ fontSize: '14px', marginTop: '8px', marginBottom: '4px' }}>{p.nombre}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--secondary)' }}>{selected.nombre}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => downloadPDF(selected)}
                style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                📄 PDF
              </button>
              <button
                onClick={() => copyToClipboard(selected.contenido)}
                style={{ padding: '8px 16px', background: copied ? '#22c55e' : 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>{selected.descripcion}</p>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '12px', 
            fontFamily: 'monospace', 
            background: 'var(--bg)', 
            padding: '16px', 
            borderRadius: '8px',
            maxHeight: '60vh',
            overflow: 'auto'
          }}>
            {selected.contenido}
          </pre>
        </div>
      )}
    </div>
  );
}

function ProspectosView({ prospectos, clientes, onAdd, onUpdateStatus, onDelete, onConvert, onShowNew }: {
  prospectos: any[], clientes: any[], onAdd: any, onUpdateStatus: any, onDelete: any, onConvert: any, onShowNew: any
}) {
  const prospectoStatusColors: any = { nuevo: '#3b82f6', contactado: '#f59e0b', interesado: '#22c55e', no_interesado: '#ef4444', cliente: '#8b5cf6' };
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>🤝 Prospectos</h2>
          <button onClick={onShowNew} style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Nuevo</button>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--secondary)' }}>{prospectos.length}</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Total prospectos</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {prospectos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No hay prospectos</div>
          ) : (
            prospectos.map(p => (
              <div key={p.id} style={{ padding: '14px', background: 'var(--surface)', borderRadius: '8px', marginBottom: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{p.nombre}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.correo}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{p.telefono}</p>
                  </div>
                  <span style={{ fontSize: '10px', padding: '3px 8px', background: prospectoStatusColors[p.status], borderRadius: '4px', color: '#fff' }}>{p.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>Pipeline de Prospectos</h3>
        {prospectos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
            <p>No hay prospectos registrados</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Agrega prospectos para hacer seguimiento</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {['nuevo', 'contactado', 'interesado', 'no_interesado', 'cliente'].map(status => (
              <div key={status} style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: prospectoStatusColors[status], marginBottom: '12px', textTransform: 'capitalize' }}>{status.replace('_', ' ')} ({prospectos.filter(p => p.status === status).length})</p>
                {prospectos.filter(p => p.status === status).map(p => (
                  <div key={p.id} style={{ padding: '10px', background: 'var(--surface)', borderRadius: '6px', marginBottom: '8px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600 }}>{p.nombre}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{p.motivo}</p>
                    <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>{new Date(p.fecha).toLocaleDateString('es-MX')}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CitasView({ citas, clientes, onAdd, onUpdateStatus, onDelete, onShowNew, onSyncCalendar }: {
  citas: any[], clientes: any[], onAdd: any, onUpdateStatus: any, onDelete: any, onShowNew: any, onSyncCalendar: any
}) {
  const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split('T')[0]);
  const citaTipoColores: any = { consulta: '#3b82f6', seguimiento: '#22c55e', audiencia: '#ef4444', otra: '#6b7280' };
  
  const citasFiltradas = citas.filter(c => c.fecha === fechaFiltro);
  const proximasCitas = citas.filter(c => new Date(c.fecha) >= new Date()).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📆 Citas</h2>
          <button onClick={onShowNew} style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Nueva</button>
        </div>
        <input type="date" value={fechaFiltro} onChange={(e) => setFechaFiltro(e.target.value)} style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }} />
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Citas del día</h3>
          {citasFiltradas.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay citas</p>
          ) : (
            citasFiltradas.map((c: any) => (
              <div key={c.id} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px', borderLeft: `3px solid ${citaTipoColores[c.tipo]}` }}>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>{c.titulo}</p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{c.hora} - {c.tipo}</p>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Próximas citas</h3>
          {proximasCitas.slice(0, 10).map((c: any, i: number) => (
            <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(c.fecha).toLocaleDateString('es-MX')} a las {c.hora}</p>
              <p style={{ fontSize: '13px', fontWeight: 600 }}>{c.titulo}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>Todas las citas ({citas.length})</h3>
        {citas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📆</div>
            <p>No hay citas programadas</p>
          </div>
        ) : (
          citas.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map((c: any, i: number) => {
            const cliente = clientes.find(cl => cl.id === c.clienteId);
            return (
              <div key={i} style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '12px', borderLeft: `4px solid ${citaTipoColores[c.tipo]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(c.fecha).toLocaleDateString('es-MX')} a las {c.hora}</p>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{c.titulo}</h4>
                    {cliente && <p style={{ fontSize: '13px', color: 'var(--secondary)', marginTop: '4px' }}>Cliente: {cliente.nombre}</p>}
                    {c.notas && <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{c.notas}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onSyncCalendar(c)} title="Sincronizar con Google Calendar" style={{ padding: '6px 10px', background: '#4285f4', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#fff' }}>📅</button>
                    <select value={c.status} onChange={(e) => onUpdateStatus(c.id, e.target.value)} style={{ padding: '6px', fontSize: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}>
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                    <button onClick={() => onDelete(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function CalendarioView({ casos }: { casos: any[] }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [showNuevoEvento, setShowNuevoEvento] = useState(false);

  const getEventosDelDia = () => {
    return casos.flatMap(c => (c.eventos || []).filter((e: any) => e.fecha === fechaSeleccionada));
  };

  const getProximosEventos = () => {
    const hoy = new Date();
    return casos.flatMap(c => (c.eventos || []).filter((e: any) => new Date(e.fecha) >= hoy).sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())).slice(0, 10);
  };

  const tipoColores: any = {
    audiencia: '#ef4444',
    reunion: '#3b82f6',
    vencimiento: '#f59e0b',
    otro: '#6b7280'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📅 Calendario</h2>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }}
        />
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Eventos del día</h3>
          {getEventosDelDia().length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay eventos</p>
          ) : (
            getEventosDelDia().map((e: any, i: number) => (
              <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px', borderLeft: `3px solid ${tipoColores[e.tipo]}` }}>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>{e.titulo}</p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{e.hora} - {e.tipo}</p>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '12px' }}>Próximos eventos</h3>
          {getProximosEventos().map((e: any, i: number) => (
            <div key={i} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(e.fecha).toLocaleDateString('es-MX')}</p>
              <p style={{ fontSize: '13px', fontWeight: 600 }}>{e.titulo}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '16px' }}>
          Todos los eventos ({casos.reduce((acc, c) => acc + (c.eventos?.length || 0), 0)})
        </h3>
        {casos.flatMap(c => (c.eventos || []).sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <p>No hay eventos programados</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Agrega eventos desde la sección de Casos</p>
          </div>
        ) : (
          casos.flatMap(c => (c.eventos || []).sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())).map((e: any, i: number) => (
            <div key={i} style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '12px', borderLeft: `4px solid ${tipoColores[e.tipo]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(e.fecha).toLocaleDateString('es-MX')} a las {e.hora}</p>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{e.titulo}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{e.descripcion}</p>
                  {e.lugar && <p style={{ fontSize: '12px', color: 'var(--secondary)', marginTop: '4px' }}>📍 {e.lugar}</p>}
                </div>
                <span style={{ fontSize: '10px', padding: '4px 8px', background: tipoColores[e.tipo], borderRadius: '4px', color: '#fff', textTransform: 'capitalize' }}>{e.tipo}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ReportesView({ casos, clientes }: { casos: any[], clientes: any[] }) {
  const stats = casos.reduce((acc: any, c) => {
    acc.porMateria[c.materia] = (acc.porMateria[c.materia] || 0) + 1;
    acc.porStatus[c.status] = (acc.porStatus[c.status] || 0) + 1;
    acc.total++;
    acc.plazos += (c.plazos || []).length;
    acc.eventos += (c.eventos || []).length;
    acc.documentos += (c.documentos || []).length;
    const facs = c.facturas || [];
    facs.forEach((f: any) => {
      if (f.status === 'pagada') acc.facturado += f.total;
      if (f.status === 'pendiente') acc.pendiente += f.total;
      if (f.status === 'pagada') acc.cobrado += 1;
      if (f.status === 'pendiente') acc.porCobrar += 1;
    });
    return acc;
  }, { porMateria: {}, porStatus: {}, total: 0, plazos: 0, eventos: 0, documentos: 0, facturado: 0, pendiente: 0, cobrado: 0, porCobrar: 0 });

  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const casosEsteMes = casos.filter(c => new Date(c.fechaApertura) >= inicioMes).length;
  const casosCerrados = casos.filter(c => c.status === 'concluso').length;
  const tasaCierre = stats.total > 0 ? Math.round((casosCerrados / stats.total) * 100) : 0;
  const ingresosPromedio = stats.total > 0 ? Math.round(stats.facturado / stats.total) : 0;

  const materiaColores: any = {
    civil: '#3b82f6',
    laboral: '#22c55e',
    mercantil: '#f59e0b',
    familiar: '#ec4899',
    penal: '#ef4444',
    constitucional: '#8b5cf6',
    administrativo: '#06b6d4',
    otro: '#6b7280'
  };

  const matterLabels: any = {
    civil: 'Civil', laboral: 'Laboral', mercantil: 'Mercantil', familiar: 'Familiar',
    penal: 'Penal', constitucional: 'Constitucional', administrativo: 'Administrativo', otro: 'Otro'
  };

  return (
    <div style={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--secondary)' }}>📊 Dashboard Legal</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Total Clientes</p>
          <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--secondary)' }}>{clientes.length}</p>
        </div>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Casos Activos</p>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#22c55e' }}>{stats.porStatus.activo || 0}</p>
        </div>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Ingresos Totales</p>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6' }}>${(stats.facturado || 0).toLocaleString('es-MX')}</p>
        </div>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Por Cobrar</p>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>${(stats.pendiente || 0).toLocaleString('es-MX')}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Casos Este Mes</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>{casosEsteMes}</p>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Tasa de Cierre</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#06b6d4' }}>{tasaCierre}%</p>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Ingreso Promedio/Caso</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#ec4899' }}>${ingresosPromedio.toLocaleString('es-MX')}</p>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Facturas Cobradas</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>{stats.cobrado}/{stats.cobrado + stats.porCobrar}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '16px', background: '#fef3c7', borderRadius: '12px', border: '1px solid #f59e0b' }}>
          <p style={{ fontSize: '11px', color: '#92400e' }}>⏱️ Plazos Registrados</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#92400e' }}>{stats.plazos}</p>
        </div>
        <div style={{ padding: '16px', background: '#dbeafe', borderRadius: '12px', border: '1px solid #3b82f6' }}>
          <p style={{ fontSize: '11px', color: '#1e40af' }}>📅 Eventos Programados</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#1e40af' }}>{stats.eventos}</p>
        </div>
        <div style={{ padding: '16px', background: '#f3e8ff', borderRadius: '12px', border: '1px solid #8b5cf6' }}>
          <p style={{ fontSize: '11px', color: '#6b21a8' }}>📄 Documentos</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#6b21a8' }}>{stats.documentos}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '16px' }}>Casos por Materia</h3>
          {Object.entries(stats.porMateria).map(([materia, count]: [string, any], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: materiaColores[materia] || '#6b7280', marginRight: '12px' }} />
              <span style={{ flex: 1, fontSize: '14px' }}>{matterLabels[materia] || materia}</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{count}</span>
            </div>
          ))}
          {Object.keys(stats.porMateria).length === 0 && <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Sin datos</p>}
        </div>
        <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '16px' }}>Casos por Status</h3>
          {Object.entries(stats.porStatus).map(([status, count]: [string, any], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ flex: 1, fontSize: '14px', textTransform: 'capitalize' }}>{status}</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{count}</span>
            </div>
          ))}
          {Object.keys(stats.porStatus).length === 0 && <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Sin datos</p>}
        </div>
      </div>
    </div>
  );
}

const notaryCapabilities = [
  { icon: "🔍", title: "Revisión de Proyectos", desc: "Encuentra inconsistencias en escrituras" },
  { icon: "✅", title: "Due Diligence Comprador", desc: "Verifica propiedad, gravámenes, riesgos" },
  { icon: "👤", title: "Due Diligence Vendedor", desc: "Verifica capacidad y origen de recursos" },
  { icon: "✍️", title: "Redactar Escritura", desc: "Crea escritura pública completa" }
];

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('SW registered:', reg.scope))
        .catch((err) => console.log('SW registration failed:', err));
    }
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'jurisprudencia' | 'escrituras' | 'casos' | 'plantillas' | 'calendario' | 'reportes' | 'prospectos' | 'citas' | 'equipo' | 'tratados'>('chat');
  
  // Estado para casos
  const [clientes, setClientes] = useState<any[]>([]);
  const [casos, setCasos] = useState<any[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [selectedCaso, setSelectedCaso] = useState<any>(null);
  const [showNewCliente, setShowNewCliente] = useState(false);
  const [showNewCaso, setShowNewCaso] = useState(false);
  const [showNewPlazo, setShowNewPlazo] = useState(false);
  const [showNewEvento, setShowNewEvento] = useState(false);
  const [showNewDocumento, setShowNewDocumento] = useState(false);
  const [showNewConsulta, setShowNewConsulta] = useState(false);
  const [showNewFactura, setShowNewFactura] = useState(false);
  const [showContractAnalysis, setShowContractAnalysis] = useState(false);
  const [contractText, setContractText] = useState('');
  const [contractType, setContractType] = useState('general');
  const [showNewProspecto, setShowNewProspecto] = useState(false);
  const [prospectos, setProspectos] = useState<any[]>([]);
  const [citas, setCitas] = useState<any[]>([]);
  const [showNewCita, setShowNewCita] = useState(false);
  const [showNewTeamMember, setShowNewTeamMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showTeamTab, setShowTeamTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const translations = {
    es: {
      welcome: "¡Bienvenido a LexMex!",
      chat: "Chat",
      clientes: "Clientes",
      casos: "Casos",
      prospectos: "Prospectos",
      citas: "Citas",
      calendario: "Calendario",
      equipo: "Equipo",
      reportes: "Reportes",
      plantillas: "Plantillas",
      escrituras: "Escrituras",
      library: "Leyes",
      jurisprudencia: "Jurisprudencia",
      newClient: "Nuevo Cliente",
      newCase: "Nuevo Caso",
      newProspect: "Nuevo Prospecto",
      newAppointment: "Nueva Cita",
      export: "Exportar",
      settings: "Configuración",
      search: "Buscar...",
    },
    en: {
      welcome: "Welcome to LexMex!",
      chat: "Chat",
      clientes: "Clients",
      casos: "Cases",
      prospectos: "Prospects",
      citas: "Appointments",
      calendario: "Calendar",
      equipo: "Team",
      reportes: "Reports",
      plantillas: "Templates",
      escrituras: "Deeds",
      library: "Laws",
      jurisprudencia: "Case Law",
      newClient: "New Client",
      newCase: "New Case",
      newProspect: "New Prospect",
      newAppointment: "New Appointment",
      export: "Export",
      settings: "Settings",
      search: "Search...",
    }
  };

  const t = translations[language];
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{type: string, id: string, message: string} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showDueDiligence, setShowDueDiligence] = useState(false);
  const [dueDiligenceResult, setDueDiligenceResult] = useState<any>(null);
  const [isCheckingDD, setIsCheckingDD] = useState(false);
  const [ddForm, setDdForm] = useState({ rfc: '', curp: '', nombre: '', tipo: 'persona-moral' });
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [currentCallNumber, setCurrentCallNumber] = useState('');
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    setHasPassword(!!localStorage.getItem('lexmex_password'));
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Datos de ejemplo
  const loadSampleData = () => {
    const sampleClientes = [
      { id: '1', nombre: 'María González López', correo: 'maria.gonzalez@email.com', telefono: '55 1234 5678', direccion: 'Av. Reforma 123, CDMX', rfc: 'GOLM800101ABC', fechaAlta: new Date().toISOString(), notas: 'Cliente preferente' },
      { id: '2', nombre: 'Juan Pérez Hernández', correo: 'juan.perez@email.com', telefono: '55 8765 4321', direccion: 'Calle Juárez 456, Guadalajara', rfc: 'PEHJ750202DEF', fechaAlta: new Date().toISOString(), notas: '' },
      { id: '3', nombre: 'Ana Martínez Silva', correo: 'ana.martinez@email.com', telefono: '55 1111 2222', direccion: 'Paseo de la Reforma 789, CDMX', rfc: 'MASA900303GHI', fechaAlta: new Date().toISOString(), notas: 'Referencia de María' },
    ];
    
    const sampleCasos = [
      { id: '1', clienteId: '1', titulo: 'Demanda de divorcio necesario', materia: 'familiar', status: 'activo', descripcion: 'Procedimiento de divorcio por causa de adulterio', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [{id: '1', casoId: '1', descripcion: 'Presenter pruebas', fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], estado: 'pendiente'}], eventos: [], facturas: [{id: '1', casoId: '1', numero: 'FAC-001', concepto: 'Honorarios etapa 1', total: 25000, fecha: new Date().toISOString(), status: 'pagada'}] },
      { id: '2', clienteId: '2', titulo: 'Reclamo de indemnización laboral', materia: 'laboral', status: 'activo', descripcion: 'Despido injustificado con reclamo de liquidación', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [], eventos: [{id: '1', titulo: 'Audiencia preliminar', fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '10:00', tipo: 'audiencia', descripcion: 'Primera audiencia', lugar: 'Junta Local'}], facturas: [] },
      { id: '3', clienteId: '3', titulo: 'Contrato de arrendamiento comercial', materia: 'civil', status: 'concluso', descripcion: 'Redacción y revisión de contrato', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [], eventos: [], facturas: [{id: '1', casoId: '3', numero: 'FAC-002', concepto: 'Honorarios redacción', total: 15000, fecha: new Date().toISOString(), status: 'pagada'}] },
    ];
    
    const sampleProspectos = [
      { id: '1', nombre: 'Carlos Ruiz Díaz', correo: 'carlos.ruiz@email.com', telefono: '55 3333 4444', motivo: 'Consulta por compra de propiedad', fuente: 'google', status: 'interesado', fecha: new Date().toISOString(), notas: 'Muy interesado en property' },
      { id: '2', nombre: 'Laura Torres Vega', correo: 'laura.torres@email.com', telefono: '55 5555 6666', motivo: 'Problema con arrendatario', fuente: 'referencia', status: 'nuevo', fecha: new Date().toISOString(), notas: '' },
    ];
    
    const sampleCitas = [
      { id: '1', clienteId: '1', titulo: 'Revisión de documentos', fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '11:00', tipo: 'consulta', notas: 'Revisar pruebas del divorcio', status: 'confirmada' },
      { id: '2', clienteId: '2', titulo: 'Audiencia', fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '10:00', tipo: 'audiencia', notas: 'Preliminar', status: 'pendiente' },
    ];
    
    setClientes(sampleClientes);
    setCasos(sampleCasos);
    setProspectos(sampleProspectos);
    setCitas(sampleCitas);
    showToast('¡Datos de ejemplo cargados!', 'success');
  };
  
  // Cargar desde localStorage al inicio
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedClientes = localStorage.getItem('lexmex_clientes');
    const savedCasos = localStorage.getItem('lexmex_casos');
    const savedProspectos = localStorage.getItem('lexmex_prospectos');
    const savedCitas = localStorage.getItem('lexmex_citas');
    if (savedClientes) setClientes(JSON.parse(savedClientes));
    if (savedCasos) setCasos(JSON.parse(savedCasos));
    if (savedProspectos) setProspectos(JSON.parse(savedProspectos));
    if (savedCitas) setCitas(JSON.parse(savedCitas));
  }, []);
  
  // Guardar en localStorage con indicador
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsSaving(true);
    localStorage.setItem('lexmex_clientes', JSON.stringify(clientes));
    localStorage.setItem('lexmex_casos', JSON.stringify(casos));
    localStorage.setItem('lexmex_prospectos', JSON.stringify(prospectos));
    localStorage.setItem('lexmex_citas', JSON.stringify(citas));
    setTimeout(() => setIsSaving(false), 500);
  }, [clientes, casos, prospectos, citas]);
  
  const welcomeMessageEs = `¡Hola! Soy LexMex, tu asesor legal. 

Puedo ayudarte con:
- Dudas de derecho mexicano (civil, penal, laboral, etc.)
- Revisión de documentos legales
- Redacción de demandas y contratos
- Búsqueda de leyes y jurisprudencia

¿En qué te ayudo?`;

  const welcomeMessageEn = `Welcome to LexMex! ⚖️

I am your legal AI assistant specialized in Mexican law. I am capable of:

📋 **Document Analysis**
I analyze lawsuits, responses, motions, and court rulings.

✍️ **Legal Drafting**
I prepare lawsuit responses, appeals, briefs, and legal documents.

⚖️ **Ruling Analysis**
I examine sentences to find legal errors and appeal opportunities.

📚 **Precedent Search**
I locate relevant case law and theses.

🔍 **Notarial Review**
I review deed projects and perform Due Diligence.

📜 **Civil and Commercial Contracts**
I draft any type of contract.

💡 You can also paste URLs from official sources (DOF, SCJN, etc.) for analysis.

How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessageEs }
  ]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: language === 'es' ? welcomeMessageEs : welcomeMessageEn }]);
    }
  }, [language]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showOcr, setShowOcr] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [materiaFilter, setMateriaFilter] = useState('');
  const [selectedLey, setSelectedLey] = useState<Ley | null>(null);
  const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
  const [selectedJurisprudencia, setSelectedJurisprudencia] = useState<Jurisprudencia | null>(null);
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaEscritura | null>(null);
  const [showContratoForm, setShowContratoForm] = useState(false);
  const [contratoGenerado, setContratoGenerado] = useState('');
  const [tipoContrato, setTipoContrato] = useState('arrendamiento');
  const [contratoDatos, setContratoDatos] = useState({
    nombreArrendador: '',
    rfcArrendador: '',
    nombreArrendatario: '',
    direccionInmueble: '',
    rentaMensual: '',
    fechaInicio: '',
    duracion: '',
    depositoGarantia: '',
    diaPago: '5',
    servicios: '',
    usoInmueble: 'habitacional'
  });
  const [isGenerandoContrato, setIsGenerandoContrato] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [callStatus]);

  const startCall = (number: string) => {
    setCurrentCallNumber(number);
    setCallStatus('calling');
    setCallDuration(0);
    // Simulate connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallStatus('idle');
      setCurrentCallNumber('');
      setCallDuration(0);
    }, 2000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      // Ctrl/Cmd + 1-9 for tabs
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const tabs = ['chat', 'prospectos', 'citas', 'casos', 'calendario', 'equipo', 'tratados', 'reportes', 'plantillas', 'escrituras', 'library'];
        const index = parseInt(e.key) - 1;
        if (index < tabs.length) setActiveTab(tabs[index] as any);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNewCliente(false);
        setShowNewCaso(false);
        setShowNewPlazo(false);
        setShowNewEvento(false);
        setShowNewDocumento(false);
        setShowNewConsulta(false);
        setShowNewFactura(false);
        setShowNewProspecto(false);
        setShowNewCita(false);
        setShowExportMenu(false);
        setConfirmDelete(null);
      }
      // Ctrl/Cmd + N for new (context dependent)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (activeTab === 'casos' && selectedCliente) setShowNewCaso(true);
        else if (activeTab === 'prospectos') setShowNewProspecto(true);
        else if (activeTab === 'citas') setShowNewCita(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedCliente]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-MX';
    recognition.interimResults = true;
    recognition.continuous = false;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  const handleOCR = async (imageData: string) => {
    setIsAnalyzing(true);
    setShowOcr(true);
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        setOcrResult(data);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `📄 **ANÁLISIS DE DOCUMENTO**\n\n**Tipo detectado:** ${data.analysis.detectedType}\n\n**Palabras clave:** ${data.analysis.keywords.slice(0, 10).join(', ')}\n\n**Fechas encontradas:** ${data.analysis.entities.dates.join(', ') || 'Ninguna'}\n\n**Montos:** ${data.analysis.entities.amounts.join(', ') || 'Ninguno'}\n\n**⚠️ Riesgos:** ${data.analysis.risks.join('\n') || 'Ninguno'}\n\n${data.analysis.summary}` 
        }]);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      showToast('Error al analizar documento', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeContract = async (text: string, tipo: string) => {
    setIsAnalyzing(true);
    setShowAnalysis(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'contrato-analisis', 
          texto: text, 
          tipo: tipo 
        })
      });
      
      const data = await response.json();
      setAnalysisResult(data);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `⚖️ **ANÁLISIS DE RIESGO CONTRACTUAL**\n\n**Nivel de riesgo:** ${data.score} (${data.overallRisk}/100)\n\n**Cláusulas de riesgo:** ${data.legalRisks.join('\n') || 'Ninguna'}\n\n**Faltantes:** ${data.missingClauses.join('\n') || 'Ninguna'}\n\n\n**📋 Recomendaciones:**\n${data.recommendations.map((r: string) => '• ' + r).join('\n')}\n\n**Precedentes relevantes:**\n${data.relevantPrecedents.map((p: any) => '• ' + p.titulo).join('\n')}` 
        }]);
    } catch (error) {
      console.error('Analysis Error:', error);
      showToast('Error al analizar contrato', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      showToast('Tu navegador no soporta notificaciones', 'error');
      return;
    }
    
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
      showToast('Notificaciones activadas', 'success');
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = (text || input || '').trim();
    if (!messageText && !selectedImage || isLoading) return;

    let contextInfo = '';
    if (selectedCaso) {
      const cliente = clientes.find(c => c.id === selectedCaso.clienteId);
      contextInfo = `\n\n--- CONTEXTO DEL CASO ACTUAL ---\nCliente: ${cliente?.nombre || 'N/A'}\nCaso: ${selectedCaso.titulo}\nMateria: ${selectedCaso.materia}\nStatus: ${selectedCaso.status}\nDescripción: ${selectedCaso.descripcion || 'N/A'}\nPlazos: ${(selectedCaso.plazos || []).map((p: any) => `${p.descripcion} - ${p.fechaLimite} (${p.estado})`).join(', ') || 'N/A'}\nFacturas: ${(selectedCaso.facturas || []).map((f: any) => `${f.numero}: $${f.total} (${f.status})`).join(', ') || 'N/A'}\n---------------------------\n`;
    }

    // Add web search results if enabled
    let webSearchInfo = '';
    if (useWebSearch) {
      try {
        const searchResponse = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: messageText })
        });
        const searchData = await searchResponse.json();
        if (searchData.success && searchData.results?.length > 0) {
          webSearchInfo = `\n\n--- BÚSQUEDA WEB RECIENTE ---\n${searchData.results.map((r: any, i: number) => `${i + 1}. ${r.title}\n   ${r.url}\n   ${r.snippet}`).join('\n\n')}\n---------------------------\n`;
        }
      } catch (e) {
        console.error('Web search error:', e);
      }
    }

    const fullMessage = messageText + contextInfo + webSearchInfo + (selectedImage ? '\n\n[Imagen adjunta para análisis]' : '');
    const userMessage: Message = { role: 'user', content: fullMessage };
    setMessages(prev => [...prev, userMessage]);
    setInput('' as any);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('text', fullMessage);
      formData.append('messages', JSON.stringify([...messages, userMessage].map(m => ({ role: m.role, content: m.content }))));
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Lo siento, ocurrió un error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeyes = buscarLeyes(searchTerm, materiaFilter || undefined);
  const filteredJurisprudencias = buscarJurisprudencia(searchTerm, materiaFilter || undefined);
  const filteredPlantillas = buscarPlantilla(searchTerm);

  // Funciones para gestión de casos
  const addCliente = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoCliente = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      direccion: formData.get('direccion'),
      rfc: formData.get('rfc'),
      fechaAlta: new Date().toISOString(),
      notas: ''
    };
    setClientes([...clientes, nuevoCliente]);
    setShowNewCliente(false);
    showToast('Cliente agregado correctamente', 'success');
  };

  const deleteCliente = (id: string) => {
    setConfirmDelete({ type: 'cliente', id, message: '¿Estás seguro de eliminar este cliente? También se eliminarán todos sus casos.' });
  };

  const deleteCaso = (id: string) => {
    setConfirmDelete({ type: 'caso', id, message: '¿Estás seguro de eliminar este caso? Se perderán todos los datos asociados.' });
  };

  const addCaso = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCliente) return;
    const formData = new FormData(e.currentTarget);
    const nuevoCaso = {
      id: Date.now().toString(),
      clienteId: selectedCliente.id,
      titulo: formData.get('titulo'),
      materia: formData.get('materia'),
      status: 'activo',
      descripcion: formData.get('descripcion'),
      fechaApertura: new Date().toISOString(),
      consultas: [],
      documentos: [],
      plazos: [],
      eventos: [],
      facturas: []
    };
    setCasos([...casos, nuevoCaso]);
    setShowNewCaso(false);
    showToast('Caso creado correctamente', 'success');
  };

  const addPlazo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoPlazo = {
      id: Date.now().toString(),
      casoId: selectedCaso.id,
      descripcion: formData.get('descripcion'),
      fechaLimite: formData.get('fechaLimite'),
      estado: 'pendiente'
    };
    const casoActualizado = {
      ...selectedCaso,
      plazos: [...(selectedCaso.plazos || []), nuevoPlazo]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewPlazo(false);
  };

  const togglePlazo = (plazoId: string) => {
    if (!selectedCaso) return;
    const plazosActualizados = selectedCaso.plazos.map((p: any) => 
      p.id === plazoId ? { ...p, estado: p.estado === 'pendiente' ? 'cumplido' : 'pendiente' } : p
    );
    const casoActualizado = { ...selectedCaso, plazos: plazosActualizados };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
  };

  const deletePlazo = (plazoId: string) => {
    setConfirmDelete({ type: 'plazo', id: plazoId, message: '¿Estás seguro de eliminar este plazo?' });
  };

  const addEvento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoEvento = {
      id: Date.now().toString(),
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      descripcion: formData.get('descripcion'),
      lugar: formData.get('lugar')
    };
    const casoActualizado = {
      ...selectedCaso,
      eventos: [...(selectedCaso.eventos || []), nuevoEvento]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewEvento(false);
  };

  const deleteEvento = (eventoId: string) => {
    setConfirmDelete({ type: 'evento', id: eventoId, message: '¿Estás seguro de eliminar este evento?' });
  };

  const addDocumento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoDocumento = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      fecha: new Date().toISOString(),
      notas: formData.get('notas')
    };
    const casoActualizado = {
      ...selectedCaso,
      documentos: [...(selectedCaso.documentos || []), nuevoDocumento]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewDocumento(false);
  };

  const deleteDocumento = (docId: string) => {
    setConfirmDelete({ type: 'documento', id: docId, message: '¿Estás seguro de eliminar este documento?' });
  };

  const addConsulta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaConsulta = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      pregunta: formData.get('pregunta'),
      respuesta: formData.get('respuesta') || ''
    };
    const casoActualizado = {
      ...selectedCaso,
      consultas: [...(selectedCaso.consultas || []), nuevaConsulta]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewConsulta(false);
  };

  const addFactura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaFactura = {
      id: Date.now().toString(),
      casoId: selectedCaso.id,
      numero: formData.get('numero'),
      concepto: formData.get('concepto'),
      total: parseFloat(formData.get('total') as string) || 0,
      fecha: new Date().toISOString(),
      status: 'pendiente'
    };
    const casoActualizado = {
      ...selectedCaso,
      facturas: [...(selectedCaso.facturas || []), nuevaFactura]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewFactura(false);
  };

  const updateFacturaStatus = (facturaId: string, status: string) => {
    if (!selectedCaso) return;
    const facturasActualizadas = selectedCaso.facturas.map((f: any) => 
      f.id === facturaId ? { ...f, status } : f
    );
    const casoActualizado = { ...selectedCaso, facturas: facturasActualizadas };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
  };

  const deleteFactura = (facturaId: string) => {
    setConfirmDelete({ type: 'factura', id: facturaId, message: '¿Estás seguro de eliminar esta factura?' });
  };

  const addProspecto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoProspecto = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      motivo: formData.get('motivo'),
      fuente: formData.get('fuente'),
      status: 'nuevo',
      fecha: new Date().toISOString(),
      notas: ''
    };
    setProspectos([...prospectos, nuevoProspecto]);
    setShowNewProspecto(false);
  };

  const updateProspectoStatus = (id: string, status: string) => {
    setProspectos(prospectos.map(p => p.id === id ? { ...p, status } : p));
    if (status === 'cliente') showToast('Prospecto convertido a cliente', 'success');
  };

  const deleteProspecto = (id: string) => {
    setConfirmDelete({ type: 'prospecto', id, message: '¿Estás seguro de eliminar este prospecto?' });
  };

  // Team member functions
  const addTeamMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoMiembro = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      rol: formData.get('rol'),
      especialidad: formData.get('especialidad'),
      fechaAlta: new Date().toISOString(),
      status: 'activo',
      casosAsignados: 0
    };
    setTeamMembers([...teamMembers, nuevoMiembro]);
    setShowNewTeamMember(false);
    showToast('Miembro del equipo agregado', 'success');
  };

  const deleteTeamMember = (id: string) => {
    setConfirmDelete({ type: 'teamMember', id, message: '¿Estás seguro de eliminar este miembro del equipo?' });
  };

  const convertirProspecto = (prospecto: any) => {
    const nuevoCliente = {
      id: Date.now().toString(),
      nombre: prospecto.nombre,
      correo: prospecto.correo,
      telefono: prospecto.telefono,
      direccion: '',
      rfc: '',
      fechaAlta: new Date().toISOString(),
      notas: `Convertido de prospecto. Fuente: ${prospecto.fuente}`
    };
    setClientes([...clientes, nuevoCliente]);
    updateProspectoStatus(prospecto.id, 'cliente');
    showToast('Prospecto convertido a cliente', 'success');
  };

  const addCita = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevaCita = {
      id: Date.now().toString(),
      clienteId: formData.get('clienteId'),
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      notas: formData.get('notas'),
      status: 'pendiente'
    };
    setCitas([...citas, nuevaCita]);
    setShowNewCita(false);
  };

  const updateCitaStatus = (citaId: string, status: string) => {
    setCitas(citas.map(c => c.id === citaId ? { ...c, status } : c));
    showToast('Estado de cita actualizado', 'success');
  };

  const deleteCita = (id: string) => {
    setConfirmDelete({ type: 'cita', id, message: '¿Estás seguro de eliminar esta cita?' });
  };

  const exportData = (type: 'clientes' | 'casos' | 'prospectos' | 'citas' | 'all') => {
    let data: any = {};
    let filename = '';
    
    switch(type) {
      case 'clientes':
        data = { clientes };
        filename = 'lexmex_clientes';
        break;
      case 'casos':
        data = { casos, clientes };
        filename = 'lexmex_casos';
        break;
      case 'prospectos':
        data = { prospectos };
        filename = 'lexmex_prospectos';
        break;
      case 'citas':
        data = { citas, clientes };
        filename = 'lexmex_citas';
        break;
      case 'all':
        data = { clientes, casos, prospectos, citas, exportDate: new Date().toISOString() };
        filename = 'lexmex_backup_completo';
        break;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.clientes) setClientes(data.clientes);
        if (data.casos) setCasos(data.casos);
        if (data.prospectos) setProspectos(data.prospectos);
        if (data.citas) setCitas(data.citas);
        alert('Datos importados correctamente');
      } catch {
        alert('Error al importar: formato inválido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.style.setProperty('--bg', newTheme === 'dark' ? '#0D1117' : '#f5f5f5');
    document.documentElement.style.setProperty('--surface', newTheme === 'dark' ? '#161b22' : '#ffffff');
    document.documentElement.style.setProperty('--surface-hover', newTheme === 'dark' ? '#21262d' : '#e6e6e6');
    document.documentElement.style.setProperty('--border', newTheme === 'dark' ? '#30363d' : '#d1d5db');
    document.documentElement.style.setProperty('--text', newTheme === 'dark' ? '#c9d1d9' : '#1f2937');
    document.documentElement.style.setProperty('--muted', newTheme === 'dark' ? '#8b949e' : '#6b7280');
  };

  const performSearch = (query: string) => {
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();
    const results: any[] = [];
    
    clientes.forEach(c => {
      if (c.nombre.toLowerCase().includes(q) || c.correo?.toLowerCase().includes(q)) {
        results.push({ type: 'cliente', item: c, title: c.nombre, subtitle: c.correo });
      }
    });
    
    casos.forEach(c => {
      if (c.titulo.toLowerCase().includes(q) || c.descripcion?.toLowerCase().includes(q)) {
        const cliente = clientes.find(cl => cl.id === c.clienteId);
        results.push({ type: 'caso', item: c, title: c.titulo, subtitle: cliente?.nombre || '' });
      }
    });
    
    prospectos.forEach(p => {
      if (p.nombre.toLowerCase().includes(q) || p.motivo?.toLowerCase().includes(q)) {
        results.push({ type: 'prospecto', item: p, title: p.nombre, subtitle: p.motivo });
      }
    });
    
    setSearchResults(results);
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`);
    setShowEmailModal(false);
    setEmailTo('');
    setEmailSubject('');
    setEmailBody('');
    showToast('Cliente abridor cliente de email', 'info');
  };

  const syncToGoogleCalendar = (cita: any) => {
    const cliente = clientes.find(c => c.id === cita.clienteId);
    const title = encodeURIComponent(cita.titulo);
    const details = encodeURIComponent(cita.notas || '');
    const date = cita.fecha.replace(/-/g, '');
    const time = cita.hora.replace(':', '') + '00';
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}T${time}/${date}T${time}&details=${details}`;
    window.open(calendarUrl, '_blank');
    showToast('Abriendo Google Calendar', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Sesión cerrada', 'info');
  };

  const getPlazosProximos = () => {
    const hoy = new Date();
    const proximos = casos.flatMap(c => 
      (c.plazos || []).filter((p: any) => {
        if (p.estado !== 'pendiente') return false;
        const fecha = new Date(p.fechaLimite);
        const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return dias <= 15 && dias >= 0;
      }).map((p: any) => {
        const fecha = new Date(p.fechaLimite);
        const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return { ...p, casoTitulo: c.titulo, dias };
      })
    );
    return proximos.sort((a: any, b: any) => a.dias - b.dias);
  };

  const getPlazosVencidos = () => {
    const hoy = new Date();
    return casos.flatMap(c => 
      (c.plazos || []).filter((p: any) => {
        if (p.estado !== 'pendiente') return false;
        return new Date(p.fechaLimite) < hoy;
      }).map((p: any) => ({ ...p, casoTitulo: c.titulo }))
    );
  };

  const getCasosByCliente = (clienteId: string) => casos.filter(c => c.clienteId === clienteId);

  const tipoColores: any = {
    audiencia: '#ef4444',
    reunion: '#3b82f6',
    vencimiento: '#f59e0b',
    otro: '#6b7280'
  };

  const statusColors: any = {
    activo: '#22c55e',
    pendiente: '#f59e0b',
    concluso: '#3b82f6',
    cancelado: '#ef4444'
  };

  const materiaLabels: any = {
    civil: 'Civil',
    laboral: 'Laboral',
    mercantil: 'Mercantil',
    familiar: 'Familiar',
    penal: 'Penal',
    constitucional: 'Constitucional',
    administrativo: 'Administrativo',
    otro: 'Otro'
  };

  const handleLogin = () => {
    if (typeof window === 'undefined') return;
    const correctPassword = localStorage.getItem('lexmex_password') || 'lexmex2024';
    if (loginPassword === correctPassword) {
      setIsAuthenticated(true);
      setShowLoginError(false);
    } else {
      setShowLoginError(true);
      showToast('Contraseña incorrecta', 'error');
    }
  };

  const setupPassword = () => {
    if (typeof window === 'undefined') return;
    if (loginPassword.length >= 4) {
      localStorage.setItem('lexmex_password', loginPassword);
      setIsAuthenticated(true);
      showToast('Contraseña configurada', 'success');
    }
  };

  // Skip login screen for now - authentication disabled
  /*
  if (!mounted || hasPassword === null) {
    return (
      <div suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1117' }}>
        <div suppressHydrationWarning style={{ color: '#8B949E' }}>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1117', padding: '20px' }}>
        <div suppressHydrationWarning style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '16px', padding: isMobile ? '24px' : '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px', background: 'linear-gradient(135deg, #C9A227 0%, #A88420 100%)', borderRadius: isMobile ? '15px' : '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '30px' : '40px', margin: '0 auto 24px' }}>
            ⚖️
          </div>
          <h1 suppressHydrationWarning style={{ fontSize: isMobile ? '28px' : '32px', marginBottom: '8px', color: '#C9A227', fontFamily: 'Playfair Display, serif' }}>LexMex</h1>
          <p suppressHydrationWarning style={{ color: '#8B949E', marginBottom: isMobile ? '24px' : '32px', fontSize: isMobile ? '14px' : '16px' }}>Asesor Legal Inteligente</p>
          
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (hasPassword ? handleLogin() : setupPassword())}
            placeholder={hasPassword ? 'Ingresa tu contraseña' : 'Establecer contraseña'}
            style={{ width: '100%', padding: '14px', background: '#0D1117', border: '1px solid #30363D', borderRadius: '8px', color: '#E6EDF3', fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}
          />
          
          <button
            onClick={hasPassword ? handleLogin : setupPassword}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C9A227 0%, #A88420 100%)', color: '#0D1117', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}
          >
            {hasPassword ? '🔓 Entrar' : '⚙️ Configurar'}
          </button>
          
          {showLoginError && (
            <p style={{ color: '#ef4444', marginTop: '12px', fontSize: '14px' }}>Contraseña incorrecta</p>
          )}
          
          <p style={{ color: '#8B949E', marginTop: '24px', fontSize: '12px' }}>
            💡 Contraseña: lexmex2024
          </p>
        </div>
      </div>
    );
  }
  */
 
  // Always show app (auth disabled)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: isMobile ? '90px' : '0' }}>
      <header className="glass" style={{
        borderBottom: '1px solid var(--border)',
        padding: isMobile ? '14px 16px' : '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
            {isMobile && (
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} style={{ padding: '10px', background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', fontSize: '18px' }}>
                ☰
              </button>
            )}
            <div style={{
              width: isMobile ? '42px' : '50px',
              height: isMobile ? '42px' : '50px',
              background: 'linear-gradient(135deg, var(--secondary) 0%, #E8C547 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '22px' : '24px',
              boxShadow: '0 4px 20px rgba(201, 162, 39, 0.4)'
            }}>
              ⚖️
            </div>
            <div>
              <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontFamily: 'Playfair Display, serif', color: 'var(--secondary)', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)}>LexMex</h1>
              {!isMobile && <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1px' }}>Asesor Legal Inteligente</p>}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} title="Cambiar idioma" style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
              {language === 'es' ? '🇪🇸' : '🇺🇸'}
            </button>
            <button onClick={toggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'} style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={loadSampleData} title="Cargar datos de ejemplo" style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
              📊 Demo
            </button>
            <button onClick={() => setShowEmailModal(true)} title="Enviar email" style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
              📧 Email
            </button>
            <button onClick={() => setShowCallModal(true)} title="Llamada de voz" style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
              📞
            </button>
            <button onClick={logout} title="Cerrar sesión" style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
              🚪
            </button>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowExportMenu(!showExportMenu)} style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text)' }}>
                📤 Exportar
              </button>
              {showExportMenu && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px', minWidth: '180px', zIndex: 100 }}>
                  <button onClick={() => exportData('clientes')} style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', fontSize: '13px', borderRadius: '4px' }}>👥 Exportar Clientes</button>
                  <button onClick={() => exportData('casos')} style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', fontSize: '13px', borderRadius: '4px' }}>📁 Exportar Casos</button>
                  <button onClick={() => exportData('prospectos')} style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', fontSize: '13px', borderRadius: '4px' }}>🤝 Exportar Prospectos</button>
                  <button onClick={() => exportData('citas')} style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', fontSize: '13px', borderRadius: '4px' }}>📆 Exportar Citas</button>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
                  <button onClick={() => exportData('all')} style={{ width: '100%', padding: '8px 12px', background: 'var(--secondary)', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#0D1117', fontSize: '13px', borderRadius: '4px', fontWeight: 600 }}>💾 Backup Completo</button>
                  <label style={{ display: 'block', width: '100%', padding: '8px 12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', fontSize: '13px', borderRadius: '4px', marginTop: '4px' }}>
                    📥 Importar Datos
                    <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: isMobile ? '2px' : '4px', background: 'var(--surface)', padding: isMobile ? '4px' : '4px', borderRadius: isMobile ? '8px' : '10px', overflowX: isMobile ? 'auto' : 'visible', justifyContent: isMobile ? 'flex-start' : 'flex-start' }}>
            {[
              { id: 'chat', label: language === 'es' ? 'Chat' : 'Chat', icon: '💬' },
              { id: 'prospectos', label: language === 'es' ? 'Prospectos' : 'Prospects', icon: '🤝' },
              { id: 'citas', label: language === 'es' ? 'Citas' : 'Appts', icon: '📆' },
              { id: 'casos', label: language === 'es' ? 'Casos' : 'Cases', icon: '📁' },
              { id: 'calendario', label: language === 'es' ? 'Calendario' : 'Calendar', icon: '📅' },
              { id: 'equipo', label: language === 'es' ? 'Equipo' : 'Team', icon: '👥' },
              { id: 'tratados', label: language === 'es' ? 'Internac.' : 'Intl.', icon: '🌍' },
              { id: 'reportes', label: language === 'es' ? 'Reportes' : 'Reports', icon: '📊' },
              { id: 'plantillas', label: language === 'es' ? 'Plantillas' : 'Templates', icon: '📄' },
              { id: 'escrituras', label: language === 'es' ? 'Escrituras' : 'Deeds', icon: '📝' },
              { id: 'library', label: language === 'es' ? 'Leyes' : 'Laws', icon: '📜' },
              { id: 'jurisprudencia', label: language === 'es' ? 'Jurisp.' : 'Cases', icon: '⚖️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: isMobile ? '8px 12px' : '12px 20px',
                  background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: activeTab === tab.id ? 'var(--text)' : 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: isMobile ? '11px' : '14px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
          {/* Alertas de plazos */}
          {(getPlazosVencidos().length > 0 || getPlazosProximos().length > 0) && (
            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
              {getPlazosVencidos().length > 0 && (
                <div style={{ padding: '6px 12px', background: '#ef4444', borderRadius: '6px', fontSize: '12px', color: '#fff', cursor: 'pointer' }}
                  onClick={() => setActiveTab('casos')}>
                  ⚠️ {getPlazosVencidos().length} plazo(s) vencido(s)
                </div>
              )}
              {getPlazosProximos().length > 0 && (
                <div style={{ padding: '6px 12px', background: '#f59e0b', borderRadius: '6px', fontSize: '12px', color: '#fff', cursor: 'pointer' }}
                  onClick={() => setActiveTab('casos')}>
                  ⏰ {getPlazosProximos().length} plazo(s) próximo(s)
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Global Search Modal */}
      {showSearch && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '100px', zIndex: 2000 }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '600px', maxHeight: '70vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--secondary)' }}>🔍 Búsqueda Global</h2>
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]); }} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '20px' }}>✕</button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); performSearch(e.target.value); }}
              placeholder="Buscar clientes, casos, prospectos..."
              autoFocus
              style={{ width: '100%', padding: '14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '16px', marginBottom: '16px' }}
            />
            {searchResults.length > 0 ? (
              <div>
                {searchResults.map((r, i) => (
                  <div key={i} onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults([]); if (r.type === 'cliente') { setActiveTab('casos'); } else if (r.type === 'caso') { setActiveTab('casos'); } else if (r.type === 'prospecto') { setActiveTab('prospectos'); } }} style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '16px' }}>{r.type === 'cliente' ? '👤' : r.type === 'caso' ? '📁' : '🤝'}</span>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>{r.title}</p>
                        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{r.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '20px' }}>No se encontraron resultados</p>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '20px' }}>Escribe para buscar en clientes, casos y prospectos</p>
            )}
          </div>
        </div>
      )}

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '24px' }}>
        
        {activeTab === 'prospectos' && (
          <ProspectosView prospectos={prospectos} clientes={clientes} onAdd={addProspecto} onUpdateStatus={updateProspectoStatus} onDelete={deleteProspecto} onConvert={convertirProspecto} onShowNew={() => setShowNewProspecto(true)} />
        )}

        {activeTab === 'citas' && (
          <CitasView citas={citas} clientes={clientes} onAdd={addCita} onUpdateStatus={updateCitaStatus} onDelete={deleteCita} onShowNew={() => setShowNewCita(true)} onSyncCalendar={syncToGoogleCalendar} />
        )}

        {activeTab === 'equipo' && (
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', color: 'var(--secondary)' }}>👥 Equipo de Trabajo</h2>
              <button onClick={() => setShowNewTeamMember(true)} style={{ padding: '10px 20px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
                + Agregar Miembro
              </button>
            </div>

            {showNewTeamMember && (
              <form onSubmit={addTeamMember} style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--secondary)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--secondary)' }}>Agregar miembro del equipo</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <input name="nombre" placeholder="Nombre completo" required style={{ padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="correo" type="email" placeholder="Correo electrónico" required style={{ padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="telefono" placeholder="Teléfono" style={{ padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <select name="rol" required style={{ padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }}>
                    <option value="">Seleccionar rol</option>
                    <option value="abogado">Abogado</option>
                    <option value="asistente">Asistente Legal</option>
                    <option value="secretario">Secretario</option>
                    <option value="paralegal">Paralegal</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <input name="especialidad" placeholder="Especialidad (opcional)" style={{ width: '100%', padding: '10px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={{ padding: '10px 20px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Guardar</button>
                  <button type="button" onClick={() => setShowNewTeamMember(false)} style={{ padding: '10px 20px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                </div>
              </form>
            )}

            {teamMembers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>👥</p>
                <p style={{ fontSize: '18px' }}>No hay miembros en el equipo</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>Agrega miembros para gestionar tu despacho</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {teamMembers.map(miembro => (
                  <div key={miembro.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'var(--secondary)' }}>
                        {miembro.nombre.charAt(0)}
                      </div>
                      <button onClick={() => deleteTeamMember(miembro.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{miembro.nombre}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px', textTransform: 'capitalize' }}>{miembro.rol} {miembro.especialidad && `• ${miembro.especialidad}`}</p>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>📧 {miembro.correo}</p>
                    {miembro.telefono && <p style={{ fontSize: '13px', color: 'var(--muted)' }}>📱 {miembro.telefono}</p>}
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => setShowCallModal(true)} style={{ flex: 1, padding: '8px', background: '#22c55e', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#fff' }}>📞 Llamar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '40px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--secondary)' }}>📊 Resumen del Equipo</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--secondary)' }}>{teamMembers.length}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Total miembros</p>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>{teamMembers.filter(m => m.status === 'activo').length}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Activos</p>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>{teamMembers.filter(m => m.rol === 'abogado').length}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Abogados</p>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>{teamMembers.reduce((sum, m) => sum + m.casosAsignados, 0)}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Casos activos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tratados' && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>🌍 Tratados Internacionales</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <input
                type="search"
                placeholder={language === 'es' ? "Buscar tratados, países, materias..." : "Search treaties, countries, subjects..."}
                style={{ width: '100%', padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '15px' }}
              />
            </div>

            <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ padding: '6px 14px', background: 'var(--primary)', borderRadius: '20px', fontSize: '12px', color: 'var(--text)' }}>Comercio</span>
              <span style={{ padding: '6px 14px', background: 'var(--surface-hover)', borderRadius: '20px', fontSize: '12px', color: 'var(--text)' }}>Propiedad Intelectual</span>
              <span style={{ padding: '6px 14px', background: 'var(--surface-hover)', borderRadius: '20px', fontSize: '12px', color: 'var(--text)' }}>Inversiones</span>
              <span style={{ padding: '6px 14px', background: 'var(--surface-hover)', borderRadius: '20px', fontSize: '12px', color: 'var(--text)' }}>Laboral</span>
              <span style={{ padding: '6px 14px', background: 'var(--surface-hover)', borderRadius: '20px', fontSize: '12px', color: 'var(--text)' }}>Ambiental</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {[...tratadosInternacionales, ...tratadosBilaterales].map(tratado => (
                <div key={tratado.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--secondary)' }}>{tratado.nombre}</h3>
                    <span style={{ fontSize: '10px', padding: '4px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)' }}>{tratado.materia}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '12px' }}>{tratado.nombreEs}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>{tratado.resumen}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {tratado.paises.slice(0, 3).map((pais, i) => (
                        <span key={i} style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--surface-hover)', borderRadius: '4px', color: 'var(--muted)' }}>{pais}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{new Date(tratado.fechaFirma).getFullYear()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--secondary)' }}>📚 Recursos Externos Gratuitos</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                <a href="https://www.diputados.gob.mx/LeyesBiblio/" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  📜 Cámara de Diputados - Leyes
                </a>
                <a href="https://www.senado.gob.mx/" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  🏛️ Senado de la República
                </a>
                <a href="https://www.scjn.gob.mx/" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  ⚖️ SCJN - Suprema Corte
                </a>
                <a href="https://www.dof.gob.mx/" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  📰 DOF - Diario Oficial
                </a>
                <a href="https://www.gob.mx/sat" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  🏦 SAT - Servicio de Administración Tributaria
                </a>
                <a href="https://rppc.pjf.gob.mx/" target="_blank" rel="noopener" style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', display: 'block' }}>
                  📋 RPPC - Registro Público
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div style={{ display: 'flex', gap: '24px', height: isMobile ? 'calc(100vh - 190px)' : 'calc(100vh - 160px)' }}>
            <div style={{ width: isMobile ? '100%' : '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    { icon: "📜", label: "Generar Contrato", action: () => setShowContratoForm(true) },
                    { icon: "💼", label: "Contrato Mercantil", action: () => setInput("Redacta un contrato mercantil de:") },
                    { icon: "⚖️", label: "Jurisprudencia", action: () => setInput("Busca jurisprudencia sobre:") },
                    { icon: "⏱️", label: "Plazos Legales", action: () => setInput("Dime el plazo de prescripción para demanda de:") },
                    { icon: "💰", label: "Liquidación Laboral", action: () => setInput("Calcula la liquidación laboral. Dame: salario diario, antigüedad en años, fecha de ingreso y separación:") },
                    { icon: "👨‍👩‍👧", label: "Pensión Alimenticia", action: () => setInput("Calcula la pensión alimenticia. Dame: ingresos de ambas partes, número de hijos:") },
                    { icon: "📊", label: "ISR e Impuestos", action: () => setInput("Calcula el ISR. Dame: ingresos anuales, tipo de actividad:") },
                    { icon: "💼", label: "Daños y Perjuicios", action: () => setInput("Calcula indemnización por daños. Dame: daño emergente, lucro cesante, daño moral:") },
                    { icon: "✅", label: "Due Diligence", action: () => setShowDueDiligence(true) },
                    { icon: "📖", label: "Glosario Legal", action: () => setInput("Define el término legal:") },
                    { icon: "📋", label: "Guías Procedimentales", action: () => setInput("Dame los pasos para un proceso de:") },
                    { icon: "🔍", label: "Revisión Notarial", action: () => setInput("Revisa este proyecto de escritura y encuentra inconsistencias:") },
                  ].map((action, i) => (
                    <button key={i} onClick={action.action} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontSize: '16px' }}>{action.icon}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text)' }}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Casos Activos en el chat */}
              {casos.length > 0 && (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '13px', color: 'var(--secondary)', marginBottom: '12px' }}>📁 Mis Casos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {casos.slice(0, 8).map((c: any) => {
                      const cliente = clientes.find(cl => cl.id === c.clienteId);
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
              {/* Caso activo mostrado en el chat */}
              {selectedCaso && (
                <div style={{ marginBottom: '12px', padding: '12px', background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%)', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>📁 CASO ACTIVO</p>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{selectedCaso.titulo}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>{clientes.find(c => c.id === selectedCaso.clienteId)?.nombre} • {selectedCaso.materia}</p>
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
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    animation: 'fadeIn 0.3s ease',
                    gap: '8px'
                  }}>
                    <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`} style={{
                      maxWidth: msg.role === 'user' ? '80%' : '75%',
                      padding: msg.role === 'user' ? '14px 18px' : '16px 20px',
                      fontSize: '15px',
                      flex: 1
                    }}>
                      {msg.content}
                    </div>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch('/api/word', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                type: 'contrato-texto',
                                data: { contenido: msg.content }
                              })
                            });
                            const result = await response.json();
                            if (result.success) {
                              const link = document.createElement('a');
                              link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${result.document}`;
                              link.download = `documento_${new Date().toISOString().split('T')[0]}.docx`;
                              link.click();
                              showToast('Documento Word descargado', 'success');
                            }
                          } catch (e) {
                            showToast('Error al descargar', 'error');
                          }
                        }}
                        title="Descargar en Word"
                        style={{
                          padding: '8px',
                          background: 'var(--surface-hover)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          alignSelf: 'center'
                        }}
                      >
                        📄
                      </button>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ padding: '16px 20px', borderRadius: '18px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
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
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '12px',
                    background: selectedImage ? 'var(--accent)' : 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                  title="Subir imagen"
                >
                  📷
                </button>
                {selectedImage && (
                  <div style={{ position: 'relative' }}>
                    <img src={selectedImage} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                    <button
                      onClick={() => { setSelectedImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      style={{
                        position: 'absolute', top: -8, right: -8,
                        background: 'red', color: 'white', border: 'none',
                        borderRadius: '50%', width: '20px', height: '20px',
                        cursor: 'pointer', fontSize: '12px'
                      }}
                    >×</button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <button
                  onClick={toggleVoiceInput}
                  title={isRecording ? 'Detener grabación' : 'Grabar voz'}
                  style={{
                    padding: '12px',
                    background: isRecording ? '#ef4444' : 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {isRecording ? '⏹️' : '🎤'}
                </button>
                <button
                  onClick={() => setUseWebSearch(!useWebSearch)}
                  title={useWebSearch ? 'Desactivar búsqueda web' : 'Activar búsqueda web'}
                  style={{
                    padding: '12px',
                    background: useWebSearch ? '#22c55e' : 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  🌐
                </button>
                <button
                  onClick={() => document.getElementById('ocr-upload')?.click()}
                  title="Escanear documento (OCR)"
                  style={{
                    padding: '12px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  📷
                </button>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  id="ocr-upload"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setShowOcr(true);
                      const reader = new FileReader();
                      reader.onload = async () => {
                        try {
                          const formData = new FormData();
                          formData.append('image', reader.result as string);
                          const res = await fetch('/api/ocr', { method: 'POST', body: formData });
                          const data = await res.json();
                          if (data.success) {
                            setOcrResult(data);
                          }
                        } catch (err) {
                          console.error('OCR error:', err);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => setShowContractAnalysis(true)}
                  title="Analizar contrato"
                  style={{
                    padding: '12px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  📝
                </button>
                <input
                  type="text"
                  value={input || ''}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder={isRecording ? 'Escuchando...' : 'Escribe tu pregunta...'}
                  style={{ 
                    flex: 1, 
                    background: 'var(--surface-elevated)', 
                    border: '1px solid var(--border)', 
                    minHeight: '48px',
                    borderRadius: '24px',
                    padding: '12px 20px'
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || (!((input || '').trim()) && !selectedImage)}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: isLoading ? 'var(--muted)' : 'linear-gradient(135deg, var(--secondary) 0%, #A88420 100%)',
                    color: '#0D1117',
                    border: 'none',
                    borderRadius: '50%',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isLoading ? 'none' : '0 4px 15px rgba(201, 162, 39, 0.4)'
                  }}
                >
                  {isLoading ? '...' : '➤'}
                </button>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', background: 'var(--surface)', padding: '6px 12px', borderRadius: '20px' }}>
                  💡 Voz • 🌐 Web • 📷 OCR • 📝 Análisis
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedArticulo ? '1fr 1fr' : '1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>📜 Biblioteca de Leyes</h2>
                <input
                  type="search"
                  value={searchTerm || ''}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar en leyes..."
                  style={{ marginBottom: '12px' }}
                />
                <select
                  value={materiaFilter || ''}
                  onChange={(e) => setMateriaFilter(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                >
                  <option value="">Todas las materias</option>
                  {materias.map(m => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredLeyes.map(ley => (
                  <div key={ley.id} onClick={() => { setSelectedLey(ley); setSelectedArticulo(null); }} style={{
                    padding: '16px', background: selectedLey?.id === ley.id ? 'var(--surface-hover)' : 'var(--surface)',
                    border: '1px solid', borderColor: selectedLey?.id === ley.id ? 'var(--secondary)' : 'var(--border)',
                    borderRadius: '8px', marginBottom: '12px', cursor: 'pointer'
                  }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '4px', color: 'var(--secondary)' }}>{ley.abreviatura}</h3>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{ley.titulo}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{ley.materia} • {ley.articulos.length} artículos</p>
                  </div>
                ))}
              </div>
            </div>
            {selectedLey && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', maxHeight: '200px', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--secondary)' }}>Artículos de {selectedLey.abreviatura}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedLey.articulos.map(art => (
                      <button key={art.numero} onClick={() => setSelectedArticulo(art)} style={{
                        padding: '6px 12px', fontSize: '12px',
                        background: selectedArticulo?.numero === art.numero ? 'var(--primary)' : 'var(--surface-hover)',
                        border: '1px solid', borderColor: selectedArticulo?.numero === art.numero ? 'var(--secondary)' : 'var(--border)',
                        borderRadius: '6px', color: 'var(--text)', cursor: 'pointer'
                      }}>Art. {art.numero}</button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  {selectedArticulo ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>Artículo {selectedArticulo.numero}</h2>
                      </div>
                      <div style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'Source Sans Pro, sans-serif', fontSize: '15px' }}>
                        {selectedArticulo.contenido}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Selecciona un artículo</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'jurisprudencia' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedJurisprudencia ? '1fr 1fr' : '1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--secondary)' }}>⚖️ Jurisprudencias y Tesis</h2>
                <input type="search" value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar jurisprudencias..." style={{ marginBottom: '12px' }} />
                <select value={materiaFilter || ''} onChange={(e) => setMateriaFilter(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                  <option value="">Todas las materias</option>
                  {materias.map(m => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredJurisprudencias.map(jur => (
                  <div key={jur.id} onClick={() => setSelectedJurisprudencia(jur)} style={{ padding: '16px', background: selectedJurisprudencia?.id === jur.id ? 'var(--surface-hover)' : 'var(--surface)', border: '1px solid', borderColor: selectedJurisprudencia?.id === jur.id ? 'var(--secondary)' : 'var(--border)', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '10px', padding: '3px 8px', background: jur.tipo === 'JR' ? 'var(--accent)' : 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{jur.tipo}</span>
                    <h3 style={{ fontSize: '14px', marginTop: '8px', marginBottom: '4px' }}>{jur.titulo}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{jur.materia}</p>
                  </div>
                ))}
              </div>
            </div>
            {selectedJurisprudencia && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--secondary)' }}>{selectedJurisprudencia.titulo}</h2>
                <div style={{ marginBottom: '16px' }}><h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>TESIS</h4><div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', borderLeft: '3px solid var(--secondary)', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>{selectedJurisprudencia.tesis}</div></div>
                <div><h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>PRECEDENTE</h4><p style={{ fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}>{selectedJurisprudencia.precedente}</p></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'casos' && (
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', height: 'calc(100vh - 160px)' }}>
            {/* Lista de clientes */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📁 Clientes</h2>
                <button
                  onClick={() => setShowNewCliente(true)}
                  style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                >
                  + Nuevo Cliente
                </button>
              </div>
              
              {showNewCliente && (
                <form onSubmit={addCliente} style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border)' }}>
                  <input name="nombre" placeholder="Nombre del cliente" required style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="correo" placeholder="Correo electrónico" type="email" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="telefono" placeholder="Teléfono" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="direccion" placeholder="Dirección" style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <input name="rfc" placeholder="RFC (opcional)" style={{ width: '100%', padding: '10px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ flex: 1, padding: '10px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Guardar</button>
                    <button type="button" onClick={() => setShowNewCliente(false)} style={{ flex: 1, padding: '10px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                  </div>
                </form>
              )}
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {clientes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No hay clientes registrados</div>
                ) : (
                  clientes.map(cliente => (
                    <div key={cliente.id} onClick={() => { setSelectedCliente(cliente); setSelectedCaso(null); }} style={{
                      padding: '16px', background: selectedCliente?.id === cliente.id ? 'var(--surface-hover)' : 'var(--surface)',
                      border: '1px solid', borderColor: selectedCliente?.id === cliente.id ? 'var(--secondary)' : 'var(--border)',
                      borderRadius: '8px', marginBottom: '8px', cursor: 'pointer'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{cliente.nombre}</h3>
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{cliente.correo || 'Sin correo'}</p>
                          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{getCasosByCliente(cliente.id).length} caso(s)</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteCliente(cliente.id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Detalles del caso */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {selectedCliente ? (
                <>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>Casos de {selectedCliente.nombre}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{selectedCliente.telefono} • {selectedCliente.correo}</p>
                        {selectedCliente.telefono && (
                          <button
                            onClick={() => {
                              const phone = selectedCliente.telefono.replace(/\D/g, '');
                              window.open(`https://wa.me/52${phone}`, '_blank');
                            }}
                            title="Contactar por WhatsApp"
                            style={{ padding: '4px 8px', background: '#22c55e', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#fff' }}
                          >
                            💬 WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNewCaso(true)}
                      style={{ padding: '8px 16px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                    >
                      + Nuevo Caso
                    </button>
                  </div>

                  {showNewCaso && (
                    <form onSubmit={addCaso} style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border)' }}>
                      <input name="titulo" placeholder="Título del caso" required style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                      <select name="materia" required style={{ width: '100%', padding: '10px', marginBottom: '8px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }}>
                        <option value="">Selecciona materia</option>
                        <option value="civil">Civil</option>
                        <option value="laboral">Laboral</option>
                        <option value="mercantil">Mercantil</option>
                        <option value="familiar">Familiar</option>
                        <option value="penal">Penal</option>
                        <option value="constitucional">Constitucional</option>
                        <option value="administrativo">Administrativo</option>
                      </select>
                      <textarea name="descripcion" placeholder="Descripción del caso" rows={3} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="submit" style={{ flex: 1, padding: '10px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Crear Caso</button>
                        <button type="button" onClick={() => setShowNewCaso(false)} style={{ flex: 1, padding: '10px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                      </div>
                    </form>
                  )}

                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {getCasosByCliente(selectedCliente.id).length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No hay casos para este cliente</div>
                    ) : (
                      getCasosByCliente(selectedCliente.id).map(caso => (
                        <div key={caso.id} onClick={() => setSelectedCaso(caso)} style={{
                          padding: '16px', background: selectedCaso?.id === caso.id ? 'var(--surface-hover)' : 'var(--surface)',
                          border: '1px solid', borderColor: selectedCaso?.id === caso.id ? 'var(--secondary)' : 'var(--border)',
                          borderRadius: '8px', marginBottom: '8px', cursor: 'pointer'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                              <span style={{ fontSize: '10px', padding: '3px 8px', background: statusColors[caso.status], borderRadius: '4px', color: '#fff', marginRight: '8px' }}>{caso.status}</span>
                              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{materiaLabels[caso.materia]}</span>
                              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>{caso.titulo}</h3>
                              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{caso.descripcion}</p>
                              <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Abierto: {new Date(caso.fechaApertura).toLocaleDateString('es-MX')}</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); deleteCaso(caso.id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Detalle del caso seleccionado */}
                  {selectedCaso && (
                    <div style={{ marginTop: '24px', padding: '20px', background: 'var(--surface)', border: '1px solid var(--secondary)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '18px', color: 'var(--secondary)' }}>{selectedCaso.titulo}</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={async () => {
                            const cliente = clientes.find(c => c.id === selectedCaso.clienteId);
                            try {
                              const res = await fetch('/api/word', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  type: 'expediente',
                                  data: {
                                    expediente: selectedCaso.id,
                                    cliente: cliente?.nombre || 'N/A',
                                    caso: selectedCaso.titulo,
                                    materia: selectedCaso.materia,
                                    status: selectedCaso.status,
                                    fechaApertura: new Date(selectedCaso.fechaApertura).toLocaleDateString('es-MX'),
                                    documentos: (selectedCaso.documentos || []).map((d: any) => d.nombre).join(', ') || 'Sin documentos'
                                  }
                                })
                              });
                              const data = await res.json();
                              if (data.success) {
                                const link = document.createElement('a');
                                link.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + data.document;
                                link.download = data.filename;
                                link.click();
                                showToast('Expediente exportado a Word', 'success');
                              }
                            } catch (err) {
                              showToast('Error al exportar', 'error');
                            }
                          }} title="Exportar a Word" style={{ padding: '6px 10px', background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>📄</button>
                          <button onClick={() => setSelectedCaso(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '20px' }}>✕</button>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '10px', padding: '4px 8px', background: statusColors[selectedCaso.status], borderRadius: '4px', color: '#fff', marginRight: '8px' }}>{selectedCaso.status}</span>
                        <span style={{ fontSize: '10px', padding: '4px 8px', background: 'var(--primary)', borderRadius: '4px', color: 'var(--text)', marginRight: '8px' }}>{materiaLabels[selectedCaso.materia]}</span>
                      </div>
                      
                      <p style={{ fontSize: '14px', marginBottom: '16px' }}>{selectedCaso.descripcion}</p>
                      
                      {/* Plazos */}
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '14px', color: 'var(--secondary)' }}>⏱️ Plazos</h4>
                          <button onClick={() => setShowNewPlazo(true)} style={{ padding: '6px 12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>+ Agregar Plazo</button>
                        </div>
                        
                        {showNewPlazo && (
                          <form onSubmit={addPlazo} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <input name="descripcion" placeholder="Descripción del plazo" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <input name="fechaLimite" type="date" required style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Guardar</button>
                              <button type="button" onClick={() => setShowNewPlazo(false)} style={{ flex: 1, padding: '8px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                            </div>
                          </form>
                        )}
                        
                        {(selectedCaso.plazos || []).length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay plazos registrados</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(selectedCaso.plazos || []).map((plazo: any) => {
                              const hoy = new Date();
                              const fecha = new Date(plazo.fechaLimite);
                              const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
                              const vencido = plazo.estado === 'pendiente' && fecha < hoy;
                              return (
                                <div key={plazo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: vencido ? '#fef2f2' : 'var(--bg)', borderRadius: '6px', border: '1px solid', borderColor: vencido ? '#ef4444' : 'var(--border)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" checked={plazo.estado === 'cumplido'} onChange={() => togglePlazo(plazo.id)} />
                                    <div>
                                      <p style={{ fontSize: '13px', textDecoration: plazo.estado === 'cumplido' ? 'line-through' : 'none', color: plazo.estado === 'cumplido' ? 'var(--muted)' : 'var(--text)' }}>{plazo.descripcion}</p>
                                      <p style={{ fontSize: '11px', color: vencido ? '#ef4444' : 'var(--muted)' }}>
                                        {vencido ? '⚠️ Vencido' : `${dias} día(s) remaining`} - {new Date(plazo.fechaLimite).toLocaleDateString('es-MX')}
                                      </p>
                                    </div>
                                  </div>
                                  <button onClick={() => deletePlazo(plazo.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Eventos */}
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '14px', color: 'var(--secondary)' }}>📅 Eventos</h4>
                          <button onClick={() => setShowNewEvento(true)} style={{ padding: '6px 12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>+ Agregar Evento</button>
                        </div>
                        
                        {showNewEvento && (
                          <form onSubmit={addEvento} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <input name="titulo" placeholder="Título del evento" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                              <input name="fecha" type="date" required style={{ padding: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                              <input name="hora" type="time" required style={{ padding: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            </div>
                            <select name="tipo" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }}>
                              <option value="audiencia">Audiencia</option>
                              <option value="reunion">Reunión</option>
                              <option value="vencimiento">Vencimiento</option>
                              <option value="otro">Otro</option>
                            </select>
                            <input name="lugar" placeholder="Lugar (opcional)" style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <textarea name="descripcion" placeholder="Descripción" rows={2} style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Guardar</button>
                              <button type="button" onClick={() => setShowNewEvento(false)} style={{ flex: 1, padding: '8px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                            </div>
                          </form>
                        )}
                        
                        {(selectedCaso.eventos || []).length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay eventos programados</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(selectedCaso.eventos || []).map((evento: any) => (
                              <div key={evento.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg)', borderRadius: '6px', borderLeft: `3px solid ${tipoColores[evento.tipo]}` }}>
                                <div>
                                  <p style={{ fontSize: '13px', fontWeight: 600 }}>{evento.titulo}</p>
                                  <p style={{ fontSize: '11px', color: 'var(--muted)' }}>
                                    📅 {new Date(evento.fecha).toLocaleDateString('es-MX')} a las {evento.hora} - {evento.tipo}
                                  </p>
                                  {evento.lugar && <p style={{ fontSize: '11px', color: 'var(--secondary)' }}>📍 {evento.lugar}</p>}
                                </div>
                                <button onClick={() => deleteEvento(evento.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Documentos */}
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '14px', color: 'var(--secondary)' }}>📄 Documentos</h4>
                          <button onClick={() => setShowNewDocumento(true)} style={{ padding: '6px 12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>+ Agregar Documento</button>
                        </div>
                        
                        {showNewDocumento && (
                          <form onSubmit={addDocumento} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <input name="nombre" placeholder="Nombre del documento" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <select name="tipo" required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }}>
                              <option value="demanda">Demanda</option>
                              <option value="contestacion">Contestación</option>
                              <option value="escritura">Escritura</option>
                              <option value="contrato">Contrato</option>
                              <option value="sentencia">Sentencia</option>
                              <option value="otro">Otro</option>
                            </select>
                            <textarea name="notas" placeholder="Notas" rows={2} style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Guardar</button>
                              <button type="button" onClick={() => setShowNewDocumento(false)} style={{ flex: 1, padding: '8px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                            </div>
                          </form>
                        )}
                        
                        {(selectedCaso.documentos || []).length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay documentos</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(selectedCaso.documentos || []).map((doc: any) => (
                              <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg)', borderRadius: '6px' }}>
                                <div>
                                  <p style={{ fontSize: '13px', fontWeight: 600 }}>{doc.nombre}</p>
                                  <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{doc.tipo} - {new Date(doc.fecha).toLocaleDateString('es-MX')}</p>
                                  {doc.notas && <p style={{ fontSize: '11px', color: 'var(--secondary)', marginTop: '4px' }}>{doc.notas}</p>}
                                </div>
                                <button onClick={() => deleteDocumento(doc.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Consultas/Historial */}
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '14px', color: 'var(--secondary)' }}>💬 Historial de Consultas</h4>
                          <button onClick={() => setShowNewConsulta(true)} style={{ padding: '6px 12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>+ Nueva Consulta</button>
                        </div>
                        
                        {showNewConsulta && (
                          <form onSubmit={addConsulta} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <textarea name="pregunta" placeholder="Pregunta realizada" rows={2} required style={{ width: '100%', padding: '8px', marginBottom: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <textarea name="respuesta" placeholder="Respuesta (opcional)" rows={2} style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Guardar</button>
                              <button type="button" onClick={() => setShowNewConsulta(false)} style={{ flex: 1, padding: '8px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                            </div>
                          </form>
                        )}
                        
                        {(selectedCaso.consultas || []).length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay consultas</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(selectedCaso.consultas || []).map((cons: any) => (
                              <div key={cons.id} style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px' }}>
                                <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>{new Date(cons.fecha).toLocaleDateString('es-MX')}</p>
                                <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>P: {cons.pregunta}</p>
                                {cons.respuesta && <p style={{ fontSize: '12px', color: 'var(--secondary)', fontStyle: 'italic' }}>R: {cons.respuesta}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Facturación */}
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '14px', color: 'var(--secondary)' }}>💰 Facturación</h4>
                          <button onClick={() => setShowNewFactura(true)} style={{ padding: '6px 12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>+ Nueva Factura</button>
                        </div>
                        
                        {showNewFactura && (
                          <form onSubmit={addFactura} style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                              <input name="numero" placeholder="Número de factura" required style={{ padding: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                              <input name="total" type="number" placeholder="Monto" required style={{ padding: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            </div>
                            <input name="concepto" placeholder="Concepto" required style={{ width: '100%', padding: '8px', marginBottom: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Guardar</button>
                              <button type="button" onClick={() => setShowNewFactura(false)} style={{ flex: 1, padding: '8px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancelar</button>
                            </div>
                          </form>
                        )}
                        
                        {(selectedCaso.facturas || []).length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>No hay facturas</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(selectedCaso.facturas || []).map((fact: any) => (
                              <div key={fact.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg)', borderRadius: '6px', borderLeft: `3px solid ${fact.status === 'pagada' ? '#22c55e' : fact.status === 'pendiente' ? '#f59e0b' : '#ef4444'}` }}>
                                <div>
                                  <p style={{ fontSize: '13px', fontWeight: 600 }}>{fact.numero}</p>
                                  <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{fact.concepto} - ${fact.total.toLocaleString('es-MX')}</p>
                                  <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{new Date(fact.fecha).toLocaleDateString('es-MX')}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                  <select value={fact.status} onChange={(e) => updateFacturaStatus(fact.id, e.target.value)} style={{ padding: '6px', fontSize: '11px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text)' }}>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="pagada">Pagada</option>
                                    <option value="vencida">Vencida</option>
                                  </select>
                                  <button onClick={() => deleteFactura(fact.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <p>Selecciona un cliente para ver sus casos</p>
                  <p style={{ fontSize: '12px', marginTop: '8px' }}>O crea uno nuevo con el botón de arriba</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'plantillas' && (
          <PlantillasView />
        )}

        {activeTab === 'calendario' && (
          <CalendarioView casos={casos} />
        )}

        {activeTab === 'reportes' && (
          <ReportesView casos={casos} clientes={clientes} />
        )}

        {activeTab === 'escrituras' && (
          <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 160px)' }}>
            <div style={{ width: '280px', flexShrink: 0 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Servicios Notariales</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {notaryCapabilities.map((cap, i) => (
                    <div key={i} style={{ padding: '14px', background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}
                    onClick={() => { const prompts = ["Revisa el siguiente proyecto de escritura:", "Due Diligence comprador - Dame datos:", "Due Diligence vendedor - Dame datos:", "Redacta escritura de:"]; setInput(prompts[i]); setActiveTab('chat'); }}>
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
                <input type="search" value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar tipo de escritura..." style={{ marginBottom: '12px' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categoriasEscrituras.map(cat => (
                    <button key={cat} onClick={() => setMateriaFilter(materiaFilter === cat ? '' : cat)} style={{ padding: '8px 16px', fontSize: '12px', background: materiaFilter === cat ? 'var(--secondary)' : 'var(--surface)', color: materiaFilter === cat ? '#0D1117' : 'var(--text)', border: '1px solid', borderColor: materiaFilter === cat ? 'var(--secondary)' : 'var(--border)', borderRadius: '20px', cursor: 'pointer' }}>{cat}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredPlantillas.map(plantilla => (
                  <div key={plantilla.id} onClick={() => setSelectedPlantilla(plantilla)} style={{ padding: '16px', background: selectedPlantilla?.id === plantilla.id ? 'var(--surface-hover)' : 'var(--surface)', border: '1px solid', borderColor: selectedPlantilla?.id === plantilla.id ? 'var(--secondary)' : 'var(--border)', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }}>
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
                <div style={{ marginBottom: '20px' }}><h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>DESCRIPCIÓN</h4><p style={{ fontSize: '14px', lineHeight: 1.6 }}>{selectedPlantilla.descripcion}</p></div>
                <div style={{ marginBottom: '20px' }}><h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>REQUISITOS</h4><ul style={{ fontSize: '13px', paddingLeft: '16px', lineHeight: 1.8 }}>{selectedPlantilla.requisitos.map((req, i) => (<li key={i} style={{ marginBottom: '4px' }}>{req}</li>))}</ul></div>
                <button onClick={() => { setInput(`Redacta una escritura pública de ${selectedPlantilla.titulo}. Dame los datos necesarios.`); setActiveTab('chat'); }} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, var(--secondary) 0%, #A88420 100%)', color: '#0D1117', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>✍️ Redactar Esta Escritura</button>
              </div>
            )}
          </div>
        )}

        {/* Modal Nuevo Prospecto */}
        {showNewProspecto && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '450px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--secondary)' }}>🤝 Nuevo Prospecto</h2>
              <form onSubmit={(e) => { addProspecto(e); setShowNewProspecto(false); }}>
                <input name="nombre" placeholder="Nombre completo" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <input name="correo" placeholder="Correo electrónico" type="email" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <input name="telefono" placeholder="Teléfono" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <input name="motivo" placeholder="Motivo de consulta" style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <select name="fuente" required style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                  <option value="">Selecciona fuente</option>
                  <option value="referencia">Referencia</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="otro">Otro</option>
                </select>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Guardar</button>
                  <button type="button" onClick={() => setShowNewProspecto(false)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Nueva Cita */}
        {showNewCita && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '450px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--secondary)' }}>📆 Nueva Cita</h2>
              <form onSubmit={(e) => { addCita(e); setShowNewCita(false); }}>
                <select name="clienteId" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                  <option value="">Selecciona cliente</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <input name="titulo" placeholder="Título de la cita" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <input name="fecha" type="date" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                  <input name="hora" type="time" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                </div>
                <select name="tipo" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                  <option value="consulta">Consulta</option>
                  <option value="seguimiento">Seguimiento</option>
                  <option value="audiencia">Audiencia</option>
                  <option value="otra">Otra</option>
                </select>
                <textarea name="notas" placeholder="Notas adicionales" rows={3} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Guardar</button>
                  <button type="button" onClick={() => setShowNewCita(false)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Enviar Email */}
        {showEmailModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '500px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--secondary)' }}>📧 Enviar Email</h2>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="Para: correo@ejemplo.com"
                style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
              />
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Asunto"
                style={{ width: '100%', padding: '12px', marginBottom: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
              />
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Mensaje..."
                rows={6}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={sendEmail} style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>📤 Enviar</button>
                <button onClick={() => setShowEmailModal(false)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Due Diligence Modal */}
      {showDueDiligence && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px' }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>✅ Due Diligence - Verificación</h2>
              <button onClick={() => { setShowDueDiligence(false); setDueDiligenceResult(null); }} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            {!dueDiligenceResult ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>Tipo de verificación:</label>
                  <select value={ddForm.tipo} onChange={(e) => setDdForm({ ...ddForm, tipo: e.target.value })} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                    <option value="persona-moral">Persona Moral (Empresa)</option>
                    <option value="persona-fisica">Persona Física</option>
                    <option value="propiedad">Propiedad Inmueble</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>RFC:</label>
                  <input value={ddForm.rfc} onChange={(e) => setDdForm({ ...ddForm, rfc: e.target.value })} placeholder="AAAA000000XXX" style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', textTransform: 'uppercase' }} />
                </div>
                {ddForm.tipo === 'persona-fisica' && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>CURP (opcional):</label>
                    <input value={ddForm.curp} onChange={(e) => setDdForm({ ...ddForm, curp: e.target.value })} placeholder="AAAA000000HDFXXX00" style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', textTransform: 'uppercase' }} />
                  </div>
                )}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>{ddForm.tipo === 'propiedad' ? 'Dirección de la propiedad:' : 'Nombre / Razón Social:'}</label>
                  <input value={ddForm.nombre} onChange={(e) => setDdForm({ ...ddForm, nombre: e.target.value })} placeholder={ddForm.tipo === 'propiedad' ? 'Dirección completa' : 'Nombre o razón social'} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                </div>
                <button onClick={async () => {
                  if (!ddForm.rfc || !ddForm.nombre) {
                    showToast('Completa los campos requeridos', 'error');
                    return;
                  }
                  setIsCheckingDD(true);
                  try {
                    const res = await fetch('/api/registry', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ type: 'due-diligence', rfc: ddForm.rfc, curp: ddForm.curp, nombre: ddForm.nombre })
                    });
                    const data = await res.json();
                    setDueDiligenceResult(data);
                  } catch (err) {
                    showToast('Error al realizar verificación', 'error');
                  } finally {
                    setIsCheckingDD(false);
                  }
                }} disabled={isCheckingDD} style={{ width: '100%', padding: '14px', background: isCheckingDD ? 'var(--muted)' : 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: isCheckingDD ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 600 }}>
                  {isCheckingDD ? 'Verificando...' : '🔍 Realizar Verificación'}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px', textAlign: 'center' }}>
                  * Verifica RFC, SAT, RPPC e INE (simulado)
                </p>
              </>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '20px', background: dueDiligenceResult.score >= 70 ? 'rgba(34,197,94,0.1)' : dueDiligenceResult.score >= 40 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '48px' }}>{dueDiligenceResult.score >= 70 ? '✅' : dueDiligenceResult.score >= 40 ? '⚠️' : '❌'}</span>
                  <div>
                    <h3 style={{ fontSize: '22px', color: dueDiligenceResult.score >= 70 ? '#22c55e' : dueDiligenceResult.score >= 40 ? '#f59e0b' : '#ef4444' }}>
                      {dueDiligenceResult.resultado}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Score: {dueDiligenceResult.score}/100 • Riesgo: {dueDiligenceResult.nivelRiesgo}</p>
                  </div>
                </div>

                {dueDiligenceResult.riesgos?.length > 0 && (
                  <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#ef4444', marginBottom: '8px' }}>⚠️ Riesgos identificados:</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                      {dueDiligenceResult.riesgos.map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {dueDiligenceResult.detalles?.fiscal && (
                  <div style={{ marginBottom: '12px', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>📋 RFC</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Estatus: {dueDiligenceResult.detalles.fiscal.estatus}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Régimen: {dueDiligenceResult.detalles.fiscal.regimen}</p>
                  </div>
                )}

                {dueDiligenceResult.detalles?.sat && (
                  <div style={{ marginBottom: '12px', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>🏛️ SAT</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Situación: {dueDiligenceResult.detalles.sat.situacionFiscal}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Cumplimiento: {dueDiligenceResult.detalles.sat.OpinionCumplimiento}</p>
                  </div>
                )}

                {dueDiligenceResult.detalles?.mercantil && (
                  <div style={{ marginBottom: '12px', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>📜 RPPC</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Status: {dueDiligenceResult.detalles.mercantil.status}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text)' }}>Escritura: {dueDiligenceResult.detalles.mercantil.numeroEscritura}</p>
                  </div>
                )}

                {dueDiligenceResult.recomendaciones && (
                  <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#3b82f6', marginBottom: '8px' }}>💡 Recomendaciones:</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                      {dueDiligenceResult.recomendaciones.map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setDueDiligenceResult(null)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Nueva verificación</button>
                  <button onClick={() => { setShowDueDiligence(false); setDueDiligenceResult(null); }} style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generador de Contratos Modal */}
      {showContratoForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px' }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📜 Generador de Contratos</h2>
              <button onClick={() => { setShowContratoForm(false); setContratoGenerado(''); }} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            {!contratoGenerado ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>Tipo de contrato:</label>
                  <select value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                    <option value="arrendamiento">Contrato de Arrendamiento</option>
                    <option value="comodato">Contrato de Comodato</option>
                    <option value="mutuo">Contrato de Mutuo</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Nombre del Arrendador:*</label>
                    <input value={contratoDatos.nombreArrendador} onChange={(e) => setContratoDatos({...contratoDatos, nombreArrendador: e.target.value})} placeholder="Juan Pérez García" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>RFC Arrendador:</label>
                    <input value={contratoDatos.rfcArrendador} onChange={(e) => setContratoDatos({...contratoDatos, rfcArrendador: e.target.value})} placeholder="PEGJ800101ABC" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px', textTransform: 'uppercase' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Nombre del Arrendatario:*</label>
                  <input value={contratoDatos.nombreArrendatario} onChange={(e) => setContratoDatos({...contratoDatos, nombreArrendatario: e.target.value})} placeholder="María López Hernández" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Dirección del Inmueble:*</label>
                  <input value={contratoDatos.direccionInmueble} onChange={(e) => setContratoDatos({...contratoDatos, direccionInmueble: e.target.value})} placeholder="Calle, Número, Colonia, Ciudad, Estado, CP" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Renta Mensual:*</label>
                    <input value={contratoDatos.rentaMensual} onChange={(e) => setContratoDatos({...contratoDatos, rentaMensual: e.target.value})} placeholder="$15,000" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Fecha de Inicio:*</label>
                    <input type="date" value={contratoDatos.fechaInicio} onChange={(e) => setContratoDatos({...contratoDatos, fechaInicio: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Duración:*</label>
                    <select value={contratoDatos.duracion} onChange={(e) => setContratoDatos({...contratoDatos, duracion: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }}>
                      <option value="">Seleccionar</option>
                      <option value="6 meses">6 meses</option>
                      <option value="1 año">1 año</option>
                      <option value="2 años">2 años</option>
                      <option value="3 años">3 años</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Depósito Garantía:</label>
                    <input value={contratoDatos.depositoGarantia} onChange={(e) => setContratoDatos({...contratoDatos, depositoGarantia: e.target.value})} placeholder="$30,000" style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text)' }}>Día de Pago:</label>
                    <select value={contratoDatos.diaPago} onChange={(e) => setContratoDatos({...contratoDatos, diaPago: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }}>
                      {[...Array(28)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                  </div>
                </div>

                <button onClick={async () => {
                  if (!contratoDatos.nombreArrendador || !contratoDatos.nombreArrendatario || !contratoDatos.direccionInmueble || !contratoDatos.rentaMensual || !contratoDatos.fechaInicio || !contratoDatos.duracion) {
                    showToast('Completa los campos obligatorios (*)', 'error');
                    return;
                  }
                  setIsGenerandoContrato(true);
                  try {
                    const res = await fetch('/api/contratos', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ tipo: tipoContrato, datos: {
                        NOMBRE_ARRENDADOR: contratoDatos.nombreArrendador,
                        RFC_ARRENDADOR: contratoDatos.rfcArrendador || 'No especificado',
                        NOMBRE_ARRENDATARIO: contratoDatos.nombreArrendatario,
                        DIRECCION_INMUEBLE: contratoDatos.direccionInmueble,
                        MONTO: contratoDatos.rentaMensual,
                        FECHA: contratoDatos.fechaInicio,
                        PLAZO: contratoDatos.duracion,
                        DEPOSITO: contratoDatos.depositoGarantia || 'No especificado',
                        DIA_PAGO: contratoDatos.diaPago
                      }})
                    });
                    const data = await res.json();
                    if (data.success) {
                      setContratoGenerado(data.contenido);
                    } else {
                      showToast('Error al generar contrato', 'error');
                    }
                  } catch (err) {
                    showToast('Error al generar contrato', 'error');
                  } finally {
                    setIsGenerandoContrato(false);
                  }
                }} disabled={isGenerandoContrato} style={{ width: '100%', padding: '14px', background: isGenerandoContrato ? 'var(--muted)' : 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: isGenerandoContrato ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 600 }}>
                  {isGenerandoContrato ? 'Generando...' : '📜 Generar Contrato'}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px', textAlign: 'center' }}>
                  * Este contrato cumple con los lineamientos de PROFECO
                </p>
              </>
            ) : (
              <div>
                <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text)' }}>✅ Contrato generado correctamente. Puedes copiarlo o descargarlo en Word.</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <textarea value={contratoGenerado} onChange={(e) => setContratoGenerado(e.target.value)} style={{ width: '100%', height: '300px', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '12px', fontFamily: 'monospace' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => { navigator.clipboard.writeText(contratoGenerado); showToast('Contrato copiado', 'success'); }} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>📋 Copiar</button>
                  <button onClick={async () => {
                    try {
                      const res = await fetch('/api/word', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: 'contrato-texto', data: { contenido: contratoGenerado } })
                      });
                      const result = await res.json();
                      if (result.success) {
                        const link = document.createElement('a');
                        link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${result.document}`;
                        link.download = `contrato_${new Date().toISOString().split('T')[0]}.docx`;
                        link.click();
                        showToast('Contrato descargado', 'success');
                      }
                    } catch (e) {
                      showToast('Error al descargar', 'error');
                    }
                  }} style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>📄 Descargar Word</button>
                </div>
                <button onClick={() => { setContratoGenerado(''); }} style={{ width: '100%', marginTop: '12px', padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Generar otro contrato</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          padding: '14px 24px', borderRadius: '8px',
          background: toast.type === 'success' ? '#22c55e' : toast.type === 'error' ? '#ef4444' : '#3b82f6',
          color: '#fff', fontSize: '14px', fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 9999,
          animation: 'slideIn 0.3s ease'
        }}>
          {toast.message}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '400px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--secondary)' }}>⚠️ Confirmar eliminación</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>{confirmDelete.message}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => {
                if (confirmDelete.type === 'cliente') deleteCliente(confirmDelete.id);
                else if (confirmDelete.type === 'caso') deleteCaso(confirmDelete.id);
                else if (confirmDelete.type === 'prospecto') deleteProspecto(confirmDelete.id);
                else if (confirmDelete.type === 'cita') deleteCita(confirmDelete.id);
                else if (confirmDelete.type === 'plazo') deletePlazo(confirmDelete.id);
                else if (confirmDelete.type === 'evento') deleteEvento(confirmDelete.id);
                else if (confirmDelete.type === 'documento') deleteDocumento(confirmDelete.id);
                else if (confirmDelete.type === 'factura') deleteFactura(confirmDelete.id);
                else if (confirmDelete.type === 'teamMember') {
                  setTeamMembers(teamMembers.filter(m => m.id !== confirmDelete.id));
                  showToast('Miembro eliminado', 'success');
                }
                setConfirmDelete(null);
                showToast('Eliminado correctamente', 'success');
              }} style={{ flex: 1, padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Eliminar</button>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
            </div>
            </div>
          </div>
        )}

      {/* Contract Analysis Modal */}
      {showContractAnalysis && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📝 Análisis de Contrato</h2>
              <button onClick={() => { setShowContractAnalysis(false); setContractText(''); setAnalysisResult(null); }} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            
            {!analysisResult ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>Tipo de contrato:</label>
                  <select value={contractType} onChange={(e) => setContractType(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}>
                    <option value="general">General</option>
                    <option value="arrendamiento">Arrendamiento</option>
                    <option value="prestacion-servicios">Prestación de servicios</option>
                    <option value="compraventa">Compraventa</option>
                    <option value="mutuo">Mutuo</option>
                    <option value="sociedad">Contrato de sociedad</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text)' }}>Pega el texto del contrato:</label>
                  <textarea value={contractText} onChange={(e) => setContractText(e.target.value)} placeholder="Pega aquí el contenido del contrato que deseas analizar..." style={{ width: '100%', height: '200px', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px', resize: 'vertical' }} />
                </div>
                <button onClick={async () => {
                  if (!contractText.trim()) {
                    showToast('Por favor ingresa el texto del contrato', 'error');
                    return;
                  }
                  setIsAnalyzing(true);
                  try {
                    const res = await fetch('/api/analyze', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ type: 'contrato-analisis', data: { texto: contractText, tipo: contractType } })
                    });
                    const data = await res.json();
                    setAnalysisResult(data);
                  } catch (err) {
                    showToast('Error al analizar contrato', 'error');
                  } finally {
                    setIsAnalyzing(false);
                  }
                }} disabled={isAnalyzing} style={{ width: '100%', padding: '14px', background: isAnalyzing ? 'var(--muted)' : 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: isAnalyzing ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 600 }}>
                  {isAnalyzing ? 'Analizando...' : '🔍 Analizar Contrato'}
                </button>
              </>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '16px', background: analysisResult.overallRisk > 50 ? 'rgba(239,68,68,0.1)' : analysisResult.overallRisk > 25 ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '48px' }}>{analysisResult.overallRisk > 50 ? '⚠️' : analysisResult.overallRisk > 25 ? '⚡' : '✓'}</span>
                  <div>
                    <h3 style={{ fontSize: '18px', color: analysisResult.overallRisk > 50 ? '#ef4444' : analysisResult.overallRisk > 25 ? '#f59e0b' : '#22c55e' }}>Riesgo: {analysisResult.score}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Puntuación: {analysisResult.overallRisk}/100</p>
                  </div>
                </div>
                
                {analysisResult.legalRisks?.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', color: '#ef4444', marginBottom: '8px' }}>⚠️ Riesgos legales detectados:</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                      {analysisResult.legalRisks.map((r: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{r}</li>)}
                    </ul>
                  </div>
                )}
                
                {analysisResult.missingClauses?.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>📋 Cláusulas faltantes:</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                      {analysisResult.missingClauses.map((c: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{c}</li>)}
                    </ul>
                  </div>
                )}
                
                {analysisResult.recommendations?.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>💡 Recomendaciones:</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                      {analysisResult.recommendations.map((r: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{r}</li>)}
                    </ul>
                  </div>
                )}
                
                {analysisResult.relevantPrecedents?.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>📚 Precedentes relevantes:</h4>
                    {analysisResult.relevantPrecedents.map((p: any, i: number) => (
                      <div key={i} style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '8px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{p.titulo}</p>
                        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.tesis}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setAnalysisResult(null)} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Nuevo análisis</button>
                  <button onClick={() => { setShowContractAnalysis(false); setContractText(''); setAnalysisResult(null); }} style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OCR Results Modal */}
      {showOcr && ocrResult && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--secondary)' }}>📷 Resultado OCR</h2>
              <button onClick={() => { setShowOcr(false); setOcrResult(null); }} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>📋 Tipo de documento detectado:</h4>
              <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase' }}>{ocrResult.analysis?.detectedType}</p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>🔑 Términos legales detectados:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(ocrResult.analysis?.keywords || []).map((kw: string, i: number) => (
                  <span key={i} style={{ padding: '4px 10px', background: 'var(--surface-hover)', borderRadius: '12px', fontSize: '12px', color: 'var(--text)' }}>{kw}</span>
                ))}
              </div>
            </div>
            
            {(ocrResult.analysis?.entities?.dates?.length > 0 || ocrResult.analysis?.entities?.amounts?.length > 0) && (
              <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>📅 Fechas encontradas:</h4>
                  {(ocrResult.analysis?.entities?.dates || []).map((d: string, i: number) => (
                    <p key={i} style={{ fontSize: '13px', color: 'var(--text)' }}>{d}</p>
                  ))}
                </div>
                <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>💰 Montos encontrados:</h4>
                  {(ocrResult.analysis?.entities?.amounts || []).map((a: string, i: number) => (
                    <p key={i} style={{ fontSize: '13px', color: 'var(--text)' }}>{a}</p>
                  ))}
                </div>
              </div>
            )}
            
            {ocrResult.analysis?.risks?.length > 0 && (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '14px', color: '#ef4444', marginBottom: '8px' }}>⚠️ Riesgos identificados:</h4>
                <ul style={{ fontSize: '13px', color: 'var(--text)', paddingLeft: '20px' }}>
                  {ocrResult.analysis.risks.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>📄 Texto extraído:</h4>
              <textarea readOnly value={ocrResult.text} style={{ width: '100%', height: '150px', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '13px' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { navigator.clipboard.writeText(ocrResult.text); showToast('Texto copiado', 'success'); }} style={{ flex: 1, padding: '12px', background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>📋 Copiar texto</button>
              <button onClick={() => { setShowContractAnalysis(true); setContractText(ocrResult.text); setShowOcr(false); }} style={{ flex: 1, padding: '12px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>📝 Analizar contrato</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && activeTab !== 'chat' && (
        <button 
          onClick={() => setActiveTab('chat')}
          className="fab animate-float"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, var(--secondary) 0%, #E8C547 100%)',
            color: '#0D1117',
            fontSize: '24px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(201, 162, 39, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900
          }}
        >
          💬
        </button>
      )}

      {isMobile && (
        <nav className="mobile-nav" style={{ paddingBottom: '28px' }}>
          {[
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'prospectos', label: 'Prosp.', icon: '🤝' },
            { id: 'casos', label: 'Casos', icon: '📁' },
            { id: 'citas', label: 'Citas', icon: '📆' },
            { id: 'library', label: 'Leyes', icon: '📜' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                background: activeTab === tab.id ? 'rgba(201, 162, 39, 0.15)' : 'transparent',
              }}
            >
              <span style={{ fontSize: '22px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      <footer style={{ padding: isMobile ? '12px 16px' : '16px 24px', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '12px', background: 'var(--surface)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isSaving ? (
              <span style={{ color: '#f59e0b' }}>⏳ Guardando...</span>
            ) : (
              <span style={{ color: '#22c55e' }}>✓ Guardado</span>
            )}
          </div>
          {!isMobile && <span style={{ opacity: 0.5 }}>|</span>}
          {!isMobile && <span>Ctrl+K Buscar | Ctrl+1-9 Pestañas | Esc Cerrar</span>}
        </div>
        <div><strong style={{ color: 'var(--secondary)' }}>LexMex</strong> v2.0 • Asesor Legal</div>
        <div style={{ fontSize: '11px', maxWidth: isMobile ? '100%' : '300px' }}>Disclaimer: Información orientativa, no constituye asesoría legal.</div>
      </footer>
    </div>
  );
}
