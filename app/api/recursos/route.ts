import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo') || 'all';

  const recursos = {
    federal: [
      { nombre: 'Cámara de Diputados', url: 'https://www.diputados.gob.mx', descripcion: 'Leyes, iniciativas, diputados' },
      { nombre: 'Senado de la República', url: 'https://www.senado.gob.mx', descripcion: 'Senadores, leyes, comisiones' },
      { nombre: 'SCJN', url: 'https://www.scjn.gob.mx', descripcion: 'Suprema Corte, jurisprudencia, tesis' },
      { nombre: 'DOF', url: 'https://www.dof.gob.mx', descripcion: 'Diario Oficial de la Federación' },
      { nombre: 'SHCP', url: 'https://www.shcp.gob.mx', descripcion: 'Hacienda, presupuesto, deuda' },
      { nombre: 'SAT', url: 'https://www.sat.gob.mx', descripcion: 'Impuestos, RFC,-facturación' },
      { nombre: 'SE', url: 'https://www.gob.mx/se', descripcion: 'Economía, comercio exterior, inversiones' },
      { nombre: 'STPS', url: 'https://www.gob.mx/stps', descripcion: 'Laboral, vacantes, capacitación' },
      { nombre: 'SEMARNAT', url: 'https://www.gob.mx/semarnat', descripcion: 'Medio ambiente, recursos naturales' },
      { nombre: 'SRE', url: 'https://www.gob.mx/sre', descripcion: 'Relaciones exteriores, visas, pasaporte' },
      { nombre: 'PGR/FGR', url: 'https://www.fgr.gob.mx', descripcion: 'Fiscalía General de la República' },
      { nombre: 'RPPC', url: 'https://rppc.pjf.gob.mx', descripcion: 'Registro Público de Comercio' },
    ],
    judicial: [
      { nombre: 'PJE', url: 'https://www.pjenl.gob.mx', descripcion: 'Poder Judicial del Estado de México' },
      { nombre: 'PJCDMX', url: 'https://www.pjcdmx.gob.mx', descripcion: 'Poder Judicial de la CDMX' },
      { nombre: 'TCU', url: 'https://www.tcu.gob.mx', descripcion: 'Tribunal Federal de Conciliación y Arbitraje' },
      { nombre: 'JFCA', url: 'https://www.jfca.gob.mx', descripcion: 'Junta Federal de Conciliación y Arbitraje' },
      { nombre: 'TJA', url: 'https://www.tja.gob.mx', descripcion: 'Tribunal de Justicia Administrativa' },
    ],
    estatal: [
      { nombre: 'GCDMX', url: 'https://cdmx.gob.mx', descripcion: 'Gobierno de la Ciudad de México' },
      { nombre: 'EDOMEX', url: 'https://edomex.gob.mx', descripcion: 'Gobierno del Estado de México' },
      { nombre: 'JALISCO', url: 'https://www.jalisco.gob.mx', descripcion: 'Gobierno de Jalisco' },
      { nombre: 'NUEVO LEÓN', url: 'https://www.nl.gob.mx', descripcion: 'Gobierno de Nuevo León' },
      { nombre: 'PUEBLA', url: 'https://www.puebla.gob.mx', descripcion: 'Gobierno de Puebla' },
    ],
    internacional: [
      { nombre: 'OMPI', url: 'https://www.wipo.int', descripcion: 'Organización Mundial de Propiedad Intelectual' },
      { nombre: 'OMC', url: 'https://www.wto.org', descripcion: 'Organización Mundial de Comercio' },
      { nombre: 'CNUDMI', url: 'https://www.uncitral.org', descripcion: 'Comisión de Naciones Unidas para Derecho Mercantil' },
      { nombre: 'Corte IDH', url: 'https://www.corteidh.or.cr', descripcion: 'Corte Interamericana de Derechos Humanos' },
      { nombre: 'UN', url: 'https://www.un.org', descripcion: 'Naciones Unidas' },
      { nombre: 'OCDE', url: 'https://www.oecd.org', descripcion: 'Organización para Cooperación y Desarrollo' },
    ]
  };

  if (tipo === 'all') {
    return NextResponse.json(recursos);
  }

  return NextResponse.json(recursos[tipo as keyof typeof recursos] || recursos.federal);
}
