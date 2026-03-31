'use client';

export default function NotificationCenter({ notifications, onClose }: any) {
  return (
    <div className="glass-panel animate-fade" style={{ 
      position: 'absolute', 
      top: '80px', 
      right: '32px', 
      width: '360px', 
      maxHeight: '480px', 
      zIndex: 2000,
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      border: '1.5px solid rgba(197, 160, 89, 0.2)'
    }}>
      <div style={{ 
        padding: '20px 24px', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(197, 160, 89, 0.05)'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>Centro de Alertas Legal</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ padding: '0', maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.3 }}>
            <span style={{ fontSize: '32px' }}>🔕</span>
            <p style={{ fontSize: '13px', marginTop: '12px' }}>Sin notificaciones pendientes</p>
          </div>
        ) : (
          notifications.map((notif: any, i: number) => (
            <div key={i} style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              background: notif.isUrgent ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
            }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={(e) => e.currentTarget.style.background = notif.isUrgent ? 'rgba(239, 68, 68, 0.05)' : 'transparent'}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  background: notif.isUrgent ? '#ef4444' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: '#000'
                }}>
                  {notif.icon || '⚖️'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#fff' }}>{notif.title}</p>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{notif.message}</p>
                  <p style={{ margin: 0, fontSize: '10px', color: notif.isUrgent ? '#ef4444' : 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                    {notif.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '12px 24px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Marcar todo como leído
        </button>
      </div>
    </div>
  );
}
