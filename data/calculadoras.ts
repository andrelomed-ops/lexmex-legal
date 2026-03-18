export interface Calculadora {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'laboral' | 'civil' | 'penal' | 'mercantil' | 'fiscal';
  campos: {
    nombre: string;
    label: string;
    tipo: 'number' | 'date' | 'select';
    requerido: boolean;
    opciones?: string[];
  }[];
  calcular: (valores: Record<string, any>) => {
    conceptos: { nombre: string; formula: string; resultado: number }[];
    total: number;
    notas: string[];
  };
}

export const calculadoras: Calculadora[] = [
  {
    id: 'liquidacion-laboral',
    nombre: 'Liquidación Laboral',
    descripcion: 'Calcula la liquidación por despido injustificado',
    tipo: 'laboral',
    campos: [
      { nombre: 'salarioDiario', label: 'Salario diario ($)', tipo: 'number', requerido: true },
      { nombre: 'antiguedadAnios', label: 'Antigüedad (años)', tipo: 'number', requerido: true },
      { nombre: 'fechaIngreso', label: 'Fecha de ingreso', tipo: 'date', requerido: true },
      { nombre: 'fechaSeparacion', label: 'Fecha de separación', tipo: 'date', requerido: true },
      { nombre: 'tipoSeparacion', label: 'Tipo de separación', tipo: 'select', requerido: true, opciones: ['Despido injustificado', 'Renuncia voluntaria', 'Mutuo acuerdo'] },
      { nombre: 'aguinaldo', label: 'Días de aguinaldo', tipo: 'number', requerido: false },
      { nombre: 'vacaciones', label: 'Días de vacaciones', tipo: 'number', requerido: false },
      { nombre: 'primaVacacional', label: 'Porcentaje prima vacacional (%)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const salario = v.salarioDiario || 0;
      const antiguedad = v.antiguedadAnios || 0;
      const diasAguinaldo = v.aguinaldo || 15;
      const diasVacaciones = v.vacaciones || 6;
      const primaVacacional = (v.primaVacacional || 25) / 100;
      
      const conceptos = [];
      
      if (v.tipoSeparacion === 'Despido injustificado') {
        const indemnizacion = Math.round(salario * 90 * Math.max(1, antiguedad));
        conceptos.push({ nombre: 'Indemnización (90 días por año)', formula: `${salario} × 90 × ${Math.max(1, antiguedad)}`, resultado: indemnizacion });
        
        const primaAntiguedad = Math.round(salario * 12 * Math.max(1, antiguedad));
        conceptos.push({ nombre: 'Prima de antigüedad (12 días por año)', formula: `${salario} × 12 × ${Math.max(1, antiguedad)}`, resultado: primaAntiguedad });
      }
      
      const diasAnio = 365;
      const aguinaldoProporcional = Math.round((salario * diasAguinaldo) / 365 * (diasAnio / 2));
      conceptos.push({ nombre: 'Aguinaldo proporcional', formula: `${salario} × ${diasAguinaldo} × proporción`, resultado: aguinaldoProporcional });
      
      const primaVacacionalMonto = Math.round((salario * diasVacaciones * primaVacacional) / 365 * (diasAnio / 2));
      conceptos.push({ nombre: 'Prima vacacional proporcional', formula: `${salario} × ${diasVacaciones} × ${primaVacacional * 100}%`, resultado: primaVacacionalMonto });
      
      const total = conceptos.reduce((sum, c) => sum + c.resultado, 0);
      
      return {
        conceptos,
        total,
        notas: [
          'Esta es una estimación. El cálculo final puede variar.',
          'Se excluyen salarios caídos si ya hay laudo favorable.',
          'Consultar con abogado para casos específicos.'
        ]
      };
    }
  },
  {
    id: 'compensacion-dano-civil',
    nombre: 'Compensación por Daños Civiles',
    descripcion: 'Calcula indemnización por responsabilidad civil',
    tipo: 'civil',
    campos: [
      { nombre: 'danhoEmergence', label: 'Daño emergente ($)', tipo: 'number', requerido: true },
      { nombre: 'lucroCesante', label: 'Lucro cesante ($)', tipo: 'number', requerido: false },
      { nombre: 'danhoMoral', label: 'Daño moral ($)', tipo: 'number', requerido: false },
      { nombre: 'tasaInteres', label: 'Tasa de interés (% anual)', tipo: 'number', requerido: false },
      { nombre: 'diasPerjuicio', label: 'Días de perjuicio', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const danoEmer = v.danhoEmergence || 0;
      const lucro = v.lucroCesante || 0;
      const danoMoral = v.danhoMoral || 0;
      const tasa = (v.tasaInteres || 9) / 100;
      const dias = v.diasPerjuicio || 0;
      
      const intereses = Math.round((danoEmer + lucro) * tasa * dias / 365);
      
      const conceptos = [
        { nombre: 'Daño emergente', formula: 'Valor directo del perjuicio', resultado: danoEmer },
        { nombre: 'Lucro cesante', formula: 'Ganancia esperada perdida', resultado: lucro },
        { nombre: 'Daño moral', formula: 'Perjuicio moral sufrido', resultado: danoMoral },
        { nombre: 'Intereses moratorios', formula: `${danoEmer + lucro} × ${tasa * 100}% × ${dias} días`, resultado: intereses }
      ];
      
      const total = danoEmer + lucro + danoMoral + intereses;
      
      return {
        conceptos,
        total,
        notas: [
          'El daño moral se determina según criterio del juez.',
          'Los intereses se calculan desde la fecha del perjuicio.',
          'Puede solicitarse Indexación Monetaria.'
        ]
      };
    }
  },
  {
    id: 'penal pension',
    nombre: 'Pensión Alimenticia',
    descripcion: 'Calcula estimación de pensión alimenticia',
    tipo: 'civil',
    campos: [
      { nombre: 'ingresosA', label: 'Ingresos mensuales del actor ($)', tipo: 'number', requerido: true },
      { nombre: 'ingresosD', label: 'Ingresos mensuales del demandado ($)', tipo: 'number', requerido: true },
      { nombre: 'numHijos', label: 'Número de hijos', tipo: 'number', requerido: true },
      { nombre: 'gastosEducacion', label: 'Gastos de educación ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosSalud', label: 'Gastos de salud ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosVivienda', label: 'Gastos de vivienda ($/mes)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const ingresoA = v.ingresosA || 0;
      const ingresoD = v.ingresosD || 0;
      const hijos = v.numHijos || 1;
      const educacion = v.gastosEducacion || 0;
      const salud = v.gastosSalud || 0;
      const vivienda = v.gastosVivienda || 0;
      
      const ingresoTotal = ingresoA + ingresoD;
      const proporcion = Math.min(0.5, 0.1 * hijos + 0.1);
      const pensionBase = Math.round(ingresoTotal * proporcion);
      const pensionMinima = Math.max(pensionBase, 5000);
      
      const conceptos = [
        { nombre: 'Pensión básica', formula: `${ingresoTotal} × ${proporcion * 100}%`, resultado: pensionBase },
        { nombre: 'Gastos de educación', formula: 'Monto mensual', resultado: educacion },
        { nombre: 'Gastos de salud', formula: 'Monto mensual', resultado: salud },
        { nombre: 'Gastos de vivienda', formula: 'Monto mensual', resultado: vivienda }
      ];
      
      const total = pensionMinima + educacion + salud + vivienda;
      
      return {
        conceptos,
        total,
        notas: [
          'El Código Civil Federal establece hasta 50% de los ingresos.',
          'Se ajusta según necesidades específicas de los hijos.',
          'La pension es para menores de 18 años o incapacitados.'
        ]
      };
    }
  },
  {
    id: 'isr-persona-fisica',
    nombre: 'ISR Persona Física',
    descripcion: 'Estimación de impuesto sobre la renta',
    tipo: 'mercantil',
    campos: [
      { nombre: 'ingresoAnual', label: 'Ingresos anuales ($)', tipo: 'number', requerido: true },
      { nombre: 'tipoIngreso', label: 'Tipo de ingreso', tipo: 'select', requerido: true, opciones: ['Asalariado', 'Honorarios', 'Actividad empresarial', 'Arrendamiento'] },
      { nombre: 'deducciones', label: 'Deducciones autorizadas ($)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const ingresos = v.ingresoAnual || 0;
      const deducciones = v.deducciones || 0;
      const baseGravable = Math.max(0, ingresos - deducciones);
      
      const limiteInferior = [0, 8952.49, 75984.55, 133536.07, 155229.80, 185852.57, 374837.88, 590795.99, 1127926.84, 1503902.31];
      const tasa = [1.92, 6.4, 10.88, 16, 17.92, 21.36, 23.52, 30, 32, 35, 37];
      const cuotaFija = [0, 171.88, 4323.76, 10584.30, 13917.22, 19430.74, 36283.20, 59316.23, 130719.41, 254542.41];
      
      let isr = 0;
      let tasaAplicable = 0;
      
      for (let i = limiteInferior.length - 1; i >= 0; i--) {
        if (baseGravable > limiteInferior[i]) {
          isr = cuotaFija[i] + (baseGravable - limiteInferior[i]) * (tasa[i] / 100);
          tasaAplicable = tasa[i];
          break;
        }
      }
      
      const conceptos = [
        { nombre: 'Ingresos brutos', formula: 'Total de ingresos del año', resultado: ingresos },
        { nombre: '(-) Deducciones', formula: 'Deducciones autorizadas', resultado: deducciones },
        { nombre: '= Base gravable', formula: 'Ingresos - Deducciones', resultado: baseGravable },
        { nombre: 'ISR determinado', formula: `Cuota fija + excedente × ${tasaAplicable}%`, resultado: Math.round(isr) }
      ];
      
      return {
        conceptos,
        total: Math.round(isr),
        notas: [
          'Es una estimación aproximada.',
          'Consultar con contador para cálculo exacto.',
          'Considerar tratados para evitar doble imposición.'
        ]
      };
    }
  },
  // NUEVA CALCULADORA - Pensión Alimenticia Detallada
  {
    id: 'pension-alimenticia-detallada',
    nombre: 'Pensión Alimenticia Completa',
    descripcion: 'Calcula pensión alimenticia con gastos detallados',
    tipo: 'civil',
    campos: [
      { nombre: 'ingresosPadre', label: 'Ingresos mensuales padre ($)', tipo: 'number', requerido: true },
      { nombre: 'ingresosMadre', label: 'Ingresos mensuales madre ($)', tipo: 'number', requerido: true },
      { nombre: 'numHijos', label: 'Número de hijos', tipo: 'number', requerido: true },
      { nombre: 'edadHijos', label: 'Edades de hijos (separadas por coma)', tipo: 'number', requerido: false },
      { nombre: 'gastosEscuela', label: 'Gastos escolares ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosMedicos', label: 'Gastos médicos ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosExtra', label: 'Gastos extracurriculares ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosVivienda', label: 'Gastos vivienda ($/mes)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const ingresoP = v.ingresosPadre || 0;
      const ingresoM = v.ingresosMadre || 0;
      const hijos = v.numHijos || 1;
      const escuela = v.gastosEscuela || 0;
      const medicos = v.gastosMedicos || 0;
      const extra = v.gastosExtra || 0;
      const vivienda = v.gastosVivienda || 0;
      
      const ingresoTotal = ingresoP + ingresoM;
      const proporcion = Math.min(0.5, 0.08 + (hijos * 0.04));
      const pensionMinima = Math.round(ingresoTotal * proporcion);
      
      const conceptos = [
        { nombre: 'Pensión básica (40-50% ingresos)', formula: `${ingresoTotal} × ${proporcion * 100}%`, resultado: pensionMinima },
        { nombre: 'Gastos escolares', formula: 'Monto mensual', resultado: escuela },
        { nombre: 'Gastos médicos', formula: 'Monto mensual', resultado: medicos },
        { nombre: 'Actividades extracurriculares', formula: 'Monto mensual', resultado: extra },
        { nombre: 'Proporcional vivienda', formula: 'Según necesidades', resultado: vivienda }
      ];
      
      const total = pensionMinima + escuela + medicos + extra + vivienda;
      
      return {
        conceptos,
        total,
        notas: [
          'El Código Civil Federal establece hasta 50% de los ingresos del deudor.',
          'Se adjusta según las necesidades específicas de los hijos.',
          'La pension es para menores de 18 años o incapacitados.',
          'El progenitor con custodia puede demandar al otro.'
        ]
      };
    }
  },
  // CALCULADORA DE INTERESES MORATORIOS
  {
    id: 'intereses-moratorios',
    nombre: 'Intereses Moratorios',
    descripcion: 'Calcula intereses por incumplimiento de obligaciones',
    tipo: 'civil',
    campos: [
      { nombre: 'capital', label: 'Capital ($)', tipo: 'number', requerido: true },
      { nombre: 'tasaAnual', label: 'Tasa anual (%)', tipo: 'number', requerido: false },
      { nombre: 'fechaInicio', label: 'Fecha de inicio', tipo: 'date', requerido: true },
      { nombre: 'fechaFin', label: 'Fecha de fin', tipo: 'date', requerido: true }
    ],
    calcular: (v) => {
      const capital = v.capital || 0;
      const tasa = (v.tasaAnual || 9) / 100;
      const inicio = new Date(v.fechaInicio);
      const fin = new Date(v.fechaFin);
      const dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      
      const intereses = Math.round(capital * tasa * dias / 365);
      const total = capital + intereses;
      
      const conceptos = [
        { nombre: 'Capital', formula: 'Monto principal', resultado: capital },
        { nombre: 'Días de mora', formula: `${dias} días`, resultado: 0 },
        { nombre: 'Tasa anual', formula: `${tasa * 100}%`, resultado: 0 },
        { nombre: 'Intereses moratorios', formula: `${capital} × ${tasa * 100}% × ${dias}/365`, resultado: intereses }
      ];
      
      return {
        conceptos,
        total,
        notas: [
          'La tasa legal es 9% anual según el Código Civil Federal.',
          'Las partes pueden pactar tasas diferentes.',
          'Los intereses se capitalizan si no se pagan.'
        ]
      };
    }
  },
  // CALCULADORA DE DAÑOS POR ACCIDENTE
  {
    id: 'danio-accidente',
    nombre: 'Indemnización por Accidente',
    descripcion: 'Calcula indemnización por daños en accidente',
    tipo: 'civil',
    campos: [
      { nombre: 'gastosMedicos', label: 'Gastos médicos ($)', tipo: 'number', requerido: true },
      { nombre: 'diasIncapacidad', label: 'Días de incapacidad', tipo: 'number', requerido: true },
      { nombre: 'salarioDiario', label: 'Salario diario ($)', tipo: 'number', requerido: true },
      { nombre: 'ingresoMensual', label: 'Ingreso mensual perdido ($)', tipo: 'number', requerido: false },
      { nombre: 'mesesPerjuicio', label: 'Meses de perjuicio', tipo: 'number', requerido: false },
      { nombre: 'dañoMoral', label: 'Daño moral estimado ($)', tipo: 'number', requerido: false },
      { nombre: 'gastosFuturos', label: 'Gastos futuros ($)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const medicos = v.gastosMedicos || 0;
      const dias = v.diasIncapacidad || 0;
      const salario = v.salarioDiario || 0;
      const ingresoMensual = v.ingresoMensual || 0;
      const meses = v.mesesPerjuicio || 0;
      const danoMoral = v.danoMoral || 0;
      const futuros = v.gastosFuturos || 0;
      
      const incapacidad = dias * salario;
      const lucroCesante = ingresoMensual * meses;
      
      const conceptos = [
        { nombre: 'Gastos médicos', formula: 'Gastos documentados', resultado: medicos },
        { nombre: 'Pérdida de ingresos por incapacidad', formula: `${dias} días × ${salario}`, resultado: incapacidad },
        { nombre: 'Lucro cesante', formula: `${ingresoMensual} × ${meses} meses`, resultado: lucroCesante },
        { nombre: 'Daño moral', formula: 'Según valoración judicial', resultado: danoMoral },
        { nombre: 'Gastos futuros', formula: 'Tratamientos posteriores', resultado: futuros }
      ];
      
      const total = medicos + incapacidad + lucroCesante + danoMoral + futuros;
      
      return {
        conceptos,
        total,
        notas: [
          'El daño moral se determina según criterio del juez.',
          'Se deben documentar todos los gastos.',
          'La incapacidad puede ser temporal o permanente.',
          'Considerar Indexación Monetaria.'
        ]
      };
    }
  },
  // CALCULADORA DE PENSION JUBILATORIA
  {
    id: 'pension-jubilatoria',
    nombre: 'Pensión Jubilatoria ISSSTE/IMSS',
    descripcion: 'Estima pensión por jubilación',
    tipo: 'laboral',
    campos: [
      { nombre: 'semanasCotizadas', label: 'Semanas cotizadas', tipo: 'number', requerido: true },
      { nombre: 'salarioPromedio', label: 'Salario promedio diario ($)', tipo: 'number', requerido: true },
      { nombre: 'edad', label: 'Edad actual', tipo: 'number', requerido: true },
      { nombre: 'tipo', label: 'Tipo de pension', tipo: 'select', requerido: true, opciones: ['IMSS', 'ISSSTE', 'Otro'] }
    ],
    calcular: (v) => {
      const semanas = v.semanasCotizadas || 0;
      const salario = v.salarioPromedio || 0;
      const edad = v.edad || 65;
      
      let pension = 0;
      let mensaje = '';
      
      if (v.tipo === 'IMSS') {
        if (semanas >= 1250) {
          pension = Math.round(salario * 30 * 0.85);
          mensaje = 'Pensión por vejez (85% del SBC)';
        } else if (semanas >= 750) {
          pension = Math.round(salario * 30 * 0.75);
          mensaje = 'Pensión por vejez con reducción (75%)';
        } else {
          pension = Math.round(salario * 30 * 0.5);
          mensaje = 'Pensión mínima por vejez (50%)';
        }
      } else {
        pension = Math.round(salario * 30 * 0.65);
        mensaje = 'Estimación ISSSTE (65%)';
      }
      
      const conceptos = [
        { nombre: 'Semanas cotizadas', formula: `${semanas} semanas`, resultado: 0 },
        { nombre: 'Salario promedio', formula: `$${salario}/día`, resultado: 0 },
        { nombre: 'Edad', formula: `${edad} años`, resultado: 0 },
        { nombre: 'Pensión mensual estimada', formula: mensaje, resultado: pension }
      ];
      
      return {
        conceptos,
        total: pension,
        notas: [
          'Cálculo estimado basado en reglas generales.',
          'IMSS requiere mínimo 750 semanas para pensión.',
          'ISSSTE tiene reglas diferentes.',
          'Consultar con administrador de fondos.'
        ]
      };
    }
  },
  // CALCULADORA DE ISR PERSONA MORAL
  {
    id: 'isr-persona-moral',
    nombre: 'ISR Persona Moral',
    descripcion: 'Calcula ISR para empresas',
    tipo: 'mercantil',
    campos: [
      { nombre: 'ingresosAcumulables', label: 'Ingresos acumulables ($)', tipo: 'number', requerido: true },
      { nombre: 'deduccionesAutorizadas', label: 'Deducciones autorizadas ($)', tipo: 'number', requerido: true },
      { nombre: 'perdidasFiscales', label: 'Pérdidas fiscales pendientes ($)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const ingresos = v.ingresosAcumulables || 0;
      const deducciones = v.deduccionesAutorizadas || 0;
      const perdidas = v.perdidasFiscales || 0;
      
      const resultadoFiscal = Math.max(0, ingresos - deducciones - perdidas);
      const isr = Math.round(resultadoFiscal * 0.30);
      
      const conceptos = [
        { nombre: 'Ingresos acumulables', formula: 'Total de ingresos del ejercicio', resultado: ingresos },
        { nombre: '(-) Deducciones autorizadas', formula: 'Gastos deducibles', resultado: deducciones },
        { nombre: '(-) Pérdidas fiscales', formula: 'Pérdidas de ejercicios anteriores', resultado: perdidas },
        { nombre: '= Resultado fiscal', formula: 'Base gravable', resultado: resultadoFiscal },
        { nombre: 'ISR (30%)', formula: '30% sobre resultado fiscal', resultado: isr }
      ];
      
      return {
        conceptos,
        total: isr,
        notas: [
          'Tasa general de ISR para personas morales: 30%.',
          'Existen tasas preferentes para ciertas actividades.',
          'Considerar pagos provisionales mensuales.',
          'Declaración anual antes del 31 de marzo.'
        ]
      };
    }
  },
  // CALCULADORA DE IVA
  {
    id: 'iva-calculadora',
    nombre: 'IVA a Pagar/Cobrar',
    descripcion: 'Calcula saldo de IVA',
    tipo: 'fiscal',
    campos: [
      { nombre: 'ivaTrasladado', label: 'IVA cobrado a clientes ($)', tipo: 'number', requerido: true },
      { nombre: 'ivaAcreditable', label: 'IVA pagado a proveedores ($)', tipo: 'number', requerido: true },
      { nombre: 'ivaRetenido', label: 'IVA retenido ($)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const cobrado = v.ivaTrasladado || 0;
      const acreditable = v.ivaAcreditable || 0;
      const retenido = v.ivaRetenido || 0;
      
      const saldo = cobrado - acreditable - retenido;
      
      const conceptos = [
        { nombre: 'IVA Trasladado (cobrado)', formula: 'IVA facturado a clientes', resultado: cobrado },
        { nombre: 'IVA Acreditable (pagado)', formula: 'IVA de compras y gastos', resultado: acreditable },
        { nombre: 'IVA Retenido', formula: 'IVA que retuvieron', resultado: retenido },
        { nombre: '= Saldo a favor / pagar', formula: saldo >= 0 ? 'A favor del contribuyente' : 'A favor del SAT', resultado: Math.abs(saldo) }
      ];
      
      return {
        conceptos,
        total: saldo,
        notas: [
          'Si saldo a favor > 0, puede trasladarse a meses siguientes.',
          'Si saldo a pagar > 0, debe pagarse antes del 17 del mes siguiente.',
          'El IVA se causa cuando se emite o recibida la factura.',
          'Considerar acreditamiento instantáneo.'
        ]
      };
    }
  },
  // CALCULADORA DE USUFRUCTO
  {
    id: 'usufructo',
    nombre: 'Valor de Usufructo',
    descripcion: 'Calcula valor de usufructo vitalicio o temporal',
    tipo: 'civil',
    campos: [
      { nombre: 'valorInmueble', label: 'Valor del inmueb ($)', tipo: 'number', requerido: true },
      { nombre: 'edadUsufructuario', label: 'Edad del usufructuario', tipo: 'number', requerido: true },
      { nombre: 'tipo', label: 'Tipo de usufructo', tipo: 'select', requerido: true, opciones: ['Vitalicio', 'Temporal (años)'] },
      { nombre: 'anios', label: 'Años (si temporal)', tipo: 'number', requerido: false }
    ],
    calcular: (v) => {
      const valor = v.valorInmueble || 0;
      const edad = v.edadUsufructuario || 60;
      
      let valorUsufructo = 0;
      
      if (v.tipo === 'Vitalicio') {
        const tasas: Record<number, number> = {
          20: 89, 25: 87, 30: 84, 35: 80, 40: 76, 45: 71, 50: 65, 55: 58, 60: 50, 65: 40, 70: 30, 75: 20, 80: 10
        };
        let tasa = 50;
        for (const [e, t] of Object.entries(tasas)) {
          if (edad <= parseInt(e)) tasa = t;
        }
        valorUsufructo = Math.round(valor * tasa / 100);
      } else {
        const anios = v.anios || 1;
        valorUsufructo = Math.round(valor * Math.min(anios * 8, 80) / 100);
      }
      
      const nudaPropiedad = valor - valorUsufructo;
      
      const conceptos = [
        { nombre: 'Valor total del inmueb', formula: 'Valor de mercado', resultado: valor },
        { nombre: 'Valor del usufructo', formula: v.tipo === 'Vitalicio' ? `Según edad (${edad} años)` : `${v.anios} años × 8%`, resultado: valorUsufructo },
        { nombre: 'Valor de la nuda propiedad', formula: 'Resto', resultado: nudaPropiedad }
      ];
      
      return {
        conceptos,
        total: valor,
        notas: [
          'El usufructo vitalicio se calcula según tablas de mortalidad.',
          'El usufructo temporal vale 8% por año (máximo 80%).',
          'El usufructuario puede rentar el inmueb.',
          'A su muerte, el inmueb pasa al nudo propietario.'
        ]
      };
    }
  },
  // CALCULADORA DE PENSION ALIMENTICIA PARA MAYORES
  {
    id: 'pension-mayores',
    nombre: 'Pensión para Adultos Mayores',
    descripcion: 'Calcula pension para padres mayores',
    tipo: 'civil',
    campos: [
      { nombre: 'ingresosHijo1', label: 'Ingresos hijo 1 ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'ingresosHijo2', label: 'Ingresos hijo 2 ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'ingresosHijo3', label: 'Ingresos hijo 3 ($/mes)', tipo: 'number', requerido: false },
      { nombre: 'gastosPadres', label: 'Gastos mensuales padres ($)', tipo: 'number', requerido: true }
    ],
    calcular: (v) => {
      const ingreso1 = v.ingresosHijo1 || 0;
      const ingreso2 = v.ingresosHijo2 || 0;
      const ingreso3 = v.ingresosHijo3 || 0;
      const gastos = v.gastosPadres || 0;
      
      const ingresoTotal = ingreso1 + ingreso2 + ingreso3;
      const hijosQueDeben = [ingreso1, ingreso2, ingreso3].filter(i => i > 0).length;
      
      let pensionTotal = 0;
      if (hijosQueDeben > 0) {
        const proporcion = Math.min(0.5, hijosQueDeben * 0.15);
        pensionTotal = Math.min(Math.round(gastos * proporcion), ingresoTotal);
      }
      
      const pensionPorHijo = hijosQueDeben > 0 ? Math.round(pensionTotal / hijosQueDeben) : 0;
      
      const conceptos = [
        { nombre: 'Gastos de los padres', formula: 'Necesidades mensuales', resultado: gastos },
        { nombre: 'Ingresos totales de hijos', formula: 'Suma de ingresos', resultado: ingresoTotal },
        { nombre: 'Número de hijos con obligación', formula: `${hijosQueDeben} hijos`, resultado: 0 },
        { nombre: 'Pensión total mensual', formula: 'Hasta 50% de ingresos', resultado: pensionTotal },
        { nombre: 'Pensión por cada hijo', formula: 'División equal', resultado: pensionPorHijo }
      ];
      
      return {
        conceptos,
        total: pensionTotal,
        notas: [
          'Los hijos tienen obligación de pensionar a sus padres.',
          'Se considera la capacidad económica de cada hijo.',
          'El monto varía según necesidades de los padres.',
          'Procede cuando los padres no tengan medios.'
        ]
      };
    }
  }
];

export const buscarCalculadora = (termino: string): Calculadora[] => {
  const t = termino.toLowerCase();
  return calculadoras.filter(c => 
    c.nombre.toLowerCase().includes(t) || 
    c.descripcion.toLowerCase().includes(t) ||
    c.tipo.toLowerCase().includes(t)
  );
};
