export interface Cliente {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  rfc?: string;
  fechaAlta: string;
  notas: string;
}

export interface Caso {
  id: string;
  clienteId: string;
  titulo: string;
  materia: 'civil' | 'laboral' | 'mercantil' | 'familiar' | 'penal' | 'constitucional' | 'administrativo' | 'otro';
  status: 'activo' | 'pendiente' | 'concluido' | 'cancelado';
  descripcion: string;
  fechaApertura: string;
  fechaCierre?: string;
  consultas: Consulta[];
  documentos: Documento[];
  plazos: PlazoCaso[];
  tareas: Tarea[];
  eventos: EventoCalendario[];
  facturas: Factura[];
}

export interface Consulta {
  id: string;
  casoId: string;
  fecha: string;
  pregunta: string;
  respuesta: string;
}

export interface Documento {
  id: string;
  casoId: string;
  nombre: string;
  tipo: 'demanda' | 'contestacion' | 'escrito' | 'contrato' | 'constancia' | 'otro';
  contenido: string;
  fecha: string;
}

export interface PlazoCaso {
  id: string;
  casoId: string;
  descripcion: string;
  fechaLimite: string;
  estado: 'pendiente' | 'cumplido' | 'vencido';
}

export interface Tarea {
  id: string;
  casoId: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: 'pendiente' | 'en_progreso' | 'completada';
  prioridad: 'baja' | 'media' | 'alta';
}

export interface EventoCalendario {
  id: string;
  casoId: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: 'audiencia' | 'reunion' | 'vencimiento' | 'otro';
  lugar?: string;
}

export interface Factura {
  id: string;
  casoId: string;
  numero: string;
  fecha: string;
  conceptos: { descripcion: string; cantidad: number; precio: number }[];
  subtotal: number;
  iva: number;
  total: number;
  status: 'pendiente' | 'pagada' | 'cancelada';
  fechaPago?: string;
}

export const clientes: Cliente[] = [];
export const casos: Caso[] = [];

export const materias = [
  'civil', 'laboral', 'mercantil', 'familiar', 'penal', 'constitucional', 'administrativo', 'otro'
];

export const statusCaso = [
  { value: 'activo', label: 'Activo', color: '#22c55e' },
  { value: 'pendiente', label: 'Pendiente', color: '#f59e0b' },
  { value: 'concluido', label: 'Concluido', color: '#3b82f6' },
  { value: 'cancelado', label: 'Cancelado', color: '#ef4444' }
];

export function generarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getEstadisticas(casos: Caso[]) {
  const porMateria: Record<string, number> = {};
  const porStatus: Record<string, number> = {};
  let totalFacturado = 0;
  let pendienteCobrar = 0;

  casos.forEach(c => {
    porMateria[c.materia] = (porMateria[c.materia] || 0) + 1;
    porStatus[c.status] = (porStatus[c.status] || 0) + 1;
    (c.facturas || []).forEach(f => {
      if (f.status === 'pagada') totalFacturado += f.total;
      if (f.status === 'pendiente') pendienteCobrar += f.total;
    });
  });

  return { porMateria, porStatus, totalFacturado, pendienteCobrar, totalCasos: casos.length };
}
