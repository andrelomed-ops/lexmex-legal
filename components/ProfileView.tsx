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

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase.from('perfiles').select('*').single();
      if (data && !error) {
        setProfile(data);
      }
    }
    loadProfile();
  }, []);

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
            style={{ width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 'bold' }}
          >
            {loading ? '⚡ GUARDANDO...' : 'GUARDAR PERFIL PROFESIONAL'}
          </button>
        </section>
      </div>
    </div>
  );
}
