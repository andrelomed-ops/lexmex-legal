export interface PlazoLegal {
  id: string;
  nombre: string;
  descripcion: string;
  plazo: string;
  unidad: 'dias' | 'meses' | 'años';
  fundamento: string;
  materia: string;
  observaciones?: string;
}

export const plazosLegales: PlazoLegal[] = [
  {
    id: 'prescripcion-credito-civil',
    nombre: 'Prescripción de crédito civil',
    descripcion: 'Plazo para demandar el pago de un crédito civil',
    plazo: '10',
    unidad: 'años',
    fundamento: 'Article 1037 del Código Civil Federal',
    materia: 'Civil',
    observaciones: 'Se cuenta desde que la obligación es exigible'
  },
  {
    id: 'prescripcion-alimentos',
    nombre: 'Prescripción de pensión alimenticia',
    descripcion: 'Plazo para reclamar pensiones alimenticias vencidas',
    plazo: '2',
    unidad: 'años',
    fundamento: 'Article 311 del Código Nacional de Procedimientos Civiles y Familiares',
    materia: 'Familiar',
    observaciones: 'Solo se pueden reclamar los últimos 2 años'
  },
  {
    id: 'prescripcion-dano-civil',
    nombre: 'Prescripción de responsabilidad civil',
    descripcion: 'Plazo para demandar daños y perjuicios',
    plazo: '2',
    unidad: 'años',
    fundamento: 'Article 1936 del Código Civil Federal',
    materia: 'Civil',
    observaciones: 'Se cuenta desde que se produjo el daño'
  },
  {
    id: 'contestacion-demanda-civil',
    nombre: 'Contestación de demanda civil',
    descripcion: 'Plazo para responder una demanda en juicio ordinario',
    plazo: '15',
    unidad: 'dias',
    fundamento: 'Article 271 del Código Nacional de Procedimientos Civiles y Familiares',
    materia: 'Civil',
    observaciones: 'Hábiles, se увелича a 20 si el demandado está fuera del lugar'
  },
  {
    id: 'contestacion-demanda-laboral',
    nombre: 'Contestación de demanda laboral',
    descripcion: 'Plazo para responder demanda en juicio laboral',
    plazo: '10',
    unidad: 'dias',
    fundamento: 'Article 873 de la Ley Federal del Trabajo',
    materia: 'Laboral',
    observaciones: 'Hábiles, improrrogables'
  },
  {
    id: 'emplazamiento-laboral',
    nombre: 'Emplazamiento laboral',
    descripcion: 'Plazo para notificar al patrón la demanda laboral',
    plazo: '5',
    unidad: 'dias',
    fundamento: 'Article 872 de la Ley Federal del Trabajo',
    materia: 'Laboral',
    observaciones: 'Hábiles anteriores a la audiencia'
  },
  {
    id: 'amparo-indirecto',
    nombre: 'Amparo indirecto',
    descripcion: 'Plazo para interponer amparo contra actos definitivos',
    plazo: '30',
    unidad: 'dias',
    fundamento: 'Article 17 de la Ley de Amparo',
    materia: 'Constitucional',
    observaciones: 'Hábiles, se computa desde que se notifica el acto'
  },
  {
    id: 'amparo-directo',
    nombre: 'Amparo directo',
    descripcion: 'Plazo para interponer amparo directo contra sentencias',
    plazo: '15',
    unidad: 'dias',
    fundamento: 'Article 18 de la Ley de Amparo',
    materia: 'Constitucional',
    observaciones: 'Hábiles, desde que se notifica la sentencia'
  },
  {
    id: 'revision-fiscal',
    nombre: 'Recurso de revisión fiscal',
    descripcion: 'Plazo para interponer recurso contra resoluciones fiscales',
    plazo: '30',
    unidad: 'dias',
    fundamento: 'Article 238 del Código Fiscal de la Federación',
    materia: 'Fiscal',
    observaciones: 'Hábiles'
  },
  {
    id: 'apelacion-civil',
    nombre: 'Recurso de apelación civil',
    descripcion: 'Plazo para interponer apelación contra sentencias',
    plazo: '5',
    unidad: 'dias',
    fundamento: 'Article 443 del Código Nacional de Procedimientos Civiles y Familiares',
    materia: 'Civil',
    observaciones: 'Hábiles'
  },
  {
    id: ' prescripcion-laboral',
    nombre: 'Prescripción acciones laborales',
    descripcion: 'Plazo general para reclamar derechos laborales',
    plazo: '2',
    unidad: 'años',
    fundamento: 'Article 516 de la Ley Federal del Trabajo',
    materia: 'Laboral',
    observaciones: 'Excepto堤nsiones, indemnizaciones por riesgo'
  },
  {
    id: 'caducidad-inventario',
    nombre: 'Caducidad de inventario',
    descripcion: 'Plazo para presentar inventario en sucesión',
    plazo: '60',
    unidad: 'dias',
    fundamento: 'Article 1672 del Código Civil Federal',
    materia: 'Civil',
    observaciones: 'Desde la muerte del autor de la sucesión'
  },
  {
    id: 'aceptacion-herencia',
    nombre: 'Aceptación de herencia',
    descripcion: 'Plazo para aceptar o repudiar herencia',
    plazo: '4',
    unidad: 'meses',
    fundamento: 'Article 1734 del Código Civil Federal',
    materia: 'Civil',
    observaciones: 'Prorrogable por 4 meses más'
  },
  {
    id: 'divorcio-necesario',
    nombre: 'Plazo para contestación de divorcio',
    descripcion: 'Tiempo para responder demanda de divorcio',
    plazo: '15',
    unidad: 'dias',
    fundamento: 'Article 267 del Código Nacional de Procedimientos Civiles y Familiares',
    materia: 'Familiar',
    observaciones: 'Hábiles'
  },
  {
    id: 'embargo-mercantil',
    nombre: 'Embargo mercantil',
    descripcion: 'Plazo para oponer excepciones en embargo',
    plazo: '9',
    unidad: 'dias',
    fundamento: 'Article 1394 del Código de Comercio',
    materia: 'Mercantil',
    observaciones: 'Hábiles'
  }
];

export const calcularPlazo = (plazo: PlazoLegal, fechaInicio: Date): Date => {
  const fecha = new Date(fechaInicio);
  const plazoNum = parseInt(plazo.plazo);
  
  if (plazo.unidad === 'dias') {
    fecha.setDate(fecha.getDate() + plazoNum);
  } else if (plazo.unidad === 'meses') {
    fecha.setMonth(fecha.getMonth() + plazoNum);
  } else if (plazo.unidad === 'años') {
    fecha.setFullYear(fecha.getFullYear() + plazoNum);
  }
  
  return fecha;
};

export const buscarPlazo = (termino: string): PlazoLegal[] => {
  const t = termino.toLowerCase();
  return plazosLegales.filter(p => 
    p.nombre.toLowerCase().includes(t) || 
    p.descripcion.toLowerCase().includes(t) ||
    p.materia.toLowerCase().includes(t)
  );
};
