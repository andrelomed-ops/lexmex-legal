export interface Tratado {
  id: string;
  nombre: string;
  nombreEs: string;
  paises: string[];
  fechaFirma: string;
  materia: string;
  resumen: string;
  url?: string;
}

export const tratadosInternacionales: Tratado[] = [
  {
    id: 't-mec',
    nombre: 'USMCA (T-MEC)',
    nombreEs: 'Tratado entre México, Estados Unidos y Canadá',
    paises: ['México', 'Estados Unidos', 'Canadá'],
    fechaFirma: '2020-07-01',
    materia: 'Comercio',
    resumen: 'Tratado de libre comercio que取代 el TLCAN. Regula comercio de bienes, servicios, propiedad intelectual y inversiones.',
    url: 'https://www.gob.mx/t-mec'
  },
  {
    id: 'tm18',
    nombre: 'TM18',
    nombreEs: 'Tratado de Marrakech (OMPI)',
    paises: ['México', 'Unión Europea', 'EE.UU.', 'Japón', 'Corea'],
    fechaFirma: '2018-10-11',
    materia: 'Propiedad Intelectual',
    resumen: 'Tratán sobre limitaciones y excepciones para personas con discapacidad visual y bibliotecas.'
  },
  {
    id: 'cptpp',
    nombre: 'CPTPP',
    nombreEs: 'Acuerdo Integral y Progresivo de Asociación Transpacífico',
    paises: ['México', 'Japón', 'Australia', 'Canadá', 'Singapur', 'Nueva Zelandia', 'Brunei', 'Malasia', 'Vietnam', 'Chile', 'Perú'],
    fechaFirma: '2018-03-08',
    materia: 'Comercio',
    resumen: 'Acuerdo de libre comercio que elimina aranceles y establece reglas de comercio digital, laboral y ambiental.'
  },
  {
    id: 'ulp',
    nombre: 'ULP',
    nombreEs: 'Unión Latina',
    paises: ['México', 'España', 'Francia', 'Italia', 'Portugal', 'Rumania'],
    fechaFirma: '1954-05-20',
    materia: 'Cultura',
    resumen: 'Organización internacional de países lusófonos e hispanohablantes para cooperación cultural.'
  },
  {
    id: 'nafta',
    nombre: 'TLCAN',
    nombreEs: 'Tratado de Libre Comercio de América del Norte (Histórico)',
    paises: ['México', 'Estados Unidos', 'Canadá'],
    fechaFirma: '1994-01-01',
    materia: 'Comercio',
    resumen: 'El acuerdo comercial que reemplazó por el T-MEC en 2020. Histórico por abrir la economía mexicana.',
    url: 'https://www.sice.oas.org/Trade/NAFTA/NAFTAindo.asp'
  },
  {
    id: 'lpi',
    nombre: 'Convenio de Berna',
    nombreEs: 'Convenio de Berna para la Protección de las Obras Literarias y Artísticas',
    paises: ['México', 'España', 'Francia', 'Alemania', 'Reino Unido', 'EE.UU.', 'Japón', '180+ países'],
    fechaFirma: '1886-09-09',
    materia: 'Propiedad Intelectual',
    resumen: 'Acuerdo fundamental sobre derechos de autor. Protege obras literarias, artísticas, musicales, cinematográficas.'
  },
  {
    id: 'paris',
    nombre: 'Convenio de París',
    nombreEs: 'Convenio de París para la Protección de la Propiedad Industrial',
    paises: ['México', 'España', 'Francia', 'Alemania', 'EE.UU.', 'Japón', '177 países'],
    fechaFirma: '1883-03-20',
    materia: 'Propiedad Intelectual',
    resumen: 'Protege invenciones, marcas, diseños industriales, nombres comerciales,indicaciones geográficas.'
  },
  {
    id: 'wto',
    nombre: 'OMC',
    nombreEs: 'Organización Mundial del Comercio',
    paises: ['México', '164 países miembros'],
    fechaFirma: '1995-01-01',
    materia: 'Comercio',
    resumen: 'Establece reglas de comercio internacional, resolve disputas y opera el sistema multilateral de comercio.'
  },
  {
    id: 'amcham',
    nombre: 'AMCHAM',
    nombreEs: 'Cámara Americana de Comercio de México',
    paises: ['México', 'Estados Unidos'],
    fechaFirma: '1917-01-01',
    materia: 'Comercio',
    resumen: 'Asociación de empresas estadounidenses en México. Promueve comercio e inversión bilateral.'
  },
  {
    id: 'ccja',
    nombre: 'CCJA',
    nombreEs: 'Cámara de Comercio Japón-México',
    paises: ['México', 'Japón'],
    fechaFirma: '1974-01-01',
    materia: 'Comercio',
    resumen: 'Promueve relaciones comerciales entre Japón y México. Facilita inversiones y partnerships.'
  }
];

export const tratadosBilaterales: Tratado[] = [
  {
    id: 'mex-esp',
    nombre: 'TLC México-España',
    nombreEs: 'Tratado de Libre Comercio entre México y el Reino de España',
    paises: ['México', 'España'],
    fechaFirma: '2000-12-08',
    materia: 'Comercio',
    resumen: 'Elimina aranceles entre ambos países, protege inversiones y establece mecanismos de solución de controversias.'
  },
  {
    id: 'mex-ale',
    nombre: 'TLC México-Alemania',
    nombreEs: 'Acuerdo de Libre Comercio entre México y la República Federal de Alemania',
    paises: ['México', 'Alemania'],
    fechaFirma: '2001-05-15',
    materia: 'Comercio',
    resumen: 'Facilita comercio de bienes y servicios, protección de inversiones y propiedad intelectual.'
  },
  {
    id: 'mex-uk',
    nombre: 'TLC México-Reino Unido',
    nombreEs: 'Acuerdo de Libre Comercio entre México y el Reino Unido',
    paises: ['México', 'Reino Unido'],
    fechaFirma: '2020-06-23',
    materia: 'Comercio',
    resumen: 'Post-Brexit, mantiene preferencias comerciales. Elimina aranceles y facilita inversiones.'
  }
];

export const buscarTratados = (termino: string): Tratado[] => {
  const t = termino.toLowerCase();
  return tratadosInternacionales.filter(tratado => 
    tratado.nombre.toLowerCase().includes(t) ||
    tratado.nombreEs.toLowerCase().includes(t) ||
    tratado.materia.toLowerCase().includes(t) ||
    tratado.paises.some(p => p.toLowerCase().includes(t))
  );
};
