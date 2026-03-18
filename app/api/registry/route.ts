import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, rfc, curp, nombre, ine } = body;

    let result;

    switch (type) {
      case 'rfc':
        result = await consultaRFC(rfc);
        break;
      case 'curp':
        result = await consultaCURP(curp);
        break;
      case 'sat':
        result = await consultaSAT(rfc);
        break;
      case 'rppc':
        result = await consultaRPPC(nombre);
        break;
      case 'ine':
        result = await consultaINE(ine);
        break;
      case 'due-diligence':
        result = await dueDiligence(rfc, curp, nombre);
        break;
      default:
        result = { error: 'Tipo de consulta no válido' };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Registry error:', error);
    return NextResponse.json(
      { error: 'Error al consultar registros' },
      { status: 500 }
    );
  }
}

async function consultaRFC(rfc: string) {
  // Simulated RFC lookup
  const rfcRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
  const isValid = rfcRegex.test(rfc.toUpperCase());

  if (!isValid) {
    return {
      success: false,
      error: 'RFC inválido. Formato esperado: XXXXYYMMDDNNN',
      formato: 'Ejemplo: GOLM800101ABC'
    };
  }

  return {
    success: true,
    tipo: 'RFC',
    rfc: rfc.toUpperCase(),
    estatus: Math.random() > 0.3 ? 'ACTIVO' : 'SUSPENDIDO',
    fechaAlta: randomDate(2000, 2023),
    regimen: randomChoice(['General', 'Simplificado', 'Arrendamiento']),
    obligaciones: ['ISR', 'IVA', 'DIOT'],
    obligacionesFiscales: Math.random() > 0.2 ? 'alCorriente' : 'conAdeudos',
    ultimoCambio: randomDate(2020, 2024)
  };
}

async function consultaCURP(curp: string) {
  // Simulated CURP lookup
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]{2}$/;
  const isValid = curpRegex.test(curp.toUpperCase());

  if (!isValid) {
    return {
      success: false,
      error: 'CURP inválido. Formato esperado de 18 caracteres',
      formato: 'Ejemplo: GOLM800101HDFPRN01'
    };
  }

  const nombres = ['JUAN', 'MARIA', 'JOSE', 'ANA', 'PEDRO', 'LAURA'];
  const apePaterno = ['GONZALEZ', 'PEREZ', 'MARTINEZ', 'LOPEZ', 'SANCHEZ'];
  const apeMaterno = ['LOPEZ', 'HERNANDEZ', 'SILVA', 'TORRES', 'VEGA'];
  const entidades = ['MEX', 'DF', 'JAL', 'GTO', 'PUE'];

  return {
    success: true,
    tipo: 'CURP',
    curp: curp.toUpperCase(),
    nombre: `${randomChoice(nombres)} ${randomChoice(apePaterno)} ${randomChoice(apeMaterno)}`,
    fechaNacimiento: randomDate(1960, 2005),
    entidadNacimiento: randomChoice(entidades),
    nacionalidad: 'MEXICANA',
    sexo: randomChoice(['H', 'M']),
    estatus: 'VIGENTE'
  };
}

async function consultaSAT(rfc: string) {
  const esta_activo = Math.random() > 0.2;
  
  return {
    success: true,
    tipo: 'SAT',
    rfc: rfc.toUpperCase(),
    situacionFiscal: esta_activo ? 'ACTIVO' : 'BAJA',
    fechaBaja: esta_activo ? null : randomDate(2018, 2023),
    obligaciones: esta_activo ? [
      { nombre: 'ISR Personas Morales', status: Math.random() > 0.3 ? 'PRESENTADA' : 'PENDIENTE' },
      { nombre: 'IVA', status: Math.random() > 0.2 ? 'PRESENTADA' : 'PENDIENTE' },
      { nombre: 'Declaración Informativa', status: 'PRESENTADA' }
    ] : [],
    regimen: randomChoice(['General', 'Simplificado']),
    fechaAlta: randomDate(2000, 2023),
    ultimoTimbrado: esta_activo ? randomDate(2024, 2025) : null,
    factoresActualizados: esta_activo,
    OpinionCumplimiento: esta_activo ? 'POSITIVA' : 'NO DISPONIBLE'
  };
}

async function consultaRPPC(nombre: string) {
  return {
    success: true,
    tipo: 'RPPC',
    empresa: nombre,
    numeroEscritura: `ESCR-${Math.floor(Math.random() * 90000) + 10000}`,
    fechaEscritura: randomDate(2015, 2024),
    notario: `Lic. ${randomChoice(['Juan Pérez', 'María López', 'Carlos González', 'Ana Martínez'])}`,
    ciudad: randomChoice(['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro']),
    status: 'INSCRITA',
    gravamenes: Math.random() > 0.5 ? ['HIPOTECA', 'PRENDA'] : [],
    socios: [
      { nombre: `${randomChoice(['JUAN', 'PEDRO', 'CARLOS'])} ${randomChoice(['GONZALEZ', 'PEREZ', 'LOPEZ'])}`, participacion: '51%' },
      { nombre: `${randomChoice(['MARIA', 'ANA', 'LAURA'])} ${randomChoice(['LOPEZ', 'HERNANDEZ', 'TORRES'])}`, participacion: '49%' }
    ],
    objetoSocial: 'COMERCIO AL POR MENOR DE MERCANCÍAS GENERALES'
  };
}

async function consultaINE(ine: string) {
  return {
    success: true,
    tipo: 'INE',
    claveElector: ine.substring(0, 18),
    nombre: `${randomChoice(['JUAN', 'MARIA', 'JOSE', 'ANA'])} ${randomChoice(['GONZALEZ', 'PEREZ', 'MARTINEZ'])}`,
    curp: `GOLM${Math.floor(Math.random() * 100000000)}`,
    domicilio: `${Math.floor(Math.random() * 9000) + 1000} ${randomChoice(['Calle Principal', 'Av. Reforma', 'Calle Juárez'])}`,
    municipio: randomChoice(['Toluca', 'Ecatepec', 'Nezahualcóyotl', 'Tlalnepantla']),
    entidad: 'MEX',
    estatus: 'VIGENTE',
    vigencia: '2024-2027'
  };
}

async function dueDiligence(rfc: string, curp: string, nombre: string) {
  const [infoRFC, infoCURP, infoSAT, infoRPPC] = await Promise.all([
    consultaRFC(rfc),
    curp ? consultaCURP(curp) : Promise.resolve(null),
    consultaSAT(rfc),
    consultaRPPC(nombre)
  ]);

  const riesgos: string[] = [];
  let score = 100;

  if (infoRFC.estatus !== 'ACTIVO') {
    riesgos.push('RFC no activo');
    score -= 30;
  }

  if (infoSAT.situacionFiscal !== 'ACTIVO') {
    riesgos.push('Contribuyente dado de baja en SAT');
    score -= 40;
  }

  if (infoSAT.obligaciones?.some((o: any) => o.status === 'PENDIENTE')) {
    riesgos.push('Adeudos fiscales pendientes');
    score -= 25;
  }

  if (infoRPPC.status !== 'INSCRITA') {
    riesgos.push('Empresa no inscrita en RPPC');
    score -= 20;
  }

  return {
    success: true,
    tipo: 'Due Diligence',
    empresa: nombre,
    fechaConsulta: new Date().toISOString(),
    resultado: score >= 70 ? 'APROBADO' : score >= 40 ? 'REVISAR' : 'RECHAZADO',
    score: score,
    nivelRiesgo: score >= 70 ? 'BAJO' : score >= 40 ? 'MEDIO' : 'ALTO',
    riesgos,
    detalles: {
      fiscal: infoRFC,
      identidad: infoCURP,
      sat: infoSAT,
      mercantil: infoRPPC
    },
    recomendaciones: score < 70 ? [
      'Verificar documentación adicional',
      'Solicitar estados financieros auditados',
      'Confirmar referencias comerciales'
    ] : [
      'Proceder con cautela normal',
      'Verificar identidad en persona'
    ]
  };
}

function randomDate(startYear: number, endYear: number): string {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
