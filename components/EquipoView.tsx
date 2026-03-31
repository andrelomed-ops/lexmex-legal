'use client';

export default function EquipoView({ 
  teamMembers, 
  onAddTeamMember, 
  onDeleteTeamMember, 
  showNewTeamMember, 
  setShowNewTeamMember,
  onShowCall 
}: any) {
  return (
    <div style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header View */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        background: 'rgba(197, 160, 89, 0.05)',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid rgba(197, 160, 89, 0.1)'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>👥 Miembros del Despacho</h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>Gestiona abogados, especialistas y personal administrativo.</p>
        </div>
        <button 
          onClick={() => setShowNewTeamMember(true)} 
          className="btn-premium"
          style={{ padding: '12px 24px', fontSize: '14px' }}
        >
          + Agregar Integrante
        </button>
      </div>

      {showNewTeamMember && (
        <div className="glass-panel animate-fade" style={{ padding: '32px', marginBottom: '32px', border: '1.5px solid var(--primary)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--primary)', fontFamily: 'Playfair Display' }}>Registro de Nuevo Colaborador</h3>
          <form onSubmit={onAddTeamMember}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nombre Completo</label>
                <input name="nombre" placeholder="Ej. Lic. Ricardo Silva" required className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Correo Electrónico</label>
                <input name="correo" type="email" placeholder="adjunto@tuabogadoia.com" required className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Teléfono de Contacto</label>
                <input name="telefono" placeholder="+52 55..." className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rol en el Despacho</label>
                <select name="rol" required className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option value="abogado">Socio / Abogado</option>
                  <option value="especialista">Especialista Externo</option>
                  <option value="asistente">Asistente Legal</option>
                  <option value="paralegal">Pasante / Paralegal</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Especialidad / Materia Base</label>
              <input name="especialidad" placeholder="Ej. Litigio Penal, Corporativo, Familiar..." className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button type="submit" className="btn-premium" style={{ flex: 1, padding: '14px' }}>Dar de Alta Miembro</button>
              <button type="button" onClick={() => setShowNewTeamMember(false)} style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {teamMembers.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <span style={{ fontSize: '64px' }}>👥</span>
          <p style={{ fontSize: '18px', marginTop: '20px' }}>Tu despacho aún no tiene otros colaboradores registrados.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px',
          overflowY: 'auto'
        }}>
          {teamMembers.map((miembro: any) => (
            <div key={miembro.id} className="glass-panel hover-lift" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '16px', 
                  background: 'var(--surface-opaque)', 
                  border: '1.5px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }}>
                  {miembro.nombre.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '17px', color: '#fff', fontWeight: 700 }}>{miembro.nombre}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ea043' }} />
                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {miembro.rol}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteTeamMember(miembro.id)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.3 }}
                  title="Eliminar miembro"
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
                >
                  🗑️
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span style={{ opacity: 0.6 }}>📧</span> {miembro.correo}
                </div>
                {miembro.especialidad && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span style={{ opacity: 0.6 }}>🎓</span> {miembro.especialidad}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onShowCall(miembro.telefono)}
                  style={{ 
                    flex: 1, 
                    padding: '10px', 
                    background: 'rgba(34, 197, 94, 0.1)', 
                    color: '#22c55e', 
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  LLAMAR AHORA
                </button>
                <button 
                  style={{ 
                    flex: 1, 
                    padding: '10px', 
                    background: 'rgba(197, 160, 89, 0.1)', 
                    color: 'var(--primary)', 
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  MENSAJE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
