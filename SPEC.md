# TuAbogadoIA - Asesor Legal Inteligente

## 1. Project Overview

- **Project name**: TuAbogadoIA
- **Type**: Web application (Chatbot + Base de datos consultable)
- **Core functionality**: Asesor legal experto en derecho mexicano con chatbot conversacional y biblioteca de consultas normativas
- **Target users**: Abogados, estudiantes de derecho, ciudadanos buscando asesoría legal

## 2. UI/UX Specification

### Layout Structure

- **Header**: Logo, navegación (Chat | Biblioteca | Inicio), botón de tema
- **Main content**: 
  - Vista Chat: Área de conversación con sidebar de historial
  - Vista Biblioteca: Buscador + Listado de leyes/artículos + Vista de detalle
- **Footer**: Credits, versión

### Responsive Breakpoints
- Mobile: < 768px (single column, menú hamburguesa)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**
- Primary: #1E3A5F (Azul oscuro institucional)
- Secondary: #C9A227 (Oro/amarillo mexicano)
- Accent: #2D5A27 (Verde mexicano)
- Background: #0D1117 (Dark mode default)
- Surface: #161B22
- Text: #E6EDF3
- Muted: #8B949E

**Typography**
- Headings: "Playfair Display" (serif, elegante)
- Body: "Source Sans Pro" (sans-serif, legible)
- Code/Legal: "JetBrains Mono"

**Spacing**
- Base unit: 8px
- Container max-width: 1200px
- Card padding: 24px

**Visual Effects**
- Cards con subtle glow en hover
- Smooth transitions (0.2s ease)
- Efecto de tinta en mensajes del asistente

### Components

1. **ChatInterface**
   - Input de mensaje con botón de envío
   - Lista de mensajes (user: derecha, assistant: izquierda)
   - Typing indicator
   - Suggested questions

2. **LegalSearch**
   - Campo de búsqueda con filtros
   - Filtros por: Materia, Tipo (Ley/Artículo/Jurisprudencia)
   - Resultados con highlight de coincidencias

3. **LegalDocumentViewer**
   - Título del documento
   - Contenido formateado
   - Referencias cruzadas
   - Botón para copiar cite

4. **Sidebar**
   - Historial de conversaciones
   - Guardar/cargar conversaciones

## 3. Functionality Specification

### Core Features

1. **Chatbot Legal**
   - Responde preguntas sobre derecho mexicano
   - Cita fuentes (leyes, jurisprudencia, doctrina)
   - Mantiene contexto de conversación
   - Sugiere preguntas relacionadas

2. **Biblioteca Legal**
   - Base de datos de leyes mexicanas principales:
     - Constitución Política de los Estados Unidos Mexicanos
     - Código Civil Federal
     - Código Penal Federal
     - Código Federal de Procedimientos Civiles
     - Ley Federal del Trabajo
     - Ley de Instituciones de Crédito
     - Ley General de Sociedades Mercantiles
     - Ley del Impuesto sobre el Renta
     - Ley del Impuesto al Valor Agregado
   - Búsqueda por título, artículo, contenido
   - Filtros por materia

3. **Sistema de Prompts**
   - System prompt especializado para derecho mexicano
   - Instrucciones para citar correctamente
   - Warnings sobre limitaciones del asesoramiento

### User Interactions
- Escribir pregunta → obtener respuesta
- Click en sugerencia → enviar pregunta
- Buscar en biblioteca → filtrar resultados
- Click en resultado → ver detalle
- Click en referencia → navegar a documento

### Edge Cases
- Preguntas fuera del ámbito legal → decline amablemente
- Consulta muy vaga → pedir clarificación
- Error de API → mostrar mensaje de error friendly
- Sin resultados en búsqueda → sugerir términos

## 4. Acceptance Criteria

- [ ] Chat responde correctamente a preguntas de derecho mexicano
- [ ] Biblioteca muestra leyes con artículos completos
- [ ] Búsqueda filtra correctamente
- [ ] UI es responsiva y funciona en móvil
- [ ] Dark mode está activo por defecto
- [ ] Las respuestas citan fuentes cuando aplica
- [ ] No hay errores en consola
