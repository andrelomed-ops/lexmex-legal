export interface TerminoLegal {
  id: string;
  termino: string;
  definicion: string;
  categoria: string;
  sinonimos?: string[];
  ejemplo?: string;
}

export const glosarioLegal: TerminoLegal[] = [
  // Términos originales
  {
    id: 'demanda',
    termino: 'Demanda',
    definicion: 'Escrit judicial mediante el cual una persona (actor) solicita al órgano jurisdiccional que se resuelva un litigio, condenando a la otra parte (demandado) al cumplimiento de una pretensión.',
    categoria: 'Procesal Civil',
    sinonimos: ['Reclamación', 'Pleito', 'Acción'],
    ejemplo: 'El actor promueve demanda de divorcio necesario contra su cónyuge.'
  },
  // ... (los demás términos están en el archivo original)
  
  // NUEVOS TÉRMINOS - LABORAL
  {
    id: 'contrato-indefinido',
    termino: 'Contrato de Trabajo por Tiempo Indefinido',
    definicion: 'Contrato laboral que no tiene fecha de terminación establecida, subsistente mientras no exista causa legal que le ponga fin.',
    categoria: 'Laboral',
    ejemplo: 'La mayoría de los contratos laborales son por tiempo indefinido.'
  },
  {
    id: 'contrato-temporal',
    termino: 'Contrato de Trabajo Temporal',
    definicion: 'Contrato laboral cuya duración está limitada a un plazo específico o a la realización de una obra determinada.',
    categoria: 'Laboral'
  },
  {
    id: 'despido-injustificado',
    termino: 'Despido Injustificado',
    definicion: 'Terminación unilateral del contrato de trabajo por parte del patrón sin causa justificada.',
    categoria: 'Laboral',
    ejemplo: 'El despido injustificado genera derecho a indemnización.'
  },
  {
    id: 'liquidacion',
    termino: 'Liquidación Laboral',
    definicion: 'Pago que debe realizar el patrón al trabajador al terminar la relación laboral, incluye indemnización, prima de antigüedad y partes proporcionales.',
    categoria: 'Laboral'
  },
  {
    id: 'salarios-caidos',
    termino: 'Salarios Caídos',
    definicion: 'Salarios que dejó de percibir el trabajador desde la fecha del despido hasta la fecha en que se le ofrece kembali a trabajar o se dicta laudo.',
    categoria: 'Laboral'
  },
  {
    id: 'prima-antiguedad',
    termino: 'Prima de Antigüedad',
    definicion: 'Prestacionesoo que equivale a 12 días de salario por cada año de servicios, cuando la terminación laboral no es por causa justificada.',
    categoria: 'Laboral'
  },
  {
    id: 'aguinaldo',
    termino: 'Aguinaldo',
    definicion: 'Prestacion anual equivalente a 15 días de salario, que el patrón debe pagar al trabajador antes del 20 de diciembre.',
    categoria: 'Laboral'
  },
  {
    id: 'ptu',
    termino: 'Participación de los Trabajadores en las Utilidades',
    definicion: 'Derecho de los trabajadores a participar del 10% de las utilidades netas de la empresa.',
    categoria: 'Laboral'
  },
  {
    id: 'infonavit',
    termino: 'INFONAVIT',
    definicion: 'Instituto del Fondo Nacional para la Vivienda de los Trabajadores, organismo que otorga créditos para vivienda a los trabajadores.',
    categoria: 'Laboral'
  },
  {
    id: 'imss',
    termino: 'IMSS',
    definicion: 'Instituto Mexicano del Seguro Social, institución que administra el seguro social obligatorio para trabajadores.',
    categoria: 'Laboral'
  },
  {
    id: 'riesgo-trabajo',
    termino: 'Riesgo de Trabajo',
    definicion: 'Accidentes y enfermedades a que están expuestos los trabajadores en ejercicio o con motivo del trabajo.',
    categoria: 'Laboral'
  },
  {
    id: 'enfermedad-laboral',
    termino: 'Enfermedad Laboral',
    definicion: 'Estado patológico derivado de la continuación o exposición al agente causal que produce la enfermedad.',
    categoria: 'Laboral'
  },
  {
    id: 'incapacidad-laboral',
    termino: 'Incapacidad Laboral',
    definicion: 'Estado físico o mental temporal que impide al trabajador desempeñar sus labores.',
    categoria: 'Laboral'
  },
  {
    id: 'vacaciones',
    termino: 'Vacaciones',
    definicion: 'Período de descanso remunerado al que tiene derecho el trabajador después de laborar un año.',
    categoria: 'Laboral'
  },
  {
    id: 'prima-vacacional',
    termino: 'Prima Vacacional',
    definicion: 'Pago adicional equivalente a cuando menos el 25% del salario que corresponda al período de vacaciones.',
    categoria: 'Laboral'
  },
  {
    id: 'jornada-laboral',
    termino: 'Jornada Laboral',
    definicion: 'Tiempo que el trabajador permanece a disposición del patrón para prestar sus servicios.',
    categoria: 'Laboral'
  },
  {
    id: 'horas-extras',
    termino: 'Horas Extraordinarias',
    definicion: 'Tiempo de trabajo que excede la jornada máxima legal, con salario incrementado.',
    categoria: 'Laboral'
  },
  {
    id: 'sindicalizacion',
    termino: 'Sindicalización',
    definicion: 'Derecho de los trabajadores a constituir sindical para la defensa de sus intereses comunes.',
    categoria: 'Laboral'
  },
  {
    id: 'contrato-colectivo',
    termino: 'Contrato Colectivo de Trabajo',
    definicion: 'Convenio celebrado entre uno o varios sindicatos de trabajadores y uno o varios patrones.',
    categoria: 'Laboral'
  },
  {
    id: 'huelga',
    termino: 'Huelga',
    definicion: 'Suspensión temporal del trabajo como resultado de un conflicto colectivo de carácter laboral.',
    categoria: 'Laboral'
  },
  
  // NUEVOS TÉRMINOS - FISCAL
  {
    id: 'isr',
    termino: 'ISR',
    definicion: 'Impuesto Sobre la Renta, gravar los ingresos de personas físicas y morales.',
    categoria: 'Fiscal'
  },
  {
    id: 'iva',
    termino: 'IVA',
    definicion: 'Impuesto al Valor Agregado, gravar la transferencia de bienes y servicios.',
    categoria: 'Fiscal'
  },
  {
    id: 'ieps',
    termino: 'IEPS',
    definicion: 'Impuesto Especial sobre Producción y Servicios, gravar bienes específicos como gasolina, alcohol, tabaco.',
    categoria: 'Fiscal'
  },
  {
    id: 'retencion',
    termino: 'Retención',
    definicion: 'Monto que un pagador deduce del pago a un trabajador o proveedor para enterarlo al fisco.',
    categoria: 'Fiscal'
  },
  {
    id: 'acreditamiento',
    termino: 'Acreditamiento',
    definicion: 'Compensación de un crédito fiscal con un pago provisional o definitivo.',
    categoria: 'Fiscal'
  },
  {
    id: 'deduccion',
    termino: 'Deducción',
    definicion: 'Gastos que pueden restarse de los ingresos para determinar la base gravable.',
    categoria: 'Fiscal'
  },
  {
    id: 'base-gravable',
    termino: 'Base Gravable',
    definicion: 'Monto sobre el cual se calcula el impuesto a pagar.',
    categoria: 'Fiscal'
  },
  {
    id: 'persona-moral',
    termino: 'Persona Moral',
    definicion: 'Entidad jurídico-legal constituida conforme a la ley, con derechos y obligaciones.',
    categoria: 'Fiscal'
  },
  {
    id: 'persona-fisica',
    termino: 'Persona Física',
    definicion: 'Individuo con capacidad para adquirir derechos y obligaciones.',
    categoria: 'Fiscal'
  },
  {
    id: 'regimen-general',
    termino: 'Régimen General de Personas Morales',
    definicion: 'Régimen fiscal aplicable a sociedades anónimas, sociedades de responsabilidad limitada y otras.',
    categoria: 'Fiscal'
  },
  {
    id: 'regimen-simplificado',
    termino: 'Régimen Simplificado de Confianza',
    definicion: 'Régimen fiscal simplificado para personas morales con ingresos anuales menores a ciertos límites.',
    categoria: 'Fiscal'
  },
  {
    id: 'factura-electronica',
    termino: 'Factura Electrónica',
    definicion: 'Documento fiscal digital que ampara operaciones comerciales, validado por el SAT.',
    categoria: 'Fiscal'
  },
  {
    id: 'cfdi',
    termino: 'CFDI',
    definicion: 'Comprobante Fiscal Digital por Internet, versión actual de la factura electrónica mexicana.',
    categoria: 'Fiscal'
  },
  {
    id: 'sat',
    termino: 'SAT',
    definicion: 'Servicio de Administración Tributaria, organismo encargado de ADMINISTRAR los impuestos federales.',
    categoria: 'Fiscal'
  },
  {
    id: 'declaracion-anual',
    termino: 'Declaración Anual',
    definicion: 'Declaración que deben presentar personas físicas y morales para liquidar el impuesto del ejercicio.',
    categoria: 'Fiscal'
  },
  {
    id: 'declaracion-provisional',
    termino: 'Declaración Provisional',
    definicion: 'Declaración de pagos provisionales de ISR que se presentan de forma mensual o trimestral.',
    categoria: 'Fiscal'
  },
  
  // NUEVOS TÉRMINOS - MERCANTIL
  {
    id: 'sa',
    termino: 'Sociedad Anónima',
    definicion: 'Tipo de sociedad mercantil con capital dividido en acciones, cuyos propietarios tienen responsabilidad limitada.',
    categoria: 'Mercantil'
  },
  {
    id: 'sas',
    termino: 'Sociedad por Acciones Simplificada',
    definicion: 'Sociedad mercantil que puede constituirse por una o varias personas, con flexibilidad en su organización.',
    categoria: 'Mercantil'
  },
  {
    id: 's-de-rl',
    termino: 'Sociedad de Responsabilidad Limitada',
    definicion: 'Sociedad mercantil donde el capital está dividido en participaciones, sin poder constituirse por acciones.',
    categoria: 'Mercantil'
  },
  {
    id: 'scpp',
    termino: 'Sociedad Cooperativa',
    definicion: 'Entidad formada por personas que se asocian para satisfacer necesidades económicas comunes.',
    categoria: 'Mercantil'
  },
  {
    id: 'asociacion-participacion',
    termino: 'Asociación en Participación',
    definicion: 'Contrato por el cual una persona concede a otras participar en las utilidades de un negocio mercantil.',
    categoria: 'Mercantil'
  },
  {
    id: 'cheque',
    termino: 'Cheque',
    definicion: 'Título de crédito que contiene la orden incondition de pagar una suma de dinero a la presentación.',
    categoria: 'Mercantil'
  },
  {
    id: 'conocimiento-embarque',
    termino: 'Conocimiento de Embarque',
    definicion: 'Documento que acredita la recepción de mercancías para su transporte marítimo o aéreo.',
    categoria: 'Mercantil'
  },
  {
    id: ' endosar',
    termino: 'Endoso',
    definicion: 'Traspaso de un título de crédito mediante leyenda en el reverso.',
    categoria: 'Mercantil'
  },
  {
    id: 'aval',
    termino: 'Aval',
    definicion: 'Garantía personal por la cual una persona se obliga subsidiariamente al cumplimiento de una obligación.',
    categoria: 'Mercantil'
  },
  {
    id: 'fianza',
    termino: 'Fianza',
    definicion: 'Contrato mercantil por el cual una persona se obliga a pagar una deuda ajena en caso de incumplimiento.',
    categoria: 'Mercantil'
  },
  {
    id: 'carta-credito',
    termino: 'Carta de Crédito',
    definicion: 'Documento emitido por un banco a petición de un cliente, comprometiéndose a pagar a un beneficiario.',
    categoria: 'Mercantil'
  },
  {
    id: 'arrendamiento-financiero',
    termino: 'Arrendamiento Financiero',
    definicion: 'Contrato por el cual el arrendador traspasa el derecho a usar bienes a cambio de pagos periódicos.',
    categoria: 'Mercantil'
  },
  {
    id: 'factoraje',
    termino: 'Factoraje',
    definicion: 'Contrato por el cual una empresa cede sus cuentas por cobrar a una empresa de factoraje.',
    categoria: 'Mercantil'
  },
  
  // NUEVOS TÉRMINOS - PENAL
  {
    id: 'querella',
    termino: 'Querella',
    definicion: 'Acusación formal ante el Ministerio Público respecto de un delito que necesita ser querellado.',
    categoria: 'Penal'
  },
  {
    id: 'denuncia',
    termino: 'Denuncia',
    definicion: 'Comunicación al Ministerio Público sobre la comisión de un delito.',
    categoria: 'Penal'
  },
  {
    id: 'averiguacion-previa',
    termino: 'Averiguación Previa',
    definicion: 'Investigación que realiza el Ministerio Público para determinar si se cometió un delito y quién lo cometió.',
    categoria: 'Penal'
  },
  {
    id: 'imputado',
    termino: 'Imputado',
    definicion: 'Persona contra quien se dirige la investigación de un delito.',
    categoria: 'Penal'
  },
  {
    id: 'procesado',
    termino: 'Procesado',
    definicion: 'Persona contra quien se hadictado auto de vinculación a proceso.',
    categoria: 'Penal'
  },
  {
    id: 'acusado',
    termino: 'Acusado',
    definicion: 'Persona contra quien se ha formulado acusación en el juicio oral.',
    categoria: 'Penal'
  },
  {
    id: 'sentencia-condena',
    termino: 'Sentencia Condenatoria',
    definicion: 'Resolución judicial que declara culpable al acusado y le impone una pena.',
    categoria: 'Penal'
  },
  {
    id: 'sentencia-absolutoria',
    termino: 'Sentencia Absolutoria',
    definicion: 'Resolución judicial que declara inocente al acusado.',
    categoria: 'Penal'
  },
  {
    id: 'libertad-caucion',
    termino: 'Libertad bajo Caución',
    definicion: 'Derecho del imputado de obtener su libertad mediante el depósito de una cantidad de dinero.',
    categoria: 'Penal'
  },
  {
    id: 'prision-preventiva',
    termino: 'Prisión Preventiva',
    definicion: 'Medida cautelar consistente en la internación del imputado en un centro de reinserción.',
    categoria: 'Penal'
  },
  {
    id: 'Medidas-cautelares',
    termino: 'Medidas Cautelares',
    definicion: 'Disposiciones que el juez puede imponer al imputado para garantizar el desarrollo del proceso.',
    categoria: 'Penal'
  },
  {
    id: 'juicio-oral',
    termino: 'Juicio Oral',
    definicion: 'Procedimiento penal donde las pruebas se desahogan públicamente de forma verbal.',
    categoria: 'Penal'
  },
  {
    id: 'procedimiento-abreviado',
    termino: 'Procedimiento Abreviado',
    definicion: 'Modalidad de terminación anticipada del proceso penal con consentimiento del acusado.',
    categoria: 'Penal'
  },
  {
    id: 'suspension-condicional',
    termino: 'Suspensión Condicional del Proceso',
    definicion: 'Acuerdo entre Fiscal y imputados para suspender el proceso cumplimiento de condiciones.',
    categoria: 'Penal'
  },
  {
    id: 'delito-flagrante',
    termino: 'Delito Flagrante',
    definicion: 'Delito que se está cometiendo o que acaba de cometerse cuando se surprende al responsable.',
    categoria: 'Penal'
  },
  {
    id: 'delito-quasi-flagrante',
    termino: 'Delito Cuasi Flagrante',
    definicion: 'Situación en que alguien es pursued por la victima o el crowd inmediatamente después de cometido el delito.',
    categoria: 'Penal'
  },
  
  // NUEVOS TÉRMINOS - ADMINISTRATIVO
  {
    id: 'licencia-construccion',
    termino: 'Licencia de Construcción',
    definicion: 'Autorización administrativa para ejecutar obras de construcción en un inmuebl',
    categoria: 'Administrativo'
  },
  {
    id: 'licencia-funcionamiento',
    termino: 'Licencia de Funcionamiento',
    definicion: 'Autorización para operar un establecimiento mercantil o de servicios.',
    categoria: 'Administrativo'
  },
  {
    id: 'permiso-ambiental',
    termino: 'Permiso Ambiental',
    definicion: 'Autorización para realizar actividades que puedan afectar el medio ambiente.',
    categoria: 'Administrativo'
  },
  {
    id: 'impacto-ambiental',
    termino: 'Manifestación de Impacto Ambiental',
    definicion: 'Documento que describe los efectos de un proyecto sobre el medio ambiente.',
    categoria: 'Administrativo'
  },
  {
    id: 'recurso-administrativo',
    termino: 'Recurso Administrativo',
    definicion: 'Medio de defensa contra actos administrativos emitido por la autoridad.',
    categoria: 'Administrativo'
  },
  {
    id: 'revocacion',
    termino: 'Revocación',
    definicion: 'Medio de defensa que solicita leave the efectos de un acto administrativo.',
    categoria: 'Administrativo'
  },
  {
    id: 'nulidad',
    termino: 'Nulidad',
    definicion: 'Declaración de invalidez de un acto jurídico por incumplimiento de requisitos esenciales.',
    categoria: 'Administrativo'
  },
  {
    id: 'inhabilitacion',
    termino: 'Inhabilitación',
    definicion: 'Sanción administrativa que prohibe a una persona ejercer determinado cargo o actividad.',
    categoria: 'Administrativo'
  },
  {
    id: 'multa-administrativa',
    termino: 'Multa Administrativa',
    definicion: 'Sanción pecuniaria que se impone por incumplimiento de obligaciones administrativas.',
    categoria: 'Administrativo'
  },
  {
    id: 'amonestacion',
    termino: 'Amonestación',
    definicion: 'Sanción consistente en la reprensión verbal o escrita al infractor.',
    categoria: 'Administrativo'
  },
  
  // NUEVOS TÉRMINOS - PROCESAL
  {
    id: 'juicio-civil',
    termino: 'Juicio Ordinario Civil',
    definicion: 'Procedimiento judicial para resolver controversias sobre derechos disponibles.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'juicio-ejecutivo',
    termino: 'Juicio Ejecutivo',
    definicion: 'Procedimiento para reclamar deudas ciertas, líquidas y exigibles documentadas en título ejecutivo.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'juicio-sumario',
    termino: 'Juicio Sumario',
    definicion: 'Procedimiento más ágil para ciertos tipos de controversias.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'verbos-procesales',
    termino: 'Actos Procesales',
    definicion: 'Actos realizados por las partes, el juez y demás subjectos del proceso.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'notificacion',
    termino: 'Notificación',
    definicion: 'Comunicación formal de resoluciones judiciales a las partes.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'emplazamiento',
    termino: 'Emplazamiento',
    definicion: 'Notificación mediante la cual se cita a una parte para que comparezca al juicio.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'contumacia',
    termino: 'Contumacia',
    definicion: 'Rebeldía de la parte que no comparece al juicio despite de haber sido emplazada.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'rebeldia',
    termino: 'Rebeldía',
    definicion: 'Situación de la parte que no comparece al juicio después de ser citada.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'prueba',
    termino: 'Prueba',
    definicion: 'Medio de convicción que sirve para establecer la verdad de los hechos discutidos.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'indicios',
    termino: 'Indicios',
    definicion: 'Hechos conocidos de los que puede inferirse la existencia de otros hechos desconocidos.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'presunciones',
    termino: 'Presunciones',
    definicion: 'Consecuencias que la ley o el juez deducen de un hecho conocido.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'cosa-juzgada-material',
    termino: 'Cosa Juzgada Material',
    definicion: 'Efecto por el cual una sentencia inapelable es inmutable entre las mismas partes.',
    categoria: 'Procesal Civil'
  },
  {
    id: ' cosa-juzgada-formal',
    termino: 'Cosa Juzgada Formal',
    definicion: 'Efecto que impide volver a tratar un asunto que ha sido resuelto.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'ejecucion-sentencia',
    termino: 'Ejecución de Sentencia',
    definicion: 'Procedimiento para compel al cumplimiento forzado de lo condenado en una sentencia.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'embargo-preparado',
    termino: 'Embargo Preparado',
    definicion: 'Trámite previo al embargo ejecutivo consistente en asegurar bienes del deudor.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'secuestro-judicial',
    termino: 'Secuestro Judicial',
    definicion: 'Medida cautelar que consiste en poner bienes bajo custodia del tribunal.',
    categoria: 'Procesal Civil'
  },
  
  // NUEVOS TÉRMINOS - FAMILIAR
  {
    id: 'divorcio-necesario',
    termino: 'Divorcio Necesario',
    definicion: 'Procedimiento de divorcio por causa justificada Adulterio, violencia, abandono, etc.',
    categoria: 'Familiar'
  },
  {
    id: 'divorcio-voluntario',
    termino: 'Divorcio Voluntario',
    definicion: 'Procedimiento de divorcio mutuo consentimiento donde ambas partes están de acuerdo.',
    categoria: 'Familiar'
  },
  {
    id: 'regimen-visitas',
    termino: 'Régimen de Visitas',
    definicion: 'Acuerdo o resolución que regula el derecho del progenitor no custodio a estar con sus hijos.',
    categoria: 'Familiar'
  },
  {
    id: 'custodia',
    termino: 'Custodia',
    definicion: 'Derecho y obligación de tener a los hijos bajo su cuidado y tomar decisiones.',
    categoria: 'Familiar'
  },
  {
    id: 'guarda-custodia',
    termino: 'Guarda y Custodia',
    definicion: 'Institución por la cual se otorga a una persona la responsabilidad del cuidado de un menor.',
    categoria: 'Familiar'
  },
  {
    id: 'usufructo-paterno',
    termino: 'Usufructo Paterno',
    definicion: 'Derecho de los padres a AdminBEBEN los bienes de sus hijos menores.',
    categoria: 'Familiar'
  },
  {
    id: 'investigacion-paternidad',
    termino: 'Investigación de Paternidad',
    definicion: 'Procedimiento judicial para establecer la filiación de un hijo.',
    categoria: 'Familiar'
  },
  {
    id: 'adopcion',
    termino: 'Adopción',
    definicion: 'Institución jurídica que crea una relación de filiación entre adoptante y adoptado.',
    categoria: 'Familiar'
  },
  {
    id: 'declaracion-estado-interdiccion',
    termino: 'Declaración de Estado de Interdicción',
    definicion: 'Procedimiento para declarar a una persona incapacitada judicialmente.',
    categoria: 'Familiar'
  },
  {
    id: 'acuerdo-partes',
    termino: 'Convenio de Partes',
    definicion: 'Acuerdo entre esposos sobre guarda, custodia, pensiones y división de bienes.',
    categoria: 'Familiar'
  },
  
  // NUEVOS TÉRMINOS - CONSTITUCIONAL
  {
    id: 'garantias-individuales',
    termino: 'Garantías Individuales',
    definicion: 'Derechos fundamentales previstos en el Título Primero de la Constitución.',
    categoria: 'Constitucional'
  },
  {
    id: 'amparo-directo',
    termino: 'Amparo Directo',
    definicion: 'Recurso contra sentencias definitivas que violen garantías individuales.',
    categoria: 'Constitucional'
  },
  {
    id: 'amparo-indirecto',
    termino: 'Amparo Indirecto',
    definicion: 'Recurso contra actos de autoridad que no sean sentencias.',
    categoria: 'Constitucional'
  },
  {
    id: 'amparo-contra-ley',
    termino: 'Amparo contra Leyes',
    definicion: 'Recurso contra leyes que vulneren derechos fundamentales.',
    categoria: 'Constitucional'
  },
  {
    id: 'suspension-provisional',
    termino: 'Suspensión Provisional',
    definicion: 'Medida cautelar en amparo que suspende temporalmente el acto impugnado.',
    categoria: 'Constitucional'
  },
  {
    id: 'suspension-definitiva',
    termino: 'Suspensión Definitiva',
    definicion: 'Suspensión que perdura hasta resolver el amparo.',
    categoria: 'Constitucional'
  },
  {
    id: 'revision-amparista',
    termino: 'Revisión Amparista',
    definicion: 'Recurso contra sentencias de amparo dictadas por tribunales colegiados.',
    categoria: 'Constitucional'
  },
  {
    id: 'controversia-constitucional',
    termino: 'Controversia Constitucional',
    definicion: 'Conflicto entre órganos del Estado por invasión de competencias.',
    categoria: 'Constitucional'
  },
  {
    id: 'accion-inconstitucionalidad',
    termino: 'Acción de Inconstitucionalidad',
    definicion: 'Medio de control para declarado invalidez de leyes.',
    categoria: 'Constitucional'
  },
  {
    id: 'controversia-arancelaria',
    termino: 'Controversia Arancelaria',
    definicion: 'Conflicto entre particulares y autoridades por aplicación de aranceles.',
    categoria: 'Constitucional'
  },
  
  // NUEVOS TÉRMINOS - INTERNACIONAL
  {
    id: 'tratado-internacional',
    termino: 'Tratado Internacional',
    definicion: 'Acuerdo entre Estados regido por el derecho internacional.',
    categoria: 'Internacional'
  },
  {
    id: 'inversion-extranjera',
    termino: 'Inversión Extranjera',
    definicion: 'Inversión de capital extranjero en territorio nacional.',
    categoria: 'Internacional'
  },
  {
    id: 'comercio-exterior',
    termino: 'Comercio Exterior',
    definicion: 'Importación y exportación de bienes y servicios entre países.',
    categoria: 'Internacional'
  },
  {
    id: 'arancel-aduanero',
    termino: 'Arancel Aduanero',
    definicion: 'Tarifa de impuestos aplicables a las mercancías importadas o exportadas.',
    categoria: 'Internacional'
  },
  {
    id: 'regla-origen',
    termino: 'Regla de Origen',
    definicion: 'Criterios para determinar el país donde se produjo un bien.',
    categoria: 'Internacional'
  },
  {
    id: ' TLCAN',
    termino: 'TLCAN/USMCA',
    definicion: 'Tratado de libre comercio entre México, Estados Unidos y Canadá.',
    categoria: 'Internacional'
  },
  {
    id: 'demanda',
    termino: 'Demanda',
    definicion: 'Escrito judicial mediante el cual una persona (actor) solicita al órgano jurisdiccional que se resuelva un litigio, condenando a la otra parte (demandado) al cumplimiento de una pretensión.',
    categoria: 'Procesal Civil',
    sinonimos: ['Reclamación', 'Pleito', 'Acción'],
    ejemplo: 'El actor promueve demanda de divorcio necesario contra su cónyuge.'
  },
  {
    id: 'contestacion',
    termino: 'Contestación de Demanda',
    definicion: 'Escrito mediante el cual el demandado responde a los hechos y pretensiones de la demanda, opone excepciones y ofrece pruebas.',
    categoria: 'Procesal Civil',
    sinonimos: ['Respuesta a la demanda']
  },
  {
    id: 'excepcion',
    termino: 'Excepción',
    definicion: 'Medio de defensa del demandado que tiene por objeto rechazar, total o parcialmente, las pretensiones del actor, sin entrar al fondo del asunto.',
    categoria: 'Procesal Civil',
    sinonimos: ['Defensa', 'Objeción'],
    ejemplo: 'Las excepciones de falta de personalidad, competencia o prescripción.'
  },
  {
    id: 'reconvencion',
    termino: 'Reconvención',
    definicion: 'Demanda que formula el demandado contra el actor dentro del mismo juicio, exigiendole algo que es opposite a la pretensión principal.',
    categoria: 'Procesal Civil',
    ejemplo: 'El demandado reconviene por incumplimiento de contrato.'
  },
  {
    id: 'embargo',
    termino: 'Embargo',
    definicion: 'Medida cautelar consistente en asegurar los bienes del deudor para garantizar el cumplimiento de una obligación.',
    categoria: 'Procesal Civil',
    sinonimos: ['Secuestro', 'Aseguramiento']
  },
  {
    id: 'ejecucion',
    termino: 'Ejecución',
    definicion: 'Cumplimiento forzoso del deudor al cumplimiento de una obligación, mediante la venta en pública subasta de sus bienes.',
    categoria: 'Procesal Civil',
    ejemplo: 'Juicio ejecutivo mercantil para cobrar un pagaré.'
  },
  {
    id: 'prescripcion',
    termino: 'Prescripción',
    definicion: 'Pérdida de un derecho por no ejercerlo dentro del plazo legal establecido. Puede ser positiva (adquisitiva) o negativa (extintiva).',
    categoria: 'Civil',
    ejemplo: 'La prescripción negativa de acciones civiles es generalmente de 10 años.'
  },
  {
    id: 'caducidad',
    termino: 'Caducidad',
    definicion: 'Pérdida de un derecho o acción por no ejercerlo dentro del plazo establecido, sin que resulte necesario el transcurso del tiempo.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'cosa-juzgada',
    termino: 'Cosa Juzgada',
    definicion: 'Efecto por el cual una sentencia definitiva adquiere fuerza de ley y no puede ser impugnada ni discutida nuevamente entre las mismas partes.',
    categoria: 'Procesal Civil',
    ejemplo: 'La cosa juzgada impide un segundo juicio sobre el mismo asunto.'
  },
  {
    id: 'litis',
    termino: 'Litis',
    definicion: 'Conflicto o controversia sometida a decisión judicial.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'litisconsorcio',
    termino: 'Litisconsorcio',
    definicion: 'Unión de varias personas como partes en un mismo juicio, ya sea como demandantes o demandados.',
    categoria: 'Procesal Civil',
    ejemplo: 'Varios herederos demandan conjuntamente al deudor.'
  },
  {
    id: 'incidente',
    termino: 'Incidente',
    definicion: 'Procedimiento secundario que surge dentro de un juicio principal para resolver cuestiones incidentales.',
    categoria: 'Procesal Civil',
    ejemplo: 'Incidente de nulidad de notificaciones.'
  },
  {
    id: 'apelacion',
    termino: 'Apelación',
    definicion: 'Recurso ordinario contra sentencias definitivas o interlocutorias, que se interpone ante el tribunal de segunda instancia.',
    categoria: 'Procesal Civil',
    sinonimos: ['Recurso de apelación']
  },
  {
    id: 'amparo',
    termino: 'Amparo',
    definicion: 'Garantía constitucional que protege a las personas contra actos de autoridades que vulneren sus derechos fundamentales.',
    categoria: 'Constitucional',
    ejemplo: 'Amparo directo contra sentencias que violen derechos humanos.'
  },
  {
    id: 'agravio',
    termino: 'Agravio',
    definicion: 'Daño o perjuicio que causa a una parte la resolución judicial contra la que recurre, y que justifica la interposición del recurso.',
    categoria: 'Procesal Civil',
    ejemplo: 'Los agravios son los motivos del recurso de apelación.'
  },
  {
    id: 'sentencia-definitiva',
    termino: 'Sentencia Definitiva',
    definicion: 'Resolución judicial que pone fin al juicio, decidiendo sobre el fondo del asunto.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'sentencia-interlocutoria',
    termino: 'Sentencia Interlocutoria',
    definicion: 'Resolución judicial que decide incidentes o cuestiones accesorias, sin resolver el fondo del litigio.',
    categoria: 'Procesal Civil'
  },
  {
    id: 'titulo-ejecutivo',
    termino: 'Título Ejecutivo',
    definicion: 'Documento que acredita un derecho y faculta para exigir judicialmente el cumplimiento de una obligación.',
    categoria: 'Civil',
    ejemplo: 'El pagaré, la lettre de cambio y el contrato son títulos ejecutivos.'
  },
  {
    id: 'pagaré',
    termino: 'Pagaré',
    definicion: 'Título de crédito que contiene la promesa incondicional de pagar una cantidad determinada en cierta fecha.',
    categoria: 'Mercantil',
    ejemplo: 'El pagaré es título ejecutivo mercantil.'
  },
  {
    id: 'letra-cambio',
    termino: 'Letra de Cambio',
    definicion: 'Título de crédito por el cual una persona (librador) ordena a otra (librado) el pago de una cantidad a un tercero (tomador).',
    categoria: 'Mercantil'
  },
  {
    id: 'factor',
    termino: 'Factor',
    definicion: 'Institución mercantil que se encarga de la administración de un establecimiento de comercio por cuenta del comerciante.',
    categoria: 'Mercantil'
  },
  {
    id: 'comisionista',
    termino: 'Comisionista',
    definicion: 'Persona que se dedica a realizar operaciones comerciales por cuenta ajena, percibiendo una comisión.',
    categoria: 'Mercantil'
  },
  {
    id: 'representante-legal',
    termino: 'Representante Legal',
    definicion: 'Persona que actúa en nombre y representación de otra, generalmente por ser su tutor, padre, o apoderado.',
    categoria: 'Civil'
  },
  {
    id: 'apoderado',
    termino: 'Apoderado',
    definicion: 'Persona que recibe poder de otra para actuar en su nombre en determinados asuntos.',
    categoria: 'Civil'
  },
  {
    id: 'mandato',
    termino: 'Mandato',
    definicion: 'Contrato por el cual una persona se obliga a realizar uno o más actos jurídicos por cuenta de otra.',
    categoria: 'Civil'
  },
  {
    id: 'arrendamiento',
    termino: 'Arrendamiento',
    definicion: 'Contrato por el cual una persona (arrendador) cede el uso de un bien a otra (arrendatario) por tiempo determinado y precio cierto.',
    categoria: 'Civil'
  },
  {
    id: 'comodato',
    termino: 'Comodato',
    definicion: 'Contrato por el cual una persona (comodante) cede el uso gratuito de un bien a otra (comodatario).',
    categoria: 'Civil'
  },
  {
    id: 'mutuo',
    termino: 'Mutuo',
    definicion: 'Contrato por el cual una persona (mutuante) entrega dinero u otras cosas fungibles a otra (mutuario), quien se obliga a devolver otro tanto de la misma especie.',
    categoria: 'Civil',
    ejemplo: 'El préstamo de dinero genera intereses.'
  },
  {
    id: 'deposito',
    termino: 'Depósito',
    definicion: 'Contrato por el cual una persona (depositario) recibe un objeto para custodiarlo y devolverlo posteriormente.',
    categoria: 'Civil'
  },
  {
    id: 'transaccion',
    termino: 'Transacción',
    definicion: 'Contrato por el cual las partes arreglan extrajudicialmente un litigio, cediendo cada una algo en favor de la otra.',
    categoria: 'Civil'
  },
  {
    id: 'concubinato',
    termino: 'Concubinato',
    definicion: 'Unión de un hombre y una mujer que viven juntos como esposos sin estar casados legalmente.',
    categoria: 'Familiar'
  },
  {
    id: 'pension-alimenticia',
    termino: 'Pensión Alimenticia',
    definicion: 'Obligación de proporcionar alimentos (manutención, habitación, vestido, educación) a quien no puede proveérselos por sí mismo.',
    categoria: 'Familiar',
    ejemplo: 'Los padres deben pension alimenticia a sus hijos menores.'
  },
  {
    id: ' patria-potestad',
    termino: 'Patria Potestad',
    definicion: 'Conjunto de derechos y obligaciones que corresponden a los padres sobre sus hijos menores no emancipados.',
    categoria: 'Familiar'
  },
  {
    id: 'tutela',
    termino: 'Tutela',
    definicion: 'Institución de protección para menores incapacitados o adultos que no pueden gobernarse a sí mismos.',
    categoria: 'Familiar'
  },
  {
    id: 'curatela',
    termino: 'Curatela',
    definicion: 'Institución complementaria de la tutela para mayores de edad que, por ciertas condiciones, necesitan asistencia.',
    categoria: 'Familiar'
  },
  {
    id: 'sucesion',
    termino: 'Sucesión',
    definicion: 'Transmisión de los bienes, derechos y obligaciones de una persona fallecida a sus herederos o legatarios.',
    categoria: 'Civil'
  },
  {
    id: 'herencia',
    termino: 'Herencia',
    definicion: 'Conjunto de bienes, derechos y obligaciones que se transmiten del deceased a sus herederos.',
    categoria: 'Civil'
  },
  {
    id: 'testamento',
    termino: 'Testamento',
    definicion: 'Acto unilateral por el cual una persona dispone de sus bienes para después de su muerte.',
    categoria: 'Civil'
  },
  {
    id: 'legado',
    termino: 'Legado',
    definicion: 'Disposición testamentaria por la cual el testador transmite uno o más bienes específicos a una persona determinada.',
    categoria: 'Civil'
  },
  {
    id: 'fideicomiso',
    termino: 'Fideicomiso',
    definicion: 'Negio jurídico por el cual una persona (fideicomitente) transmite bienes a otra (fiduciario) para que los AdminTre para un fin determinado.',
    categoria: 'Civil'
  },
  {
    id: 'garantia-real',
    termino: 'Garantía Real',
    definicion: 'Derecho real que grava un bien para asegurar el cumplimiento de una obligación.',
    categoria: 'Civil'
  },
  {
    id: 'hipoteca',
    termino: 'Hipoteca',
    definicion: 'Garantía real sobre bienes inmuebles que permanecen en poder del deudor.',
    categoria: 'Civil'
  },
  {
    id: 'prenda',
    termino: 'Prenda',
    definicion: 'Garantía real sobre bienes muebles que se entregan al acreedor o a un tercero.',
    categoria: 'Civil'
  },
  {
    id: 'anticresis',
    termino: 'Anticresis',
    definicion: 'Garantía real sobre bienes inmuebles que se entregan al acreedor para que perciba los frutos.',
    categoria: 'Civil'
  },
  {
    id: 'penal',
    termino: 'Cláusula Penal',
    definicion: 'Stipulación que establece una sanción (multa) para el caso de incumplimiento contractual.',
    categoria: 'Civil'
  },
  {
    id: 'mora',
    termino: 'Mora',
    definicion: 'Incumplimiento tardío de una obligación, que genera responsabilidad de daños y perjuicios.',
    categoria: 'Civil'
  },
  {
    id: 'fuerza-mayor',
    termino: 'Fuerza Mayor',
    definicion: 'Suceso imprevisto e irresistible que impide el cumplimiento de una obligación.',
    categoria: 'Civil'
  },
  {
    id: 'dolo',
    termino: 'Dolo',
    definicion: 'Engaño deliberado para inducir a otra persona a celebrar un contrato o realizar un acto jurídico.',
    categoria: 'Civil'
  },
  {
    id: 'lesion',
    termino: 'Lesión',
    definicion: 'Perjuicio sufrido por una persona cuando un contrato se celebra en condiciones desproporcionadas.',
    categoria: 'Civil'
  },
  {
    id: 'fraude',
    termino: 'Fraude',
    definicion: 'Engaño deliberado con el propósito de obtener una ventaja indebida.',
    categoria: 'Penal'
  },
  {
    id: 'robo',
    termino: 'Robo',
    definicion: 'Apropriación ilegitima de bienes ajenos, con uso de violencia o sin ella.',
    categoria: 'Penal'
  },
  {
    id: 'extorsion',
    termino: 'Extorsión',
    definicion: 'Delito consistente en obligar a una persona a dar o hacer algo, mediante amenaza o violencia.',
    categoria: 'Penal'
  },
  {
    id: 'abuso-confianza',
    termino: 'Abuso de Confianza',
    definicion: 'Delito de quien disponga ilegitimamente de dinero o bienes que se le hayan entregado en custodia.',
    categoria: 'Penal'
  }
];

export const buscarTermino = (termino: string): TerminoLegal[] => {
  const t = termino.toLowerCase();
  return glosarioLegal.filter(g => 
    g.termino.toLowerCase().includes(t) || 
    g.definicion.toLowerCase().includes(t) ||
    g.categoria.toLowerCase().includes(t) ||
    g.sinonimos?.some(s => s.toLowerCase().includes(t))
  );
};
