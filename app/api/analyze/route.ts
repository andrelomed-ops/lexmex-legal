import { NextRequest, NextResponse } from 'next/server';
import { jurisprudencias, buscarJurisprudencia } from '@/data/leyes';
import { plazosLegales } from '@/data/plazos';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, content, data } = body;

    let result;

    switch (type) {
      case 'contrato-analisis':
        result = analyzeContract(data);
        break;
      case 'demanda-analisis':
        result = analyzeDemanda(data);
        break;
      case 'riesgo-caso':
        result = analyzeCaseRisk(data);
        break;
      case 'plazos-alerta':
        result = getDeadlineAlerts(data);
        break;
      case 'precedentes-busqueda':
        result = findRelevantPrecedents(data);
        break;
      default:
        result = { error: 'Tipo de análisis no válido' };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Error en el análisis' },
      { status: 500 }
    );
  }
}

function analyzeContract(data: any) {
  const text = data.texto || '';
  const contractType = data.tipo || 'general';
  
  const analysis = {
    overallRisk: 0, // 0-100
    score: 'Bajo',
    clauses: [] as any[],
    recommendations: [] as string[],
    missingClauses: [] as string[],
    legalRisks: [] as string[],
    improvements: [] as string[],
    relevantPrecedents: [] as any[]
  };

  // Risk detection
  const riskPatterns = [
    { pattern: /penalidad|multa\s+excesiva/gi, risk: 25, message: 'Cláusula penal excesiva puede ser nula' },
    { pattern: /sin\s+garantía/gi, risk: 20, message: 'Sin garantía - alto riesgo de incumplimiento' },
    { pattern: /plazo\s+indeterminado/gi, risk: 15, message: 'Plazo indeterminado puede afectar estabilidad' },
    { pattern: /renuncia\s+derechos/gi, risk: 30, message: 'Renuncia de derechos puede ser nula' },
    { pattern: /force majeure|caso\s+fortuito/gi, risk: 10, message: 'Cláusula de fuerza majeure' },
    { pattern: /arbitraje/gi, risk: 5, message: 'Cláusula de arbitraje presente' },
    { pattern: /tasa\s+interés|interés\s+moratorio/gi, risk: 15, message: 'Verificar tasa de interés conforme a LFPC' },
  ];

  riskPatterns.forEach(({ pattern, risk, message }) => {
    if (pattern.test(text)) {
      analysis.legalRisks.push(message);
      analysis.overallRisk += risk;
    }
  });

  // Missing clauses based on contract type
  if (contractType === 'arrendamiento') {
    const required = ['renta', 'depósito', 'uso', 'plazo', 'firma'];
    required.forEach(req => {
      if (!text.toLowerCase().includes(req)) {
        analysis.missingClauses.push(`Falta cláusula de ${req}`);
      }
    });
  } else if (contractType === 'prestacion-servicios') {
    const required = ['servicio', 'remuneración', 'plazo', 'obligaciones'];
    required.forEach(req => {
      if (!text.toLowerCase().includes(req)) {
        analysis.missingClauses.push(`Falta especificar ${req}`);
      }
    });
  }

  // Recommendations
  if (analysis.overallRisk > 50) {
    analysis.recommendations.push('⚠️ ALTO RIESGO: Se recomienda revisión por abogado antes de firmar');
  } else if (analysis.overallRisk > 25) {
    analysis.recommendations.push('⚡ RIESGO MODERADO: Revisar cláusulas identificadas');
  } else {
    analysis.recommendations.push('✓ RIESGO BAJO: Documento aparentemente regular');
  }

  analysis.recommendations.push('✓ Verificar identidad de las partes');
  analysis.recommendations.push('✓ Confirmar capacidad legal de los firmantes');
  analysis.recommendations.push('✓ Asegurar firma ante notario si es required');

  // Calculate score
  if (analysis.overallRisk >= 75) {
    analysis.score = 'Muy Alto';
  } else if (analysis.overallRisk >= 50) {
    analysis.score = 'Alto';
  } else if (analysis.overallRisk >= 25) {
    analysis.score = 'Moderado';
  } else {
    analysis.score = 'Bajo';
  }

  // Find relevant precedents
  const precedentSearch = buscarJurisprudencia(contractType);
  analysis.relevantPrecedents = precedentSearch.slice(0, 3).map(j => ({
    titulo: j.titulo,
    tesis: j.tesis.substring(0, 150) + '...',
    precedente: j.precedente
  }));

  return analysis;
}

function analyzeDemanda(data: any) {
  const analysis = {
    strengths: [] as string[],
    weaknesses: [] as string[],
    missingElements: [] as string[],
    jurisdiction: '',
    statuteOfLimitations: '',
    strategy: [] as string[],
    recommendedEvidence: [] as string[]
  };

  const demandText = data.texto || '';
  const materia = data.materia || '';

  // Check required elements
  if (demandText.toLowerCase().includes('actor') || demandText.toLowerCase().includes('demandante')) {
    analysis.strengths.push('✓ Identificación clara del actor');
  } else {
    analysis.missingElements.push('Falta identificación del actor/demandante');
  }

  if (demandText.toLowerCase().includes('demandado')) {
    analysis.strengths.push('✓ Identificación del demandado');
  } else {
    analysis.missingElements.push('Falta identificación del demandado');
  }

  if (demandText.toLowerCase().includes('hecho')) {
    analysis.strengths.push('✓ Exposición de hechos');
  } else {
    analysis.missingElements.push('Falta exposición de hechos');
  }

  // Jurisdiction
  analysis.jurisdiction = getJurisdiction(materia);
  
  // Statute of limitations
  analysis.statuteOfLimitations = getStatuteOfLimitations(materia);

  // Strategy recommendations
  if (materia === 'laboral') {
    analysis.strategy.push('Verificar relación laboral formalmente');
    analysis.recommendedEvidence.push('Contrato de trabajo', 'Recibos de nómina', 'Cartas de despido');
  } else if (materia === 'civil') {
    analysis.strategy.push('Documentar incumplimiento');
    analysis.recommendedEvidence.push('Contrato original', 'Notificaciones', 'Comprobantes');
  }

  return analysis;
}

function analyzeCaseRisk(data: any) {
  const analysis = {
    riskLevel: 'Bajo',
    probability: 0,
    factors: [] as any[],
    mitigation: [] as string[],
    timeline: '',
    cost: ''
  };

  const status = data.status || '';
  const materia = data.materia || '';
  const evidencia = data.evidencia || [];

  // Risk factors
  if (evidencia.length < 3) {
    analysis.factors.push({ type: 'Evidencia', level: 'Alto', message: 'Evidencia insuficiente' });
    analysis.probability += 30;
  } else {
    analysis.factors.push({ type: 'Evidencia', level: 'Bajo', message: 'Evidencia adecuada' });
  }

  if (status === 'demanda') {
    analysis.factors.push({ type: 'Proceso', level: 'Medio', message: 'En etapa de demanda' });
    analysis.probability += 20;
  } else if (status === 'sentencia') {
    analysis.factors.push({ type: 'Proceso', level: 'Alto', message: 'En espera de sentencia' });
    analysis.probability += 40;
  }

  // Timeline and cost estimates
  if (materia === 'laboral') {
    analysis.timeline = '6-18 meses promedio';
    analysis.cost = '$30,000 - $150,000 MXN';
  } else if (materia === 'civil') {
    analysis.timeline = '12-36 meses promedio';
    analysis.cost = '$50,000 - $300,000 MXN';
  } else if (materia === 'penal') {
    analysis.timeline = '12-48 meses promedio';
    analysis.cost = '$80,000 - $500,000 MXN';
  }

  // Mitigation
  analysis.mitigation.push('Reunir toda la evidencia posible');
  analysis.mitigation.push('Buscar testigos si aplica');
  analysis.mitigation.push('Considerar mediación antes de juicio');
  analysis.mitigation.push('Consultar con especialista en la materia');

  // Overall risk
  if (analysis.probability >= 70) {
    analysis.riskLevel = 'Alto';
  } else if (analysis.probability >= 40) {
    analysis.riskLevel = 'Medio';
  } else {
    analysis.riskLevel = 'Bajo';
  }

  return analysis;
}

function getDeadlineAlerts(data: any) {
  const today = new Date();
  const casos = data.casos || [];
  
  const alerts = casos.map((caso: any) => {
    const plazos = caso.plazos || [];
    const upcoming = plazos.filter((p: any) => {
      const deadline = new Date(p.fechaLimite);
      const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 30;
    });

    return {
      casoId: caso.id,
      casoTitulo: caso.titulo,
      plazos: upcoming.map((p: any) => ({
        ...p,
        urgency: Math.ceil((new Date(p.fechaLimite).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      }))
    };
  }).filter((a: any) => a.plazos.length > 0);

  return {
    totalAlerts: alerts.reduce((sum: number, a: any) => sum + a.plazos.length, 0),
    alerts
  };
}

function findRelevantPrecedents(data: any) {
  const materia = data.materia || '';
  const tema = data.tema || '';
  
  const precedents = buscarJurisprudencia(tema || materia);
  
  return precedents.slice(0, 10).map(j => ({
    tipo: j.tipo,
    titulo: j.titulo,
    materia: j.materia,
    tesis: j.tesis,
    precedente: j.precedente,
    aplicacion: j.aplicacion
  }));
}

function getJurisdiction(materia: string): string {
  const jurisdictions: Record<string, string> = {
    laboral: 'Junta Local de Conciliación y Arbitraje',
    civil: 'Juzgado de Primera Instancia Civil',
    penal: 'Juzgado de Primera Instancia Penal',
    familiar: 'Juzgado de Primera Instancia Familiar',
    mercantil: 'Juzgado de Primera Instancia Mercantil',
    administrativo: 'Tribunal de Justicia Administrativa',
    fiscal: 'Tribunal Federal de Justicia Administrativa'
  };
  return jurisdictions[materia] || 'Juzgado competente';
}

function getStatuteOfLimitations(materia: string): string {
  const limitations: Record<string, string> = {
    laboral: '2 años (acciones individuales)',
    civil: '2-10 años según el caso',
    penal: 'Variable según delito (1-20 años)',
    familiar: '2-5 años según el caso',
    mercantil: '5-10 años según el caso',
    fiscal: '5 años (general)'
  };
  return limitations[materia] || 'Consultar legislación aplicable';
}
