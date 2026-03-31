'use client';

import { useState } from 'react';

interface SuscripcionViewProps {
  currentLevel: 'free' | 'pro' | 'enterprise';
  onUpgrade: (level: 'pro' | 'enterprise') => void;
}

export default function SuscripcionView({ currentLevel, onUpgrade }: SuscripcionViewProps) {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [showSpei, setShowSpei] = useState(false);
  const [showPlatinum, setShowPlatinum] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Bronce',
      price: '$0',
      period: 'Gratis por siempre',
      features: [
        'Hasta 50 expedientes activos',
        'Biblioteca Legal completa',
        '3 Consultas IA gratuitas',
        'Gestión básica de citas',
        'Acceso móvil'
      ],
      buttonText: 'Plan Actual',
      disabled: currentLevel === 'free'
    },
    {
      id: 'pro',
      name: 'Oro',
      price: '$1,250',
      period: 'por mes',
      featured: true,
      features: [
        'Expedientes ILIMITADOS',
        'Consultas IA ILIMITADAS',
        'Análisis de Contratos masivo',
        'Módulo de Chat de Equipo',
        'Reportes y Analítica avanzada',
        'Prioridad en soporte 24/7',
        'Due Diligence automático'
      ],
      buttonText: 'Actualizar a Oro',
      disabled: currentLevel === 'pro'
    },
    {
      id: 'enterprise',
      name: 'Platino',
      price: 'Personalizado',
      period: 'Firmas y Corporativos',
      features: [
        'Usuarios ilimitados',
        'Marca Blanca (Tu propio logo)',
        'API de integración directa',
        'Instalación On-Premise opcional',
        'Capacitación presencial',
        'SLA garantizado del 99.9%'
      ],
      buttonText: 'Contactar Ventas',
      disabled: currentLevel === 'enterprise'
    }
  ];

  const handleAction = (planId: string) => {
    if (planId === 'enterprise') {
      setShowPlatinum(true);
      return;
    }
    
    if (planId === 'pro') {
      setIsProcessing('pro');
      // REAL STRIPE REDIRECT (Example Link)
      window.open('https://buy.stripe.com/test_eVaeV09Ea3gB123_tuabogadoia_oro', '_blank');
      
      setTimeout(() => {
        onUpgrade('pro');
        setIsProcessing(null);
      }, 3000);
    }
  };

  return (
    <div className="tuabogadoia-fade" style={{ padding: '20px', position: 'relative' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>Planes de Fidelidad</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Potencia tu práctica legal con las herramientas de IA más avanzadas de México.
        </p>
      </header>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured && <div className="shimmer" />}
            {plan.featured && <div className="badge">MÁS POPULAR</div>}
            
            <h2 style={{ color: plan.featured ? 'var(--primary)' : '#fff' }}>{plan.name}</h2>
            <div className="price">
              {plan.price} <span>{plan.period}</span>
            </div>
            
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => handleAction(plan.id)}
                disabled={plan.disabled || (isProcessing === plan.id)}
                className={plan.featured ? 'btn-premium' : 'icon-button-gold'}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  justifyContent: 'center',
                  background: plan.featured ? '' : 'rgba(255,255,255,0.05)',
                  border: plan.featured ? 'none' : '1px solid rgba(197, 160, 89, 0.2)',
                  color: plan.featured ? '#000' : 'var(--primary)',
                  opacity: plan.disabled ? 0.6 : 1,
                  cursor: plan.disabled ? 'default' : 'pointer',
                  fontWeight: 700
                }}
              >
                {isProcessing === plan.id ? '⚡ CONECTANDO...' : plan.buttonText}
              </button>
              
              {plan.id === 'pro' && !plan.disabled && (
                <button 
                  onClick={() => setShowSpei(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  O pagar vía SPEI (Transferencia)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
        <p>🔒 Pagos seguros procesados por Stripe. Cancela en cualquier momento.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <span>💳 Visa / Mastercard</span>
          <span>💳 American Express</span>
          <span>💳 SPEI / OXXO</span>
        </div>
      </footer>

      {/* SPEI Modal */}
      {showSpei && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card" style={{ padding: '32px', maxWidth: '450px', width: '90%', border: '2px solid var(--primary)' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Pago vía SPEI</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Realiza tu transferencia y envía el comprobante a pagos@tuabogadoia.com</p>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '10px', color: 'var(--primary)', display: 'block' }}>BANCO</label>
                <span style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>STP (Sistema de Transferencias)</span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '10px', color: 'var(--primary)', display: 'block' }}>CLABE INTERBANCARIA</label>
                <span style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>6461 8011 0400 1234 56</span>
              </div>
              <div>
                <label style={{ fontSize: '10px', color: 'var(--primary)', display: 'block' }}>BENEFICIARIO</label>
                <span style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>TuAbogadoIA Legal Tech S.A. de C.V.</span>
              </div>
            </div>
            
            <button onClick={() => setShowSpei(false)} className="btn-premium" style={{ width: '100%', padding: '12px' }}>ENTENDIDO</button>
          </div>
        </div>
      )}

      {/* Platinum Lead Form */}
      {showPlatinum && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card" style={{ padding: '32px', maxWidth: '500px', width: '90%', border: '2px solid #fff' }}>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Solicitud Corporativa (Platino)</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Un consultor legal senior se pondrá en contacto para diseñar tu solución personalizada.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setShowPlatinum(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Nombre del Despacho / Empresa" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff' }} />
              <input type="email" placeholder="Correo Corporativo" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff' }} />
              <textarea placeholder="Cuéntanos tus necesidades específicas (API, On-Premise, etc.)" rows={3} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff' }} />
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowPlatinum(false)} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px', color: '#fff' }}>CANCELAR</button>
                <button type="submit" className="btn-premium" style={{ flex: 2, padding: '12px' }}>ENVIAR SOLICITUD</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
