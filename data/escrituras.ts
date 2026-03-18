export interface PlantillaEscritura {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  requisitos: string[];
  impuestos: string[];
  ejemploDatos: {
    comparecientes: string[];
    objeto: string;
    precio?: string;
  };
}

export const plantillasEscrituras: PlantillaEscritura[] = [
  {
    id: "compraventa-inmueble",
    titulo: "Compraventa de Inmueble",
    categoria: "Inmobiliario",
    descripcion: "Escritura pública mediante la cual se transmite la propiedad de un inmueble (casa, departamento, terreno) de una persona a otra.",
    requisitos: [
      "Identificación oficial de ambas partes (INE, pasaporte)",
      "CURP y RFC de compradores y vendedores",
      "Cartilla de Servicio Militar (varones mayores de 18 años)",
      "Certificado de libertad de gravamen actualizado",
      "Certificado de no propiedad del comprador (SNSP)",
      "Avalúo fiscal o valor de operación",
      "Comprobante de domicilio reciente",
      "Acta de nacimiento de los participantes",
      "Acta de matrimonio (si aplica)"
    ],
    impuestos: [
      "ISR (Impuesto sobre la Renta) - Vendedor",
      "IVA (si es persona moral constructora)",
      "ISAI (Impuesto sobre Adquisición de Inmuebles) - Comprador",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Vendedor: Juan Pérez García", "Comprador: María López Hernández"],
      objeto: "Casa-habitación ubicada en Calle principal No. 123, Colonia Centro, Alcaldía Cuauhtémoc, Ciudad de México",
      precio: "$2,500,000.00 (Dos millones quinientos mil pesos 00/100 M.N.)"
    }
  },
  {
    id: "donacion-inmueble",
    titulo: "Donación de Inmueble",
    categoria: "Inmobiliario",
    descripcion: "Escritura pública por la cual una persona (donante) transfiere gratuitamente la propiedad de un inmueble a otra (donatario).",
    requisitos: [
      "Identificación oficial de donante y donatario",
      "CURP y RFC de ambas partes",
      "Cartilla de Servicio Militar",
      "Certificado de libertad de gravamen",
      "Avalúo fiscal",
      "Declaratoria de herederos (si el donante ha fallecido parcialmente)",
      "Acta de nacimiento del donatario",
      "Parentesco o relación entre donante y donatario"
    ],
    impuestos: [
      "ISR sobre la renta (donatario debe pagar si no es familiar directo)",
      "ISAI (puede tener exención por donación familiar)",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Donante: Roberto Sánchez Mendoza", "Donatario: Ana Sánchez López (hija)"],
      objeto: "Departamento ubicado en Av. Paseo de la Reforma No. 500, Colonia Juárez, Ciudad de México",
      precio: "Donación"
    }
  },
  {
    id: "constitucion-sar",
    titulo: "Constitución de Sociedad Anónima (S.A.)",
    categoria: "Mercantil",
    descripcion: "Escritura pública mediante la cual dos o más personas constituyen una Sociedad Anónima, definiendo su objeto, capital, administración y demás cláusulas estatutarias.",
    requisitos: [
      "Identificación oficial de todos los accionistas fundadores",
      "CURP y RFC de accionistas",
      "Acta de nacimiento de accionistas",
      "Comprobante de domicilio fiscal",
      "Acta de matrimonio (si hay sociedad conyugal)",
      "RFC de la sociedad a constituir (previamente tramitado)",
      "Reservación de nombre ante SHCP"
    ],
    impuestos: [
      "ISR sobre ingresos de la sociedad",
      "IVA por actividades",
      "ISR por dividendos (distribución)",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Accionista 1: Carlos Vargas Ruiz", "Accionista 2: Laura Díaz Mendoza"],
      objeto: "Constitución de 'Industrias del Norte, S.A. de C.V.' con capital de $500,000.00",
      precio: "Capital: $500,000.00 dividido en 50 acciones de $10,000.00 cada una"
    }
  },
  {
    id: "constitucion-srl",
    titulo: "Constitución de Sociedad de Responsabilidad Limitada (S. de R.L.)",
    categoria: "Mercantil",
    descripcion: "Escritura pública para constituir una Sociedad de Responsabilidad Limitada, donde los socios responden hasta el monto de sus aportaciones.",
    requisitos: [
      "Identificación oficial de los socios",
      "CURP y RFC de todos los socios",
      "Acta de nacimiento",
      "Comprobante de domicilio",
      "RFC de la sociedad",
      "Reservación de nombre"
    ],
    impuestos: [
      "ISR empresarial",
      "IVA",
      "ISR por dividendos",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Socio 1: Miguel Ángel Torres", "Socio 2: Patricia Reyes Campos"],
      objeto: "Constitución de 'Consultores Asociados, S. de R.L.'",
      precio: "Capital: $300,000.00"
    }
  },
  {
    id: "poder-general",
    titulo: "Poder General",
    categoria: "Poderes",
    descripcion: "Escritura mediante la cual una persona (poderdante) otorga facultades amplias a otra (apoderado) para que la represente ante autoridades y terceros.",
    requisitos: [
      "Identificación oficial del poderdante y буду代理人",
      "CURP y RFC del poderdante",
      "Cartilla de Servicio Militar (varones)",
      "Acta de nacimiento del poderdante",
      "Acta de matrimonio (si aplica)"
    ],
    impuestos: [
      "ISR (si el poderdante es extranjero no residente)",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Poderdante: Fernando García López", "Apoderado: Ricardo García Pérez"],
      objeto: "Poder general para pleitos y cobranzas y actos de administración",
      precio: "Sin costo"
    }
  },
  {
    id: "poder-especial",
    titulo: "Poder Especial",
    categoria: "Poderes",
    descripcion: "Escritura donde se otorgan facultades específicas para realizar actos determinados, como venta de inmueble, cobranza, etc.",
    requisitos: [
      "Identificación oficial de ambas partes",
      "CURP del poderdante",
      "Documentación del acto específico a delegar"
    ],
    impuestos: [
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Poderdante: Elena Martínez Soto", "Apoderado: Carlos Martínez Martínez"],
      objeto: "Poder especial para vender el inmueble ubicado en Calle principal No. 100",
      precio: "Sin costo"
    }
  },
  {
    id: "testamento-publico-abierto",
    titulo: "Testamento Público Abierto",
    categoria: "Testamentario",
    descripcion: "Escritura por la cual una persona manifiesta su voluntad respecto a la distribución de sus bienes después de su fallecimiento.",
    requisitos: [
      "Identificación oficial del testador",
      "CURP y RFC del testador",
      "Cartilla de Servicio Militar",
      "Acta de nacimiento",
      "Acta de matrimonio (si es casado)",
      "Lista de bienes a heredar",
      "Nombre de herederos y legatarios"
    ],
    impuestos: [
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Testador: José Luis Ramírez González"],
      objeto: "Testamento donde hereda a su esposa María Elena Pérez y a sus hijos",
      precio: "Sin costo al momento del otorgamiento"
    }
  },
  {
    id: "protocolizacion-acta",
    titulo: "Protocolización de Acta de Asamblea",
    categoria: "Societario",
    descripcion: "Escritura mediante la cual se Protocoliza el acta de una asamblea de accionistas o socios, dotándola de fuerza legal.",
    requisitos: [
      "Acta de asamblea original o copia certificada",
      "Identificación del representante legal",
      "Poder notarial del representante (si no es el propio)",
      "RFC de la empresa"
    ],
    impuestos: [
      "ISR aplicable",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Representante: Luis Hernández en representación de 'Empresa, S.A. de C.V.'"],
      objeto: "Protocolización de acta de asamblea ordinaria donde se aprueban estados financieros",
      precio: "N/A"
    }
  },
  {
    id: "arrendamiento-comercial",
    titulo: "Arrendamiento Comercial con Opción a Compra",
    categoria: "Arrendamiento",
    descripcion: "Escritura de contrato de arrendamiento de local comercial con posibilidad de compra del inmueble al término del contrato.",
    requisitos: [
      "Identificación de arrendador y arrendatario",
      "CURP y RFC de ambos",
      "Certificado de libertad de gravamen del propiedad",
      "Contrato de arrendamiento previas",
      "Descripción del inmueble"
    ],
    impuestos: [
      "ISR sobre rentals",
      "IVA sobre el rentas",
      "ISAI (al ejercer opción de compra)",
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Arrendador: Inmuebles del Centro, S.A. de C.V.", "Arrendatario: Comercios Modernos, S.A. de C.V."],
      objeto: "Arrendamiento de local comercial en Plaza Las Américas, piso 2, local 45",
      precio: "Renta mensual: $50,000.00 + IVA, opción a compra: $3,000,000.00"
    }
  },
  {
    id: "rectificacion-acta",
    titulo: "Rectificación de Acta de Nacimiento",
    categoria: "Estado Civil",
    descripcion: "Escritura para corregir datos erróneos en actas del registro civil, como nombre, fecha, lugar de nacimiento, etc.",
    requisitos: [
      "Acta de nacimiento original con errores",
      "Identificación oficial del solicitante",
      "CURP",
      "Documentación que acredite el dato correcto",
      "Actas de nacimiento de familiares (si aplica)"
    ],
    impuestos: [
      "Derechos de Notaría"
    ],
    ejemploDatos: {
      comparecientes: ["Solicitante: Andrea González Pérez"],
      objeto: "Rectificación de nombre (erróneo: Andrea González, correcto: Andrea González Pérez)",
      precio: "Sin costo"
    }
  }
];

export function buscarPlantilla(termino: string): PlantillaEscritura[] {
  const terminoLower = termino.toLowerCase();
  return plantillasEscrituras.filter(p => 
    p.titulo.toLowerCase().includes(terminoLower) ||
    p.categoria.toLowerCase().includes(terminoLower) ||
    p.descripcion.toLowerCase().includes(terminoLower)
  );
}

export const categoriasEscrituras = [
  "Inmobiliario",
  "Mercantil",
  "Poderes",
  "Testamentario",
  "Societario",
  "Arrendamiento",
  "Estado Civil"
];
