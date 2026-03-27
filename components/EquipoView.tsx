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
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--secondary)' }}>👥 Equipo de Trabajo</h2>
        <button onClick={() => setShowNewTeamMember(true)} style={{ padding: '10px 20px', background: 'var(--secondary)', color: '#0D1117', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          + Agregar Miembro
        </button>
      </div>

      {showNewTeamMember && (
        <form onSubmit={onAddTeamMember} style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--secondary)' }}>
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
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {teamMembers.map((miembro: any) => (
            <div key={miembro.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'var(--secondary)' }}>
                  {miembro.nombre.charAt(0)}
                </div>
                <button onClick={() => onDeleteTeamMember(miembro.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{miembro.nombre}</h3>
              <p style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>{miembro.rol} {miembro.especialidad && `• ${miembro.especialidad}`}</p>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>📧 {miembro.correo}</p>
              <div style={{ marginTop: '12px' }}>
                <button onClick={() => onShowCall(miembro.telefono)} style={{ width: '100%', padding: '8px', background: '#22c55e', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#fff' }}>📞 Llamar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
