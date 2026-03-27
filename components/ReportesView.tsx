'use client';

export default function ReportesView({ casos, clientes }: { casos: any[], clientes: any[] }) {
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
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

      <div style={{ gridTemplateColumns: '1fr 1fr', gap: '24px', display: 'grid' }}>
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
