export interface Articulo {
  numero: string;
  titulo?: string;
  contenido: string;
  fracciones?: { num: string; texto: string }[];
}

export interface Ley {
  id: string;
  titulo: string;
  abreviatura: string;
  fechaPublicacion?: string;
  materia: string;
  descripcion: string;
  articulos: Articulo[];
}

export interface Jurisprudencia {
  id: string;
  tipo: 'JR' | 'TESIS';
  titulo: string;
  materia: string;
  tesis: string;
  precedente: string;
  aplicacion: string;
}

export const jurisprudencias: Jurisprudencia[] = [
  {
    id: "jrlab-1",
    tipo: "JR",
    titulo: "INDEMNIZACIÓN POR DESPIDO. PROCEDE INDEPENDIENTEMENTE DEL PAGO DE LA Liquidación",
    materia: "Laboral",
    tesis: "La indemnización constitutional y la liquidación son figuras jurídicas diferentes y no son excluyentes. El trabajador tiene derecho a ambas cuando el patrón despide sin causa justificada.",
    precedente: "Jurisprudencia 19/2009, Segunda Sala, SCJN",
    aplicacion: "Demandas laborales por despido injustificado"
  },
  {
    id: "jrlab-2",
    tipo: "JR",
    titulo: "PRIMA DE ANTIGÜEDAD. SE CALCULA SOBRE EL SALARIO INTEGRADO",
    materia: "Laboral",
    tesis: "La prima de antigüedad a que se refiere el artículo 162 de la LFT debe calcularse sobre el salario integrado del trabajador, incluyendo todas las prestaciones permanentes.",
    precedente: "Jurisprudencia 28/2010, Segunda Sala, SCJN",
    aplicacion: "Cálculo de liquidaciones laborales"
  },
  {
    id: "jrlab-3",
    tipo: "JR",
    titulo: "TRABAJADOR DE CONFIANZA. NO GOZA DE LA PROTECCIÓN ANTE EL DESPIDO",
    materia: "Laboral",
    tesis: "Los trabajadores de confianza pueden ser separados de su empleo sin responsabilidad para el patrón, siempre que la separación no sea discriminatoria o violatoria de derechos fundamentales.",
    precedente: "Jurisprudencia 9/2008, Segunda Sala, SCJN",
    aplicacion: "Despidos de trabajadores de confianza"
  },
  {
    id: "jrciv-1",
    tipo: "JR",
    titulo: "BUENA FE EN LOS CONTRATOS. DEBE PRESUMIRSE",
    materia: "Civil",
    tesis: "La buena fe debe presumirse en todo contrato. Quien afirme que una de las partes actuó de mala fe debe probarlo.",
    precedente: "Jurisprudencia 1a./J. 42/2015, Primera Sala, SCJN",
    aplicacion: "Contratos civiles en general"
  },
  {
    id: "jrciv-2",
    tipo: "JR",
    titulo: "CLÁUSULAS ABUSIVAS EN CONTRATOS DE ADHESIÓN. SON NULAS",
    materia: "Civil",
    tesis: "Las cláusulas que establezcan obligaciones desproporcionadas o que generen desequilibrio entre las partes en contratos de adhesión, son nulas.",
    precedente: "Jurisprudencia 1a./J. 67/2014, Primera Sala, SCJN",
    aplicacion: "Contratos de adhesión, rentan, servicios"
  },
  {
    id: "jrciv-3",
    tipo: "JR",
    titulo: "PRESCRIPCIÓN ADQUISITIVA. REQUIERE POSESIÓN CONTINUA Y PACÍFICA",
    materia: "Civil",
    tesis: "Para que proceda la prescripción acquisitiva inmobiliario, se requiere que la posesión sea continua, pacífica, pública y en concepto de dueño durante el plazo establecido por la ley.",
    precedente: "Jurisprudencia 1a./J. 23/2016, Primera Sala, SCJN",
    aplicacion: "Reclamaciones de propiedad inmueble"
  },
  {
    id: "jrciv-4",
    tipo: "JR",
    titulo: "RESPONSABILIDAD CIVIL EXTRACONTRACTUAL. SE REQUIERE DOLO O CULPA",
    materia: "Civil",
    tesis: "Para que proceda la responsabilidad civil extracontractual se requiere: hecho voluntario, daño causado y relación de causalidad entre el hecho y el daño, pudiendo ser por dolo o culpa.",
    precedente: "Jurisprudencia 1a./J. 31/2015, Primera Sala, SCJN",
    aplicacion: "Demandas por daños y perjuicios"
  },
  {
    id: "jrmerc-1",
    tipo: "JR",
    titulo: "SOCIEDAD ANÓNIMA. RESPONSABILIDAD DE LOS ACCIONISTAS",
    materia: "Mercantil",
    tesis: "Los accionistas de una sociedad anónima solo responden hasta el monto de sus aportaciones capital. No responden con su patrimonio personal por las obligaciones de la sociedad.",
    precedente: "Jurisprudencia 2a./J. 45/2012, Segunda Sala, SCJN",
    aplicacion: "Constitución y operación de sociedades"
  },
  {
    id: "jrmerc-2",
    tipo: "JR",
    titulo: "CONTRATO DE MERCANCÍAS. PASA EL RISGO CON LA ENTREGA",
    materia: "Mercantil",
    tesis: "En el contrato de compraventa mercantil, los riesgos de la cosa pasan al comprador desde el momento en que se le hace entrega, salvo pacto en contrario.",
    precedente: "Jurisprudencia 3a./J. 12/2010, Tercera Sala, SCJN",
    aplicacion: "Contratos comerciales de compraventa"
  },
  {
    id: "jrproc-1",
    tipo: "JR",
    titulo: "COMPETENCIA. DEBE ANALIZARSE DE OFICIO",
    materia: "Procesal",
    tesis: "La competencia es de orden público y debe analizarse de oficio por el tribunal, aun cuando las partes no la hayan impugnado.",
    precedente: "Jurisprudencia 1a./J. 89/2013, Primera Sala, SCJN",
    aplicacion: "Todo tipo de procesos judiciales"
  },
  {
    id: "jrproc-2",
    tipo: "JR",
    titulo: "DEMANDA. DEBE SATISFACER REQUISITOS ESENCIALES",
    materia: "Procesal",
    tesis: "La demanda debe contener: nombre del actor y demandado, objeto de la acción, hechos en que funde la acción y petitorios. La falta de estos requisitos esenciales Produce nulidad.",
    precedente: "Jurisprudencia 2a./J. 34/2011, Segunda Sala, SCJN",
    aplicacion: "Juicios civiles y laborales"
  },
  {
    id: "jrampar-1",
    tipo: "JR",
    titulo: "AMPARO DIRECTO. PROCEDE CONTRA SENTENCIAS DEFINITIVAS",
    materia: "Constitucional",
    tesis: "El amparo directo procede contra sentencias definitivas o laudos que pongas fin al juicio, cuando se vulneren derechos humanos previstos en la Constitución.",
    precedente: "Jurisprudencia, Pleno SCJN, 2001",
    aplicacion: "Recursos de amparo contra resoluciones judiciales"
  },
  {
    id: "jrampar-2",
    tipo: "JR",
    titulo: "INTERÉS PARA AMPARARSE. DEBE SER ACTUAL Y LEGÍTIMO",
    materia: "Constitucional",
    tesis: "Para proceder al juicio de amparo se requiere interés legitimo del quejoso, es decir, un daño o perjuicio actual y directo en sus derechos.",
    precedente: "Jurisprudencia 12/2010, Primera Sala, SCJN",
    aplicacion: "Demandas de amparo"
  },
  {
    id: "jrfiscal-1",
    tipo: "JR",
    titulo: "RECARGOS. PROCEDEN POR MORA EN PAGO DE IMPUESTOS",
    materia: "Fiscal",
    tesis: "Los recargos por mora en el pago de contribuciones se causan desde la fecha en que debió realizarse el pago y hasta la fecha en que se efectúe.",
    precedente: "Jurisprudencia 2a./J. 67/2015, Segunda Sala, SCJN",
    aplicacion: "Cálculo de contribuciones omitidas"
  },
  {
    id: "jrfiscal-2",
    tipo: "JR",
    titulo: "MULTAS FISCALES. DEBEN SER PROPORCIONALES A LA INFRACCIÓN",
    materia: "Fiscal",
    tesis: "Las multas fiscales deben ser proporcionales a la gravedad de la infracción y nunca excesivas, cuidando el principio de proporcionalidad tributaria.",
    precedente: "Jurisprudencia 1a./J. 78/2014, Primera Sala, SCJN",
    aplicacion: "Infracciones y sanciones tributarias"
  },
  {
    id: "jrlab-4",
    tipo: "TESIS",
    titulo: "JORNADA EXTRAORDINARIA. EL PATRÓN DEBE PAGARLA CON RECARGO",
    materia: "Laboral",
    tesis: "Las horas de trabajo extraordinarias deben pagarse con un recargo del 100% sobre la jornada ordinaria, conforme al artículo 66 de la LFT.",
    precedente: "Tesis II.1o.T.4 L, Semanario Judicial, 2019",
    aplicacion: "Reclamaciones de pago de horas extras"
  },
  {
    id: "jrlab-5",
    tipo: "TESIS",
    titulo: "AGUINALDO. ES PROPORCIONAL SI EL TRABAJADOR NO LABORA EL AÑO COMPLETO",
    materia: "Laboral",
    tesis: "El trabajador que no labore el año completo tiene derecho al aguinaldo proporcional al tiempo efectivamente trabajado.",
    precedente: "Tesis III.1o.T.12 L, Semanario Judicial, 2018",
    aplicacion: "Cálculo de aguinaldo en liquidaciones"
  },
  {
    id: "jrciv-5",
    tipo: "TESIS",
    titulo: "DIVORCIO. PUEDE SOLICITARSE POR MUTUO CONSENTIMIENTO",
    materia: "Civil",
    tesis: "El divorcio por mutuo consentimiento procede cuando ambos esposos están de acuerdo en disolver el vínculo matrimonial, sin necesidad de acreditar causa específica.",
    precedente: "Tesis 1a. CCCXX/2015, Primera Sala, SCJN",
    aplicacion: "Procedimientos de divorcio"
  },
  {
    id: "jrciv-6",
    tipo: "TESIS",
    titulo: "PENSIÓN ALIMENTICIA. DEBE SER PROPORCIONAL A LAS NECESIDADES DEL CREDOR",
    materia: "Civil",
    tesis: "La pensión alimenticia debe fijarse en proporción a las necesidades de quien la solicita y a las posibilidades económicas del deudor.",
    precedente: "Tesis 1a. CCLX/2016, Primera Sala, SCJN",
    aplicacion: "Demandas de alimentos"
  },
  {
    id: "jrp-1",
    tipo: "TESIS",
    titulo: "DELITO DE ROBO. NO SE REQUIERE VIOLENCIA PARA CONFIGURARSE",
    materia: "Penal",
    tesis: "El delito de robo se configura con la sustracción de cosa ajena con ánimo de apropiamiento, sin que sea necesaria la violencia.",
    precedente: "Tesis I.2o.P.45 P, Semanario Judicial de la Federación, 2016",
    aplicacion: "Procesos por robo simple y con violencia"
  },
  {
    id: "jrp-2",
    tipo: "TESIS",
    titulo: "DELITO DE FRAUDE. REQUIERE ENGÑOO Y DAÑO",
    materia: "Penal",
    tesis: "Para que se configure el delito de fraude se requiere que el agente obtenga un lucro para sí o para otro, mediante el engaño y que cause perjuicio.",
    precedente: "Tesis VI.1o.P.32 P, Semanario Judicial, 2017",
    aplicacion: "Denuncias por fraude"
  },
  {
    id: "jrp-3",
    tipo: "TESIS",
    titulo: "EXTINCIÓN DE LA ACCIÓN PENAL. POR CONCILIACIÓN EN DELITOS NO GRAVES",
    materia: "Penal",
    tesis: "En delitos culposos no graves y patrimoniales sin violencia, las partes pueden conciliarse, lo que extingue la acción penal.",
    precedente: "Tesis 1a. XLVII/2018, Primera Sala, SCJN",
    aplicacion: "Procedimientos penales alternativos"
  },
  {
    id: "jrlab-6",
    tipo: "JR",
    titulo: "VACACIONES. DERECHO IRRENUNCIABLE DEL TRABAJADOR",
    materia: "Laboral",
    tesis: "Las vacaciones anuales son un derecho irrenunciable del trabajador. El patrón no puede compensar económicamente este derecho salvo terminación de la relación laboral.",
    precedente: "Jurisprudencia 15/2011, Segunda Sala, SCJN",
    aplicacion: "Demandas laborales sobre vacaciones"
  },
  {
    id: "jrlab-7",
    tipo: "JR",
    titulo: "AGUINALDO. MÍNIMO OBLIGATORIO DE 15 DÍAS",
    materia: "Laboral",
    tesis: "El aguinaldo mínimo anual equivale a 15 días de salario. El patrón puede establecer una cantidad mayor, pero nunca menor a la establecida por la ley.",
    precedente: "Jurisprudencia 22/2009, Segunda Sala, SCJN",
    aplicacion: "Cálculo de aguinaldo y liquidaciones"
  },
  {
    id: "jrlab-8",
    tipo: "JR",
    titulo: "PRIMA DE RIESGO. OBLIGATORIA EN TRABAJOS PELIGROSOS",
    materia: "Laboral",
    tesis: "Los trabajadores que desempeńan labores peligrosas o insalubres tienen derecho a una prima de riesgo不低于20% de su salario.",
    precedente: "Jurisprudencia 18/2012, Segunda Sala, SCJN",
    aplicacion: "Reclamaciones de prima de riesgo"
  },
  {
    id: "jrlab-9",
    tipo: "JR",
    titulo: "DESPIDO PRESUNTO. CUANDO EL PATRÓN NO COMUNICA CAUSA",
    materia: "Laboral",
    tesis: "Si el patrón despide al trabajador sin comunicarle por escrito la causa del despido, se presume que es injustificado y procede la indemnización.",
    precedente: "Jurisprudencia 8/2007, Segunda Sala, SCJN",
    aplicacion: "Demandas por despido injustificado"
  },
  {
    id: "jrlab-10",
    tipo: "JR",
    titulo: "SUELDOS CAÍDOS. PROCEDEN DESDE EL DESPIDO HASTE SENTENCIA",
    materia: "Laboral",
    tesis: "Los salarios caídos proceden desde la fecha del despido hasta la fecha en que se dicte la sentencia, salvo que el trabajador encuentre otro empleo.",
    precedente: "Jurisprudencia 31/2010, Segunda Sala, SCJN",
    aplicacion: "Cálculo de salarios caídos"
  },
  {
    id: "jrlab-11",
    tipo: "TESIS",
    titulo: "CONTRATO DE TRABAJO. DEBE CONSTAR POR ESCRITO",
    materia: "Laboral",
    tesis: "El contrato de trabajo debe constar por escrito y especificar las condiciones de trabajo. La falta de contrato escrito presume la relación laboral.",
    precedente: "Tesis 2a. CCCXL/2015, Segunda Sala, SCJN",
    aplicacion: "Demandas laborales"
  },
  {
    id: "jrlab-12",
    tipo: "TESIS",
    titulo: "JORNADA EXTRAORDINARIA. REMUNERACIÓN ADICIONAL",
    materia: "Laboral",
    tesis: "Las horas extras deben pagarse con un incremento mínimo del 100% sobre el salario ordinario. No puede pactarse su pago con cantidad menor.",
    precedente: "Tesis VIII.2o.43 L, Segundo Tribunal Colegiado, 2014",
    aplicacion: "Reclamaciones de horas extras"
  },
  {
    id: "jrlab-13",
    tipo: "TESIS",
    titulo: "PATRON RESPONSABLE SOLIDARIO. EN SUBCONTRATACIÓN",
    materia: "Laboral",
    tesis: "La empresa que reciba servicios de una empresa de subcontratación es solidariamente responsable de las obligaciones laborales hacia los trabajadores.",
    precedente: "Tesis 1a. CCCLXXXV/2016, Primera Sala, SCJN",
    aplicacion: "Demandas contra empresas usuarias"
  },
  {
    id: "jrlab-14",
    tipo: "TESIS",
    titulo: "DESCANSO SEMANAL. MÍNIMO UN DÍA",
    materia: "Laboral",
    tesis: "El trabajador tiene derecho a un día de descanso por cada seis días laborados. Este descanso debe ser remunerado.",
    precedente: "Tesis VII.1o.24 L, Primer Tribunal Colegiado, 2013",
    aplicacion: "Violación de derechos laborales"
  },
  {
    id: "jrlab-15",
    tipo: "TESIS",
    titulo: "PRIMA DE ANTIGÜEDAD. PROCEDE AL RETIRO VOLUNTARIO",
    materia: "Laboral",
    tesis: "La prima de antigüedad procede no solo por despido, sino también cuando el trabajador se retire voluntariamente después de 15 años de servicio.",
    precedente: "Tesis 2a. CXII/2014, Segunda Sala, SCJN",
    aplicacion: "Liquidaciones por retiro"
  },
  {
    id: "jrciv-7",
    tipo: "JR",
    titulo: "ARRENDAMIENTO. OBLIGACIÓN DEL ARRENDADOR DE DAR GOCE PACÍFICO",
    materia: "Civil",
    tesis: "El arrendador tiene la obligación de mantener al arrendatario en el goce pacífico del bien arrendado durante todo el tiempo del contrato.",
    precedente: "Jurisprudencia 1a./J. 56/2013, Primera Sala, SCJN",
    aplicacion: "Desalojos y controversias de renta"
  },
  {
    id: "jrciv-8",
    tipo: "JR",
    titulo: "COMPRAVENTA. PASAJE DEL RIESGO AL COMPRADOR",
    materia: "Civil",
    tesis: "En la compraventa, los riesgos del bien pasan al comprador desde el momento en que se perfecciona el contrato, salvo pacto en contrario.",
    precedente: "Jurisprudencia 1a./J. 89/2012, Primera Sala, SCJN",
    aplicacion: "Contratos de compraventa"
  },
  {
    id: "jrciv-9",
    tipo: "JR",
    titulo: "MANDATO. RESPONSABILIDAD DEL MANDATARIO",
    materia: "Civil",
    tesis: "El mandatario responde de los daños y perjuicios que cause por excederse o actuar sin poderes suficientes.",
    precedente: "Jurisprudencia 1a./J. 12/2015, Primera Sala, SCJN",
    aplicacion: "Contratos de mandato"
  },
  {
    id: "jrciv-10",
    tipo: "JR",
    titulo: "DONACIÓN. REVOCACIÓN POR INGRATITUD DEL DONATARIO",
    materia: "Civil",
    tesis: "Las donaciones pueden revocarse por ingratitud del donatario cuando este comete delitos contra el donador, su familia o se niegue a prestarle alimentos.",
    precedente: "Jurisprudencia 1a./J. 78/2014, Primera Sala, SCJN",
    aplicacion: "Controversias sobre donaciones"
  },
  {
    id: "jrciv-11",
    tipo: "TESIS",
    titulo: "USUFRUCTO. DERECHOS Y OBLIGACIONES DEL USUFRUCTUARIO",
    materia: "Civil",
    tesis: "El usufructuario tiene derecho a usar y disfrutar del bien, pero debe conservarlo en buen estado y devolverlo al terminar el usufructo.",
    precedente: "Tesis 1a. CCLXXXIX/2016, Primera Sala, SCJN",
    aplicacion: " Controversias de usufructo"
  },
  {
    id: "jrciv-12",
    tipo: "TESIS",
    titulo: "PENSIÓN ALIMENTICIA. CRITERIOS PARA FIJARLA",
    materia: "Civil",
    tesis: "La pensión alimenticia se fija atendiendo a las necesidades del acreedor alimentario y a la capacidad económica del deudor.",
    precedente: "Tesis 1a. CCXLV/2017, Primera Sala, SCJN",
    aplicacion: "Demandas de alimentos"
  },
  {
    id: "jrciv-13",
    tipo: "TESIS",
    titulo: "HERENCIA. DERECHO DE LOS HEREDEROS LEGÍTIMOS",
    materia: "Civil",
    tesis: "Los herederos legítimos tienen derecho a recibir la herencia del decedent, en el orden establecido por la ley, salvo testamento.",
    precedente: "Tesis 1a. CCCLIV/2015, Primera Sala, SCJN",
    aplicacion: "Sucesiones intestamentarias"
  },
  {
    id: "jrciv-14",
    tipo: "TESIS",
    titulo: "SERVIDUMBRE DE PASSAGE. PROCEDE CUANDO NO HAY SALIDA A VÍA PÚBLICA",
    materia: "Civil",
    tesis: "El propietario de un fundo sin salida a vía pública tiene derecho a exigir servidumbre de paso por el fundo vecinal, previa indemnización.",
    precedente: "Tesis 1a. XLVII/2018, Primera Sala, SCJN",
    aplicacion: "Controversias de servidumbres"
  },
  {
    id: "jrciv-15",
    tipo: "TESIS",
    titulo: "NULIDAD DEL MATRIMONIO. CAUSALES ESPECÍFICAS",
    materia: "Civil",
    tesis: "El matrimonio puede declararse nulo cuando se contrae por error, coacción o miedo grave, o cuando alguno de los contrayentes está impedido.",
    precedente: "Tesis 1a. CCLXXVI/2016, Primera Sala, SCJN",
    aplicacion: "Declaraciones de nulidad matrimonial"
  },
  {
    id: "jrmerc-3",
    tipo: "JR",
    titulo: "LETRA DE CAMBIO. PROTESTO POR FALTA DE PAGO",
    materia: "Mercantil",
    tesis: "La letra de cambio debe protestarse por falta de aceptación o pago en los plazos legales. El protesto es requisito para ejercitar la acción cambiaria.",
    precedente: "Jurisprudencia 2a./J. 67/2013, Segunda Sala, SCJN",
    aplicacion: "Ejercicios de derechos cambiarios"
  },
  {
    id: "jrmerc-4",
    tipo: "JR",
    titulo: "PAGARÉ. TÍTULO DE CRÉDITO COMPLETO",
    materia: "Mercantil",
    tesis: "El pagaré debe contener: nombre del librador, fecha y lugar de emisión, cantidad, vencimiento, firma del librador y lugar de pago.",
    precedente: "Jurisprudencia 2a./J. 23/2014, Segunda Sala, SCJN",
    aplicacion: "Emisión y cobro de pagarés"
  },
  {
    id: "jrmerc-5",
    tipo: "JR",
    titulo: "CHEQUE. RESPONSABILIDAD DEL EMISOR",
    materia: "Mercantil",
    tesis: "El emisor de un cheque responde de su pago. Si el cheque es presentado y no es pagado, el tenedor puede ejercitar acciones contra el librador.",
    precedente: "Jurisprudencia 2a./J. 89/2012, Segunda Sala, SCJN",
    aplicacion: "Cheques protestados"
  },
  {
    id: "jrmerc-6",
    tipo: "JR",
    titulo: "CONTRATO DE SEGURO. BUENA FE Y DEBER DE INFORMACIÓN",
    materia: "Mercantil",
    tesis: "El contrato de seguro se basa en la buena fe. El asegurado tiene el deber de declarar verazmente el riesgo. La omisión o falsedad puede nulificar la póliza.",
    precedente: "Jurisprudencia 2a./J. 156/2015, Segunda Sala, SCJN",
    aplicacion: "Controversias de seguros"
  },
  {
    id: "jrmerc-7",
    tipo: "TESIS",
    titulo: "FACTURA ELECTRÓNICA. REQUISITOS FISCALES",
    materia: "Mercantil",
    tesis: "La factura electrónica debe cumplir con los requisitos fiscales establecidos. Su expedición indebida puede generar responsabilidades.",
    precedente: "Tesis 2a. CCCXII/2017, Segunda Sala, SCJN",
    aplicacion: "Contabilidad y facturación"
  },
  {
    id: "jrmerc-8",
    tipo: "TESIS",
    titulo: "PROPIEDAD INDUSTRIAL. MARCAS Y PATENTES",
    materia: "Mercantil",
    tesis: "Las marcas y patentes se protegen mediante registro ante el IMPI. El uso no autorizado constituye infracción administrativa y penal.",
    precedente: "Tesis 2a. CCLIV/2016, Segunda Sala, SCJN",
    aplicacion: "Defensa de derechos de propiedad industrial"
  },
  {
    id: "jrmerc-9",
    tipo: "TESIS",
    titulo: "CONCURSO MERCANTIL. QUIEBRA DEL DEUDOR",
    materia: "Mercantil",
    tesis: "El concurso mercantil procederá cuando el deudor tenga dos o más obligaciones vencidas y no pueda pagarlas puntualmente.",
    precedente: "Tesis 2a. CCCLXXVIII/2015, Segunda Sala, SCJN",
    aplicacion: "Procedimientos de quiebra"
  },
  {
    id: "jrmerc-10",
    tipo: "TESIS",
    titulo: "AGENCIA COMERCIAL. RELACIÓN JURÍDICA",
    materia: "Mercantil",
    tesis: "El agente comercial representa a un comerciante de manera permanente en la promoción de negocios, tiene derecho a comisión por los actos realizados.",
    precedente: "Tesis 2a. XCVII/2014, Segunda Sala, SCJN",
    aplicacion: "Contratos de agencia"
  },
  {
    id: "jrproc-3",
    tipo: "JR",
    titulo: "COMPETENCIA. CRITERIOS PARA SU DETERMINACIÓN",
    materia: "Procesal",
    tesis: "La competencia se determina por razón de territorio, materia, grado y cuantía. Las partes pueden prorrogarla voluntariamente.",
    precedente: "Jurisprudencia 1a./J. 45/2016, Primera Sala, SCJN",
    aplicacion: "Excepciones de incompetencia"
  },
  {
    id: "jrproc-4",
    tipo: "JR",
    titulo: "LEGITIMACIÓN ACTIVA. REQUISITO PARA ACCEDER A JUSTICIA",
    materia: "Procesal",
    tesis: "La legitimación activa es el derecho de una persona para actuar en un proceso. Quien carece de ella no puede obtener sentencia favorable.",
    precedente: "Jurisprudencia 1a./J. 67/2015, Primera Sala, SCJN",
    aplicacion: "Defensa en juicio"
  },
  {
    id: "jrproc-5",
    tipo: "JR",
    titulo: "COSA JUZGADA. EFECTO DE SENTENCIA FIRME",
    materia: "Procesal",
    tesis: "La cosa juzgada impide que se juzgue nuevamente un mismo hecho entre las mismas partes. Es garantía de seguridad jurídica.",
    precedente: "Jurisprudencia 1a./J. 89/2014, Primera Sala, SCJN",
    aplicacion: "Excepciones de cosa juzgada"
  },
  {
    id: "jrproc-6",
    tipo: "JR",
    titulo: "PRESCRIPCIÓN. COMPUTO DEL PLAZO",
    materia: "Procesal",
    tesis: "La prescripción starts counting desde el día siguiente a aquel en que el derecho pudo ejercitarse. Se interrumpe por demanda judicial.",
    precedente: "Jurisprudencia 1a./J. 23/2017, Primera Sala, SCJN",
    aplicacion: "Excepciones de prescripción"
  },
  {
    id: "jrproc-7",
    tipo: "TESIS",
    titulo: "REBELDÍA. CONSECUENCIAS PROCESALES",
    materia: "Procesal",
    tesis: "Si el demandado no comparece a defenderse, se le declara rebeld y se dicta sentencia con base en las pruebas ofrecidas por el actor.",
    precedente: "Tesis 1a. CCLXXXII/2016, Primera Sala, SCJN",
    aplicacion: "Juicios en rebeldía"
  },
  {
    id: "jrproc-8",
    tipo: "TESIS",
    titulo: "PRUEBA DOCUMENTAL. VALOR PROBATORIO",
    materia: "Procesal",
    tesis: "Los documentos públicos hacen plena prueba de los hechos que certified. Los privados deben ser reconocidos por quien los emitió.",
    precedente: "Tesis 1a. CCLIV/2015, Primera Sala, SCJN",
    aplicacion: "Procedimientos civiles"
  },
  {
    id: "jrproc-9",
    tipo: "TESIS",
    titulo: "TESTIGOS. EVALUACIÓN DE SU DECLARACIÓN",
    materia: "Procesal",
    tesis: "Las declaraciones de testigos son valoradas libremente por el juzgador según las circunstancias del caso.",
    precedente: "Tesis 1a. CCLXXXIX/2017, Primera Sala, SCJN",
    aplicacion: "Audiencias y procedimientos"
  },
  {
    id: "jrproc-10",
    tipo: "TESIS",
    titulo: "AMPARO INDIRECTO. PROCEDE CONTRA ACTOS DENTRO DEL PROCESO",
    materia: "Procesal",
    tesis: "El amparo indirecto procede contra actos de autoridad que no sean jurisdiccionales, dentro o fuera de juicio.",
    precedente: "Tesis 1a. CCCXII/2016, Primera Sala, SCJN",
    aplicacion: "Juicios de amparo"
  },
  {
    id: "jrampar-3",
    tipo: "JR",
    titulo: "AMPARO CONTRA LEYES. REQUISITOS ESPECÍFICOS",
    materia: "Amparo",
    tesis: "El amparo contra leyes procede cuando la norma general es侵犯aria de derechos humanos y no existe otro medio de defensa.",
    precedente: "Jurisprudencia 1a./J. 112/2015, Primera Sala, SCJN",
    aplicacion: "Amparos contra normas"
  },
  {
    id: "jrampar-4",
    tipo: "JR",
    titulo: "INTERÉS LEGÍTIMO. SUFICIENTE PARA AMPARO",
    materia: "Amparo",
    tesis: "El interés legítimo es suficiente para promover amparo. No se requiere interés jurídico cuando el acto afecta intereses difusos o colectivos.",
    precedente: "Jurisprudencia 1a./J. 45/2014, Primera Sala, SCJN",
    aplicacion: "Promoción de amparo"
  },
  {
    id: "jrampar-5",
    tipo: "JR",
    titulo: "SUSPENSIÓN. PROCEDIMIENTO Y REQUISITOS",
    materia: "Amparo",
    tesis: "La suspensión provisional puede otorgarse cuando el acto impugnado sea de difícil reparación y no afecte el interés público.",
    precedente: "Jurisprudencia 1a./J. 78/2016, Primera Sala, SCJN",
    aplicacion: "Solicitudes de suspensión"
  },
  {
    id: "jrampar-6",
    tipo: "JR",
    titulo: "RECTIFICACIÓN DE PROCEDENCIA. CAMBIO DE CRITERIO",
    materia: "Amparo",
    tesis: "El juicio de amparo procede contra actos que trascienden a la esfera jurídica del quejoso, afectándolo directamente.",
    precedente: "Jurisprudencia 2a./J. 34/2015, Segunda Sala, SCJN",
    aplicacion: "Demandas de amparo"
  },
  {
    id: "jrampar-7",
    tipo: "TESIS",
    titulo: "AMPARO DIRECTO. CONTRA SENTENCIAS DEFINITIVAS",
    materia: "Amparo",
    tesis: "El amparo directo procede contra sentencias definitivas que vulneren garantías individuales.",
    precedente: "Tesis 1a. CCLXXVIII/2016, Primera Sala, SCJN",
    aplicacion: "Amparos directos"
  },
  {
    id: "jrampar-8",
    tipo: "TESIS",
    titulo: "QUEJA POR INCUMPLIMIENTO. EJECUCIÓN DE SENTENCIAS",
    materia: "Amparo",
    tesis: "El incumplimiento de sentencias de amparo da lugar al procedimiento de queja ante el tribunal que emitió la sentencia.",
    precedente: "Tesis 1a. CCCLVI/2015, Primera Sala, SCJN",
    aplicacion: "Incumplimiento de sentencias"
  },
  {
    id: "jrampar-9",
    tipo: "TESIS",
    titulo: "EFECTOS DEL AMPARO. DEVOLUCIÓN DE BIENES",
    materia: "Amparo",
    tesis: "Cuando el amparo ampara al quejoso, la autoridad debe restituirlo en el goce del derecho violado, devolviéndole lo que haya perdido.",
    precedente: "Tesis 2a. CCLXXXIII/2017, Segunda Sala, SCJN",
    aplicacion: "Ejecución de sentencias de amparo"
  },
  {
    id: "jrampar-10",
    tipo: "TESIS",
    titulo: "AMPARO CONTRA DETENCIÓN. PROCEDIMIENTO",
    materia: "Amparo",
    tesis: "El amparo contra detención debe promoverse dentro de las 48 horas siguientes al acto. La autoridad debe poner al detenido a disposición del juez.",
    precedente: "Tesis 1a. CCCXLVII/2016, Primera Sala, SCJN",
    aplicacion: "Amparos por detención ilegal"
  },
  {
    id: "jrfiscal-3",
    tipo: "JR",
    titulo: "IMPUESTO SOBRE LA RENTA. DETERMINACIÓN DE RENTAS",
    materia: "Fiscal",
    tesis: "El ISR se determina aplicando las tasas legales a la base gravable. Los contribuyentes deben llevar contabilidad y hacer pagos provisionales.",
    precedente: "Jurisprudencia 2a./J. 89/2014, Segunda Sala, SCJN",
    aplicacion: "Declaraciones anuales"
  },
  {
    id: "jrfiscal-4",
    tipo: "JR",
    titulo: "IVA. TRASLADO Y ACREDITAMIENTO",
    materia: "Fiscal",
    tesis: "El IVA se traslada al adquirente de bienes o servicios. El IVA acreditable puede compensarse contra el IVA causado, siguiendo las reglas.",
    precedente: "Jurisprudencia 2a./J. 67/2015, Segunda Sala, SCJN",
    aplicacion: "Contabilidad fiscal"
  },
  {
    id: "jrfiscal-5",
    tipo: "JR",
    titulo: "MULTAS FISCALES. PRINCIPIO DE PROPORCIONALIDAD",
    materia: "Fiscal",
    tesis: "Las multas fiscales deben ser proporcionales a la gravedad de la infracción. No pueden ser excesivas ni confiscatorias.",
    precedente: "Jurisprudencia 2a./J. 123/2013, Segunda Sala, SCJN",
    aplicacion: "Recursos contra multas"
  },
  {
    id: "jrfiscal-6",
    tipo: "JR",
    titulo: "SECRETOS FISCALES. PROTECCIÓN LEGAL",
    materia: "Fiscal",
    tesis: "Los datos fiscales de los contribuyentes son confidenciales. La autoridad fiscal debe guardar secreto sobre información obtenida.",
    precedente: "Jurisprudencia 2a./J. 45/2016, Segunda Sala, SCJN",
    aplicacion: "Protección de datos fiscales"
  },
  {
    id: "jrfiscal-7",
    tipo: "TESIS",
    titulo: "DELEGADOS FISCALES. FACULTADES DE COMPROBACIÓN",
    materia: "Fiscal",
    tesis: "Losvisitadores fiscales tienen facultades para revisar la contabilidad, bienes y mercancías de los contribuyentes.",
    precedente: "Tesis 2a. CCLXXXIV/2015, Segunda Sala, SCJN",
    aplicacion: "Auditorías fiscales"
  },
  {
    id: "jrfiscal-8",
    tipo: "TESIS",
    titulo: "CRÉDITO FISCAL. GARANTÍAS Y PRERROGATIVAS",
    materia: "Fiscal",
    tesis: "El crédito fiscal goza de privilegios sobre otros créditos. La autoridad puede exigir garantía o ejecutar bienes para asegurarlo.",
    precedente: "Tesis 2a. CCLII/2016, Segunda Sala, SCJN",
    aplicacion: "Ejecución fiscal"
  },
  {
    id: "jrfiscal-9",
    tipo: "TESIS",
    titulo: "COMPENSACIÓN FISCAL. REQUISITOS",
    materia: "Fiscal",
    tesis: "Los contribuyentes pueden compensar saldos a favor contra impuestos causados, siempre que cumplan con los requisitos legales.",
    precedente: "Tesis 2a. CCCLXVIII/2017, Segunda Sala, SCJN",
    aplicacion: "Devoluciones y compensaciones"
  },
  {
    id: "jrfiscal-10",
    tipo: "TESIS",
    titulo: "RECURSOS FISCALES. APELACIÓN ADMINISTRATIVA",
    materia: "Fiscal",
    tesis: "Contra las resoluciones fiscales procede el recurso de revocación ante la autoridad que las emitió, o el de reclamación ante el SAT.",
    precedente: "Tesis 2a. CCCXCI/2016, Segunda Sala, SCJN",
    aplicacion: "Defensa fiscal"
  },
  {
    id: "jrp-4",
    tipo: "JR",
    titulo: "DELITO DE ROBO. CALIFICATIVAS Y PENA",
    materia: "Penal",
    tesis: "El robo se califica como grave cuando se realiza con violencia, en lugar habitado, o por reincidencia. Las penas aumentan significativamente.",
    precedente: "Jurisprudencia 2a./J. 156/2015, Segunda Sala, SCJN",
    aplicacion: "Procesos por robo"
  },
  {
    id: "jrp-5",
    tipo: "JR",
    titulo: "DELITO DE FRAUDE. ELEMENTOS TÍPICOS",
    materia: "Penal",
    tesis: "El fraude se configura cuando alguien, con ánimo de lucro, induce a otro a error mediante engaño, causándole perjuicio patrimonial.",
    precedente: "Jurisprudencia 2a./J. 89/2014, Segunda Sala, SCJN",
    aplicacion: "Denuncias por fraude"
  },
  {
    id: "jrp-6",
    tipo: "JR",
    titulo: "LESIONES. GRADOS Y PENAS",
    materia: "Penal",
    tesis: "Las lesiones se clasifican según su gravedad: simples, calificadas y graves. Las penas varían según el tipo y las circunstancias.",
    precedente: "Jurisprudencia 2a./J. 234/2013, Segunda Sala, SCJN",
    aplicacion: "Denuncias por lesiones"
  },
  {
    id: "jrp-7",
    tipo: "JR",
    titulo: "DELITO DE HOMICIDIO. DOLO Y CULPA",
    materia: "Penal",
    tesis: "El Homicidio puede ser doloso o culposo. El dolo requiere intención de matar; la culpa, falta de cuidado que produce la muerte.",
    precedente: "Jurisprudencia 2a./J. 167/2014, Segunda Sala, SCJN",
    aplicacion: "Procesos por homicidio"
  },
  {
    id: "jrp-8",
    tipo: "TESIS",
    titulo: "EXTINCIÓN DE DOMINIO. PROCEDIMIENTO",
    materia: "Penal",
    tesis: "La extinción de dominio permite al Estado Decomisar bienes de origen ilícito, sin necesidad de sentencia penal condenatoria.",
    precedente: "Tesis 1a. CCLIV/2017, Primera Sala, SCJN",
    aplicacion: "Decomiso de bienes"
  },
  {
    id: "jrp-9",
    tipo: "TESIS",
    titulo: "MEDIDAS CAUTELARES. PRISIÓN PREVENTIVA",
    materia: "Penal",
    tesis: "La prisión preventiva procede cuando hay riesgo de fuga, obstaculización de la investigación o danger para la víctima u ofensor.",
    precedente: "Tesis 1a. CCCLXVII/2016, Primera Sala, SCJN",
    aplicacion: "Audiencias de vinculación a proceso"
  },
  {
    id: "jrp-10",
    tipo: "TESIS",
    titulo: "DELITOS SEXUALES. CONSENTIMIENTO",
    materia: "Penal",
    tesis: "En delitos sexuales, la falta de consentimiento es elemento esencial. El consentimiento debe ser libre, expreso y sin coacción.",
    precedente: "Tesis 1a. CCCXII/2015, Primera Sala, SCJN",
    aplicacion: "Denuncias por delitos sexuales"
  },
  {
    id: "jradmin-1",
    tipo: "JR",
    titulo: "ACTOS ADMINISTRATIVOS. ELEMENTOS ESENCIALES",
    materia: "Administrativo",
    tesis: "Los actos administrativos deben contener: competencia, motivo, objeto, procedimiento y fin. La falta de cualquiera los invalida.",
    precedente: "Jurisprudencia 1a./J. 89/2014, Primera Sala, SCJN",
    aplicacion: "Recursos administrativos"
  },
  {
    id: "jradmin-2",
    tipo: "JR",
    titulo: "LICITACIÓN PÚBLICA. PRINCIPIOS FUNDAMENTALES",
    materia: "Administrativo",
    tesis: "La licitación pública debe regirse por los principios de publicidad, igualdad, Competitividad y selección de la mejor propuesta.",
    precedente: "Jurisprudencia 1a./J. 56/2015, Primera Sala, SCJN",
    aplicacion: "Contrataciones públicas"
  },
  {
    id: "jradmin-3",
    tipo: "JR",
    titulo: "RESPONSABILIDAD DEL ESTADO. FUNDAMENTO",
    materia: "Administrativo",
    tesis: "El Estado responde por los daños causados por sus funcionarios en el ejercicio de sus funciones, conforme a la teoría de riesgo.",
    precedente: "Jurisprudencia 1a./J. 34/2016, Primera Sala, SCJN",
    aplicacion: "Demandas contra el Estado"
  },
  {
    id: "jradmin-4",
    tipo: "JR",
    titulo: "REVOCACIÓN ADMINISTRATIVA. LÍMITES",
    materia: "Administrativo",
    tesis: "La autoridad administrativa puede revocar sus propios actos cuando sean estadounidous, contrarios al orden jurídico o al interés público.",
    precedente: "Jurisprudencia 1a./J. 78/2015, Primera Sala, SCJN",
    aplicacion: "Revocación de licencias y permisos"
  },
  {
    id: "jradmin-5",
    tipo: "TESIS",
    titulo: "PERMISOS Y LICENCIAS. PROCEDIMIENTO",
    materia: "Administrativo",
    tesis: "Los particulares pueden solicitar permisos y licencias a la administración. La autoridad debe resolver en el plazo establecido.",
    precedente: "Tesis 1a. CCLXXXIX/2016, Primera Sala, SCJN",
    aplicacion: "Trámites administrativos"
  },
  {
    id: "jradmin-6",
    tipo: "TESIS",
    titulo: "INFRACCIONES ADMINISTRATIVAS. GARANTÍAS",
    materia: "Administrativo",
    tesis: "Las sanciones administrativas requieren previo procedimiento con audiencia del presunto infractor. No pueden ser arbitrarias.",
    precedente: "Tesis 2a. CCLXXVI/2015, Segunda Sala, SCJN",
    aplicacion: "Recursos contra sanciones"
  },
  {
    id: "jradmin-7",
    tipo: "TESIS",
    titulo: "CONCESIONES. DURACIÓN Y RENOVACIÓN",
    materia: "Administrativo",
    tesis: "Las concesiones tienen duración limitada. La renovación no es automática y depende del cumplimiento de las condiciones originales.",
    precedente: "Tesis 1a. CCCXIV/2017, Primera Sala, SCJN",
    aplicacion: "Concesiones de servicios"
  },
  {
    id: "jradmin-8",
    tipo: "TESIS",
    titulo: "EXPROPIACIÓN. INDEMNIZACIÓN JUSTA",
    materia: "Administrativo",
    tesis: "La expropiación requiere indemnización justa previa. El valor se determina por avalúos oficiales o peritos reconocidos.",
    precedente: "Tesis 1a. CCLXV/2016, Primera Sala, SCJN",
    aplicacion: "Procedimientos de expropiación"
  },
  {
    id: "jrfam-1",
    tipo: "JR",
    titulo: "PATRIA POTESTAD. EJERCICIO Y PÉRDIDA",
    materia: "Familiar",
    tesis: "La patria potestad se ejerce jointly por ambos padres. Se puede perder o suspender por conducta violenta, abandono o incapacidad.",
    precedente: "Jurisprudencia 1a./J. 67/2015, Primera Sala, SCJN",
    aplicacion: "Custodia y visitas"
  },
  {
    id: "jrfam-2",
    tipo: "JR",
    titulo: "PENSIÓN ALIMENTICIA. PROCEDE CONTRA AMBOS PADRES",
    materia: "Familiar",
    tesis: "Ambos padres están obligados a dar alimentos a sus hijos, proporcionalmente a sus posibilidades económicas.",
    precedente: "Jurisprudencia 1a./J. 45/2016, Primera Sala, SCJN",
    aplicacion: "Demandas de alimentos"
  },
  {
    id: "jrfam-3",
    tipo: "JR",
    titulo: "CUSTODIA COMPARTIDA. PRIORIDAD AL INTERÉS SUPERIOR",
    materia: "Familiar",
    tesis: "La custodia compartida debe privilegiarshare cuando sea favorable al interés superior del menor, permitiendo relación con ambos padres.",
    precedente: "Jurisprudencia 1a./J. 89/2017, Primera Sala, SCJN",
    aplicacion: "Divorcios y custodias"
  },
  {
    id: "jrfam-4",
    tipo: "JR",
    titulo: "VIOLENCIA FAMILIAR. MEDIDAS DE PROTECCIÓN",
    materia: "Familiar",
    tesis: "Ante violencia familiar, el juez puede ordenar medidas cautelares: restricción de comunicación, exclusión del domicilio, y atención médica.",
    precedente: "Jurisprudencia 1a./J. 23/2016, Primera Sala, SCJN",
    aplicacion: "Órdenes de protección"
  },
  {
    id: "jrfam-5",
    tipo: "TESIS",
    titulo: "TUTELA. DESIGNACIÓN Y FUNCIONES",
    materia: "Familiar",
    tesis: "La tutela se constituye para menores sin patria potestad o incapacitados. El tutor debe cuidar de la persona y bienes del pupilo.",
    precedente: "Tesis 1a. CCLXXXIV/2016, Primera Sala, SCJN",
    aplicacion: "Procedimientos de tutela"
  },
  {
    id: "jrfam-6",
    tipo: "TESIS",
    titulo: "ADOPCIÓN. REQUISITOS Y EFECTOS",
    materia: "Familiar",
    tesis: "La adopción crea un vínculo de filiación entre adoptante y adoptado. Requiere solicitud ante el juez y cumplimiento de requisitos legales.",
    precedente: "Tesis 1a. CCCLXXVIII/2015, Primera Sala, SCJN",
    aplicacion: "Procedimientos de adopción"
  },
  {
    id: "jrfam-7",
    tipo: "TESIS",
    titulo: "REGISTRO CIVIL. INSCRIPCIONES Y ANOTACIONES",
    materia: "Familiar",
    tesis: "Los hechos y actos del estado civil se inscriben en el Registro Civil. Las anotaciones marginales dan cuenta de cambios posteriores.",
    precedente: "Tesis 1a. CCLII/2017, Primera Sala, SCJN",
    aplicacion: "Actas y certificados"
  },
  {
    id: "jrfam-8",
    tipo: "TESIS",
    titulo: "DIVORCIO INNECESARIO. CONSECUENCIAS",
    materia: "Familiar",
    tesis: "El divorcio innecesario procede cuando ambos cónyuges lo solicitan de común acuerdo, siempre que no haya hijos menores.",
    precedente: "Tesis 1a. CCCXVI/2016, Primera Sala, SCJN",
    aplicacion: "Procedimientos de divorcio"
  },
  {
    id: "jrmed-1",
    tipo: "JR",
    titulo: "RESPONSABILIDAD MÉDICA. CULPA PROFESIONAL",
    materia: "Médico",
    tesis: "El médico responde por daños causados por negligencia, impericia o dolo. La carga de prueba corresponde al paciente demandante.",
    precedente: "Jurisprudencia 1a./J. 167/2014, Primera Sala, SCJN",
    aplicacion: "Demandas por negligencia médica"
  },
  {
    id: "jrmed-2",
    tipo: "JR",
    titulo: "CONSENTIMIENTO INFORMADO. OBLIGACIÓN DEL MÉDICO",
    materia: "Médico",
    tesis: "El médico debe obtener consentimiento informado del paciente antes de cualquier intervención. La falta de consentimiento puede generar responsabilidad.",
    precedente: "Jurisprudencia 1a./J. 89/2015, Primera Sala, SCJN",
    aplicacion: "Demandas por procedimientos no autorizados"
  },
  {
    id: "jrmed-3",
    tipo: "JR",
    titulo: "SECRETO MÉDICO. DEBER DE CONFIDENCIALIDAD",
    materia: "Médico",
    tesis: "El médico tiene deber de secreto sobre la información del paciente. Solo puede divulgarse con consentimiento o por orden judicial.",
    precedente: "Jurisprudencia 1a./J. 234/2016, Primera Sala, SCJN",
    aplicacion: "Demandas por violación de confidencialidad"
  },
  {
    id: "jrmed-4",
    tipo: "JR",
    titulo: "ERROR DE DIAGNÓSTICO. RESPONSABILIDAD",
    materia: "Médico",
    tesis: "El error de diagnóstico genera responsabilidad cuando deriva de negligencia o falta de medios. No toda equivocación es culposa.",
    precedente: "Jurisprudencia 1a./J. 56/2017, Primera Sala, SCJN",
    aplicacion: "Litigios médicos"
  },
  {
    id: "jrmed-5",
    tipo: "TESIS",
    titulo: "INTERRUPCIÓN DEL EMBARAZO. CAUSALES LEGALES",
    materia: "Médico",
    tesis: "El aborto no es punible cuando es practicado por médico con consentimiento de la mujer, en casos de violación o peligro para la vida.",
    precedente: "Tesis 1a. CCCLXXXIV/2015, Primera Sala, SCJN",
    aplicacion: "Procedimientos médicos"
  },
  {
    id: "jrmed-6",
    tipo: "TESIS",
    titulo: "EXPERIMENTACIÓN MÉDICA. LÍMITES ÉTICOS",
    materia: "Médico",
    tesis: "La experimentación en seres humanos requiere consentimiento informado, protocolos aprobados y beneficio potencial para el paciente.",
    precedente: "Tesis 1a. CCLXXII/2016, Primera Sala, SCJN",
    aplicacion: "Casos de investigación médica"
  },
  {
    id: "jrmed-7",
    tipo: "TESIS",
    titulo: "TRASPLANTES. REQUISITOS Y AUTORIZACIONES",
    materia: "Médico",
    tesis: "Los trasplantes requieren consentimiento del donante o autorización judicial para donante fallecido, y cumplimiento de protocolos médicos.",
    precedente: "Tesis 1a. CCCXCVIII/2017, Primera Sala, SCJN",
    aplicacion: "Casos de trasplantes"
  },
  {
    id: "jrmed-8",
    tipo: "TESIS",
    titulo: "EXPEDIENTE CLÍNICO. OBLIGACIONES DE CONSERVACIÓN",
    materia: "Médico",
    tesis: "Los establecimientos médicos deben conservar el expediente clínico por períodos mínimos. El paciente tiene derecho a acceder a él.",
    precedente: "Tesis 1a. CCLXXXIX/2015, Primera Sala, SCJN",
    aplicacion: "Acceso a información médica"
  },
  {
    id: "jrauto-1",
    tipo: "JR",
    titulo: "RESPONSABILIDAD CIVIL EN ACCIDENTES DE TRÁNSITO",
    materia: "Automovilístico",
    tesis: "El conductor responde de los daños causados por su vehículo. Se presume responsable cuando hay circulación y daño, salvo prueba en contrario.",
    precedente: "Jurisprudencia 2a./J. 189/2014, Segunda Sala, SCJN",
    aplicacion: "Demandas por accidentes"
  },
  {
    id: "jrauto-2",
    tipo: "JR",
    titulo: "SEGURO DE GASTOS MÉDICOS. COBERTURA BÁSICA",
    materia: "Automovilístico",
    tesis: "El seguro de gastos médicos cubre la atención hospitalaria y quirúrgica del asegurado, hasta los límites establecidos en la póliza.",
    precedente: "Jurisprudencia 2a./J. 67/2016, Segunda Sala, SCJN",
    aplicacion: "Reclamaciones de seguros"
  },
  {
    id: "jrauto-3",
    tipo: "JR",
    titulo: "DANOS A TERCEROS. RESPONSABILIDAD DEL ASEGURADO",
    materia: "Automovilístico",
    tesis: "El seguro de responsabilidad civil cubre los daños causados a terceros por el vehículo asegurado, hasta el límite de la póliza.",
    precedente: "Jurisprudencia 2a./J. 234/2015, Segunda Sala, SCJN",
    aplicacion: "Siniestros automobiles"
  },
  {
    id: "jrauto-4",
    tipo: "JR",
    titulo: "TOTAL PERDIDA DEL VEHÍCULO. INDEMNIZACIÓN",
    materia: "Automovilístico",
    tesis: "En caso de pérdida total del vehículo, la aseguradora debe pagar el valor real del automotor al momento del siniestro, deducible aplicado.",
    precedente: "Jurisprudencia 2a./J. 156/2017, Segunda Sala, SCJN",
    aplicacion: "Liquidación de siniestros"
  },
  {
    id: "jrauto-5",
    tipo: "TESIS",
    titulo: "FRANQUICIA. GASTOS NO CUBIERTOS",
    materia: "Automovilístico",
    tesis: "La franquicia es la cantidad que debe pagar el asegurado por cada siniestro. No constituye enriquecimiento ilícito de la aseguradora.",
    precedente: "Tesis 2a. CCCLXXXVI/2016, Segunda Sala, SCJN",
    aplicacion: "Controversias con aseguradoras"
  },
  {
    id: "jrauto-6",
    tipo: "TESIS",
    titulo: "IMPUTACIÓN EN ACCIDENTES. CRITERIOS",
    materia: "Automovilístico",
    tesis: "La responsabilidad en accidentes de tránsito se determina según la conducta del conductor, estado del vehículo y circunstancias del siniestro.",
    precedente: "Tesis 2a. CCLXIV/2015, Segunda Sala, SCJN",
    aplicacion: "Determinación de responsabilidades"
  },
  {
    id: "jrauto-7",
    tipo: "TESIS",
    titulo: "LESIONES EN ACCIDENTES. GASTOS MÉDICOS",
    materia: "Automovilístico",
    tesis: "El responsable de un accidente debe cubrir los gastos médicos del lesionado, incluyendo tratamiento, hospitalización y rehabilitación.",
    precedente: "Tesis 2a. CCCXII/2017, Segunda Sala, SCJN",
    aplicacion: "Reclamaciones médicas"
  },
  {
    id: "jrauto-8",
    tipo: "TESIS",
    titulo: "DAÑOS PATRIMONIALES. LUCRO CESANTE",
    materia: "Automovilístico",
    tesis: "En accidentes de tránsito también procede el lucro cesante cuando la víctima no puede trabajar durante su recuperación.",
    precedente: "Tesis 2a. CCLXXXIX/2016, Segunda Sala, SCJN",
    aplicacion: "Cálculo de daños"
  },
  {
    id: "jrinm-1",
    tipo: "JR",
    titulo: "ARRENDAMIENTO INMOBILIARIO. PROCEDIMIENTO DE DESALOJO",
    materia: "Inmobiliario",
    tesis: "El procedimiento de desalojo procede cuando el inquilino no paga renta o incumple el contrato. Se requiere demanda y notificación legal.",
    precedente: "Jurisprudencia 1a./J. 89/2015, Primera Sala, SCJN",
    aplicacion: "Desalojos por falta de pago"
  },
  {
    id: "jrinm-2",
    tipo: "JR",
    titulo: "COMPRAVENTA INMOBILIARIA. ESCRITURA PÚBLICA",
    materia: "Inmobiliario",
    tesis: "La compraventa de inmuebles debe otorgarse en escritura pública para su inscripción en el Registro Público de la Propiedad.",
    precedente: "Jurisprudencia 1a./J. 234/2014, Primera Sala, SCJN",
    aplicacion: "Operaciones inmobiliarias"
  },
  {
    id: "jrinm-3",
    tipo: "JR",
    titulo: "HIPOTECA. INSCRIPCIÓN Y EFECTOS",
    materia: "Inmobiliario",
    tesis: "La hipoteca se inscribe en el Registro Público de la Property. Confiere al acreedor derecho de preferencia y ejecución sobre el inmueble.",
    precedente: "Jurisprudencia 1a./J. 167/2016, Primera Sala, SCJN",
    aplicacion: "Créditos hipotecarios"
  },
  {
    id: "jrinm-4",
    tipo: "JR",
    titulo: "USUFRUCTO INMOBILIARIO. CONSTITUCIÓN",
    materia: "Inmobiliario",
    tesis: "El usufructo inmobiliario puede constituirse por contrato, testamento o prescripción. El usufructuario debe respetar el destino del bien.",
    precedente: "Jurisprudencia 1a./J. 56/2015, Primera Sala, SCJN",
    aplicacion: "Operaciones con usufructo"
  },
  {
    id: "jrinm-5",
    tipo: "TESIS",
    titulo: "COBRO DE RENTAS. PROCEDIMIENTO",
    materia: "Inmobiliario",
    tesis: "El arrendador puede exigir el pago de rentas vencidas mediante procedimiento ejecutivo, acompañar contratos y recibos como prueba.",
    precedente: "Tesis 1a. CCCLXXII/2016, Primera Sala, SCJN",
    aplicacion: "Cobro de arrendamiento"
  },
  {
    id: "jrinm-6",
    tipo: "TESIS",
    titulo: "CONDOMINIOS. REGLAS DE CONVIVENCIA",
    materia: "Inmobiliario",
    tesis: "Los condominos deben respetar el reglamento interno. La asamblea puede imponer sanciones por incumplimiento de las reglas.",
    precedente: "Tesis 1a. CCLXXXVI/2017, Primera Sala, SCJN",
    aplicacion: "Controversias en condomínios"
  },
  {
    id: "jrinm-7",
    tipo: "TESIS",
    titulo: "PLUSVALÍA. IMPUESTO LOCAL",
    materia: "Inmobiliario",
    tesis: "Algunos estados aplican impuesto sobre la ganancia derivada de la venta de inmuebles. La base es la diferencia entre precio de compra y venta.",
    precedente: "Tesis 2a. CCCIV/2016, Segunda Sala, SCJN",
    aplicacion: "Fiscalidad inmobiliaria"
  },
  {
    id: "jrinm-8",
    tipo: "TESIS",
    titulo: "CONSTRUCCIÓN. RESPONSABILIDAD DE LA EMPRESA",
    materia: "Inmobiliario",
    tesis: "Las empresas constructoras responden por defectos de construcción durante 10 años conforme a la ley federal del consumo.",
    precedente: "Tesis 1a. CCLIV/2015, Primera Sala, SCJN",
    aplicacion: "Reclamaciones por vicios ocultos"
  },
  {
    id: "jrtrib-1",
    tipo: "JR",
    titulo: "LABORAL. COMPETENCIA DE LA JUNTA DE CONCILIACIÓN",
    materia: "Tribunal",
    tesis: "Las Juntas de Conciliación y Arbitraje son competentes para conocer de conflictos individuales de trabajo en primera instancia.",
    precedente: "Jurisprudencia 14/2009, Segunda Sala, SCJN",
    aplicacion: "Conflictos laborales"
  },
  {
    id: "jrtrib-2",
    tipo: "JR",
    titulo: "MERCANTIL. COMPETENCIA DEL JUEZ ESPECIALIZADO",
    materia: "Tribunal",
    tesis: "Los jueces especializados en materia mercantil conocen de operaciones mercantiles, títulos de crédito y obligaciones comerciales.",
    precedente: "Jurisprudencia 2a./J. 78/2014, Segunda Sala, SCJN",
    aplicacion: "Litigio mercantil"
  },
  {
    id: "jrtrib-3",
    tipo: "JR",
    titulo: "FISCAL. TRIBUNALES ESPECIALIZADOS",
    materia: "Tribunal",
    tesis: "Los Tribunales Federales de Justicia Administrativa conocen de las impugnaciones contra resoluciones fiscales definitivas.",
    precedente: "Jurisprudencia 2a./J. 156/2015, Segunda Sala, SCJN",
    aplicacion: "Recursos fiscales"
  },
  {
    id: "jrtrib-4",
    tipo: "JR",
    titulo: "PENAL. SISTEMA ACUSATORIO ORAL",
    materia: "Tribunal",
    tesis: "El sistema penal acusatorio opera con audiencias orales, principio de contradictorio y respeto a los derechos humanos del imputado.",
    precedente: "Jurisprudencia 1a./J. 45/2015, Primera Sala, SCJN",
    aplicacion: "Procesos penales"
  },
  {
    id: "jrtrib-5",
    tipo: "TESIS",
    titulo: "EJECUCIÓN DE SENTENCIAS. COMPETENCIA",
    materia: "Tribunal",
    tesis: "La ejecución de sentencias corresponde al tribunal que emitió el fallo, quien debe vigilar su cumplimiento exacto.",
    precedente: "Tesis 1a. CCLXXXIX/2016, Primera Sala, SCJN",
    aplicacion: "Cumplimiento de fallos"
  },
  {
    id: "jrtrib-6",
    tipo: "TESIS",
    titulo: "RECONOCIMIENTO DE SENTENCIAS EXTRANJERAS",
    materia: "Tribunal",
    tesis: "Las sentencias extranjeras pueden ejecutarse en México mediante el procedimiento de exequátur, según tratados internacionales.",
    precedente: "Tesis 1a. CCCXIV/2017, Primera Sala, SCJN",
    aplicacion: "Sentencias internacionales"
  },
  {
    id: "jrciv-12",
    tipo: "JR",
    titulo: "PENSION ALIMENTICIA. ES IRRENUNCIABLE",
    materia: "Civil",
    tesis: "El derecho a la pensión alimenticia es irrenunciable y puede demandarse en cualquier tiempo. Los alimentos deben ser proporcionados según las necesidades de quien los pide y las posibilidades de quien los da.",
    precedente: "Jurisprudencia 1a./J. 45/2013, Primera Sala, SCJN",
    aplicacion: "Demandas de alimentos"
  },
  {
    id: "jrciv-13",
    tipo: "JR",
    titulo: "PATRIA POTESTAD. SU EJERCICIO CORRESPONDE A AMBOS PADRES",
    materia: "Civil",
    tesis: "La patria potestad se ejercerá jointly por el padre y la madre. En caso de discrepancia, el juez resolverá considerando el interés superior del menor.",
    precedente: "Jurisprudencia 1a./J. 56/2014, Primera Sala, SCJN",
    aplicacion: "Custodia y régimen de visitas"
  },
  {
    id: "jrciv-14",
    tipo: "JR",
    titulo: "ARRENDAMIENTO. PROHIBICIÓN DE DESALOJO SIN ORDEN JUDICIAL",
    materia: "Civil",
    tesis: "El arrendador no puede realizar el desalojo del arrendatario sin obtener previamente orden judicial. El lanzamiento de facto está prohibido.",
    precedente: "Jurisprudencia 1a./J. 23/2017, Primera Sala, SCJN",
    aplicacion: "Conflictos arrendaticios"
  },
  {
    id: "jrlab-13",
    tipo: "JR",
    titulo: "ACOSO LABORAL. CONSTITUYE VIOLACIÓN A DERECHOS FUNDAMENTALES",
    materia: "Laboral",
    tesis: "El acoso laboral o mobbing constituye una violación a los derechos fundamentales del trabajador y puede generar responsabilidad patronales.",
    precedente: "Jurisprudencia 2a./J. 67/2015, Segunda Sala, SCJN",
    aplicacion: "Demandas por acoso"
  },
  {
    id: "jrlab-14",
    tipo: "JR",
    titulo: "PRIMA DE ANTIGÜEDAD. TOPE DE 2 SALARIOS MÍNIMOS",
    materia: "Laboral",
    tesis: "La prima de antigüedad tiene un tope de 2 salarios mínimos generales elevados al año por cada año de servicio.",
    precedente: "Jurisprudencia 2a./J. 89/2014, Segunda Sala, SCJN",
    aplicacion: "Cálculo de liquidación"
  },
  {
    id: "jrpens-1",
    tipo: "JR",
    titulo: "PENSION POR VIUDEZ. REQUISITOS",
    materia: "Laboral",
    tesis: "Para tener derecho a pension por viudez, el trabajador debe haber cotizado al menos 150 semanas al IMSS al momento del fallecimiento.",
    precedente: "Jurisprudencia 2a./J. 34/2016, Segunda Sala, SCJN",
    aplicacion: "Pensiones del IMSS"
  },
  {
    id: "jrseg-1",
    tipo: "JR",
    titulo: "SEGURO DE GASTOS MÉDICOS. PROCEDE RECLAMACIÓN",
    materia: "Mercantil",
    tesis: "El asegurado tiene derecho a que la aseguradora cubra los gastos médicos conforme a las condiciones de la póliza. La negativa sin justificación genera responsabilidad.",
    precedente: "Jurisprudencia 2a./J. 12/2018, Segunda Sala, SCJN",
    aplicacion: "Reclamaciones de seguros"
  },
  {
    id: "jradmin-1",
    tipo: "JR",
    titulo: "RECURSO ADMINISTRATIVO. DEBE INTERPONERSE EN PLAZO",
    materia: "Administrativo",
    tesis: "El recurso administrativo debe interponerse dentro de los 15 días hábiles siguientes al acto impugnado. El incumplimiento del plazo causa sobreseer.",
    precedente: "Jurisprudencia 1a./J. 67/2019, Primera Sala, SCJN",
    aplicacion: "Impugnación de actos administrativos"
  },
  {
    id: "jrfiscal-1",
    tipo: "JR",
    titulo: "RESOLUCIÓN FISCAL. DEBE ESTAR DEBIDAMENTE FUNDAMENTADA",
    materia: "Fiscal",
    tesis: "Las resoluciones fiscales deben estar fundamentadas y motivadas. La falta de estos requisitos las hace nulas.",
    precedente: "Jurisprudencia 2a./J. 45/2020, Segunda Sala, SCJN",
    aplicacion: "Recursos fiscales"
  }
];

export const leyesMexicanas: Ley[] = [
  {
    id: "cpeum",
    titulo: "Constitución Política de los Estados Unidos Mexicanos",
    abreviatura: "CPEUM",
    fechaPublicacion: "05/02/1917",
    materia: "Constitucional",
    descripcion: "Norma fundamental de los Estados Unidos Mexicanos que establece los derechos humanos, la organización del Estado y las garantías individuales.",
    articulos: [
      { numero: "1", contenido: "En los Estados Unidos Mexicanos todas las personas gozarán de los derechos humanos reconocidos en esta Constitución y en los tratados internacionales de los que el Estado Mexicano sea parte, así como de todas las garantías para su protección, cuyo ejercicio no podrá restringirse ni suspenderse, salvo en los casos y bajo las condiciones que esta Constitución establece." },
      { numero: "3", contenido: "Todo individuo tiene derecho a recibir educación. El Estado la impartirá gratuitamente, comenzando por la preescolar." },
      { numero: "14", contenido: "A ninguna ley se dará efecto retroactivo en perjuicio de persona alguna. Nadie podrá ser privado de la vida, de la libertad o de sus propiedades, sino mediante juicio seguido ante los tribunales previamente establecidos." },
      { numero: "16", contenido: "Nadie puede ser molestado en su persona, familia, domicilio, papeles o posesiones, sino en virtud de mandamiento escrito de la autoridad competente." },
      { numero: "17", contenido: "Ninguna persona podrá hacerse justicia por sí misma, ni ejercer violencia para reclamar su derecho. Toda persona tiene derecho a que se le administre justicia por tribunales expeditos." },
      { numero: "21", contenido: "La imposición de las penas es propia y exclusiva de la autoridad judicial. La investigación y persecución de los delitos incumbe al Ministerio Público." },
      { numero: "27", contenido: "La propiedad de las tierras y aguas comprendidas dentro de los límites del territorio nacional, corresponde originariamente a la Nación, quien ha tenido y tiene derecho de trasmitir el dominio de ellas a los particulares." },
      { numero: "28", contenido: "Queda prohibida toda especialización o monopolio de hecho en las mercancías, productos, artículos o servicios destinados a la alimentación, la educación, la vivienda, el transporte médico o cualquier servicio público." },
      { numero: "123", contenido: "Toda persona tiene derecho al trabajo digno y socialmente útil. La jornada máxima de trabajo diurna es de ocho horas." },
      { numero: "133", contenido: "Esta Constitución, las Leyes del Congreso de la Unión y todos los Tratados que estén de acuerdo con la misma, celebrados y que se celebren por el Presidente de la República, con aprobación del Senado, serán la Ley Suprema de toda la Unión." }
    ]
  },
  {
    id: "ccf",
    titulo: "Código Civil Federal",
    abreviatura: "CCF",
    fechaPublicacion: "26/05/1928",
    materia: "Civil",
    descripcion: "Norma que regula las relaciones jurídicas entre particulares en materia de personas, familia, bienes, obligaciones y contratos.",
    articulos: [
      { numero: "1", contenido: "Las disposiciones de este Código regirán en todo el territorio de la República, respecto de las personas, de los bienes y de las relaciones jurídicas." },
      { numero: "17", contenido: "La capacidad jurídica de las personas físicas se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "73", contenido: "Son menores de edad los que no han cumplido dieciocho años. Son mayores de edad los que ya los cumplen." },
      { numero: "128", contenido: "El matrimonio es la unión libre de dos personas para realizar la comunidad de vida, en donde ambos se procuran ayuda mutua." },
      { numero: "1636", contenido: "Hay contrato cuando dos o más personas consentan en crear o transferir derechos u obligaciones recíprocas." },
      { numero: "1794", contenido: "Son elementos del contrato: consentimiento, objeto y causa." },
      { numero: "1803", contenido: "El contrato puede ser unilateral o bilateral. Es unilateral el contrato en que una sola de las partes se obliga hacia la otra, sin que esta le obligue a su vez." },
      { numero: "1835", contenido: "Los contratos serán obligatorios, cualquiera que sea la forma en que se hayan ejecutado, siempre que exista consentimiento respecto de un objeto o causa licitos." },
      { numero: "2274", contenido: "El arrendamiento es un contrato por el cual una de las partes se obliga a conceder el uso o goce temporal de una cosa, a cambio de un renta pagadera en dinero." },
      { numero: "2294", contenido: "El contrato de hospedaje tiene lugar cuando uno de los大酒店 se obliga a proporcionar albergue transient a cambio de un precio." },
      { numero: "2396", contenido: "Hay mandato cuando una persona se obliga a ejecutar por cuenta o cargo de otra los actos jurídicos que esta le encarga." },
      { numero: "2407", contenido: "El mandato puede ser general o especial. El general versa sobre todos los negocios del mandante. El especial versa sobre uno o más negocios determinados." },
      { numero: "2433", contenido: "El mutuo es un contrato por el cual el mutuatario recibe una cantidad de dinero, obligándose a devolver otra igual en el plazo convenido." },
      { numero: "2441", contenido: "El comodato es un contrato por el cual uno de los大酒店 se obliga a conceder gratuitamente el uso temporal de una cosa no fungible." },
      { numero: "2453", contenido: "El depósito es un contrato por el cual el depositario se obliga a recibir una cosa mueble para guardingarla y restituirla en especie." },
      { numero: "2463", contenido: "La prenda es un contrato por el cual el deudor u otra persona por él, entrega al acreedor una cosa mueble en security de una obligación." },
      { numero: "2476", contenido: "La hipoteca es un contrato por el cual se constituye un derecho real inmobiliario accessorio para garantizar un crédito." },
      { numero: "2855", contenido: "La sucesión hereditaria es la transmisión de los bienes, derechos y obligaciones del difunto a sus herederos o legatarios." },
      { numero: "2856", contenido: "La sucesión testamentaria es la que se verifica declarando la voluntad última del testador." },
      { numero: "2857", contenido: "La sucesión legítima es la que tiene lugar cuando el difunto no ha dispuesto de sus bienes por testamento." },
      { numero: "2865", contenido: "Son herederos forzosos: los descendientes, el cónyuge, los ascendientes y los hermanos." },
      { numero: "2871", contenido: "Para que la disposición testamentaria produzca efectos, debe constar en testamento pública abierta o cerrada." },
      { numero: "2877", contenido: "Son requisitos del testamento: I. Que sea hecho por el testador en persona; II. Que sea un acto jurídico; III. Que sea revocable." },
      { numero: "2882", contenido: "El testamento Público Abierto se otorga ante Notario y dos testigos." },
      { numero: "2883", contenido: "El testamento Público Cerrado debe ser escrito por el testador o por otra persona, con firma autógrafa." },
      { numero: "2897", contenido: "Son incapaces de heredar por causa de indignidad: I. El que dolosamente haya matsdo o intentado matar al autor de la herencia; II. El que haya calificado criminalmente al difunto." },
      { numero: "2903", contenido: "El heredero puede aceptar la herencia pura y simplemente o a beneficio de inventario." },
      { numero: "2915", contenido: "El inventario debe comprender la estimación de todos los bienes muebles e inmuebles de la herencia." },
      { numero: "2922", contenido: "Los acreedors del heredero pueden pedir la separación de bienes." },
      { numero: "2936", contenido: "El albacea representa a la herencia y debe cumplir las disposiciones testamentarias." },
      { numero: "2945", contenido: "Son obligaciones del albacea: I. Inventariar los bienes; II. Admistrar la herencia; III. Representar a la sucesión en juicio." },
      { numero: "2979", contenido: "La acción para revendindicar la propiedad prescribe en diez años." },
      { numero: "2981", contenido: "La acción para reclamar el monto de lo dûe prescribe en diez años desde que puede exigirse el pago." },
      { numero: "3053", contenido: "La prescripción negativa requiere que el que pretende adquirirse de ella reúna las condiciones siguientes: I. Posición; II. Que sea en concepto de Dueño; III. Que sea pública." }
    ]
  },
  {
    id: "cpf",
    titulo: "Código Penal Federal",
    abreviatura: "CPF",
    fechaPublicacion: "14/08/1931",
    materia: "Penal",
    descripcion: "Ley que define los delitos y las penas que les corresponden, así como los casos de excarcelación y los procedimientos para aplicar las sanciones.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en todo el territorio de la Federación en los casos expresamente previstos por los artículos 2, 3 y cualesquiera otros de la legislación federal." },
      { numero: "4", contenido: "No se puede imponer por la vía administrativa sanción alguna que, considerada penal, no esté prevista por este Código o por las leyes especiales." },
      { numero: "5", contenido: "El delito es el acto u omisión que sanctionan las leyes penales." },
      { numero: "6", contenido: "Son responsables del delito: I. Los autores y cómplices; II. Los que coarten la libertad de otros para cometerlo; III. Los que faciliten los medios para ejecutarlo." },
      { numero: "123", contenido: "Comete el delito de lesiones quien cause a otro algún daño en su cuerpo o en su salud." },
      { numero: "167", contenido: "Se thief configuration con la sustracción de una cosa ajena, sin la voluntad de su Dueño." },
      { numero: "209", contenido: "Comete el delito de fraude el que engañando a uno o aprovechándose del error en que estos各自 se encuentren, se hace Delivery de una cosa o adquiere un lucro cualquiera." }
    ]
  },
  {
    id: "lflt",
    titulo: "Ley Federal del Trabajo",
    abreviatura: "LFT",
    fechaPublicacion: "01/04/1970",
    materia: "Laboral",
    descripcion: "Ley que regula las relaciones de trabajo entre patrones y trabajadores, estableciendo derechos y obligaciones de ambas partes.",
    articulos: [
      { numero: "1", contenido: "Esta Ley regula las relaciones de trabajo comprendidas en el artículo 123, Apartado A, de la Constitución Política de los Estados Unidos Mexicanos." },
      { numero: "5", contenido: "Son herramientas de trabajo los instrumentos y medios necesarios para que el trabajador desempeñe las funciones que le fueron asignadas." },
      { numero: "20", contenido: "Es patrón la persona física o moral que utiliza los servicios de uno o más trabajadores." },
      { numero: "21", contenido: "Son trabajadores las personas físicas que prestan a otra, física o moral, un servicio personal subordinado, mediante el pago de un salario." },
      { numero: "84", contenido: "Los patrones estarán obligados a proporcionar a los trabajadores, capacitación o adiestramiento en el trabajo que desarrollen." },
      { numero: "123", contenido: "Jornada máxima diurna es la comprendida entre las seis y las veinte horas." },
      { numero: "132", contenido: "Son obligaciones de los patrones: I. Preferir a los trabajadores mexicanos en igualdad de condiciones; II. Pagar los salarios; III. Guardar respeto a los trabajadores." },
      { numero: "158", contenido: "Los trabajadores tendrán derecho a un aguinaldo anual que deberá pagarse antes del día veinte de diciembre, equivalente a quince días de salario, por lo menos." },
      { numero: "162", contenido: "Los trabajadores tienen derecho a una prima de antigüedad, consistente en doce días de salario por cada año de servicios." },
      { numero: "170", contenido: "Las trabajadoras tienen derecho a un descanso de seis semanas anteriores y seis posteriores al parto." },
      { numero: "184", contenido: "Es nula la renuncia faites por el trabajador de los derechos que le otorgan las leyes laborales." },
      { numero: "185", contenido: "Los trabajadores pueden sépararse del trabajo cuando el patrón no cumple las obligaciones contraídas en el contrato." },
      { numero: "186", contenido: "El patrón puede separarse del trabajadores sin responsabilidad cuando este falta a sus obligaciones por más de tres días sin causa justificada." },
      { numero: "191", contenido: "Son causas de rescisión de la relación de trabajo, sin responsabilidad para el patrón: I. Engaño del trabajador al patrón sobre sus cualidades o certificados; II. Injurias al patrón o su familia." },
      { numero: "193", contenido: "El trabajador puede demandar la rescisión de su relación laboral cuando el patrón incurra en incumplimiento de las obligaciones del contrato." },
      { numero: "194", contenido: "Indemnización: Cuando el patrón separación injustificadamente al trabajador, debe pagar: 90 días de salario, prima de antigüedad, salaries caídos, y benefits no cubiertos." },
      { numero: "195", contenido: "El trabajador tiene derecho a que se le indemnice con 90 días de salario por año trabajado en caso de despido injustificado." },
      { numero: "196", contenido: "La prima de antigüedad consiste en el importe de veinte días de salario por cada año de servicios." },
      { numero: "210", contenido: "El trabajador que sea separado injustificadamente tiene derecho a que se le paguen los salaries caídos desde la fecha del despido hasta que se le notifique el laudo." },
      { numero: "220", contenido: "Las Actions laborales prescriben en un año, excepto las de separación injustificada que prescriben en dos meses." },
      { numero: "235", contenido: "La Jornada máxima nocturna es la comprendida entre las veinte y las seis horas." },
      { numero: "240", contenido: "Las horas extras se pagarán con un 100% más del salario Normal cuando sean diurnas, y con 200% cuando sean nocturnas." },
      { numero: "258", contenido: "Los trabajadores tendrán derecho a un período de vacaciones que en ningún caso podrá ser inferior a seis días laborables." },
      { numero: "260", contenido: "Los trabajadores que tengan más de un año de servicios Enjoy tendrá derecho a un período vacacional que no podrá ser inferior a 20 días." },
      { numero: "267", contenido: "La Prima vacacional será del 25% sobre los salarios que correspondan al período vacacional." },
      { numero: "287", contenido: "Son risgos de trabajo los accidentes y enfermedades a que están expuestos los trabajadores en ejercicio o con motivo del trabajo." },
      { numero: "302", contenido: "El patrón está obligado a registrar a sus trabajadores ante el Instituto Mexicano del Seguro Social." },
      { numero: "500", contenido: "Los menores de dieciséis años no pueden prestar sus servicios." }
    ]
  },
  {
    id: "lgsm",
    titulo: "Ley General de Sociedades Mercantiles",
    abreviatura: "LGSM",
    fechaPublicacion: "04/08/1934",
    materia: "Mercantil",
    descripcion: "Ley que regula la constitución, funcionamiento, fusión, transformación y disolución de las diferentes sociedades mercantiles.",
    articulos: [
      { numero: "1", contenido: "Las sociedades mercantiles constituyen comerciantes, aun cuando su objeto no sea la realización de actos de comercio." },
      { numero: "5", contenido: "Son mercantiles las sociedades constituidas en la forma prevista en esta Ley." },
      { numero: "1", contenido: "Las sociedades mercantiles se regularán por las disposiciones de esta Ley, y se titularán: I. Sociedad en nombre colectivo; II. Sociedad en comandita simple; III. Sociedad de responsabilidad limitada; IV. Sociedad anónima; V. Sociedad en comandita por acciones." },
      { numero: "50", contenido: "La sociedad anónima es la que se constituye por el acuerdo de dos o más personas que obligan sus bienes para realizar el objeto social." },
      { numero: "86", contenido: "El capital social estará dividido en acciones nominalivas." },
      { numero: "112", contenido: "La sociedad de responsabilidad limitada no podrá denominarse con un nombre que pueda confundirse con el de otra sociedad preexistente." },
      { numero: "206", contenido: "La sociedad en comandita simple se constituye entre uno o varios socios comanditados que responden subsidiaria e ilimitadamente, y uno o varios comanditarios que solo están obligados al pago de sus aportaciones." },
      { numero: "250", contenido: "La fusión de sociedades deberá presentarse al Registro Público de Comercio y publicarse en el Diario Oficial de la Federación." }
    ]
  },
  {
    id: "cff",
    titulo: "Código Fiscal de la Federación",
    abreviatura: "CFF",
    fechaPublicacion: "31/12/1981",
    materia: "Fiscal",
    descripcion: "Ley que establece las normas comunes aplicables a los tributos federativos y a las relaciones entre contribuyentes y la autoridad fiscal.",
    articulos: [
      { numero: "1", contenido: "Las personas físicas y las morales están Obligadas al pago de los tributos federales." },
      { numero: "6", contenido: "Las contribuciones se causan conforme se realizan las situaciones jurídicas o de hecho, previsto en las leyes fiscales vigentes durante la realización de la situación." },
      { numero: "14", contenido: "Los contribuyentes deberán presentar sus declaraciones en los plazos que señale el Reglamento de este Código y las disposiciones administrativas de carácter general." },
      { numero: "16", contenido: "Es nulo todo acto administrativo que carezca de los fundamentos legales o de competencia." },
      { numero: "21", contenido: "Las autoridades fiscales estarán facultadas para determinar las contribuciones omitidas y para imponer las sanciones correspondientes." },
      { numero: "42", contenido: "Los recargos se causarán por cada mes o fracción que transcurra desde la fecha en que debieron pagarse las contribuciones y hasta la fecha en que se efectúen." },
      { numero: "63", contenido: "Las facultades de las autoridades fiscales para determinar contribuciones omitidas y sus accesorios prescriben en el plazo de cinco años." },
      { numero: "84", contenido: "Son infracciones-related con el incumplimiento de obligaciones fiscales: I. No presentar las declaraciones; II. Presentarlas fuera de los plazos; III. Presentarlas con datos falsos." }
    ]
  },
  {
    id: "lISR",
    titulo: "Ley del Impuesto sobre la Renta",
    abreviatura: "LISR",
    fechaPublicacion: "01/01/2002",
    materia: "Fiscal",
    descripcion: "Ley que establece el Impuesto sobre la Renta, sus excepciones, los procedimientos para su determinación y las obligaciones de los contribuyentes.",
    articulos: [
      { numero: "1", contenido: "Están obligadas al pago del Impuesto sobre la Renta las personas físicas y las morales que obtengan ingresos en México." },
      { numero: "2", contenido: "Las personas morales tributarán conforme a las disposiciones del Título II de esta Ley." },
      { numero: "9", contenido: "Se consideran ingresos por actividades empresariales los derivados de la realización habitual y sistemática de actividades mercantiles o industriales." },
      { numero: "10", contenido: "Los ingresos por servicios profesionales incluyen los obtenidos por personas que presten servicios a terceros." },
      { numero: "20", contenido: "Los contribuyentes personas físicas ISR pagarán mediante declaraciones que presenten en los meses de abril y septiembre." },
      { numero: "90", contenido: "Las personas morales estarán obligadas al pago del ISR sobre la renta que obtengan en el ejercicio." },
      { numero: "93", contenido: "Las personas morales del Título II de esta Ley podrán aplicar incentivos fiscales para estimular la inversión." },
      { numero: "140", contenido: "Las personas físicas que obtengan ingresos por salarios pagarán el ISR mediante retención que efectúe el patrón." }
    ]
  },
  {
    id: "lIVA",
    titulo: "Ley del Impuesto al Valor Agregado",
    abreviatura: "LIVA",
    fechaPublicacion: "29/12/1978",
    materia: "Fiscal",
    descripcion: "Ley que establece el Impuesto al Valor Agregado, sus tasas, objetos, exenciones y procedimientos.",
    articulos: [
      { numero: "1", contenido: "Están obligadas al pago del impuesto al valor agregado las personas físicas y morales que realicen los actos o actividades gravados." },
      { numero: "2", contenido: "El impuesto se causa al momento de realizarse la enajenación de bienes, prestación de servicios u otorgamiento del uso o goce temporal de bienes." },
      { numero: "5", contenido: "El impuesto se calculará aplicando la tasa del 16% al valor de los actos o actividades gravados." },
      { numero: "15", contenido: "Los contribuyentes del IVA tendrán derecho a acreditarse el impuesto que les haya sido traslado." },
      { numero: "16", contenido: "El acreditamiento del impuesto deberá realizarse contra el ISR a cargo del contribuyente del mismo ejercicio." },
      { numero: "18", contenido: "Las personas que فقط enajenen bienes o presten servicios a consumidores finales estarán obligadas a traslada el IVA." }
    ]
  },
  {
    id: "cnpcf",
    titulo: "Código Nacional de Procedimientos Civiles y Familiares",
    abreviatura: "CNPCF",
    fechaPublicacion: "07/06/2023",
    materia: "Procesal",
    descripcion: "Código que establece las normas procesales aplicables a los procedimientos civiles y familiares en todo el país.",
    articulos: [
      { numero: "1", contenido: "Este Código establece las normas procesales civiles y familiares que regirán en el territorio nacional." },
      { numero: "17", contenido: "Las淡红色 se tendrán por existentes cuando de la narración de los hechos aparezcan los elementos esenciales del negocio jurídico." },
      { numero: "48", contenido: "La demanda deberá contener: nombre del actor y demandado, objeto de la acción, hechos y fundamentos de derecho." },
      { numero: "94", contenido: "Las pruebas se offercen en la audiencia preliminar y se admiten en la audiencia de juicio." },
      { numero: "123", contenido: "La sentencia debe ser clara, precisa y congruente con la demanda y la contestación." },
      { numero: "156", contenido: "El recurso de apelación procede contra sentencias definitivas y interlocutorias." },
      { numero: "200", contenido: "En materia familiar, el interés superior del niño, niña o adolescente será la consideración primordial." },
      { numero: "287", contenido: "El divorcio será procedentes por mutuo consentimiento o por causa justificada." }
    ]
  },
  {
    id: "cnpp",
    titulo: "Código Nacional de Procedimientos Penales",
    abreviatura: "CNPP",
    fechaPublicacion: "05/03/2014",
    materia: "Penal",
    descripcion: "Código que establece las normas procesales para la investigación, persecución y sanción de los delitos.",
    articulos: [
      { numero: "1", contenido: "Este Código establece las normas que regirán los procedimientos penales." },
      { numero: "11", contenido: "ElMinisterio Público ejercerá la acción penal conforme a las disposiciones de este Código." },
      { numero: "63", contenido: "El detenido tiene derecho a que se le informe de forma inmediata de sus derechos." },
      { numero: "107", contenido: "La prisión preventiva procederá cuando el inculpado no pueda garantiza su presencia en el proceso." },
      { numero: "168", contenido: "Los elementos de prueba se subject a valoración conforme a las reglas de la lógica y la experiencia." },
      { numero: "182", contenido: "El juicio oral es la fase central del procedimiento penal donde se desahogan las pruebas." },
      { numero: "400", contenido: "La audiencia de individualización de la pena se llevará a cabo una vez declarado culpable el imputado." },
      { numero: "456", contenido: "El procedimiento abreviado procede cuando el imputado Acepta los hechos y voluntariamente waive el juicio oral." }
    ]
  },
  {
    id: "lic",
    titulo: "Ley de Instituciones de Crédito",
    abreviatura: "LIC",
    fechaPublicacion: "14/07/1990",
    materia: "Bancario",
    descripcion: "Ley que regula las actividades de las instituciones de banca múltiple y de desarrollo.",
    articulos: [
      { numero: "1", contenido: "La presente Ley tiene por objeto regular las actividades de las instituciones de banca múltiple, las de banca de desarrollo, y las de los grupos financieros." },
      { numero: "2", contenido: "Las instituciones de banca múltiple serán las únicas autorizadas para captar recursos del público en dinero u otros documentos." },
      { numero: "46", contenido: "Las instituciones de banca múltiple solo podrán realizar las operaciones previstas en esta Ley." },
      { numero: "71", contenido: "Los depósitos bancarios están garantizados por el Instituto para la Protección del Ahorro Bancario." },
      { numero: "105", contenido: "Los usuarios de servicios bancarios tendrán derecho a la protección de sus datos personales." }
    ]
  },
  {
    id: "la",
    titulo: "Ley Aduanera",
    abreviatura: "LA",
    fechaPublicacion: "15/12/1995",
    materia: "Fiscal",
    descripcion: "Ley que regula la importación y exportación de mercancías, así como los procedimientos aduaneros.",
    articulos: [
      { numero: "1", contenido: "Esta Ley establece los procedimientos y las obligaciones relativas a la introducción de mercancía al territorio nacional." },
      { numero: "12", contenido: "El despacho de mercancías ante la autoridad aduanera se realizarán mediante-tramitación electrónica." },
      { numero: "36", contenido: "Los contribuyentes dedicados a la importación y exportación están obligados al pago de los impuestos al comercio exterior." },
      { numero: "150", contenido: "Las infracciones a esta Ley se sancionarán con multas, decomiso de mercancías y, en su caso, penas de prisión." }
    ]
  },
  {
    id: "lagra",
    titulo: "Ley Agraria",
    abreviatura: "LAGRA",
    fechaPublicacion: "26/02/1992",
    materia: "Agrario",
    descripcion: "Ley que regula las relaciones jurídicas de la propiedad rural y los derechos de los sujetos agrarios.",
    articulos: [
      { numero: "1", contenido: "Esta Ley regula las relaciones jurídicas de la tierra, cualquiera que sea su actividad." },
      { numero: "9", contenido: "La propiedad de las tierras, waters y bosques corresponderá a la Nación, quien ha tenido y tiene derecho de transmitir el dominio a los particulares." },
      { numero: "48", contenido: "Las comunidades Agrarias tienen personalidad jurídica y patrimonio propios." },
      { numero: "107", contenido: "Los ejidatarios tienen derecho a que se les adjudique en propiedad Parcela de tierra." }
    ]
  },
  {
    id: "lss",
    titulo: "Ley del Seguro Social",
    abreviatura: "LSS",
    fechaPublicacion: "21/12/1995",
    materia: "Laboral",
    descripcion: "Ley que establece el régimen obligatorio del seguro social y los servicios de salud.",
    articulos: [
      { numero: "1", contenido: "El seguro social obligatorio Protege a los trabajadores y a sus familias contra los riesgos establecido en esta Ley." },
      { numero: "12", contenido: "Son sujetos de aseguramiento los trabajadores subordinados y los trabajadores domésticos." },
      { numero: "15", contenido: "El patrón está obligado a inscribir a sus trabajadores ante el Instituto Mexicano del Seguro Social." },
      { numero: "107", contenido: "Los asegurados tienen derecho a la atención médica, quirúrgica, farmacéutica y hospitalaria." },
      { numero: "154", contenido: "El seguro de riesgos de trabajo cubre los accidentes y enfermedades a que están expuestos los trabajadores." }
    ]
  },
  {
    id: "linfonavit",
    titulo: "Ley del Instituto del Fondo Nacional de la Vivienda para los Trabajadores",
    abreviatura: "LINFONAVIT",
    fechaPublicacion: "24/04/1972",
    materia: "Laboral",
    descripcion: "Ley que crea el INFONAVIT y regula los financiamientos para la vivienda de los trabajadores.",
    articulos: [
      { numero: "1", contenido: "Es objeto del Instituto procurar a los trabajadores acceso a financiamientos para vivienda." },
      { numero: "29", contenido: "Los patrones están obligados a realizar las aportaciones del 5% sobre el salario de los trabajadores." },
      { numero: "53", contenido: "Los trabajadores tendrán derecho a un crédito para acquire vivienda mediante el sistema de ahorro integral." }
    ]
  },
  {
    id: "lc",
    titulo: "Ley de Concursos Mercantiles",
    abreviatura: "LCM",
    fechaPublicacion: "12/05/2000",
    materia: "Mercantil",
    descripcion: "Ley que regula los procedimientos de concurso mercantil para las empresas en dificultades financieras.",
    articulos: [
      { numero: "1", contenido: "Esta Ley establece los procedimientos relativos a la concursos mercantil de comerciantes personas morales." },
      { numero: "3", contenido: "El concurso mercantil tendrá por objeto la protección de la masa creditors y la conservación de la empresa." },
      { numero: "87", contenido: "La sentencia que declare el concurso producirá la Cessación de los intereses." },
      { numero: "142", contenido: "El conciliador deberá formular un informe que contenga la relación de creditors y la estimación de la masa." },
      { numero: "215", contenido: "El incumplimiento del plan de reestructura producirá la quiebra." }
    ]
  },
  {
    id: "lgcg",
    titulo: "Ley General de Contabilidad Gubernamental",
    abreviatura: "LGCG",
    fechaPublicacion: "31/12/2008",
    materia: "Administrativo",
    descripcion: "Ley que establece las normas generales para la contabilidad gubernamental y la harmonización de la información.",
    articulos: [
      { numero: "1", contenido: "Esta Ley es de orden público y tiene por objeto establecer los criterios generales para la contabilidad gubernamental." },
      { numero: "4", contenido: "Los estados financieros y la información presupuestaria serán comparables entre ente públicos." },
      { numero: "46", contenido: "Los entes públicos deberán registrar la información conforme a las reglas técnicas que emita el Consejo." }
    ]
  },
  {
    id: "lgcsca",
    titulo: "Ley General de Transparencia y Acceso a la Información Pública",
    abreviatura: "LGT AIP",
    fechaPublicacion: "07/02/2014",
    materia: "Constitucional",
    descripcion: "Ley que establece los principios y procedimientos para garantizar el derecho de acceso a la información.",
    articulos: [
      { numero: "1", contenido: "Esta Ley es de orden público y tiene por objeto establecer los principios, bases y procedimientos para garantizar el derecho de acceso a la información." },
      { numero: "5", contenido: "Toda la información en posesión de los sujetos obligados es pública." },
      { numero: "70", contenido: "Los sujetos obligados deberán poner a disposición del público y actualizar la información fundamental." },
      { numero: "141", contenido: "Los particulares podrán presentar solicitudes de acceso a la información sin necesidad de acreditar interés legítimo." }
    ]
  },
  {
    id: "lgdpdp",
    titulo: "Ley General de Protección de Datos Personales",
    abreviatura: "LGPDP",
    fechaPublicacion: "26/01/2017",
    materia: "Constitucional",
    descripcion: "Ley que establece las normas de protección de datos personales en posesión de sujetos obligados.",
    articulos: [
      { numero: "1", contenido: "Esta Ley tiene por objeto establecer las normas, principios y procedimientos para tutelar los datos personales." },
      { numero: "16", contenido: "El responsable debe contar con el consentimiento del titular para Treatment de sus datos personales." },
      { numero: "37", contenido: "Los titulares tienen derecho a acceder, rectificar, Cancelar u oponerse al tratamiento de sus datos." }
    ]
  },
  // LEYES ESTATALES
  {
    id: "cccdmx",
    titulo: "Código Civil para el Distrito Federal",
    abreviatura: "CCCDMX",
    fechaPublicacion: "16/07/2024",
    materia: "Civil",
    descripcion: "Código Civil vigente en la Ciudad de México, que regula las relaciones jurídicas entre particulares.",
    articulos: [
      { numero: "1", contenido: "Las disposiciones de este Código regirán en todo el territorio de la Ciudad de México, respecto de las personas, de los bienes y de las relaciones jurídicas." },
      { numero: "7", contenido: "La capacidad jurídica de las personas físicas se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "158", contenido: "Son menores de edad las personas que no han cumplido dieciocho años." },
      { numero: "221", contenido: "El matrimonio es la unión libre de dos personas para realizar la comunidad de vida." },
      { numero: "1636", contenido: "Hay contrato cuando dos o más personas consentieren en crear o transferir derechos u obligaciones recíprocas." },
      { numero: "1831", contenido: "Son requisitos del contrato: consentimiento, objeto y causa." }
    ]
  },
  {
    id: "cdmx-iaci",
    titulo: "Ley de Justice Administrativa de la Ciudad de México",
    abreviatura: "LJCAM",
    fechaPublicacion: "10/02/2021",
    materia: "Administrativo",
    descripcion: "Ley que regula la justicia administrativa en la Ciudad de México y el Tribunal de Justicia Administrativa.",
    articulos: [
      { numero: "1", contenido: "Esta Ley tiene por objeto regular la organización, competencia y funcionamiento del Tribunal de Justicia Administrativa de la Ciudad de México." },
      { numero: "10", contenido: "El Tribunal conocerá de los juicios que se promuevan contra las disposiciones administrativas de la Administración Pública local." },
      { numero: "35", contenido: "El plazo para interponer el recurso de revisión será de treinta días hábiles." }
    ]
  },
  {
    id: "ccjal",
    titulo: "Código Civil del Estado de Jalisco",
    abreviatura: "CCJAL",
    fechaPublicacion: "31/03/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Jalisco que regula las relaciones entre particulares en materia de personas, familia y bienes.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Jalisco, en todo lo relativo a las personas, a los bienes y a las relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y de interés social, por lo que no hay posibilidad de renunciarlas." },
      { numero: "5", contenido: "La capacidad jurídica de las personas físicas se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: I. Los menores de edad; II. Los mayores de edad que por causa de enfermedad o debilidad de su facultades mentales se encuentren incapacitados para gobernarse." },
      { numero: "7", contenido: "Los menores de edad pueden ejecutar actos jurídicos con autorización de sus representantes legales." },
      { numero: "143", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "144", contenido: "La menor edad cesa a los dieciocho años cumplidos. Pero el menor de edad, aunque sea mayor de dieciséis años, puede contraer matrimonio con autorización de sus padres o tutor." },
      { numero: "163", contenido: "Son derechos de los hijos: I. Ser alimentados; II. Recibir educación; III. Ser tratados con respeto y consideración." },
      { numero: "218", contenido: "El matrimonio es la unión legítima de un solo hombre y una sola mujer, solemnizada ante el Oficial del Registro Civil." },
      { numero: "221", contenido: "Son requisitos del matrimonio: I. Consentimiento libre y自愿; II. Que ambos contrayentes sean mayores de edad o cuenten con autorización judicial; III. Que no exista impedimentos legales." },
      { numero: "237", contenido: "Son causas de divorcio: I. El adulterio de cualquiera de los cónyuges; II. La sevicia, amenazas o injurias graves; III. La falta de cumplimiento de los deberes conyugales." },
      { numero: "272", contenido: "Los cónyuges tienen obligación de contribuir al sostenimiento del hogar, cada uno proporcionalmente a sus facultades." },
      { numero: "323", contenido: "La patria potestad se ejercerá por el padre y la madre sobre sus hijos menores no emancipados." },
      { numero: "366", contenido: "Hay obligación de dar alimentos: I. A los ascendientes y descendientes; II. Los esposos; III. Los hermanos." },
      { numero: "420", contenido: "La tutela es un cargo conferido para representar al menor en los actos jurídicos y adminsitrar sus bienes." },
      { numero: "1823", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1831", contenido: "Para que el contrato sea válido, debe reunir los siguientes requisitos: I. Consentimiento; II. Objeto; III. Forma." },
      { numero: "1835", contenido: "El contrato puede ser unilateral o bilateral, oneroso o gratuito, solemne o consensual." },
      { numero: "1867", contenido: "Son elementos naturales del contrato: la prestación que lo constituye y que debe ejecutarse." },
      { numero: "1889", contenido: "El arrendamiento es un contrato por el cual una de las partes se obliga a conceder el uso o goce temporal de una cosa a la otra, mediante un pago." },
      { numero: "1891", contenido: "El arrendador está obligado a entregar al arrendatario la cosa objeto del contrato en estado de servir al uso a que se destina." },
      { numero: "1892", contenido: "El arrendatario debe pagar el renta convenida y usar la cosa conforme a lo pactado." },
      { numero: "1950", contenido: "El mutuo es un contrato por el cual el mutuante transfiere la propiedad de una cantidad de dinero o cosas fungibles al mutuario." },
      { numero: "1953", contenido: "El mutuario está obligado a devolver el tantundider que recibió en el plazo convenido." },
      { numero: "2024", contenido: "La compraventa es un contrato por el cual el vendedor traspasa o cede al comprador la propiedad de una cosa, por un precio cierto y en dinero." },
      { numero: "2035", contenido: "El vendedor está obligado a entregar la cosa vendida y garantizar su propiedad." },
      { numero: "2036", contenido: "El comprador está obligado a pagar el precio de la cosa al vencimiento del plazo pactado." },
      { numero: "2098", contenido: "El mandato es un contrato por el cual el mandante concede al mandatario poder para que, en su nombre y representación, ejecute uno o más actos jurídicos." },
      { numero: "2105", contenido: "El comodato es un contrato por el cual uno de los contratantes entrega gratuitamente al otro una cosa para que use de ella por cierto tiempo." },
      { numero: "2285", contenido: "La prenda es un contrato por el cual el deudor o un tercero entrega al acreedor una cosa mueble en garantía de una obligación." },
      { numero: "2396", contenido: "La Hipoteca es un derecho real constituido sobre bienes inmuebles que no están en el comercio, para asegurar el cumplimiento de una obligación." },
      { numero: "2405", contenido: "La hipoteca se extingue: I. Por la liberación de la deuda; II. Por la consolidación; III. Por la destrucción del bien hipotecado." },
      { numero: "2616", contenido: "La prescripción negativa es la pérdida de un derecho por no ejercerlo durante el tiempo establecido por la ley." },
      { numero: "2620", contenido: "La prescripción negativa se verifica por el mero transcurso del tiempo establecido por la ley." },
      { numero: "2684", contenido: "La sucesión testamentaria es la que se verifica declarando la voluntad última del testador." },
      { numero: "2690", contenido: "Son herederos legales: I. Los descendientes; II. Los ascendientes; III. El cónyuge; IV. Los hermanos y demás parientes collaterales." }
    ]
  },
  {
    id: "ccnl",
    titulo: "Código Civil para el Estado de Nuevo León",
    abreviatura: "CCNL",
    fechaPublicacion: "20/10/2023",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Nuevo León.",
    articulos: [
      { numero: "1", contenido: "Las disposiciones de este Código regirán en el Estado de Nuevo León respecto de las personas, los bienes y las relaciones jurídicas." },
      { numero: "2", contenido: "Este Código es de orden público y de interés social. Sus disposiciones son irrenunciables." },
      { numero: "7", contenido: "La capacidad de las personas físicas se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "8", contenido: "Son incapacidades legales: I. Los menores de edad; II. Los incapacitados judicialmente." },
      { numero: "158", contenido: "Son menores de edad las personas que no han cumplido dieciocho años." },
      { numero: "159", contenido: "La menor edad cesa al cumplimiento de los dieciocho años. El menor mayor de dieciséis años puede contraer matrimonio con autorización de sus padres o guardians." },
      { numero: "190", contenido: "Son derechos de los hijos: I. Recibir alimentos; II. Recibir educación; III. Ser tratados con respeto." },
      { numero: "250", contenido: "El matrimonio es la unión de un hombre y una mujer, solemnizada ante el Oficial del Registro Civil." },
      { numero: "260", contenido: "Son impedimentos para contraer matrimonio: I. La relación de parentesco; II. El vínculo matrimonial no disuelto; III. La minoría de edad." },
      { numero: "290", contenido: "Son causas de divorcio: I. El adulterio; II. La sevicia, amenazas o injurias graves; III. El incumplimiento de los deberes conyugales." },
      { numero: "330", contenido: "La patria potestad es el derecho que los padres tienen sobre sus hijos menores no emancipados." },
      { numero: "350", contenido: "Hay obligación de dar alimentos entre: ascendientes y descendientes, esposos, hermanos." },
      { numero: "400", contenido: "La tutela es un cargo conferido para representar al menor en los actos jurídicos y adminsitrar sus bienes." },
      { numero: "1800", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1810", contenido: "Para la validez del contrato se requiere: I. Consentimiento; II. Objeto; III. Forma." },
      { numero: "1815", contenido: "Los contratos pueden ser unilaterales o bilaterales, onerosos o gratuitos, consensuales o solemnes." },
      { numero: "1860", contenido: "El arrendamiento es un contrato por el cual el arrendador se obliga a conceder el uso o goce temporal de una cosa al arrendatario, mediante un pago." },
      { numero: "1865", contenido: "El arrendador debe entregar la cosa en estado de servir al uso pactado." },
      { numero: "1866", contenido: "El arrendatario debe pagar la renta puntualmente y cuidar la cosa arrendada." },
      { numero: "1930", contenido: "El mutuo es un contrato por el cual se transfiere la propiedad de dinero o cosas fungibles." },
      { numero: "1935", contenido: "El mutuario debe devolver igual cantidad de dinero o cosas de la misma especie y calidad." },
      { numero: "2010", contenido: "La compraventa es un contrato por el cual el vendedor traspasa la propiedad de una cosa al comprador por un precio en dinero." },
      { numero: "2020", contenido: "El vendedor debe entregar la cosa vendida y garantizar su propiedad." },
      { numero: "2025", contenido: "El comprador debe pagar el precio al vencimiento del plazo pactado." },
      { numero: "2080", contenido: "El mandato es un contrato por el cual el mandante da poder al mandatario para ejecutar actos jurídicos en su nombre." },
      { numero: "2090", contenido: "El comodato es un contrato por el cual se entrega gratuitamente una cosa para su uso temporal." },
      { numero: "2270", contenido: "La prenda es un contrato por el cual se entrega una cosa mueble en garantía de una obligación." },
      { numero: "2380", contenido: "La hipoteca es un derecho real sobre bienes inmuebles que asegura el cumplimiento de una obligación." },
      { numero: "2600", contenido: "La prescripción negativa es la pérdida de un derecho por no ejercitarlo en el tiempo法律规定." },
      { numero: "2700", contenido: "La sucesión testamentaria se verifica según la voluntad del testador." },
      { numero: "2710", contenido: "Son herederos legales: descendientes, ascendientes, cónyuge, hermanos y parientes collaterales." }
    ]
  },
  {
    id: "cdmx-tribunal",
    titulo: "Ley Orgánica del Tribunal Superior de Justicia de la Ciudad de México",
    abreviatura: "LOTSJCDMX",
    fechaPublicacion: "15/05/2019",
    materia: "Administrativo",
    descripcion: "Ley que establece la organización y funcionamiento del Tribunal Superior de Justicia de la Ciudad de México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley establece la organización y funcionamiento del Tribunal Superior de Justicia de la Ciudad de México." },
      { numero: "5", contenido: "El Tribunal Superior de Justicia se integra por el Pleno, las Salas y los Juzgados." },
      { numero: "15", contenido: "Los Magistrados serán designados por el Consejo de la Judicatura previa convocatoria pública." }
    ]
  },
  {
    id: "ccem",
    titulo: "Código Civil del Estado de México",
    abreviatura: "CCEM",
    fechaPublicacion: "14/05/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de México (Estado de México), que regula las relaciones jurídicas entre particulares.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de México, en todo lo relativo a las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público. Son irrenunciables los derechos que este otorga." },
      { numero: "6", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "7", contenido: "Son incapacidades legales: I. Los menores de edad; II. Los que conforme a la ley estén incapacitados judicialmente." },
      { numero: "8", contenido: "Los menores de edad pueden ejecutar actos jurídicos con autorización de sus representantes legales." },
      { numero: "147", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "148", contenido: "La menor edad cesa al cumplir dieciocho años. El mayor de dieciséis puede contraer matrimonio con autorización judicial." },
      { numero: "170", contenido: "Son derechos de los hijos: I. Recibir alimentos; II. Recibir educación; III. Ser respetados en su integridad." },
      { numero: "220", contenido: "El matrimonio es la unión de un solo hombre y una sola mujer, declarada ante el Oficial del Registro Civil." },
      { numero: "235", contenido: "Son requisitos para el matrimonio: I. Consentimiento libre; II. Mayoría de edad o autorización judicial; III. Ausencia de impedimentos." },
      { numero: "280", contenido: "Son causas de divorcio: I. El adulterio; II. La sevicia, amenazas o injurias graves; III. El incumplimiento grave de los deberes conyugales." },
      { numero: "310", contenido: "Los esposos deben contribuir al sostenimiento del hogar en proporción a sus facultades." },
      { numero: "340", contenido: "La patria potestad se ejercerá por el padre y la madre sobre sus hijos menores." },
      { numero: "380", contenido: "Hay obligación de dar alimentos entre: ascendientes, descendientes, esposos y hermanos." },
      { numero: "420", contenido: "La tutela es un cargo para representar al menor y adminsitrar sus bienes." },
      { numero: "1850", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1860", contenido: "Para la validez del contrato se requiere: I. Consentimiento; II. Objeto lícito; III. Forma establecida." },
      { numero: "1870", contenido: "Los contratos pueden ser consensuales, solemnes, bilaterales o unilaterales, onerosos o gratuitos." },
      { numero: "1920", contenido: "El arrendamiento es un contrato por el cual el arrendador se obliga a conceder el uso temporal de una cosa mediante un pago." },
      { numero: "1925", contenido: "El arrendador debe entregar la cosa en estado de servir al uso acordado." },
      { numero: "1930", contenido: "El arrendatario debe pagar la renta puntualmente y devolver la cosa al terminar el contrato." },
      { numero: "2000", contenido: "El mutuo es un contrato por el cual se transfiere la propiedad de dinero o cosas fungibles." },
      { numero: "2005", contenido: "El mutuario debe devolver igual cantidad de cosas de la misma especie y calidad." },
      { numero: "2080", contenido: "La compraventa es un contrato por el cual el vendedor traspasa la propiedad de una cosa por un precio." },
      { numero: "2090", contenido: "El vendedor debe entregar la cosa y garantizar su propiedad." },
      { numero: "2095", contenido: "El comprador debe pagar el precio en el plazo convenido." },
      { numero: "2150", contenido: "El mandato es un contrato por el cual el mandante autoriza al magistrado para actuar en su nombre." },
      { numero: "2160", contenido: "El comodato es un contrato por el cual se cede gratuitamente el uso de una cosa por tiempo determinado." },
      { numero: "2350", contenido: "La prenda es un contrato por el cual se entrega una cosa mueble en garantía de una obligación." },
      { numero: "2450", contenido: "La hipoteca es un derecho real sobre bienes inmuebles que asegura el cumplimiento de una obligación." },
      { numero: "2600", contenido: "La prescripción negativa es la pérdida de un derecho por no ejercitarlo en el tiempo legal." },
      { numero: "2700", contenido: "La sucesión testamentaria es la declarada según la voluntad del testador." },
      { numero: "2710", contenido: "Son herederos legales: descendientes, ascendientes, cónyuge, hermanos y parientes collaterales." }
    ]
  },
  {
    id: "cdmx-notariado",
    titulo: "Ley del Notariado para la Ciudad de México",
    abreviatura: "LNCDM",
    fechaPublicacion: "29/04/2024",
    materia: "Civil",
    descripcion: "Ley que regula el ejercicio del notariado en la Ciudad de México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley tiene por objeto regular el ejercicio del notariado en la Ciudad de México." },
      { numero: "10", contenido: "Son atribuciones del notario: dar fe de los actos y hechos que ante él se celebren, levantar actas y来越多的法律法规将影响人们的生活。" }
    ]
  },
  {
    id: "ccmorelos",
    titulo: "Código Civil para el Estado Libre y Soberano de Morelos",
    abreviatura: "CCMOR",
    fechaPublicacion: "14/08/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Morelos.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Morelos respecto de las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y interés social." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "140", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "200", contenido: "El matrimonio es la unión legítima de un hombre y una mujer." },
      { numero: "250", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "320", contenido: "La patria potestad corresponde a los padres sobre sus hijos menores." },
      { numero: "370", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1800", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1900", contenido: "El arrendamiento es un contrato por el cual se concede el uso de una cosa mediante renta." },
      { numero: "2000", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad por un precio." },
      { numero: "2300", contenido: "La hipoteca es un derecho real sobre inmuebles que garantiza una obligación." }
    ]
  },
  {
    id: "ccpuebla",
    titulo: "Código Civil del Estado de Puebla",
    abreviatura: "CCPUE",
    fechaPublicacion: "22/04/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Puebla.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Puebla en todo lo relativo a personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Este Código es de orden público. Sus disposiciones son irrenunciables." },
      { numero: "4", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "5", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "145", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "210", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "260", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "330", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "380", contenido: "Existe obligación de alimentos entre ascendientes, descendientes y cónyuges." },
      { numero: "1850", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1950", contenido: "El arrendamiento es un contrato por el cual se concede el uso temporal de una cosa." },
      { numero: "2050", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad por un precio." },
      { numero: "2400", contenido: "La hipoteca es un derecho real sobre bienes inmuebles." }
    ]
  },
  {
    id: "ccveracruz",
    titulo: "Código Civil del Estado de Veracruz",
    abreviatura: "CCVER",
    fechaPublicacion: "25/06/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Veracruz.",
    articulos: [
      { numero: "1", contenido: "Las disposiciones de este Código regirán en el Estado de Veracruz respecto de las personas y bienes." },
      { numero: "2", contenido: "Este Código es de orden público y las disposiciones son irrenunciables." },
      { numero: "7", contenido: "La personalidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "8", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "150", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "220", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "270", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "340", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "390", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1800", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1900", contenido: "El arrendamiento es un contrato por el cual se cede el uso de una cosa." },
      { numero: "2000", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2350", contenido: "La hipoteca es un derecho real sobre bienes inmuebless." }
    ]
  },
  {
    id: "lif2025",
    titulo: "Ley de Ingresos de la Federación para el Ejercicio Fiscal 2025",
    abreviatura: "LIF2025",
    fechaPublicacion: "28/11/2024",
    materia: "Fiscal",
    descripcion: "Ley que establece los ingresos que percibirá la Federación durante el ejercicio fiscal 2025.",
    articulos: [
      { numero: "1", contenido: "Se aprobarán los ingresos que percibirá la Federación durante el ejercicio fiscal 2025." },
      { numero: "20", contenido: "Los ingresos se componen de impuestos, contribuciones de mejoras, derechos, productos, aprovechamientos y participaciones." }
    ]
  },
  {
    id: "lft-estatal",
    titulo: "Ley del Servicio Postal Mexicano",
    abreviatura: "LSPM",
    fechaPublicacion: "23/01/2024",
    materia: "Administrativo",
    descripcion: "Ley que regula el servicio postal mexicano y las obligaciones relacionadas.",
    articulos: [
      { numero: "1", contenido: "Esta Ley tiene por objeto regular el servicio postal y la Empresa Mexicana de Correos." },
      { numero: "15", contenido: "El servicio postal comprende la recolección, transporte y entrega de correspondencia nacional e internacional." }
    ]
  },
  {
    id: "ccqroo",
    titulo: "Código Civil del Estado de Quintana Roo",
    abreviatura: "CCQROO",
    fechaPublicacion: "15/07/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Quintana Roo.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Quintana Roo en todo lo relativo a las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y de interés social." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "145", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "200", contenido: "El matrimonio es la unión de un solo hombre y una sola mujer." },
      { numero: "250", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "320", contenido: "La patria potestad se ejercerá por el padre y la madre sobre sus hijos menores." },
      { numero: "380", contenido: "Hay obligación de dar alimentos entre: ascendientes, descendientes y esposos." },
      { numero: "1850", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1950", contenido: "El arrendamiento es un contrato por el cual el arrendador se obliga a conceder el uso o goce temporal de una cosa al arrendatario, mediante un precio certain." },
      { numero: "1951", contenido: "El arrendador está obligado a entregar al arrendatario la cosa objeto del contrato en estado de servir al uso a que se destina." },
      { numero: "1952", contenido: "El arrendatario debe pagar el precio del arrendamiento en los términos convenidos." },
      { numero: "1953", contenido: "Si el arrendatario no paga la renta, el arrendador puede exigir el pago o dar por terminado el contrato." },
      { numero: "1954", contenido: "El arrendatario debe usar la cosa arrendada conforme a la naturaleza de ella y el contrato." },
      { numero: "1955", contenido: "El contrato de arrendamiento de inmuebles habitable durará un año por lo menos, si no se pacta otra cosa." },
      { numero: "2050", contenido: "La compraventa es un contrato por el cual el vendedor traspasa la propiedad al comprador por un precio." },
      { numero: "2450", contenido: "La hipoteca es un derecho real sobre bienes inmuebless que garantiza una obligación." }
    ]
  },
  {
    id: "ccyucatan",
    titulo: "Código Civil del Estado de Yucatán",
    abreviatura: "CCYUC",
    fechaPublicacion: "10/05/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Yucatán.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Yucatán respecto de las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "140", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "195", contenido: "El matrimonio es la unión legítima de un hombre y una mujer." },
      { numero: "240", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "310", contenido: "La patria potestad corresponde a los padres sobre sus hijos menores." },
      { numero: "360", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1800", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos y obligaciones." },
      { numero: "1900", contenido: "El arrendamiento es un contrato por el cual el arrendador se obliga a conceder el uso temporal de una cosa mediante un precio." },
      { numero: "1901", contenido: "El arrendador debe entregar la cosa en estado de servir al uso pactado." },
      { numero: "1902", contenido: "El arrendatario debe pagar la renta puntualmente." },
      { numero: "1903", contenido: "El contrato de arrendamiento de inmuebles durará por lo menos un año." },
      { numero: "2000", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2400", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "cccoahuila",
    titulo: "Código Civil del Estado de Coahuila de Zaragoza",
    abreviatura: "CCCOAH",
    fechaPublicacion: "20/08/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Coahuila de Zaragoza.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Coahuila de Zaragoza en todo lo relativo a personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y no pueden renunciarse." },
      { numero: "6", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "7", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "150", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "210", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "260", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "330", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "390", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y cónyuges." },
      { numero: "1850", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1950", contenido: "El arrendamiento es un contrato por el cual el arrendador se obliga a conceder el uso temporal de una cosa mediante un precio." },
      { numero: "1951", contenido: "El arrendador debe entregar la cosa en estado de servir al uso acordado." },
      { numero: "1952", contenido: "El arrendatario debe pagar la renta puntualmente." },
      { numero: "1953", contenido: "El contrato de arrendamiento de inmuebles durará por lo menos un año." },
      { numero: "2050", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2500", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "ccguanajuato",
    titulo: "Código Civil del Estado de Guanajuato",
    abreviatura: "CCGTO",
    fechaPublicacion: "12/06/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Guanajuato.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Guanajuato en todo lo relativo a las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y de interés social." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "142", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "205", contenido: "El matrimonio es la unión legítima de un hombre y una mujer." },
      { numero: "255", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "325", contenido: "La patria potestad se ejerce por el padre y la madre sobre sus hijos." },
      { numero: "375", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1830", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1930", contenido: "El arrendamiento es un contrato por el cual se concede el uso de una cosa." },
      { numero: "2030", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2480", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "ccchihuahua",
    titulo: "Código Civil del Estado de Chihuahua",
    abreviatura: "CCCHIH",
    fechaPublicacion: "08/07/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Chihuahua.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Chihuahua respecto de las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "140", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "198", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "248", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "318", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "368", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1810", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1910", contenido: "El arrendamiento es un contrato por el cual se cede el uso de una cosa." },
      { numero: "2010", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2460", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "ccguerrero",
    titulo: "Código Civil del Estado de Guerrero",
    abreviatura: "CCGRO",
    fechaPublicacion: "18/09/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Guerrero.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Guerrero en todo lo relativo a personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y de interés social." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "145", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "205", contenido: "El matrimonio es la unión legítima de un hombre y una mujer." },
      { numero: "255", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "325", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "380", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1850", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1950", contenido: "El arrendamiento es un contrato por el cual se concede el uso de una cosa." },
      { numero: "2050", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2500", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "cctamaulipas",
    titulo: "Código Civil del Estado de Tamaulipas",
    abreviatura: "CCTAMS",
    fechaPublicacion: "05/08/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Tamaulipas.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Tamaulipas en todo lo relativo a las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público y de interés social." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "148", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "208", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "258", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "328", contenido: "La patria potestad se ejercerá por el padre y la madre sobre sus hijos." },
      { numero: "385", contenido: "Hay obligación de dar alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1860", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1960", contenido: "El arrendamiento es un contrato por el cual se concede el uso temporal de una cosa." },
      { numero: "2060", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2510", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "ccsinaloa",
    titulo: "Código Civil del Estado de Sinaloa",
    abreviatura: "CCSIN",
    fechaPublicacion: "22/07/2024",
    materia: "Civil",
    descripcion: "Código Civil del Estado de Sinaloa.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá en el Estado de Sinaloa respecto de las personas, bienes y relaciones jurídicas." },
      { numero: "2", contenido: "Las disposiciones de este Código son de orden público." },
      { numero: "5", contenido: "La capacidad jurídica se adquiere por el nacimiento y se pierde por la muerte." },
      { numero: "6", contenido: "Son incapacidades legales: menores de edad y los incapacitados judicialmente." },
      { numero: "144", contenido: "Son menores de edad los que no han cumplido dieciocho años." },
      { numero: "202", contenido: "El matrimonio es la unión de un hombre y una mujer." },
      { numero: "252", contenido: "Son causas de divorcio: adulterio, sevicia, amenazas o injurias graves." },
      { numero: "322", contenido: "La patria potestad corresponde a los padres sobre hijos menores." },
      { numero: "378", contenido: "Hay obligación de alimentos entre ascendientes, descendientes y esposos." },
      { numero: "1840", contenido: "Hay contrato cuando dos o más personas convienen en crear o transferir derechos." },
      { numero: "1940", contenido: "El arrendamiento es un contrato por el cual se concede el uso de una cosa." },
      { numero: "2040", contenido: "La compraventa es un contrato por el cual se traspasa la propiedad." },
      { numero: "2490", contenido: "La hipoteca es un derecho real sobre inmuebless." }
    ]
  },
  {
    id: "ley-procedimiento-civil-cdmx",
    titulo: "Código de Procedimientos Civiles de la Ciudad de México",
    abreviatura: "CPCDMX",
    fechaPublicacion: "30/04/2024",
    materia: "Procesal",
    descripcion: "Código de Procedimientos Civiles de la Ciudad de México.",
    articulos: [
      { numero: "1", contenido: "Este Código regirá los procedimientos civiles en la Ciudad de México." },
      { numero: "2", contenido: "Son aplicables los principios de inmediación, concentración y economía procesal." },
      { numero: "50", contenido: "La demanda debe contener: nombre del actor y demandado, objeto de la acción, hechos y fundamentos de derecho." },
      { numero: "100", contenido: "El emplazamiento debe hacerse en forma personal al demandado." },
      { numero: "150", contenido: "Las pruebas deben ofrecerse en la audiencia respective y pueden ser: documentales, testimoniales, periciales, inspecciones judiciales." },
      { numero: "200", contenido: "La sentencia debe contener: relación de los hechos, valoración de pruebas, fundamentos legales y fallo." },
      { numero: "250", contenido: "Los recursos contra sentencias son: revocación, apelación y queja." },
      { numero: "300", contenido: "La ejecución de sentencias corresponde al tribunal que emitió el fallo." },
      { numero: "350", contenido: "El embargo preventivo procede cuando hay peligro de que el deudor oculte sus bienes." },
      { numero: "400", contenido: "La tercería es el juicio que un tercero promueve para hacer valer un derecho sobre bienes embargados." }
    ]
  },
  {
    id: "ley-justicia-laboral-cdmx",
    titulo: "Ley Federal del Trabajo para la Ciudad de México",
    abreviatura: "LFTCDMX",
    fechaPublicacion: "15/06/2024",
    materia: "Laboral",
    descripcion: "Ley que regula las relaciones laborales en la Ciudad de México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley regula las relaciones de trabajo en la Ciudad de México." },
      { numero: "5", contenido: "Es prohibida cualquier discriminación en el empleo por razones de género, raza, religión, edad o discapacidad." },
      { numero: "20", contenido: "La jornada máxima diurna es de 8 horas, la nocturna de 7 y la mixta de 7.5 horas." },
      { numero: "30", contenido: "El salario mínimo no puede ser embargado en más del 50%." },
      { numero: "50", contenido: "El patrón está obligado a registrar a sus trabajadores ante el Instituto del Fondo Nacional para la Consumo de los Trabajadores." },
      { numero: "80", contenido: "Las mujeres tienen derecho a un descanso prenatal de 6 semanas y postnatal de 6 semanas." },
      { numero: "100", contenido: "El trabajador tiene derecho a un día de descanso por cada 6 días trabajados." },
      { numero: "132", contenido: "Son obligaciones del patrón: pagar el salario puntualmente, proporcionar herramientas, garantizar seguridad en el trabajo." },
      { numero: "150", contenido: "Son causas de rescisión laboral: incumplimiento de obligaciones, fraudes, hurtos, violencia." },
      { numero: "170", contenido: "El despido sin causa justificada genera responsabilidad para el patrón." },
      { numero: "200", contenido: "La liquidación incluye: indemnización de 3 meses de salario, prima de antigüedad y partes proporcionales." }
    ]
  },
  {
    id: "lss",
    titulo: "Ley del Seguro Social",
    abreviatura: "LSS",
    fechaPublicacion: "21/12/1995",
    materia: "Laboral",
    descripcion: "Ley que regula el seguro social obligatorio y los servicios de salud para trabajadores.",
    articulos: [
      { numero: "1", contenido: "El seguro social es obligatorio para los patrones y trabajadores." },
      { numero: "12", contenido: "Son sujetos de aseguramiento los trabajadores subordinados y los trabajadores eventuales." },
      { numero: "15", contenido: "El patrones están obligados a registrar a sus trabajadores ante el IMSS." },
      { numero: "20", contenido: "Las ramas de seguro del régimen obligatorio son: riesgos de trabajo, enfermedades y maternidad, invalidez y vida, cesantía en edad avanzada y vejez, guarderías y beneficios de pension." },
      { numero: "30", contenido: "El patrón debe retener las cuotas obrero-patronales del salario del trabajador." },
      { numero: "50", contenido: "El trabajador tiene derecho a asistencia médica, quirúrgica, farmacéutica y hospitalaria." },
      { numero: "58", contenido: "En caso de riesgo de trabajo, el patrón debe dar aviso al IMSS dentro de las primeras 24 horas." },
      { numero: "70", contenido: "El pensionado por invalidez recibirá una pension mensual." },
      { numero: "100", contenido: "El trabajador que cumpla 60 años y 1250 semanas cotizadas tiene derecho a pension por cesantía." },
      { numero: "120", contenido: "Las empresas de menos de 5 trabajadores pueden opcionalmente afiliarse al régimen obligatorio." },
      { numero: "150", contenido: "El INCUMPLIMIENTO de obligaciones ante el IMSS genera multas y recargos." },
      { numero: "200", contenido: "El trabajador puede verificar sus semanas cotizadas mediante su NSS." }
    ]
  },
  {
    id: "lfpcons",
    titulo: "Ley Federal de Protección al Consumidor",
    abreviatura: "LFPC",
    fechaPublicacion: "19/01/2024",
    materia: "Civil",
    descripcion: "Ley que protege los derechos de los consumidores en México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley es de orden público e interés social." },
      { numero: "10", contenido: "Son derechos del consumidor: información veraz, seguridad, protección de su economía, atención preferente." },
      { numero: "12", contenido: "El proveedor está obligado a respectsar los derechos del consumidor." },
      { numero: "15", contenido: "Los proveedores deben informar claramente precios, condiciones y garantías." },
      { numero: "20", contenido: "El consumidor tiene derecho a la reparación, reposición o devolución de bienes defectuosos." },
      { numero: "30", contenido: "Las relaciones de consumo deben tratarse de buena fe." },
      { numero: "40", contenido: "El proveedor no puede modificar unilateralmente las condiciones del contrato." },
      { numero: "50", contenido: "El consumidor puede presentar quejas ante PROFECO." },
      { numero: "84", contenido: "Contrato de adhesión es el documento elaborado unilateralmente por el proveedor." },
      { numero: "85", contenido: "Los contratos de adhesión deben inscribirse en el Registro Público de Contratos de Adhesión de PROFECO." },
      { numero: "90", contenido: "PROFECO puede sancionar con multas de hasta $4 millones de pesos." },
      { numero: "100", contenido: "El consumidor puede cereal voiexigir la devolucion de lo pagado en caso de fraude." }
    ]
  },
  {
    id: "lgtoc",
    titulo: "Ley General de Títulos y Operaciones de Crédito",
    abreviatura: "LGTOC",
    fechaPublicacion: "27/08/2007",
    materia: "Mercantil",
    descripcion: "Ley que regula los títulos de crédito y operaciones mercantiles.",
    articulos: [
      { numero: "1", contenido: "Esta Ley regula los títulos de crédito y las operaciones mercantiles." },
      { numero: "5", contenido: "El pagare es un título de crédito que contiene la obligación de pagar una cantidad determinada." },
      { numero: "10", contenido: "Son requisitos del pagare: nombre del suscriptor, lugar y fecha de emisión, cantidad, lugar de pago, firma del suscriptor." },
      { numero: "15", contenido: "El pagare debe pagarse en la fecha y lugar señalados." },
      { numero: "20", contenido: "La letra de cambio es un título de crédito que contiene una orden de pago." },
      { numero: "25", contenido: "El cheque es un título de crédito que contiene la orden de pagar a la vista." },
      { numero: "30", contenido: "El cheque presenta debe ser presentado para cobro dentro de los 15 días siguientes a su fecha." },
      { numero: "40", contenido: "El endosatario adquiere los derechos del endosante." },
      { numero: "50", contenido: "El avalista responde solidariamente con el avalado." },
      { numero: "60", contenido: "En caso de incumplimiento, el tenedor puede ejercer acciones cambiarias." }
    ]
  },
  {
    id: "ldpp",
    titulo: "Ley Federal de Protección de Datos Personales",
    abreviatura: "LFPDPP",
    fechaPublicacion: "05/07/2010",
    materia: "Administrativo",
    descripcion: "Ley que protege los datos personales en México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley tiene por objeto la protección de datos personales." },
      { numero: "8", contenido: "El responsable debe obtener el consentimiento del titular para tratar sus datos." },
      { numero: "12", contenido: "El titular tiene derecho a acceder, rectificar, cancelar y oponerse." },
      { numero: "15", contenido: "Los datos sensibles requieren consentimiento expreso." },
      { numero: "20", contenido: "El responsable debe implementar medidas de seguridad." },
      { numero: "25", contenido: "El tratamiento de datos debe hacerse únicamente para los fines establecidos." },
      { numero: "30", contenido: "El titular puede presentar quejas ante el INAI." },
      { numero: "35", contenido: "Las transferencias de datos requieren consentimiento del titular." },
      { numero: "40", contenido: "El INAI puede imponer sanciones de hasta $16 millones de pesos." }
    ]
  },
  {
    id: "lfdh",
    titulo: "Ley Federal de los Derechos del Consumidor",
    abreviatura: "LFDC",
    fechaPublicacion: "18/12/2002",
    materia: "Civil",
    descripcion: "Ley que establece los derechos básicos del consumidor.",
    articulos: [
      { numero: "1", contenido: "El Estado protege los derechos del consumidor." },
      { numero: "5", contenido: "Son derechos del consumidor: información, seguridad, elección, audiencia, protección." },
      { numero: "10", contenido: "Los proveedores no pueden negar injustificadamente el servicio." },
      { numero: "15", contenido: "El consumidor tiene derecho a garantía de bienes y servicios." },
      { numero: "20", contenido: "La publicidad debe ser veraz y verificable." },
      { numero: "25", contenido: "Los precios deben exhibirse de manera clara." },
      { numero: "30", contenido: "El consumidor puede elegir medio de pago." }
    ]
  },
  {
    id: "lisr",
    titulo: "Ley del Impuesto sobre la Renta",
    abreviatura: "LISR",
    fechaPublicacion: "08/10/2024",
    materia: "Fiscal",
    descripcion: "Ley que regula el impuesto sobre la renta en México.",
    articulos: [
      { numero: "1", contenido: "Las personas físicas y morales están obligadas al pago del ISR." },
      { numero: "9", contenido: "Son ingresos acumulables todos los beneficios efectivamente obtenidos." },
      { numero: "10", contenido: "Los ingresos por salarios están sujetos a retención." },
      { numero: "15", contenido: "El patrón debe retener ISR a sus trabajadores." },
      { numero: "20", contenido: "Las personas morales deben pagar ISR sobre su utilidad gravable." },
      { numero: "25", contenido: "La tasa de ISR para personas morales es del 30%." },
      { numero: "30", contenido: "Las personas físicas tienen tarifas progresivas de ISR." },
      { numero: "35", contenido: "Los profesionistas independientes pueden optar por régimen simplificado." },
      { numero: "40", contenido: "Las deducciones personales tienen límites establecidos." },
      { numero: "50", contenido: "El incumplimiento genera recargos y multas." }
    ]
  },
  {
    id: "lieps",
    titulo: "Ley del Impuesto Especial sobre Producción y Servicios",
    abreviatura: "LIEPS",
    fechaPublicacion: "30/10/2024",
    materia: "Fiscal",
    descripcion: "Ley que regula impuestos especiales sobre bienes y servicios.",
    articulos: [
      { numero: "1", contenido: "Esta Ley establece el Impuesto Especial sobre Producción y Servicios." },
      { numero: "2", contenido: "Son objetos del IEPS: bebidas alcohólicas, tabaco, gasolinas, diésel." },
      { numero: "5", contenido: "El IEPS se causa al enajenar o importar bienes gravados." },
      { numero: "10", contenido: "Las tasas de IEPS varían según el bien o servicio." },
      { numero: "15", contenido: "Los contribuyentes deben inscribirse en el RFC y hacer pagos bimestrales." },
      { numero: "20", contenido: "La Federación的感受ates reintegra parte del IEPS a las entidades." }
    ]
  },
  {
    id: "liva",
    titulo: "Ley del Impuesto al Valor Agregado",
    abreviatura: "LIVA",
    fechaPublicacion: "29/12/2024",
    materia: "Fiscal",
    descripcion: "Ley que regula el IVA en México.",
    articulos: [
      { numero: "1", contenido: "El IVA es un impuesto al consumo que se causa por la enajenación de bienes y prestación de servicios." },
      { numero: "2", contenido: "La tasa general del IVA es del 16%." },
      { numero: "3", contenido: "Existe tasa del 0% para libros, periódicos, medicamentos y alimentos." },
      { numero: "5", contenido: "El IVA se causa al momento de la enajenación o prestación del servicio." },
      { numero: "10", contenido: "Los contribuyentes deben emitir comprobantes fiscales." },
      { numero: "15", contenido: "El IVA acreditable es el Impuesto Pagado en la adquisición de bienes y servicios." },
      { numero: "20", contenido: "El IVA se declara mediante declaración mensual." },
      { numero: "25", contenido: "Las exportaciones están exentas de IVA con derecho a devolución." },
      { numero: "30", contenido: "Los servicios profesionales causan IVA." }
    ]
  },
  {
    id: "cff",
    titulo: "Código Fiscal de la Federación",
    abreviatura: "CFF",
    fechaPublicacion: "31/12/2024",
    materia: "Fiscal",
    descripcion: "Código que establece las normas comunes en materia fiscal.",
    articulos: [
      { numero: "1", contenido: "Este Código establece las disposiciones que regulan las obligaciones fiscales." },
      { numero: "6", contenido: "Los contribuyentes deben inscribirse en el RFC." },
      { numero: "10", contenido: "La obligación fiscal nace cuando se realizan las situaciones jurídicas previstas en las leyes." },
      { numero: "15", contenido: "Las contribuciones se pagan en moneda nacional." },
      { numero: "20", contenido: "Los contribuyentes deben llevar contabilidad y expedir comprobantes fiscales." },
      { numero: "30", contenido: "Las autoridades fiscales pueden determinar contribuciones omitidas." },
      { numero: "42", contenido: "La摩纳哥 contribuyente puede相邻 impugnar determinaciones fiscales mediante recurso o juicio." },
      { numero: "50", contenido: "Las multas fiscales pueden ser hasta del 100% de las contribuciones omitidas." },
      { numero: "60", contenido: "Los créditos fiscales causan recargos por mora." },
      { numero: "70", contenido: "El SECOBIP facilita el cumplimiento de obligaciones fiscales." }
    ]
  },
  {
    id: "lgemis",
    titulo: "Ley General de los Institutos Nacionales de Salud",
    abreviatura: "LGCINS",
    fechaPublicacion: "14/06/2024",
    materia: "Salud",
    descripcion: "Ley que regula los institutos nacionales de salud en México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley regula los Institutos Nacionales de Salud." },
      { numero: "5", contenido: "Los INS son órganos desconcentrados de la Secretaría de Salud." },
      { numero: "10", contenido: "Los INS proporcionan atención médica especializada." },
      { numero: "15", contenido: "La investigación en salud es función primordial de los INS." },
      { numero: "20", contenido: "Los INS colaboran con instituciones de educación superior." }
    ]
  },
  {
    id: "lgds",
    titulo: "Ley General de Desarrollo Social",
    abreviatura: "LGDS",
    fechaPublicacion: "20/01/2004",
    materia: "Social",
    descripcion: "Ley que regula el desarrollo social en México.",
    articulos: [
      { numero: "1", contenido: "Esta Ley establece el marco institucional para el desarrollo social." },
      { numero: "5", contenido: "Son derechos sociales: educación, salud, vivienda, alimentación." },
      { numero: "10", contenido: "La política de desarrollo social es prioritaria del Estado." },
      { numero: "15", contenido: "Los programas sociales deben ser universales y accesibles." },
      { numero: "20", contenido: "La pobreza multidimensional se mide mediante indicadores." }
    ]
  }
];

export function buscarLeyes(termino: string, materia?: string): Ley[] {
  const terminoLower = termino.toLowerCase();
  
  return leyesMexicanas.filter(ley => {
    const coincideMateria = !materia || ley.materia.toLowerCase() === materia.toLowerCase();
    const coincideTermino = 
      ley.titulo.toLowerCase().includes(terminoLower) ||
      ley.abreviatura.toLowerCase().includes(terminoLower) ||
      ley.articulos.some(a => 
        a.contenido.toLowerCase().includes(terminoLower) ||
        a.numero.includes(termino)
      );
    
    return coincideMateria && coincideTermino;
  });
}

export function buscarArticulo(leyId: string, numero: string): Articulo | undefined {
  const ley = leyesMexicanas.find(l => l.id === leyId);
  return ley?.articulos.find(a => a.numero === numero);
}

export function buscarJurisprudencia(termino: string, materia?: string): Jurisprudencia[] {
  const terminoLower = termino.toLowerCase();
  
  return jurisprudencias.filter(j => {
    const coincideMateria = !materia || j.materia.toLowerCase() === materia.toLowerCase();
    const coincideTermino = 
      j.titulo.toLowerCase().includes(terminoLower) ||
      j.tesis.toLowerCase().includes(terminoLower) ||
      j.aplicacion.toLowerCase().includes(terminoLower);
    
    return coincideMateria && coincideTermino;
  });
}

export const materias = [
  "Constitucional",
  "Civil",
  "Penal",
  "Laboral",
  "Mercantil",
  "Fiscal",
  "Procesal",
  "Bancario",
  "Agrario",
  "Administrativo",
  "Estatal",
  "Familiar"
];

export const fuentesOficales = {
  leyes: [
    { nombre: "Cámara de Diputados - Leyes Federales", url: "https://www.diputados.gob.mx/LeyesBiblio/index.htm" },
    { nombre: "Congreso de la Ciudad de México", url: "https://www.congresocdmx.gob.mx/marco-legal-cdmx-107-2.html" },
    { nombre: "Diario Oficial de la Federación", url: "https://dof.gob.mx" }
  ],
  jurisprudencia: [
    { nombre: "Semanario Judicial de la Federación", url: "https://sjf2.scjn.gob.mx/busqueda-principal-tesis" },
    { nombre: "Pleno y Salas SCJN", url: "https://www.scjn.gob.mx" }
  ],
  doctrina: [
    { nombre: "UNAM - Biblioteca Jurídica", url: "https://biblio.juridicas.unam.mx/bjv/" },
    { nombre: "Colegio de Notarios CDMX", url: "https://www.notarios.org.mx" }
  ]
};
