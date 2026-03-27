'use client';

import { useState, useRef, useEffect } from 'react';
import { leyesMexicanas, buscarLeyes, materias, jurisprudencias, buscarJurisprudencia, type Ley, type Articulo, type Jurisprudencia } from '@/data/leyes';
import { tratadosInternacionales, tratadosBilaterales, buscarTratados, type Tratado } from '@/data/tratados';
import { plantillasEscrituras, categoriasEscrituras, buscarPlantilla, type PlantillaEscritura } from '@/data/escrituras';
import { plantillas, materiasDisponibles, type Plantilla } from '@/data/plantillas';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}



import PlantillasView from '@/components/PlantillasView';
import ProspectosView from '@/components/ProspectosView';
import CitasView from '@/components/CitasView';
import CalendarioView from '@/components/CalendarioView';
import ReportesView from '@/components/ReportesView';
import CasesManager from '@/components/CasesManager';
import CaseDetail from '@/components/CaseDetail';
import LegalLibrary from '@/components/LegalLibrary';
import EquipoView from '@/components/EquipoView';
import ChatInterface from '@/components/ChatInterface';
import { EscriturasView } from '@/components/EscriturasView';







export default function Home() {
  useEffect(() => {
    // Service Worker disabled for debugging
    /*
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('SW registered:', reg.scope))
        .catch((err) => console.log('SW registration failed:', err));
    }
    */
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'jurisprudencia' | 'escrituras' | 'casos' | 'plantillas' | 'calendario' | 'reportes' | 'prospectos' | 'citas' | 'equipo' | 'tratados'>('chat');
  
  // Estado para casos
  const [clientes, setClientes] = useState<any[]>([]);
  const [casos, setCasos] = useState<any[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [selectedCaso, setSelectedCaso] = useState<any>(null);
  const [showNewCliente, setShowNewCliente] = useState(false);
  const [showNewCaso, setShowNewCaso] = useState(false);
  const [showNewPlazo, setShowNewPlazo] = useState(false);
  const [showNewEvento, setShowNewEvento] = useState(false);
  const [showNewDocumento, setShowNewDocumento] = useState(false);
  const [showNewConsulta, setShowNewConsulta] = useState(false);
  const [showNewFactura, setShowNewFactura] = useState(false);
  const [showContractAnalysis, setShowContractAnalysis] = useState(false);
  const [contractText, setContractText] = useState('');
  const [contractType, setContractType] = useState('general');
  const [showNewProspecto, setShowNewProspecto] = useState(false);
  const [prospectos, setProspectos] = useState<any[]>([]);
  const [citas, setCitas] = useState<any[]>([]);
  const [showNewCita, setShowNewCita] = useState(false);
  const [showNewTeamMember, setShowNewTeamMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showTeamTab, setShowTeamTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const translations = {
    es: {
      welcome: "¡Bienvenido a LexMex!",
      chat: "Chat",
      clientes: "Clientes",
      casos: "Casos",
      prospectos: "Prospectos",
      citas: "Citas",
      calendario: "Calendario",
      equipo: "Equipo",
      reportes: "Reportes",
      plantillas: "Plantillas",
      escrituras: "Escrituras",
      library: "Biblioteca Legal",
      jurisprudencia: "Jurisprudencia",
      newClient: "Nuevo Cliente",
      newCase: "Nuevo Caso",
      newProspect: "Nuevo Prospecto",
      newAppointment: "Nueva Cita",
      export: "Exportar",
      settings: "Configuración",
      search: "Buscar...",
    },
    en: {
      welcome: "Welcome to LexMex!",
      chat: "Chat",
      clientes: "Clients",
      casos: "Cases",
      prospectos: "Prospects",
      citas: "Appointments",
      calendario: "Calendar",
      equipo: "Team",
      reportes: "Reports",
      plantillas: "Templates",
      escrituras: "Deeds",
      library: "Laws",
      jurisprudencia: "Case Law",
      newClient: "New Client",
      newCase: "New Case",
      newProspect: "New Prospect",
      newAppointment: "New Appointment",
      export: "Export",
      settings: "Settings",
      search: "Search...",
    }
  };

  const t = translations[language];
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{type: string, id: string, message: string} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showDueDiligence, setShowDueDiligence] = useState(false);
  const [dueDiligenceResult, setDueDiligenceResult] = useState<any>(null);
  const [isCheckingDD, setIsCheckingDD] = useState(false);
  const [ddForm, setDdForm] = useState({ rfc: '', curp: '', nombre: '', tipo: 'persona-moral' });
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [currentCallNumber, setCurrentCallNumber] = useState('');
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    setHasPassword(!!localStorage.getItem('lexmex_password'));
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Datos de ejemplo
  const loadSampleData = () => {
    const sampleClientes = [
      { id: '1', nombre: 'María González López', correo: 'maria.gonzalez@email.com', telefono: '55 1234 5678', direccion: 'Av. Reforma 123, CDMX', rfc: 'GOLM800101ABC', fechaAlta: new Date().toISOString(), notas: 'Cliente preferente' },
      { id: '2', nombre: 'Juan Pérez Hernández', correo: 'juan.perez@email.com', telefono: '55 8765 4321', direccion: 'Calle Juárez 456, Guadalajara', rfc: 'PEHJ750202DEF', fechaAlta: new Date().toISOString(), notas: '' },
      { id: '3', nombre: 'Ana Martínez Silva', correo: 'ana.martinez@email.com', telefono: '55 1111 2222', direccion: 'Paseo de la Reforma 789, CDMX', rfc: 'MASA900303GHI', fechaAlta: new Date().toISOString(), notas: 'Referencia de María' },
    ];
    
    const sampleCasos = [
      { id: '1', clienteId: '1', titulo: 'Demanda de divorcio necesario', materia: 'familiar', status: 'activo', descripcion: 'Procedimiento de divorcio por causa de adulterio', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [{id: '1', casoId: '1', descripcion: 'Presenter pruebas', fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], estado: 'pendiente'}], eventos: [], facturas: [{id: '1', casoId: '1', numero: 'FAC-001', concepto: 'Honorarios etapa 1', total: 25000, fecha: new Date().toISOString(), status: 'pagada'}] },
      { id: '2', clienteId: '2', titulo: 'Reclamo de indemnización laboral', materia: 'laboral', status: 'activo', descripcion: 'Despido injustificado con reclamo de liquidación', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [], eventos: [{id: '1', titulo: 'Audiencia preliminar', fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '10:00', tipo: 'audiencia', descripcion: 'Primera audiencia', lugar: 'Junta Local'}], facturas: [] },
      { id: '3', clienteId: '3', titulo: 'Contrato de arrendamiento comercial', materia: 'civil', status: 'concluso', descripcion: 'Redacción y revisión de contrato', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [], eventos: [], facturas: [{id: '1', casoId: '3', numero: 'FAC-002', concepto: 'Honorarios redacción', total: 15000, fecha: new Date().toISOString(), status: 'pagada'}] },
    ];
    
    const sampleProspectos = [
      { id: '1', nombre: 'Carlos Ruiz Díaz', correo: 'carlos.ruiz@email.com', telefono: '55 3333 4444', motivo: 'Consulta por compra de propiedad', fuente: 'google', status: 'interesado', fecha: new Date().toISOString(), notas: 'Muy interesado en property' },
      { id: '2', nombre: 'Laura Torres Vega', correo: 'laura.torres@email.com', telefono: '55 5555 6666', motivo: 'Problema con arrendatario', fuente: 'referencia', status: 'nuevo', fecha: new Date().toISOString(), notas: '' },
    ];
    
    const sampleCitas = [
      { id: '1', clienteId: '1', titulo: 'Revisión de documentos', fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '11:00', tipo: 'consulta', notas: 'Revisar pruebas del divorcio', status: 'confirmada' },
      { id: '2', clienteId: '2', titulo: 'Audiencia', fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], hora: '10:00', tipo: 'audiencia', notas: 'Preliminar', status: 'pendiente' },
    ];
    
    setClientes(sampleClientes);
    setCasos(sampleCasos);
    setProspectos(sampleProspectos);
    setCitas(sampleCitas);
    showToast('¡Datos de ejemplo cargados!', 'success');
  };
  
  // Cargar desde localStorage al inicio
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedClientes = localStorage.getItem('lexmex_clientes');
    const savedCasos = localStorage.getItem('lexmex_casos');
    const savedProspectos = localStorage.getItem('lexmex_prospectos');
    const savedCitas = localStorage.getItem('lexmex_citas');
    if (savedClientes) setClientes(JSON.parse(savedClientes));
    if (savedCasos) setCasos(JSON.parse(savedCasos));
    if (savedProspectos) setProspectos(JSON.parse(savedProspectos));
    if (savedCitas) setCitas(JSON.parse(savedCitas));
  }, []);
  
  // Guardar en localStorage con indicador
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsSaving(true);
    localStorage.setItem('lexmex_clientes', JSON.stringify(clientes));
    localStorage.setItem('lexmex_casos', JSON.stringify(casos));
    localStorage.setItem('lexmex_prospectos', JSON.stringify(prospectos));
    localStorage.setItem('lexmex_citas', JSON.stringify(citas));
    setTimeout(() => setIsSaving(false), 500);
  }, [clientes, casos, prospectos, citas]);
  
  const welcomeMessageEs = `¡Hola! Soy LexMex, tu asesor legal. 

Puedo ayudarte con:
- Dudas de derecho mexicano (civil, penal, laboral, etc.)
- Revisión de documentos legales
- Redacción de demandas y contratos
- Búsqueda de leyes y jurisprudencia

¿En qué te ayudo?`;

  const welcomeMessageEn = `Welcome to LexMex! ⚖️

I am your legal AI assistant specialized in Mexican law. I am capable of:

📋 **Document Analysis**
I analyze lawsuits, responses, motions, and court rulings.

✍️ **Legal Drafting**
I prepare lawsuit responses, appeals, briefs, and legal documents.

⚖️ **Ruling Analysis**
I examine sentences to find legal errors and appeal opportunities.

📚 **Precedent Search**
I locate relevant case law and theses.

🔍 **Notarial Review**
I review deed projects and perform Due Diligence.

📜 **Civil and Commercial Contracts**
I draft any type of contract.

💡 You can also paste URLs from official sources (DOF, SCJN, etc.) for analysis.

How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessageEs }
  ]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: language === 'es' ? welcomeMessageEs : welcomeMessageEn }]);
    }
  }, [language]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showOcr, setShowOcr] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [materiaFilter, setMateriaFilter] = useState('');
  const [selectedLey, setSelectedLey] = useState<Ley | null>(null);
  const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
  const [selectedJurisprudencia, setSelectedJurisprudencia] = useState<Jurisprudencia | null>(null);
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaEscritura | null>(null);
  const [showContratoForm, setShowContratoForm] = useState(false);
  const [contratoGenerado, setContratoGenerado] = useState('');
  const [tipoContrato, setTipoContrato] = useState('arrendamiento');
  const [contratoDatos, setContratoDatos] = useState({
    nombreArrendador: '',
    rfcArrendador: '',
    nombreArrendatario: '',
    direccionInmueble: '',
    rentaMensual: '',
    fechaInicio: '',
    duracion: '',
    depositoGarantia: '',
    diaPago: '5',
    servicios: '',
    usoInmueble: 'habitacional'
  });
  const [isGenerandoContrato, setIsGenerandoContrato] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [callStatus]);

  const startCall = (number: string) => {
    setCurrentCallNumber(number);
    setCallStatus('calling');
    setCallDuration(0);
    // Simulate connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallStatus('idle');
      setCurrentCallNumber('');
      setCallDuration(0);
    }, 2000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      // Ctrl/Cmd + 1-9 for tabs
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const tabs = ['chat', 'prospectos', 'citas', 'casos', 'calendario', 'equipo', 'tratados', 'reportes', 'plantillas', 'escrituras', 'library'];
        const index = parseInt(e.key) - 1;
        if (index < tabs.length) setActiveTab(tabs[index] as any);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNewCliente(false);
        setShowNewCaso(false);
        setShowNewPlazo(false);
        setShowNewEvento(false);
        setShowNewDocumento(false);
        setShowNewConsulta(false);
        setShowNewFactura(false);
        setShowNewProspecto(false);
        setShowNewCita(false);
        setShowExportMenu(false);
        setConfirmDelete(null);
      }
      // Ctrl/Cmd + N for new (context dependent)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (activeTab === 'casos' && selectedCliente) setShowNewCaso(true);
        else if (activeTab === 'prospectos') setShowNewProspecto(true);
        else if (activeTab === 'citas') setShowNewCita(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedCliente]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-MX';
    recognition.interimResults = true;
    recognition.continuous = false;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  const handleOCR = async (imageData: string) => {
    setIsAnalyzing(true);
    setShowOcr(true);
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        setOcrResult(data);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `📄 **ANÁLISIS DE DOCUMENTO**\n\n**Tipo detectado:** ${data.analysis.detectedType}\n\n**Palabras clave:** ${data.analysis.keywords.slice(0, 10).join(', ')}\n\n**Fechas encontradas:** ${data.analysis.entities.dates.join(', ') || 'Ninguna'}\n\n**Montos:** ${data.analysis.entities.amounts.join(', ') || 'Ninguno'}\n\n**⚠️ Riesgos:** ${data.analysis.risks.join('\n') || 'Ninguno'}\n\n${data.analysis.summary}` 
        }]);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      showToast('Error al analizar documento', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeContract = async (text: string, tipo: string) => {
    setIsAnalyzing(true);
    setShowAnalysis(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'contrato-analisis', 
          texto: text, 
          tipo: tipo 
        })
      });
      
      const data = await response.json();
      setAnalysisResult(data);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `⚖️ **ANÁLISIS DE RIESGO CONTRACTUAL**\n\n**Nivel de riesgo:** ${data.score} (${data.overallRisk}/100)\n\n**Cláusulas de riesgo:** ${data.legalRisks.join('\n') || 'Ninguna'}\n\n**Faltantes:** ${data.missingClauses.join('\n') || 'Ninguna'}\n\n\n**📋 Recomendaciones:**\n${data.recommendations.map((r: string) => '• ' + r).join('\n')}\n\n**Precedentes relevantes:**\n${data.relevantPrecedents.map((p: any) => '• ' + p.titulo).join('\n')}` 
        }]);
    } catch (error) {
      console.error('Analysis Error:', error);
      showToast('Error al analizar contrato', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      showToast('Tu navegador no soporta notificaciones', 'error');
      return;
    }
    
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
      showToast('Notificaciones activadas', 'success');
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = (text || input || '').trim();
    if (!messageText && !selectedImage || isLoading) return;

    let contextInfo = '';
    if (selectedCaso) {
      const cliente = clientes.find(c => c.id === selectedCaso.clienteId);
      contextInfo = `\n\n--- CONTEXTO DEL CASO ACTUAL ---\nCliente: ${cliente?.nombre || 'N/A'}\nCaso: ${selectedCaso.titulo}\nMateria: ${selectedCaso.materia}\nStatus: ${selectedCaso.status}\nDescripción: ${selectedCaso.descripcion || 'N/A'}\nPlazos: ${(selectedCaso.plazos || []).map((p: any) => `${p.descripcion} - ${p.fechaLimite} (${p.estado})`).join(', ') || 'N/A'}\nFacturas: ${(selectedCaso.facturas || []).map((f: any) => `${f.numero}: $${f.total} (${f.status})`).join(', ') || 'N/A'}\n---------------------------\n`;
    }

    // Add web search results if enabled
    let webSearchInfo = '';
    if (useWebSearch) {
      try {
        const searchResponse = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: messageText })
        });
        const searchData = await searchResponse.json();
        if (searchData.success && searchData.results?.length > 0) {
          webSearchInfo = `\n\n--- BÚSQUEDA WEB RECIENTE ---\n${searchData.results.map((r: any, i: number) => `${i + 1}. ${r.title}\n   ${r.url}\n   ${r.snippet}`).join('\n\n')}\n---------------------------\n`;
        }
      } catch (e) {
        console.error('Web search error:', e);
      }
    }

    const fullMessage = messageText + contextInfo + webSearchInfo + (selectedImage ? '\n\n[Imagen adjunta para análisis]' : '');
    const userMessage: Message = { role: 'user', content: fullMessage };
    setMessages(prev => [...prev, userMessage]);
    setInput('' as any);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('text', fullMessage);
      formData.append('messages', JSON.stringify([...messages, userMessage].map(m => ({ role: m.role, content: m.content }))));
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Lo siento, ocurrió un error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeyes = buscarLeyes(searchTerm, materiaFilter || undefined);
  const filteredJurisprudencias = buscarJurisprudencia(searchTerm, materiaFilter || undefined);
  const filteredPlantillas = buscarPlantilla(searchTerm);

  // Funciones para gestión de casos
  const addCliente = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoCliente = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      direccion: formData.get('direccion'),
      rfc: formData.get('rfc'),
      fechaAlta: new Date().toISOString(),
      notas: ''
    };
    setClientes([...clientes, nuevoCliente]);
    setShowNewCliente(false);
    showToast('Cliente agregado correctamente', 'success');
  };

  const deleteCliente = (id: string) => {
    setConfirmDelete({ type: 'cliente', id, message: '¿Estás seguro de eliminar este cliente? También se eliminarán todos sus casos.' });
  };

  const deleteCaso = (id: string) => {
    setConfirmDelete({ type: 'caso', id, message: '¿Estás seguro de eliminar este caso? Se perderán todos los datos asociados.' });
  };

  const addCaso = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCliente) return;
    const formData = new FormData(e.currentTarget);
    const nuevoCaso = {
      id: Date.now().toString(),
      clienteId: selectedCliente.id,
      titulo: formData.get('titulo'),
      materia: formData.get('materia'),
      status: 'activo',
      descripcion: formData.get('descripcion'),
      fechaApertura: new Date().toISOString(),
      consultas: [],
      documentos: [],
      plazos: [],
      eventos: [],
      facturas: []
    };
    setCasos([...casos, nuevoCaso]);
    setShowNewCaso(false);
    showToast('Caso creado correctamente', 'success');
  };

  const addPlazo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoPlazo = {
      id: Date.now().toString(),
      casoId: selectedCaso.id,
      descripcion: formData.get('descripcion'),
      fechaLimite: formData.get('fechaLimite'),
      estado: 'pendiente'
    };
    const casoActualizado = {
      ...selectedCaso,
      plazos: [...(selectedCaso.plazos || []), nuevoPlazo]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewPlazo(false);
  };

  const togglePlazo = (plazoId: string) => {
    if (!selectedCaso) return;
    const plazosActualizados = selectedCaso.plazos.map((p: any) => 
      p.id === plazoId ? { ...p, estado: p.estado === 'pendiente' ? 'cumplido' : 'pendiente' } : p
    );
    const casoActualizado = { ...selectedCaso, plazos: plazosActualizados };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
  };

  const deletePlazo = (plazoId: string) => {
    setConfirmDelete({ type: 'plazo', id: plazoId, message: '¿Estás seguro de eliminar este plazo?' });
  };

  const addEvento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoEvento = {
      id: Date.now().toString(),
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      descripcion: formData.get('descripcion'),
      lugar: formData.get('lugar')
    };
    const casoActualizado = {
      ...selectedCaso,
      eventos: [...(selectedCaso.eventos || []), nuevoEvento]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewEvento(false);
  };

  const deleteEvento = (eventoId: string) => {
    setConfirmDelete({ type: 'evento', id: eventoId, message: '¿Estás seguro de eliminar este evento?' });
  };

  const addDocumento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoDocumento = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      fecha: new Date().toISOString(),
      notas: formData.get('notas')
    };
    const casoActualizado = {
      ...selectedCaso,
      documentos: [...(selectedCaso.documentos || []), nuevoDocumento]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewDocumento(false);
  };

  const deleteDocumento = (docId: string) => {
    setConfirmDelete({ type: 'documento', id: docId, message: '¿Estás seguro de eliminar este documento?' });
  };

  const addConsulta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaConsulta = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      pregunta: formData.get('pregunta'),
      respuesta: formData.get('respuesta') || ''
    };
    const casoActualizado = {
      ...selectedCaso,
      consultas: [...(selectedCaso.consultas || []), nuevaConsulta]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewConsulta(false);
  };

  const addFactura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaFactura = {
      id: Date.now().toString(),
      casoId: selectedCaso.id,
      numero: formData.get('numero'),
      concepto: formData.get('concepto'),
      total: parseFloat(formData.get('total') as string) || 0,
      fecha: new Date().toISOString(),
      status: 'pendiente'
    };
    const casoActualizado = {
      ...selectedCaso,
      facturas: [...(selectedCaso.facturas || []), nuevaFactura]
    };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
    setShowNewFactura(false);
  };

  const updateFacturaStatus = (facturaId: string, status: string) => {
    if (!selectedCaso) return;
    const facturasActualizadas = selectedCaso.facturas.map((f: any) => 
      f.id === facturaId ? { ...f, status } : f
    );
    const casoActualizado = { ...selectedCaso, facturas: facturasActualizadas };
    setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
    setSelectedCaso(casoActualizado);
  };

  const deleteFactura = (facturaId: string) => {
    setConfirmDelete({ type: 'factura', id: facturaId, message: '¿Estás seguro de eliminar esta factura?' });
  };

  const addProspecto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoProspecto = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      motivo: formData.get('motivo'),
      fuente: formData.get('fuente'),
      status: 'nuevo',
      fecha: new Date().toISOString(),
      notas: ''
    };
    setProspectos([...prospectos, nuevoProspecto]);
    setShowNewProspecto(false);
  };

  const updateProspectoStatus = (id: string, status: string) => {
    setProspectos(prospectos.map(p => p.id === id ? { ...p, status } : p));
    if (status === 'cliente') showToast('Prospecto convertido a cliente', 'success');
  };

  const deleteProspecto = (id: string) => {
    setConfirmDelete({ type: 'prospecto', id, message: '¿Estás seguro de eliminar este prospecto?' });
  };

  // Team member functions
  const addTeamMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoMiembro = {
      id: Date.now().toString(),
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      rol: formData.get('rol'),
      especialidad: formData.get('especialidad'),
      fechaAlta: new Date().toISOString(),
      status: 'activo',
      casosAsignados: 0
    };
    setTeamMembers([...teamMembers, nuevoMiembro]);
    setShowNewTeamMember(false);
    showToast('Miembro del equipo agregado', 'success');
  };

  const deleteTeamMember = (id: string) => {
    setConfirmDelete({ type: 'teamMember', id, message: '¿Estás seguro de eliminar este miembro del equipo?' });
  };

  const convertirProspecto = (prospecto: any) => {
    const nuevoCliente = {
      id: Date.now().toString(),
      nombre: prospecto.nombre,
      correo: prospecto.correo,
      telefono: prospecto.telefono,
      direccion: '',
      rfc: '',
      fechaAlta: new Date().toISOString(),
      notas: `Convertido de prospecto. Fuente: ${prospecto.fuente}`
    };
    setClientes([...clientes, nuevoCliente]);
    updateProspectoStatus(prospecto.id, 'cliente');
    showToast('Prospecto convertido a cliente', 'success');
  };

  const addCita = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevaCita = {
      id: Date.now().toString(),
      clienteId: formData.get('clienteId'),
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      notas: formData.get('notas'),
      status: 'pendiente'
    };
    setCitas([...citas, nuevaCita]);
    setShowNewCita(false);
  };

  const updateCitaStatus = (citaId: string, status: string) => {
    setCitas(citas.map(c => c.id === citaId ? { ...c, status } : c));
    showToast('Estado de cita actualizado', 'success');
  };

  const deleteCita = (id: string) => {
    setConfirmDelete({ type: 'cita', id, message: '¿Estás seguro de eliminar esta cita?' });
  };

  const exportData = (type: 'clientes' | 'casos' | 'prospectos' | 'citas' | 'all') => {
    let data: any = {};
    let filename = '';
    
    switch(type) {
      case 'clientes':
        data = { clientes };
        filename = 'lexmex_clientes';
        break;
      case 'casos':
        data = { casos, clientes };
        filename = 'lexmex_casos';
        break;
      case 'prospectos':
        data = { prospectos };
        filename = 'lexmex_prospectos';
        break;
      case 'citas':
        data = { citas, clientes };
        filename = 'lexmex_citas';
        break;
      case 'all':
        data = { clientes, casos, prospectos, citas, exportDate: new Date().toISOString() };
        filename = 'lexmex_backup_completo';
        break;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.clientes) setClientes(data.clientes);
        if (data.casos) setCasos(data.casos);
        if (data.prospectos) setProspectos(data.prospectos);
        if (data.citas) setCitas(data.citas);
        alert('Datos importados correctamente');
      } catch {
        alert('Error al importar: formato inválido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.style.setProperty('--bg', newTheme === 'dark' ? '#0D1117' : '#f5f5f5');
    document.documentElement.style.setProperty('--surface', newTheme === 'dark' ? '#161b22' : '#ffffff');
    document.documentElement.style.setProperty('--surface-hover', newTheme === 'dark' ? '#21262d' : '#e6e6e6');
    document.documentElement.style.setProperty('--border', newTheme === 'dark' ? '#30363d' : '#d1d5db');
    document.documentElement.style.setProperty('--text', newTheme === 'dark' ? '#c9d1d9' : '#1f2937');
    document.documentElement.style.setProperty('--muted', newTheme === 'dark' ? '#8b949e' : '#6b7280');
  };

  const performSearch = (query: string) => {
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();
    const results: any[] = [];
    
    clientes.forEach(c => {
      if (c.nombre.toLowerCase().includes(q) || c.correo?.toLowerCase().includes(q)) {
        results.push({ type: 'cliente', item: c, title: c.nombre, subtitle: c.correo });
      }
    });
    
    casos.forEach(c => {
      if (c.titulo.toLowerCase().includes(q) || c.descripcion?.toLowerCase().includes(q)) {
        const cliente = clientes.find(cl => cl.id === c.clienteId);
        results.push({ type: 'caso', item: c, title: c.titulo, subtitle: cliente?.nombre || '' });
      }
    });
    
    prospectos.forEach(p => {
      if (p.nombre.toLowerCase().includes(q) || p.motivo?.toLowerCase().includes(q)) {
        results.push({ type: 'prospecto', item: p, title: p.nombre, subtitle: p.motivo });
      }
    });
    
    setSearchResults(results);
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`);
    setShowEmailModal(false);
    setEmailTo('');
    setEmailSubject('');
    setEmailBody('');
    showToast('Cliente abridor cliente de email', 'info');
  };

  const syncToGoogleCalendar = (cita: any) => {
    const cliente = clientes.find(c => c.id === cita.clienteId);
    const title = encodeURIComponent(cita.titulo);
    const details = encodeURIComponent(cita.notas || '');
    const date = cita.fecha.replace(/-/g, '');
    const time = cita.hora.replace(':', '') + '00';
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}T${time}/${date}T${time}&details=${details}`;
    window.open(calendarUrl, '_blank');
    showToast('Abriendo Google Calendar', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Sesión cerrada', 'info');
  };

  const getPlazosProximos = () => {
    const hoy = new Date();
    const proximos = casos.flatMap(c => 
      (c.plazos || []).filter((p: any) => {
        if (p.estado !== 'pendiente') return false;
        const fecha = new Date(p.fechaLimite);
        const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return dias <= 15 && dias >= 0;
      }).map((p: any) => {
        const fecha = new Date(p.fechaLimite);
        const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return { ...p, casoTitulo: c.titulo, dias };
      })
    );
    return proximos.sort((a: any, b: any) => a.dias - b.dias);
  };

  const getPlazosVencidos = () => {
    const hoy = new Date();
    return casos.flatMap(c => 
      (c.plazos || []).filter((p: any) => {
        if (p.estado !== 'pendiente') return false;
        return new Date(p.fechaLimite) < hoy;
      }).map((p: any) => ({ ...p, casoTitulo: c.titulo }))
    );
  };

  const getCasosByCliente = (clienteId: string) => casos.filter(c => c.clienteId === clienteId);

  const tipoColores: any = {
    audiencia: '#ef4444',
    reunion: '#3b82f6',
    vencimiento: '#f59e0b',
    otro: '#6b7280'
  };

  const statusColors: any = {
    activo: '#22c55e',
    pendiente: '#f59e0b',
    concluso: '#3b82f6',
    cancelado: '#ef4444'
  };

  const materiaLabels: any = {
    civil: 'Civil',
    laboral: 'Laboral',
    mercantil: 'Mercantil',
    familiar: 'Familiar',
    penal: 'Penal',
    constitucional: 'Constitucional',
    administrativo: 'Administrativo',
    otro: 'Otro'
  };

  const handleLogin = () => {
    if (typeof window === 'undefined') return;
    const correctPassword = localStorage.getItem('lexmex_password') || 'lexmex2024';
    if (loginPassword === correctPassword) {
      setIsAuthenticated(true);
      setShowLoginError(false);
    } else {
      setShowLoginError(true);
      showToast('Contraseña incorrecta', 'error');
    }
  };

  const setupPassword = () => {
    if (typeof window === 'undefined') return;
    if (loginPassword.length >= 4) {
      localStorage.setItem('lexmex_password', loginPassword);
      setIsAuthenticated(true);
      showToast('Contraseña configurada', 'success');
    }
  };

  // Skip login screen for now - authentication disabled
  /*
  if (!mounted || hasPassword === null) {
    return (
      <div suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1117' }}>
        <div suppressHydrationWarning style={{ color: '#8B949E' }}>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1117', padding: '20px' }}>
        <div suppressHydrationWarning style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '16px', padding: isMobile ? '24px' : '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px', background: 'linear-gradient(135deg, #C9A227 0%, #A88420 100%)', borderRadius: isMobile ? '15px' : '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '30px' : '40px', margin: '0 auto 24px' }}>
            ⚖️
          </div>
          <h1 suppressHydrationWarning style={{ fontSize: isMobile ? '28px' : '32px', marginBottom: '8px', color: '#C9A227', fontFamily: 'Playfair Display, serif' }}>LexMex</h1>
          <p suppressHydrationWarning style={{ color: '#8B949E', marginBottom: isMobile ? '24px' : '32px', fontSize: isMobile ? '14px' : '16px' }}>Asesor Legal Inteligente</p>
          
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (hasPassword ? handleLogin() : setupPassword())}
            placeholder={hasPassword ? 'Ingresa tu contraseña' : 'Establecer contraseña'}
            style={{ width: '100%', padding: '14px', background: '#0D1117', border: '1px solid #30363D', borderRadius: '8px', color: '#E6EDF3', fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}
          />
          
          <button
            onClick={hasPassword ? handleLogin : setupPassword}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C9A227 0%, #A88420 100%)', color: '#0D1117', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}
          >
            {hasPassword ? '🔓 Entrar' : '⚙️ Configurar'}
          </button>
          
          {showLoginError && (
            <p style={{ color: '#ef4444', marginTop: '12px', fontSize: '14px' }}>Contraseña incorrecta</p>
          )}
          
          <p style={{ color: '#8B949E', marginTop: '24px', fontSize: '12px' }}>
            💡 Contraseña: lexmex2024
          </p>
        </div>
      </div>
    );
  }
  */
 
  // Always show app (auth disabled)

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'var(--bg)', 
      color: 'var(--text)',
      overflow: 'hidden'
    }}>
      {/* Premium Desktop Atmosphere */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 0% 0%, rgba(30, 58, 95, 0.3) 0%, transparent 40%),
          radial-gradient(circle at 100% 100%, rgba(201, 162, 39, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at top right, rgba(201, 162, 39, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      {/* Top Navigation Bar - Fidelity Edition */}
      <header style={{
        height: '70px',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        background: 'rgba(10, 13, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>⚖️</span>
          <h1 style={{ 
            fontSize: '22px', 
            fontWeight: 700, 
            margin: 0, 
            fontFamily: 'Playfair Display', 
            color: '#ffffff',
            letterSpacing: '0.5px'
          }}>LexMex</h1>
        </div>

        {/* Center: Pill Search */}
        <div className="pill-search">
          <span style={{ fontSize: '16px', opacity: 0.6 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar en LexMex..." 
            onClick={() => setShowSearch(true)}
            readOnly
          />
        </div>

        {/* Right: Profile & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button className="icon-button-gold" style={{ fontSize: '20px' }}>🔔</button>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer'
          }}>
            <div style={{ textAlign: 'right' }}>
               <p style={{ margin: 0, fontSize: '13px', fontWeight: 600 }}>Abg. Elena Ruiz</p>
               <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Perfil Pro ⌵</p>
            </div>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'var(--surface-opaque)',
              border: '1.5px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              overflow: 'hidden'
            }}>👤</div>
          </div>
        </div>
      </header>

      {/* Workspace Area */}
      <main style={{ flex: 1, display: 'flex', padding: '24px', gap: '24px', zIndex: 1, overflow: 'hidden' }}>
        {/* Navigation Sidebar - Fidelity Edition */}
        <aside className="sidebar-glass" style={{ 
          width: '260px', 
          display: isMobile ? 'none' : 'flex', 
          flexDirection: 'column', 
          gap: '4px'
        }}>
          {[
            { id: 'chat', label: 'Inicio', icon: '🏠' },
            { id: 'library', label: 'Biblioteca Legal', icon: '📖', hasChevron: true },
            { id: 'casos', label: 'Casos', icon: '💼', hasChevron: true },
            { id: 'investigacion', label: 'Investigación', icon: '🔍' },
            { id: 'perfil', label: 'Perfil', icon: '👤' }
          ].map(item => (
            <div key={item.id}>
              <button
                onClick={() => setActiveTab(item.id as any)}
                className={`nav-item-fidelity ${activeTab === item.id ? 'active' : ''}`}
                style={{ width: '100%' }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.hasChevron && <span style={{ fontSize: '12px', opacity: 0.5 }}>⌵</span>}
              </button>
              
              {/* Mock sub-items if active or special library case */}
              {item.id === 'library' && activeTab === 'library' && (
                <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', marginBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>Contratos</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>Legislación</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>Jurisprudencia</p>
                </div>
              )}
            </div>
          ))}
          
          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             <button onClick={logout} className="nav-item-fidelity" style={{ width: '100%', color: '#ef4444' }}>
                <span style={{ fontSize: '18px' }}>🚪</span> Cerrar Sesión
             </button>
          </div>
        </aside>

        {/* View Content Area - Fidelity Edition */}
        <section style={{ flex: 1, display: 'flex', gap: '24px', overflow: 'hidden' }}>
          {activeTab === 'chat' && (
            <>
              {/* Central Chat: Gold Bordered */}
              <div className="chat-container-gold" style={{ flex: 1 }}>
                <ChatInterface 
                  messages={messages}
                  isLoading={isLoading}
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  isRecording={isRecording}
                  toggleVoiceInput={toggleVoiceInput}
                  useWebSearch={useWebSearch}
                  setUseWebSearch={setUseWebSearch}
                  handleOCR={() => document.getElementById('ocr-upload')?.click()}
                  setShowContractAnalysis={setShowContractAnalysis}
                  setShowDueDiligence={setShowDueDiligence}
                  selectedCaso={selectedCaso}
                  onCloseCaso={() => { setSelectedCaso(null); setSelectedCliente(null); }}
                  onSelectCasoChat={(caso: any, cliente: any) => { setSelectedCliente(cliente); setSelectedCaso(caso); setActiveTab('casos'); }}
                  casos={casos}
                  clientes={clientes}
                  setActiveTab={setActiveTab}
                  setSelectedCliente={setSelectedCliente}
                  setSelectedCaso={setSelectedCaso}
                  showToast={showToast}
                  fileInputRef={fileInputRef}
                  messagesEndRef={messagesEndRef}
                />
              </div>

              {/* Right Sidebar: Context Fidelity */}
              <aside className="sidebar-glass" style={{ width: '300px', display: isMobile ? 'none' : 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '4px', color: '#fff' }}>Caso 001 - Arrendamiento</h2>
                <div style={{ height: '2px', background: 'var(--primary)', width: '40px', marginBottom: '24px' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <section>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>DOCUMENTOS GENERADOS</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="glass-card" style={{ padding: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span>📄</span> Contratos Gen... <span style={{ marginLeft: 'auto', opacity: 0.5 }}>⌵</span>
                      </div>
                      <div className="glass-card" style={{ padding: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span>📂</span> Documentos Arrendamiento <span style={{ marginLeft: 'auto', opacity: 0.5 }}>⌵</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>RESUMEN LEGAL</p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                      El cliente requiere redactar un contrato de arrendamiento residencial para un cliente. Se necesita asegurar el depósito de garantía y las cláusulas de rescisión por falta de pago.
                    </p>
                  </section>

                  <section>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>SIGUIENTES PASOS</p>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>1.</span> Completar datos arrendador.
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>2.</span> Validar ID oficial.
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>3.</span> Enviar a firma digital.
                      </div>
                    </div>
                  </section>
                </div>
              </aside>
            </>
          )}

          {activeTab !== 'chat' && (
            <div className="glass-panel scale-up" style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
               {activeTab === 'casos' && (
                 <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '350px 1fr', gap: '32px', height: '100%' }}>
                   <CasesManager 
                     clientes={clientes}
                     casos={casos}
                     onAddCliente={addCliente}
                     onDeleteCliente={deleteCliente}
                     onSelectCliente={(cliente) => { setSelectedCliente(cliente); setSelectedCaso(null); }}
                     selectedCliente={selectedCliente}
                     onSelectCaso={setSelectedCaso}
                     showNewCliente={showNewCliente}
                     setShowNewCliente={setShowNewCliente}
                     getCasosByCliente={getCasosByCliente}
                   />
                   <CaseDetail
                     selectedCliente={selectedCliente}
                     selectedCaso={selectedCaso}
                     casosDelCliente={selectedCliente ? getCasosByCliente(selectedCliente.id) : []}
                     onSelectCaso={setSelectedCaso}
                     onAddCaso={addCaso}
                     onDeleteCaso={deleteCaso}
                     showNewCaso={showNewCaso}
                     setShowNewCaso={setShowNewCaso}
                     onAddPlazo={addPlazo}
                     onTogglePlazo={togglePlazo}
                     onDeletePlazo={deletePlazo}
                     showNewPlazo={showNewPlazo}
                     setShowNewPlazo={setShowNewPlazo}
                     onAddEvento={addEvento}
                     onDeleteEvento={deleteEvento}
                     showNewEvento={showNewEvento}
                     setShowNewEvento={setShowNewEvento}
                     onAddDocumento={addDocumento}
                     onDeleteDocumento={deleteDocumento}
                     showNewDocumento={showNewDocumento}
                     setShowNewDocumento={setShowNewDocumento}
                     onAddConsulta={addConsulta}
                     showNewConsulta={showNewConsulta}
                     setShowNewConsulta={setShowNewConsulta}
                     onAddFactura={addFactura}
                     onUpdateFacturaStatus={updateFacturaStatus}
                     onDeleteFactura={deleteFactura}
                     showNewFactura={showNewFactura}
                     setShowNewFactura={setShowNewFactura}
                     onShowEmail={(email: string) => { setEmailTo(email); setShowEmailModal(true); }}
                     onShowCall={() => setShowCallModal(true)}
                   />
                 </div>
               )}

               {activeTab === 'library' && (
                 <LegalLibrary materiaFilter={materiaFilter} setMateriaFilter={setMateriaFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} language={language} filteredLeyes={[]} filteredJurisprudencias={[]} activeSubTab="leyes" setActiveSubTab={() => {}} />
               )}

               {activeTab === 'prospectos' && (
                 <ProspectosView prospectos={prospectos} clientes={clientes} onAdd={addProspecto} onUpdateStatus={updateProspectoStatus} onDelete={deleteProspecto} onConvert={convertirProspecto} onShowNew={() => setShowNewProspecto(true)} />
               )}

               {activeTab === 'reportes' && (
                 <ReportesView casos={casos} clientes={clientes} />
               )}

               {activeTab === 'equipo' && (
                 <EquipoView 
                   teamMembers={teamMembers} 
                   onAddMember={addTeamMember} 
                   onDeleteMember={(id: string) => setConfirmDelete({ id, type: 'teamMember', message: '¿Eliminar a este miembro del equipo?' })}
                   onCallMember={() => setShowCallModal(true)}
                   showNewMember={showNewTeamMember}
                   setShowNewMember={setShowNewTeamMember}
                 />
               )}
            </div>
          )}
        </section>
      </main>

      {/* Global Modals (Search, DD, etc.) */}
      {showSearch && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(3,6,11,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, paddingTop: '100px' }}>
          <div className="glass-card scale-up" style={{ width: '100%', maxWidth: '650px', padding: '32px', border: '1px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px' }}>🔍</span>
              <input 
                autoFocus
                type="text" 
                placeholder="Busca casos, leyes, clientes o citas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text)', fontSize: '20px', outline: 'none' }}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowSearch(false); }}
              />
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--border)' }}>ESC</div>
            </div>
            
            <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {searchQuery.length > 2 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {clientes.filter(c => c.nombre.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                    <div key={c.id} onClick={() => { setSelectedCliente(c); setActiveTab('casos'); setShowSearch(false); }} className="nav-item glass-card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)' }}>{c.nombre}</p>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Cliente • {c.correo}</p>
                      </div>
                      <span>➡️</span>
                    </div>
                  ))}
                  {casos.filter(c => c.titulo.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                    <div key={c.id} onClick={() => { setSelectedCaso(c); setActiveTab('casos'); setShowSearch(false); }} className="nav-item glass-card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)' }}>{c.titulo}</p>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Caso • {c.materia}</p>
                      </div>
                      <span>➡️</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                  Escribe para comenzar la búsqueda legal integrada...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Due Diligence Result Modal */}
      {showDueDiligence && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
           <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '600px', padding: '32px', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                 <h2 style={{ margin: 0, fontFamily: 'Playfair Display' }}>✅ Verificación Due Diligence</h2>
                 <button onClick={() => setShowDueDiligence(false)} className="nav-item" style={{ padding: '8px' }}>✕</button>
              </div>
              
              {!dueDiligenceResult ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input value={ddForm.nombre} onChange={(e) => setDdForm({...ddForm, nombre: e.target.value})} placeholder="Nombre o Razón Social" className="glass-card" style={{ padding: '16px', background: 'none', border: '1px solid var(--border)', width: '100%', color: 'var(--text)' }} />
                    <input value={ddForm.rfc} onChange={(e) => setDdForm({...ddForm, rfc: e.target.value})} placeholder="RFC / Identificación" className="glass-card" style={{ padding: '16px', background: 'none', border: '1px solid var(--border)', width: '100%', color: 'var(--text)' }} />
                    <button 
                      onClick={async () => {
                         setIsCheckingDD(true);
                         // Real simulation
                         setTimeout(() => {
                            setDueDiligenceResult({
                               score: 85,
                               resultado: "Aprobado con Observaciones",
                               nivelRiesgo: "Bajo",
                               detalles: ["Sin antecedentes penales", "RFC activo y vigente", "Múltiples registros comerciales válidos"]
                            });
                            setIsCheckingDD(false);
                         }, 2000);
                      }}
                      className="btn-premium"
                      style={{ height: '56px', justifyContent: 'center' }}
                    >
                       {isCheckingDD ? "Analizando registros nacionales..." : "Iniciar Análisis de Riesgo"}
                    </button>
                 </div>
              ) : (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                   <div style={{ padding: '24px', background: 'rgba(201,162,39,0.1)', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--primary)' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--primary)' }}>RESULTADO DEL ANÁLISIS</p>
                      <h3 style={{ margin: '8px 0', fontSize: '24px' }}>{dueDiligenceResult.resultado}</h3>
                      <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
                         <div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>SCORE</p>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '20px' }}>{dueDiligenceResult.score}/100</p>
                         </div>
                         <div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>RIESGO</p>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '20px', color: '#22c55e' }}>{dueDiligenceResult.nivelRiesgo}</p>
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setDueDiligenceResult(null)} className="btn-premium" style={{ width: '100%', justifyContent: 'center' }}>Nueva Verificación</button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Footer / Status Bar */}
      <footer style={{ 
        height: '40px', 
        padding: '0 32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        fontSize: '11px', 
        color: 'var(--text-muted)', 
        borderTop: '1px solid var(--border)',
        zIndex: 10,
        background: 'rgba(3,6,11,0.5)'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSaving ? '#f59e0b' : '#22c55e' }} />
            {isSaving ? "Guardando cambios encriptados..." : "LexMex Cloud: Sistema Sincronizado"}
          </div>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>Región: México (CDMX)</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
           <span>LexMex Premium v2.1.0</span>
           <span style={{ fontWeight: 700, color: 'var(--primary)' }}>© 2026 LexMex AI Legal Systems</span>
        </div>
      </footer>

      {/* Notifications */}
      {toast && (
        <div className="animate-fade" style={{ position: 'fixed', bottom: '60px', right: '32px', padding: '16px 24px', background: 'var(--primary)', color: '#03060b', borderRadius: '12px', fontWeight: 700, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 9999 }}>
           {toast.message}
        </div>
      )}
    </div>
  );
}
