'use client';

import { useState } from 'react';

interface ContractWizardProps {
  contractType: string;
  fields: string[];
  onComplete: (data: any) => void;
  onCancel: () => void;
}

export default function ContractWizard({ contractType, fields, onComplete, onCancel }: ContractWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = fields.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateField = (value: string) => {
    setFormData({ ...formData, [fields[currentStep]]: value });
  };

  if (isCompleted) {
    return (
      <div className="glass-card scale-up" style={{ padding: '32px', textAlign: 'center', border: '1.5px solid var(--success)', background: 'rgba(16, 20, 28, 0.9)' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✔️</div>
        <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Asistente Legal</h3>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>Procesando tu contrato de {contractType}...</p>
      </div>
    );
  }

  return (
    <div className="glass-card scale-up" style={{ 
      padding: '32px', 
      border: '1.5px solid var(--primary)',
      background: 'rgba(16, 20, 28, 0.9)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '450px',
      margin: '20px 0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--primary)', letterSpacing: '0.05em' }}>WIZARD: {contractType}</h3>
        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
      </div>

      {/* Progress Bar Container */}
      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '32px' }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: 'var(--primary)', 
          boxShadow: '0 0 10px var(--primary)',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
        }} />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
          PASO {currentStep + 1} DE {totalSteps}: {fields[currentStep]}
        </label>
        <input 
          type="text"
          autoFocus
          value={formData[fields[currentStep]] || ''}
          onChange={(e) => updateField(e.target.value)}
          placeholder={`Ingresa ${fields[currentStep].toLowerCase()}...`}
          onKeyDown={(e) => e.key === 'Enter' && formData[fields[currentStep]] && handleNext()}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '2px solid rgba(197, 160, 89, 0.3)',
            padding: '12px 0',
            fontSize: '20px',
            color: '#ffffff',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary)'}
          onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(197, 160, 89, 0.3)'}
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        {currentStep > 0 && (
          <button 
            onClick={handlePrev}
            style={{ 
              padding: '12px 24px', 
              background: 'transparent', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: '#ffffff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            Anterior
          </button>
        )}
        <button 
          onClick={handleNext}
          disabled={!formData[fields[currentStep]]}
          style={{ 
            padding: '12px 32px', 
            background: 'var(--primary)', 
            border: 'none', 
            color: '#03060b',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: formData[fields[currentStep]] ? 'pointer' : 'not-allowed',
            opacity: formData[fields[currentStep]] ? 1 : 0.4,
            fontSize: '13px',
            transition: 'all 0.2s transform active:scale-95'
          }}
        >
          {currentStep === totalSteps - 1 ? 'CONSTRUIR CONTRATO' : 'SIGUIENTE PASO'}
        </button>
      </div>
    </div>
  );
}
