'use client';

export default function ReportesView({ casos, clientes, teamMembers = [] }: { casos: any[], clientes: any[], teamMembers?: any[] }) {
  const stats = casos.reduce((acc: any, c) => {
    // Materia y Status
    acc.porMateria[c.materia] = (acc.porMateria[c.materia] || 0) + 1;
    acc.porStatus[c.status] = (acc.porStatus[c.status] || 0) + 1;
    
    // Carga por Abogado (Si el caso tiene asignado_id)
    if (c.asignado_id) {
      acc.porAbogado[c.asignado_id] = (acc.porAbogado[c.asignado_id] || 0) + 1;
    }

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
  }, { 
    porMateria: {}, 
    porStatus: {}, 
    porAbogado: {},
    total: 0, 
    plazos: 0, 
    eventos: 0, 
    documentos: 0, 
    facturado: 0, 
    pendiente: 0, 
    cobrado: 0, 
    porCobrar: 0 
  });

  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const casosEsteMes = casos.filter(c => new Date(c.fechaApertura) >= inicioMes).length;
  const casosCerrados = casos.filter(c => c.status === 'concluso').length;
  const tasaCierre = stats.total > 0 ? Math.round((casosCerrados / stats.total) * 100) : 0;
  const ingresosPromedio = stats.total > 0 ? Math.round(stats.facturado / stats.total) : 0;

  const materiaColores: any = {
    civil: '#3b82f6',
    laboral: '#22c55e',
    mercantil: '#FCD34D',
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
    <div className="tuabogadoia-fade" style={{ height: '100%', overflowY: 'auto', paddingRight: '8px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '28px', color: '#FCD34D', fontFamily: 'Playfair Display' }}>
        📊 Dashboard Financiero y Operativo
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(252,211,77,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>👥</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>CARTERA CLIENTES</p>
          <p style={{ fontSize: '36px', fontWeight: 700, color: '#fff', fontFamily: 'Playfair Display' }}>{clientes.length}</p>
        </div>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.3)', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>⚖️</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>CASOS ACTIVOS</p>
          <p style={{ fontSize: '36px', fontWeight: 700, color: '#22c55e', fontFamily: 'Playfair Display' }}>{stats.porStatus.activo || 0}</p>
        </div>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.3)', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>💰</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>INGRESOS TOTALES</p>
          <p style={{ fontSize: '36px', fontWeight: 700, color: '#3b82f6', fontFamily: 'Playfair Display' }}>${(stats.facturado || 0).toLocaleString('es-MX')}</p>
        </div>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(245,158,11,0.3)', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.05 }}>⏳</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>CUENTAS POR COBRAR</p>
          <p style={{ fontSize: '36px', fontWeight: 700, color: '#f59e0b', fontFamily: 'Playfair Display' }}>${(stats.pendiente || 0).toLocaleString('es-MX')}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Nuevos (Mes)</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#8b5cf6' }}>{casosEsteMes}</p>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Tasa Efectividad</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#06b6d4' }}>{tasaCierre}%</p>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Ticket Promedio</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#ec4899' }}>${ingresosPromedio.toLocaleString('es-MX')}</p>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Cobranza Exitosa</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e' }}>{stats.cobrado}/{stats.cobrado + stats.porCobrar}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', fontFamily: 'Playfair Display' }}>Distribución por Materia</h3>
          {Object.entries(stats.porMateria).map(([materia, count]: [string, any], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ width: '4px', height: '20px', borderRadius: '2px', background: materiaColores[materia] || '#6b7280', marginRight: '16px' }} />
              <span style={{ flex: 1, fontSize: '15px' }}>{matterLabels[materia] || (materia.charAt(0).toUpperCase() + materia.slice(1))}</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{count}</span>
            </div>
          ))}
          {Object.keys(stats.porMateria).length === 0 && <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>No hay datos suficientes para graficar.</p>}
        </div>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', fontFamily: 'Playfair Display' }}>Rendimiento por Estado</h3>
          {Object.entries(stats.porStatus).map(([status, count]: [string, any], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ width: '4px', height: '20px', borderRadius: '2px', background: status === 'activo' ? '#22c55e' : status === 'concluso' ? '#8b5cf6' : '#6b7280', marginRight: '16px' }} />
              <span style={{ flex: 1, fontSize: '15px', textTransform: 'capitalize' }}>{status}</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{count}</span>
            </div>
          ))}
          {Object.keys(stats.porStatus).length === 0 && <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>No hay datos suficientes para graficar.</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginTop: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1.5px solid rgba(197, 160, 89, 0.2)', background: 'rgba(197, 160, 89, 0.02)' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '20px', fontFamily: 'Playfair Display' }}>🛡️ Carga de Trabajo por Abogado</h3>
          {teamMembers.length === 0 ? (
             <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Registra miembros en el equipo para ver su desempeño.</p>
          ) : (
            teamMembers.map((m: any) => {
              const count = stats.porAbogado[m.id] || 0;
              const percent = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={m.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600 }}>{m.nombre}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{count} casos</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1.5px solid rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.02)' }}>
          <h3 style={{ fontSize: '18px', color: '#3b82f6', marginBottom: '20px', fontFamily: 'Playfair Display' }}>📈 Proyección Financiera (Q3-Q4)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
               <div style={{ flex: 1 }}>
                 <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>CUMPLIMIENTO DE META</p>
                 <p style={{ margin: '4px 0 0', fontSize: '20px', color: '#fff', fontWeight: 700 }}>${(stats.facturado + stats.pendiente).toLocaleString('es-MX')}</p>
               </div>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                 {Math.round((stats.facturado / (stats.facturado + stats.pendiente || 1)) * 100)}%
               </div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
               <p style={{ margin: 0, fontSize: '11px', color: '#22c55e', fontWeight: 700 }}>PROYECCIÓN DE FLUJO</p>
               <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#fff' }}>Basado en las cuentas por cobrar, se espera un retorno de <strong>${stats.pendiente.toLocaleString('es-MX')}</strong> en los próximos 30-60 días.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
