export interface ChecklistDD {
  id: string;
  tipo: 'inmueble' | 'empresa' | 'persona';
  titulo: string;
  descripcion: string;
  categorias: {
    nombre: string;
    items: { texto: string; obligatorio: boolean }[];
  }[];
}

export const checklistsDueDiligence: ChecklistDD[] = [
  {
    id: 'dd-inmueble-urbano',
    tipo: 'inmueble',
    titulo: 'Due Diligence Inmueble Urbano',
    descripcion: 'Verificación completa de un inmueble para compraventa',
    categorias: [
      {
        nombre: 'Identificación del Inmueble',
        items: [
          { texto: 'Escritura pública original o certificada', obligatorio: true },
          { texto: 'Plano de localización y medición', obligatorio: true },
          { texto: 'Certificado de libertad de gravámenes vigente', obligatorio: true },
          { texto: 'Historial de propiedad (últimos 30 años)', obligatorio: true },
          { texto: 'Identificación del vendedor (INE/Pasaporte)', obligatorio: true },
          { texto: 'Poder notarial si opera a través de representante', obligatorio: false }
        ]
      },
      {
        nombre: 'Situación Legal',
        items: [
          { texto: 'Registro Público de la Propiedad actualizado', obligatorio: true },
          { texto: 'No existen litigios pendientes sobre el inmueble', obligatorio: true },
          { texto: 'No existe embargo o hipoteca vigente', obligatorio: true },
          { texto: 'Permisos de construcción y licencias vigentes', obligatorio: true },
          { texto: 'Uso de suelo conforme al municipio', obligatorio: true },
          { texto: 'Certificado de zonificación', obligatorio: false }
        ]
      },
      {
        nombre: 'Situación Fiscal',
        items: [
          { texto: 'Constancia de no adeudo de predial', obligatorio: true },
          { texto: 'Constancia de no adeudo de agua', obligatorio: true },
          { texto: 'Declaraciones fiscales del vendedor al día', obligatorio: false },
          { texto: 'ISR pagado por ganancias en venta anterior', obligatorio: false }
        ]
      },
      {
        nombre: 'Estado Físico',
        items: [
          { texto: 'Inspección física del inmueble', obligatorio: true },
          { texto: 'Avalúo catastral vigente', obligatorio: true },
          { texto: 'Certificado de factibilidad de servicios', obligatorio: false },
          { texto: 'Verificar estado de servicios básicos', obligatorio: true }
        ]
      },
      {
        nombre: 'Documentación Adicional',
        items: [
          { texto: 'Acta de asamblea si es condominio', obligatorio: false },
          { texto: 'Reglamento del condominio', obligatorio: false },
          { texto: 'Estados de cuenta de mantenimiento', obligatorio: false }
        ]
      }
    ]
  },
  {
    id: 'dd-terreno-rustico',
    tipo: 'inmueble',
    titulo: 'Due Diligence Terreno Rústico/Agrícola',
    descripcion: 'Verificación de tierras de uso agrícola o ganadero',
    categorias: [
      {
        nombre: 'Identificación',
        items: [
          { texto: 'Escritura pública del terreno', obligatorio: true },
          { texto: 'Plano topográfico y de linderos', obligatorio: true },
          { texto: 'Certificado de libertad de gravámenes', obligatorio: true },
          { texto: 'Identificación del vendedor', obligatorio: true }
        ]
      },
      {
        nombre: 'Situación Legal Agraria',
        items: [
          { texto: 'Constancia de tierras de uso común (si aplica)', obligatorio: false },
          { texto: 'Verificar si es terreno ejidal o communal', obligatorio: true },
          { texto: 'Certificación de derechos agua', obligatorio: false },
          { texto: 'Permisos de uso de suelo agrícola', obligatorio: false }
        ]
      },
      {
        nombre: 'Fiscal',
        items: [
          { texto: 'Constancia de no adeudo de contribuciones', obligatorio: true },
          { texto: 'Valor cadastral vigente', obligatorio: false }
        ]
      }
    ]
  },
  {
    id: 'dd-empresa-sa',
    tipo: 'empresa',
    titulo: 'Due Diligence Sociedad Anónima',
    descripcion: 'Verificación integral de una empresa para adquisición',
    categorias: [
      {
        nombre: 'Constitución Legal',
        items: [
          { texto: 'Escritura constitutiva y reformas', obligatorio: true },
          { texto: 'Actas de asamblea vigentes', obligatorio: true },
          { texto: 'Poderes vigentes de representantes legales', obligatorio: true },
          { texto: 'Registro Público de Comercio actualizado', obligatorio: true },
          { texto: 'RFC y situaciones fiscales', obligatorio: true }
        ]
      },
      {
        nombre: 'Propiedad Industrial',
        items: [
          { texto: 'Registro de marcas y patentes', obligatorio: false },
          { texto: 'Derechos de autor y software', obligatorio: false },
          { texto: 'Contratos de licencias', obligatorio: false }
        ]
      },
      {
        nombre: 'Laboral',
        items: [
          { texto: 'Contratos de trabajo del personal clave', obligatorio: true },
          { texto: 'Listado de empleados y nóminas', obligatorio: true },
          { texto: 'Verificar keine obligaciones con INFONAVIT', obligatorio: true },
          { texto: 'Verificar keine obligaciones con AFORE', obligatorio: true },
          { texto: 'Litigios laborales pendientes', obligatorio: true }
        ]
      },
      {
        nombre: 'Financiero',
        items: [
          { texto: 'Estados financieros auditados (últimos 3 años)', obligatorio: true },
          { texto: 'Estados de cuenta bancarios', obligatorio: true },
          { texto: 'Créditos vigentes con instituciones financieras', obligatorio: true },
          { texto: 'Cartera de clientes y proveedores principales', obligatorio: false },
          { texto: 'Avalúo de activos fijos', obligatorio: false }
        ]
      },
      {
        nombre: 'Fiscal',
        items: [
          { texto: 'Constancias de situación fiscal', obligatorio: true },
          { texto: 'Declaraciones de los últimos 5 años', obligatorio: true },
          { texto: 'Verificar keine créditos fiscales pendientes', obligatorio: true },
          { texto: 'Constancias de retención de impuestos', obligatorio: false }
        ]
      },
      {
        nombre: 'Legal',
        items: [
          { texto: 'Contratos con proveedores principales', obligatorio: false },
          { texto: 'Contratos con clientes principales', obligatorio: false },
          { texto: 'Litigios pendientes (civiles, mercantiles)', obligatorio: true },
          { texto: 'Compliance anti-lavado de dinero', obligatorio: false }
        ]
      },
      {
        nombre: 'Ambiental',
        items: [
          { texto: 'Licencias ambientales vigentes', obligatorio: false },
          { texto: 'Verificar keine sanciones ambientales', obligatorio: false }
        ]
      }
    ]
  },
  {
    id: 'dd-persona-fisica',
    tipo: 'persona',
    titulo: 'Due Diligence Persona Física',
    descripcion: 'Verificación de antecedentes de una persona',
    categorias: [
      {
        nombre: 'Identificación',
        items: [
          { texto: 'INE vigente', obligatorio: true },
          { texto: 'Pasaporte vigente (si aplica)', obligatorio: false },
          { texto: 'CURP', obligatorio: true },
          { texto: 'RFC', obligatorio: true },
          { texto: 'Comprobante de domicilio reciente', obligatorio: true }
        ]
      },
      {
        nombre: 'Antecedentes Legales',
        items: [
          { texto: 'Constancia de antecedentes no penales', obligatorio: false },
          { texto: 'Verificar是否有 litigios vigentes', obligatorio: true },
          { texto: 'Buscar enlista de personas bloqueadas (UIF)', obligatorio: false }
        ]
      },
      {
        nombre: 'Situación Financiera',
        items: [
          { texto: 'Reporte de buró de crédito', obligatorio: false },
          { texto: 'Declaraciones patrimoniales (si aplica)', obligatorio: false },
          { texto: 'Verificar源 de ingresos', obligatorio: true }
        ]
      },
      {
        nombre: 'Reputación',
        items: [
          { texto: 'Búsqueda en medios de comunicación', obligatorio: false },
          { texto: 'Redes sociales y presencia digital', obligatorio: false }
        ]
      }
    ]
  },
  {
    id: 'dd-arrendamiento',
    tipo: 'inmueble',
    titulo: 'Due Diligence Arrendamiento',
    descripcion: 'Verificación para celebrar contrato de arrendamiento',
    categorias: [
      {
        nombre: 'Del Arrendador',
        items: [
          { texto: 'Identificación oficial del arrendador', obligatorio: true },
          { texto: 'Escritura de propiedad o contrato anterior', obligatorio: true },
          { texto: 'Poder notarial si es persona moral', obligatorio: false },
          { texto: 'Constancia de no adeudo de predial', obligatorio: true }
        ]
      },
      {
        nombre: 'Del Inmueble',
        items: [
          { texto: 'Certificado de libertad de gravámenes', obligatorio: true },
          { texto: 'Verificar нет embargos o hipotecas', obligatorio: true },
          { texto: 'Estado de servicios (luz, agua, gas)', obligatorio: true },
          { texto: 'Permisos de出租 si es local comercial', obligatorio: false }
        ]
      },
      {
        nombre: 'Del Arrendatario',
        items: [
          { texto: 'Identificación oficial', obligatorio: true },
          { texto: 'Constancia de ingresos o recibos de nómina', obligatorio: true },
          { texto: 'Referencias comerciales o personales', obligatorio: false },
          { texto: 'Buró de crédito (recomendado)', obligatorio: false }
        ]
      }
    ]
  }
];

export const buscarChecklist = (termino: string, tipo?: string): ChecklistDD[] => {
  const t = termino.toLowerCase();
  return checklistsDueDiligence.filter(c => {
    const coincideTipo = !tipo || c.tipo === tipo;
    const coincideBusqueda = !t || 
      c.titulo.toLowerCase().includes(t) || 
      c.descripcion.toLowerCase().includes(t);
    return coincideTipo && coincideBusqueda;
  });
};
