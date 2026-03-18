export interface GuiaProcedimental {
  id: string;
  titulo: string;
  descripcion: string;
  materia: string;
  pasos: string[];
  plazos: { paso: number; plazo: string }[];
  documentos: string[];
  autoridades: string;
  costo?: string;
}

export const guiasProcedimentales: GuiaProcedimental[] = [
  {
    id: 'divorcio-voluntario',
    titulo: 'Divorcio Voluntario (Por Mutuo Consentimiento)',
    descripcion: 'Procedimiento para disolver el vínculo matrimonial cuando ambos esposos están de acuerdo',
    materia: 'Familiar',
    pasos: [
      '1. Ambos cónyuges deben estar de acuerdo en disolver el matrimonio',
      '2. Acudir a un abogado o notario para redactar la demanda de divorcio',
      '3. La demanda debe incluir: nombres completos, fecha y lugar del matrimonio, nombres de los hijos, régimen de bienes, соглашение sobre custodia y pensión',
      '4. Presentar la demanda ante el Juzgado de lo Familiar del lugar del matrimonio o domicilio conyugal',
      '5. Se celebra audiencia de ratificación donde ambos cónyuges ratifican su voluntad',
      '6. El judge decreta el divorcio y se levanta el acta correspondiente',
      '7. Se inscribe en el Registro Civil'
    ],
    plazos: [
      { paso: 4, plazo: 'No hay plazo específico, depende de la agenda del juzgado' }
    ],
    documentos: [
      'Acta de matrimonio original',
      'Actas de nacimiento de los hijos',
      'Identificaciones oficiales',
      'CURP de todos los interesados',
      'Convenio de divorcio (custodia, pensión, bienes)'
    ],
    autoridades: 'Juzgado de lo Familiar / Notario Público',
    costo: 'Varía por estado y Lawyer, aproximadamente $3,000 - $15,000 MXN'
  },
  {
    id: 'demanda-pension',
    titulo: 'Demanda de Pensión Alimenticia',
    descripcion: 'Procedimiento para obtener una pensión alimenticia para hijos o cónyuge',
    materia: 'Familiar',
    pasos: [
      '1. Acudir a un abogado para preparar la demanda',
      '2. Redactar demanda especificando: actor, demandado, hechos, pretensiones',
      '3. Incluir cálculo de la pensión conforme al artigo 323 del CNPCF',
      '4. Presentar demanda ante el Juzgado de lo Familiar',
      '5. Se ordena emplazar al demandado',
      '6. Audiencia inicial donde se intenta conciliación',
      '7. Si no hay acuerdo, se abre a prueba',
      '8. Sentencia que establece la pensión',
      '9. Ejecución de la sentencia para cobro'
    ],
    plazos: [
      { paso: 5, plazo: '5 días hábiles para emplazar' },
      { paso: 6, plazo: '30 días para audiencia' }
    ],
    documentos: [
      'Acta de nacimiento del menor',
      'Acta de matrimonio (si aplica)',
      'Constancia de ingresos del actor',
      'Identificaciones oficiales',
      'Comprobantes de gastos del menor'
    ],
    autoridades: 'Juzgado de lo Familiar',
    costo: 'Gratuito si se patrocina a través de representación pública'
  },
  {
    id: 'juicio-ejecutivo',
    titulo: 'Juicio Ejecutivo Civil',
    descripcion: 'Procedimiento para cobrar créditos ciertos, líquidos y exigibles documentados',
    materia: 'Civil',
    pasos: [
      '1. Contar con título ejecutivo (pagaré, lettre de cambio, contrato)',
      '2. Abogado redacta demanda ejecutiva',
      '3. Se anexa título ejecutivo y poder notarial',
      '4. Se promueve embargo preventivo simultáneo',
      '5. Audiencia de remate',
      '6. Si hay oposición, se tramita incidente',
      '7. Sentencia y costas procesales'
    ],
    plazos: [
      { paso: 4, plazo: 'Embargo en 24-48 horas si hay bienes' },
      { paso: 5, plazo: '30 días para audiencia de remate' }
    ],
    documentos: [
      'Título ejecutivo original',
      'Poder notarial para pleitos',
      'Identificación del actor',
      'Constancia de domicilio del deudor'
    ],
    autoridades: 'Juzgado Civil',
    costo: 'Depende del monto y honorarios del abogado'
  },
  {
    id: 'juicio-laboral',
    titulo: 'Juicio Laboral (Demanda por Despido)',
    descripcion: 'Procedimiento para reclamar derechos laborales violados',
    materia: 'Laboral',
    pasos: [
      '1. Intentar conciliación previa con el patrón',
      '2. Acudir a la Conciliación y Registro Laboral (CFJL)',
      '3. Presentar demanda laboral con hechos y pretensiones',
      '4. Se cita a audiencia de conciliación',
      '5. Si no hay conciliación, se abre a prueba',
      '6. Audiencia de juicio con deserialize de pruebas',
      '7. Laudo definitiva',
      '8. Ejecución del laudo'
    ],
    plazos: [
      { paso: 2, plazo: '30 días de prescripción desde el despido' },
      { paso: 4, plazo: 'Audiencia en 10-15 días' }
    ],
    documentos: [
      'Contrato de trabajo',
      'Recibos de nómina',
      'Cartas de aviso de separación',
      'Constancia de salario',
      'Identificación oficial'
    ],
    autoridades: 'Centro Federal de Conciliación y Registro Laboral',
    costo: 'Gratuito'
  },
  {
    id: 'amparo-indirecto',
    titulo: 'Amparo Indirecto',
    descripcion: 'Garantía constitucional contra actos de autoridades que violan derechos',
    materia: 'Constitucional',
    pasos: [
      '1. Identificar la autoridad responsable y el acto impugnado',
      '2. Determinar si hay violation de derechos fundamentales',
      '3. Redactar demanda de amparo',
      '4. Presentar ante el Juzgado de Distrito',
      '5. Admisora y corrida de tramite',
      '6. Audiencia constitucional',
      '7. Sentencia de amparo',
      '8. Cumplimiento de la sentencia'
    ],
    plazos: [
      { paso: 1, plazo: '30 días hábiles para interponer' },
      { paso: 7, plazo: '30 días para sentencia' }
    ],
    documentos: [
      'Demanda de amparo por escrito',
      'Poder para represent al quejoso',
      'Acto impugnado (copia)',
      'Pruebas de la violación',
      'Dirección para notificaciones'
    ],
    autoridades: 'Juzgado de Distrito / Tribunales Colegiados',
    costo: 'Gratuito'
  },
  {
    id: 'sucesion-intestamentaria',
    titulo: 'Sucesión Intestamentaria',
    descripcion: 'Procedimiento para heredar cuando no hay testamento',
    materia: 'Civil',
    pasos: [
      '1. Solicitar certificado de defunción',
      '2. Identificar herederos y законных',
      '3. Acudir a abogado o notario',
      '4. Redactar demanda de declaración de herederos',
      '5. Presentar ante Juzgado de lo Civil',
      '6. Se cita a herederos conocidos',
      '7. Audiencia de declaración de herederos',
      '8. Se expide inmueble de herederos',
      '9. Repartición de bienes'
    ],
    plazos: [
      { paso: 4, plazo: 'Sin plazo específico' },
      { paso: 6, plazo: '60 días para inventario' }
    ],
    documentos: [
      'Acta de defunción del deceased',
      'Actas de nacimiento de herederos',
      'Acta de matrimonio del deceased',
      'Inventario de bienes',
      'Constancia de domicilio'
    ],
    autoridades: 'Juzgado Civil / Notario Público',
    costo: 'Varía según complejidad y notario'
  },
  {
    id: 'registro-civil',
    titulo: 'Registro de Nacimientos',
    descripcion: 'Procedimiento para registrar a un recién nacido',
    materia: 'Civil',
    pasos: [
      '1. Obtener certificado de nacimiento del hospital o clínica',
      '2. Acudir al Registro Civil correspondiente al domicilio',
      '3. Presentar documentación requerida',
      '4. Se expide acta de nacimiento',
      '5. Obtener CURP del menor'
    ],
    plazos: [
      { paso: 1, plazo: 'Dentro de los primeros 60 días de vida' }
    ],
    documentos: [
      'Certificado de nacimiento',
      'Identificaciones de los padres',
      'Acta de matrimonio de los padres (si aplica)',
      'Comprobante de domicilio'
    ],
    autoridades: 'Registro Civil del lugar de nacimiento',
    costo: 'Gratuito en el plazo legal'
  },
  {
    id: 'cancelacion-registro',
    titulo: 'Cancelación de Pensión Alimenticia',
    descripcion: 'Procedimiento para dejar sin efecto una pensión alimenticia',
    materia: 'Familiar',
    pasos: [
      '1. El alimentario alcanza la mayoría de edad o становится independiente',
      '2. Acudir a un abogado para preparar la demanda',
      '3. Redactar demanda de cancelación de pensión',
      '4. Presentar ante el Juzgado de lo Familiar',
      '5. Audiencia donde se demuestra que ya no hay obligación',
      '6. Sentencia que cancela la pensión'
    ],
    plazos: [
      { paso: 4, plazo: '15 días para contestar' }
    ],
    documentos: [
      'Sentencia original de pensión',
      'Acta de mayoría de edad del beneficiario',
      'Constancia de que el beneficiario trabaja',
      'Documentación que acredite independencia económica'
    ],
    autoridades: 'Juzgado de lo Familiar',
    costo: 'Honorarios del abogado'
  }
];

export const buscarGuia = (termino: string): GuiaProcedimental[] => {
  const t = termino.toLowerCase();
  return guiasProcedimentales.filter(g => 
    g.titulo.toLowerCase().includes(t) || 
    g.descripcion.toLowerCase().includes(t) ||
    g.materia.toLowerCase().includes(t)
  );
};
