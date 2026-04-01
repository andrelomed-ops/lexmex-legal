'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Profile {
  id?: string;
  nombre: string;
  correo: string;
  rfc: string;
  cedula: string;
  especialidad: string;
  domicilio: string;
  suscripcion: 'free' | 'pro' | 'enterprise';
}

interface ApiKey {
  id: string;
  key_name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}
interface ProfileViewProps {
  onSave: (profile: any) => void;
  showToast: (msg: string, type?: any) => void;
}

export default function ProfileView({ onSave, showToast }: ProfileViewProps) {
  const [profile, setProfile] = useState<Profile>({
    nombre: 'Abg. Elena Ruiz',
    correo: 'elena.ruiz@tuabogadoia.com',
    rfc: 'RUE900101XYZ',
    cedula: '12345678',
    especialidad: 'Derecho Civil y Arrendamiento',
    domicilio: 'Av. Insurgentes Sur 1234, CDMX',
    suscripcion: 'free'
  });
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('perfiles').select('*').limit(1).single();
      
      if (data) {
        setProfile(data);
        fetchApiKeys(data.correo);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApiKeys = async (email: string) => {
    try {
      const { data } = await supabase.from('user_api_keys').select('*').eq('user_email', email);
      if (data) setApiKeys(data);
    } catch (e) {
      console.error('API keys table missing');
    }
  };

  const generateApiKey = async () => {
    if (!profile.correo) {
      showToast('Actualiza tu perfil primero para asociar la llave.', 'error');
      return;
    }
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    const randomHex = Array.from(array, dec => dec.toString(16).padStart(8, '0')).join('');
    const rawKey = 'ta_live_' + randomHex;
    
    try {
      const { error } = await supabase.from('user_api_keys').insert([{
          user_email: profile.correo,
          key_name: 'Main Integration Key',
          key_prefix: rawKey.substring(0, 12) + '...',
          key_hash: rawKey,
          is_active: true
      }]);

      if (!error) {
          setNewApiKey(rawKey);
          showToast('Llave API generada. Cópiala AHORA, no se volverá a mostrar.', 'success');
          fetchApiKeys(profile.correo);
      } else {
          showToast('La tabla user_api_keys no existe en la base de datos.', 'error');
      }
    } catch (e) {
      showToast('Error generando llave', 'error');
    }
  };

  const revokeApiKey = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_api_keys')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (!error) {
        showToast(currentStatus ? 'Llave revocada' : 'Llave reactivada', 'success');
        fetchApiKeys(profile.correo);
      }
    } catch (e) {
      showToast('Error al modificar la llave', 'error');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('perfiles').upsert([profile]);
      if (error) throw error;
      onSave(profile);
      showToast('Perfil actualizado correctamente', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Error al guardar el perfil. El sistema usará guardado local.', 'info');
      onSave(profile); // Fallback to local state if table doesn't exist
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tuabogadoia-fade" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Perfil Profesional</h1>
        <p style={{ color: 'var(--text-muted)' }}>Gestiona tu identidad legal y nivel de servicio</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Left Card: Status */}
        <section className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'var(--primary)', 
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#000',
            fontWeight: 'bold'
          }}>
            {profile.nombre.charAt(5).toUpperCase() || 'A'}
          </div>
          <h3 style={{ textAlign: 'center', margin: '0 0 4px 0' }}>{profile.nombre}</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '20px' }}>{profile.correo}</p>
          
          <div style={{ 
            background: 'rgba(197, 160, 89, 0.1)', 
            border: '1px solid var(--primary)', 
            padding: '12px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '10px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Nivel de Suscripción</p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {profile.suscripcion === 'free' ? 'BRONCE (FREE)' : profile.suscripcion === 'pro' ? 'ORO (PRO)' : 'PLATINO (DRIVE)'}
            </p>
          </div>
        </section>

        {/* Right Card: Editor */}
        <section className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div className="input-field">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                value={profile.nombre} 
                onChange={(e) => setProfile({...profile, nombre: e.target.value})}
              />
            </div>
            <div className="input-field">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={profile.correo} 
                onChange={(e) => setProfile({...profile, correo: e.target.value})}
              />
            </div>
            <div className="input-field">
              <label>RFC</label>
              <input 
                type="text" 
                value={profile.rfc} 
                onChange={(e) => setProfile({...profile, rfc: e.target.value})}
              />
            </div>
            <div className="input-field">
              <label>Cédula Profesional</label>
              <input 
                type="text" 
                value={profile.cedula} 
                onChange={(e) => setProfile({...profile, cedula: e.target.value})}
              />
            </div>
          </div>

          <div className="input-field" style={{ marginBottom: '24px' }}>
            <label>Especialidad Legal</label>
            <input 
              type="text" 
              value={profile.especialidad} 
              onChange={(e) => setProfile({...profile, especialidad: e.target.value})}
            />
          </div>

          <div className="input-field" style={{ marginBottom: '32px' }}>
            <label>Domicilio Fiscal / Legal</label>
            <textarea 
              rows={3}
              value={profile.domicilio} 
              onChange={(e) => setProfile({...profile, domicilio: e.target.value})}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', padding: '12px' }}
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="btn-premium"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 'bold', marginBottom: '40px' }}
          >
            {loading ? '⚡ GUARDANDO...' : 'GUARDAR PERFIL PROFESIONAL'}
          </button>

          {/* Developer Panel - API Provider B2B */}
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔌</span> Panel de Proveedor API (B2B)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Conecta tu inteligencia legal de TuAbogadoIA a tus propias aplicaciones, ERPs o sistemas CRM.
            </p>

            {newApiKey && (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#22c55e', fontWeight: 'bold' }}>⚠️ COPIA TU LLAVE AHORA</p>
                <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#fff' }}>Al salir de esta pantalla se ocultará permanentemente por seguridad.</p>
                <code style={{ background: '#000', padding: '10px', borderRadius: '4px', color: '#fff', fontSize: '14px', display: 'block', wordBreak: 'break-all', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {newApiKey}
                </code>
              </div>
            )}

            {apiKeys.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {apiKeys.map(key => (
                  <div key={key.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '14px' }}>{key.key_name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{key.key_prefix}••••••••</p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '10px', color: key.is_active ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>{key.is_active ? '● ACTIVA' : '○ REVOCADA'}</p>
                        <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Último uso: {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Nunca'}</p>
                      </div>
                      <button 
                        onClick={() => revokeApiKey(key.id, key.is_active)}
                        style={{ background: 'none', border: `1px solid ${key.is_active ? '#ef4444' : '#22c55e'}`, color: key.is_active ? '#ef4444' : '#22c55e', fontSize: '9px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        {key.is_active ? 'REVOCAR' : 'REACTIVAR'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', textAlign: 'center', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)', marginBottom: '24px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>No tienes llaves API activas.</p>
              </div>
            )}

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--primary)' }}>Tu Cuota Actual</h4>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <p style={{ margin: 0, fontSize: '12px' }}>Nivel: <span style={{ color: '#fff', fontWeight: 'bold' }}>{profile.suscripcion.toUpperCase()}</span></p>
                 <p style={{ margin: 0, fontSize: '12px' }}>Límite Diario: <span style={{ color: '#fff', fontWeight: 'bold' }}>{profile.suscripcion === 'free' ? '5' : profile.suscripcion === 'pro' ? '500' : '10,000'} req/día</span></p>
               </div>
            </div>

            <button 
              onClick={generateApiKey}
              style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px', width: '100%', textTransform: 'uppercase' }}
            >
              Generar Nueva Llave Secreta
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
