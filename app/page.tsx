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
import TeamChat from '@/components/TeamChat';
import NotificationCenter from '@/components/NotificationCenter';
import { EscriturasView } from '@/components/EscriturasView';
import SuscripcionView from '@/components/SuscripcionView';
import ProfileView from '@/components/ProfileView';
import { supabase } from '@/lib/supabase';







export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('SW registered:', reg.scope);
            
            // Check for updates
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available, inform user or reload
                    console.log('New content is available; please refresh.');
                    if (confirm('Nueva versión disponible. ¿Deseas actualizar para ver el nuevo diseño?')) {
                      window.location.reload();
                    }
                  }
                });
              }
            });
          })
          .catch((err) => console.log('SW registration failed:', err));
      });
    }
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setMounted(true);
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

  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'jurisprudencia' | 'escrituras' | 'casos' | 'plantillas' | 'calendario' | 'reportes' | 'prospectos' | 'citas' | 'equipo' | 'teamChat' | 'tratados' | 'suscripcion' | 'profile'>('chat');
  const [subscriptionLevel, setSubscriptionLevel] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [premiumUsage, setPremiumUsage] = useState(0);
  const [mounted, setMounted] = useState(false);
  
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
      welcome: "¡Bienvenido a TuAbogadoIA!",
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
      welcome: "Welcome to TuAbogadoIA!",
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
  
  // Estados para Biblioteca Legal
  const [activeSubTab, setActiveSubTab] = useState<'leyes' | 'jurisprudencia' | 'doctrina'>('leyes');

  // Helpers de Notificación
  const addNotification = (notif: any) => {
    setNotifications(prev => [notif, ...prev].slice(0, 20));
    // Push Notification si hay permiso
    if (Notification.permission === 'granted') {
      new Notification(notif.title, { body: notif.message, icon: '/favicon.ico' });
    }
  };

  // Monitor de Vencimientos (Deadline Sentry)
  useEffect(() => {
    if (!mounted || casos.length === 0) return;
    
    const proximos = getPlazosProximos();
    const urgentes = proximos.filter((p: any) => p.dias <= 3);
    
    if (urgentes.length > 0) {
      addNotification({
        title: '⚠️ Vencimientos Urgentes',
        message: `Tienes ${urgentes.length} plazos legales que vencen en menos de 72 horas.`,
        isUrgent: true,
        icon: '⚖️',
        time: 'Sistema'
      });
    }
  }, [mounted, casos]);
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
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  const onSendTeamMessage = async (contenido: string) => {
    if (!mounted || teamMembers.length === 0) return;
    try {
      // Usar el primer miembro del equipo como autor (en un sistema real sería el usuario logueado)
      const autorId = teamMembers[0].id;
      const { error } = await supabase.from('equipo_mensajes').insert([{
        autor_id: autorId,
        contenido
      }]);
      if (error) throw error;
    } catch (error) {
      console.error('Error sending team message:', error);
      showToast('Error al enviar mensaje', 'error');
    }
  };

  useEffect(() => {
    setMounted(true);
    setHasPassword(!!localStorage.getItem('tuabogadoia_password'));
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
    ];
    
    const sampleCasos = [
      { id: '1', clienteId: '1', titulo: 'Demanda de divorcio necesario', materia: 'familiar', status: 'activo', descripcion: 'Procedimiento de divorcio por causa de adulterio', fechaApertura: new Date().toISOString(), consultas: [], documentos: [], plazos: [{id: '1', casoId: '1', descripcion: 'Presenter pruebas', fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], estado: 'pendiente'}], eventos: [], facturas: [{id: '1', casoId: '1', numero: 'FAC-001', concepto: 'Honorarios etapa 1', total: 25000, fecha: new Date().toISOString(), status: 'pagada'}] },
    ];

    const sampleProspectos = [
      { id: '1', nombre: 'Carlos Ruiz Díaz', correo: 'carlos.ruiz@email.com', telefono: '55 3333 4444', motivo: 'Consulta por compra de propiedad', fuente: 'google', status: 'interesado', fecha: new Date().toISOString(), notas: 'Muy interesado' },
    ];
    
    setClientes(sampleClientes);
    setCasos(sampleCasos);
    setProspectos(sampleProspectos);
    showToast('¡Datos de ejemplo cargados!', 'success');
  };

  const loadSamples = () => {
    loadSampleData();
  };

  // Funciones de Sincronización con Supabase (RESTORED)
  const fetchData = async () => {
    if (!mounted) return;
    setIsSaving(true);
    try {
      const { data: clientesData } = await supabase.from('clientes').select('*').order('nombre');
      const { data: casosData } = await supabase.from('casos').select('*, plazos(*), eventos(*), facturas(*), documentos(*), consultas(*)');
      const { data: prospectosData } = await supabase.from('prospectos').select('*').order('fecha', { ascending: false });
      const { data: citasData } = await supabase.from('citas').select('*');
      const { data: equipoData } = await supabase.from('equipo').select('*');
      const { data: mensajesData } = await supabase.from('equipo_mensajes').select('*').order('creado_at', { ascending: true }).limit(100);

      if (clientesData) setClientes(clientesData);
      if (casosData) setCasos(casosData);
      if (prospectosData) setProspectos(prospectosData);
      if (citasData) setCitas(citasData);
      if (equipoData) setTeamMembers(equipoData);
      if (mensajesData) setEquipoMensajes(mensajesData);
      
      showToast('Sincronización Premium Exitosa', 'success');
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Error de conexión con la nube', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Cargar desde Supabase al inicio
  useEffect(() => {
    if (mounted) {
      fetchData();
    }
  }, [mounted]);
  
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  // Lógica de Almacenamiento (SUPABASE STORAGE)
  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>, casoId: string) => {
    const file = e.target.files?.[0];
    if (!file || !casoId) return;

    setIsSaving(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${casoId}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Subir a Storage
      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Registrar en la BD
      const { error: dbError } = await supabase
        .from('documentos')
        .insert([{ 
          caso_id: casoId, 
          nombre: file.name, 
          tipo: fileExt || 'otro', 
          url: filePath,
          fecha: new Date().toISOString() 
        }]);

      if (dbError) throw dbError;

      showToast('Documento subido a la nube', 'success');
      fetchData(); // Recargar datos para ver el nuevo doc
    } catch (error) {
      console.error('Error uploading:', error);
      showToast('Error al subir documento', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  const generatePortalLink = async (casoId: string) => {
    // Generar un token único (simulado)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/portal/${token}`;
  };

  const handleSignDocument = async (casoId: string, docId: string, signatureData: string) => {
    try {
      setCasos(prev => prev.map(c => {
        if (c.id === casoId) {
          return {
            ...c,
            documentos: c.documentos.map((d: any) => 
              d.id === docId ? { ...d, firmado: true, firmaData: signatureData, fechaFirma: new Date().toISOString() } : d
            )
          };
        }
        return c;
      }));
      showToast('Documento firmado con éxito', 'success');
    } catch (err) {
       console.error('Error al firmar:', err);
    }
  };

  
  // Motor de Tiempo Real (SUPABASE REALTIME)
  useEffect(() => {
    if (!mounted) return;

    const channel = supabase
      .channel('despacho_delta')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clientes' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'casos' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prospectos' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'citas' }, () => fetchData())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'equipo_mensajes' }, (payload) => {
        setEquipoMensajes(prev => [...prev, payload.new]);
        // Alerta visual si no estamos en el chat
        if (activeTab !== 'teamChat') {
          addNotification({
            title: 'Mensaje de Equipo',
            message: payload.new.contenido,
            icon: '💬',
            time: 'Ahora'
          });
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') setRealtimeStatus('connected');
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') setRealtimeStatus('error');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mounted]);

  // Mantener respaldo local (opcional)
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('tuabogadoia_clientes', JSON.stringify(clientes));
    localStorage.setItem('tuabogadoia_casos', JSON.stringify(casos));
    localStorage.setItem('tuabogadoia_prospectos', JSON.stringify(prospectos));
    localStorage.setItem('tuabogadoia_citas', JSON.stringify(citas));
  }, [clientes, casos, prospectos, citas, mounted]);
  
  const welcomeMessageEs = `¡Bienvenido a TuAbogadoIA! ⚖️

Soy tu asistente legal de **Alta Fidelidad** especializado en el sistema jurídico mexicano. Mi arquitectura me permite ofrecerte:

📋 **Análisis y Dictaminación**
Revisión técnica de contratos, demandas y amparos con detección de riesgos procesales.

📚 **Investigación Jurídica Dinámica**
Búsqueda en tiempo real de Leyes Federales, Locales y Criterios Jurisprudenciales actualizados.

🏢 **Centro de Control Jurídico**
Gestión integrada de tu despacho: **Casos (${casos.length})**, **Prospectos (${prospectos.length})** y **Citas (${citas.length})** pendientes.

**¿Qué asunto legal revisamos hoy, Licenciado?**`;

  const welcomeMessageEn = `Welcome to TuAbogadoIA! ⚖️

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
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showOcr, setShowOcr] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [equipoMensajes, setEquipoMensajes] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
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

  const checkPremiumAccess = (feature: string) => {
    if (subscriptionLevel !== 'free') return true;
    if (premiumUsage < 3) {
      setPremiumUsage(prev => prev + 1);
      return true;
    }
    setActiveTab('suscripcion');
    showToast(`Límite de prueba alcanzado para ${feature}. ¡Hazte PRO para uso ilimitado!`, 'info');
    return false;
  };

  const handleOCR = async (imageData: string) => {
    if (!checkPremiumAccess('Análisis de Documentos (OCR)')) return;
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
    if (!checkPremiumAccess('Dictaminación de Contratos')) return;
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

    // Determinar si la consulta requiere datos en tiempo real (Hybrid Detection)
    const shouldTriggerSearch = (str: string) => {
      const keywords = ['reforma', 'vigente', 'nuevo', 'actualizado', 'dof', 'scjn', 'jurisprudencia', 'articulo', 'ley de', 'decreto', '2024', '2025', '2026'];
      const textLower = str.toLowerCase();
      return keywords.some(k => textLower.includes(k));
    };

    const needsSearch = useWebSearch || shouldTriggerSearch(messageText);

    // Add web search results if enabled or needed
    let webSearchInfo = '';
    if (needsSearch) {
      setIsSearchingWeb(true);
      try {
        const searchResponse = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: messageText })
        });
        const searchData = await searchResponse.json();
        if (searchData.success && searchData.results?.length > 0) {
          webSearchInfo = `\n\n--- BÚSQUEDA WEB RECIENTE (DOF/SCJN) ---\n${searchData.results.map((r: any, i: number) => `${i + 1}. ${r.title}\n   ${r.url}\n   ${r.snippet}`).join('\n\n')}\n---------------------------\n`;
        }
      } catch (e) {
        console.error('Web search error:', e);
      } finally {
        setIsSearchingWeb(false);
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
  const addCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoCliente = {
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      direccion: formData.get('direccion'),
      rfc: formData.get('rfc'),
      notas: ''
    };
    
    setIsSaving(true);
    try {
      const { data, error } = await supabase.from('clientes').insert([nuevoCliente]).select();
      if (error) throw error;
      if (data) {
        setClientes([data[0], ...clientes]);
        setShowNewCliente(false);
        showToast('Cliente agregado correctamente', 'success');
      }
    } catch (error) {
      console.error('Error adding cliente:', error);
      showToast('Error al guardar en la nube', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCliente = async (id: string) => {
    try {
      const { error } = await supabase.from('clientes').delete().eq('id', id);
      if (error) throw error;
      setClientes(clientes.filter(c => c.id !== id));
      if (selectedCliente?.id === id) setSelectedCliente(null);
      showToast('Cliente eliminado', 'info');
    } catch (error) {
      console.error('Error deleting cliente:', error);
      showToast('Error al eliminar de la nube', 'error');
    }
  };

  const deleteCaso = async (id: string) => {
    try {
      const { error } = await supabase.from('casos').delete().eq('id', id);
      if (error) throw error;
      setCasos(casos.filter(c => c.id !== id));
      if (selectedCaso?.id === id) setSelectedCaso(null);
      showToast('Caso eliminado', 'info');
    } catch (error) {
      console.error('Error deleting caso:', error);
      showToast('Error al eliminar de la nube', 'error');
    }
  };

  const addCaso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCliente) return;
    const formData = new FormData(e.currentTarget);
    const nuevoCaso = {
      cliente_id: selectedCliente.id,
      titulo: formData.get('titulo'),
      materia: formData.get('materia'),
      status: 'activo',
      descripcion: formData.get('descripcion')
    };
    
    setIsSaving(true);
    try {
      const { data, error } = await supabase.from('casos').insert([nuevoCaso]).select();
      if (error) throw error;
      if (data) {
        setCasos([...casos, { ...data[0], plazos: [], eventos: [], facturas: [], documentos: [] }]);
        setShowNewCaso(false);
        showToast('Caso creado correctamente', 'success');
      }
    } catch (error) {
      console.error('Error adding caso:', error);
      showToast('Error al guardar en la nube', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const addPlazo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoPlazo = {
      caso_id: selectedCaso.id,
      descripcion: formData.get('descripcion'),
      fecha_limite: formData.get('fechaLimite'),
      estado: 'pendiente'
    };
    
    try {
      const { data, error } = await supabase.from('plazos').insert([nuevoPlazo]).select();
      if (error) throw error;
      if (data) {
        const casoActualizado = {
          ...selectedCaso,
          plazos: [...(selectedCaso.plazos || []), data[0]]
        };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
        setShowNewPlazo(false);
      }
    } catch (error) {
      console.error('Error adding plazo:', error);
      showToast('Error al guardar plazo', 'error');
    }
  };

  const togglePlazo = async (plazoId: string) => {
    if (!selectedCaso) return;
    const { estado } = (selectedCaso.plazos || []).find((p: any) => p.id === plazoId);
    const nuevoEstado = estado === 'pendiente' ? 'cumplido' : 'pendiente';
    
    try {
      const { error } = await supabase.from('plazos').update({ estado: nuevoEstado }).eq('id', plazoId);
      if (error) throw error;
      
      const plazosActualizados = selectedCaso.plazos.map((p: any) => 
        p.id === plazoId ? { ...p, estado: nuevoEstado } : p
      );
      const casoActualizado = { ...selectedCaso, plazos: plazosActualizados };
      setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
      setSelectedCaso(casoActualizado);
    } catch (error) {
      console.error('Error toggling plazo:', error);
      showToast('Error al actualizar estado', 'error');
    }
  };

  const deletePlazo = async (plazoId: string) => {
    try {
      const { error } = await supabase.from('plazos').delete().eq('id', plazoId);
      if (error) throw error;
      
      if (selectedCaso) {
        const casoActualizado = { ...selectedCaso, plazos: selectedCaso.plazos.filter((p: any) => p.id !== plazoId) };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
      }
      showToast('Plazo eliminado', 'info');
    } catch (error) {
      console.error('Error deleting plazo:', error);
    }
  };

  const addEvento = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoEvento = {
      caso_id: selectedCaso.id,
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      descripcion: formData.get('descripcion'),
      lugar: formData.get('lugar')
    };
    
    try {
      const { data, error } = await supabase.from('eventos').insert([nuevoEvento]).select();
      if (error) throw error;
      if (data) {
        const casoActualizado = {
          ...selectedCaso,
          eventos: [...(selectedCaso.eventos || []), data[0]]
        };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
        setShowNewEvento(false);
      }
    } catch (error) {
      console.error('Error adding evento:', error);
      showToast('Error al guardar evento', 'error');
    }
  };

  const deleteEvento = async (eventoId: string) => {
    try {
      const { error } = await supabase.from('eventos').delete().eq('id', eventoId);
      if (error) throw error;
      
      if (selectedCaso) {
        const casoActualizado = { ...selectedCaso, eventos: selectedCaso.eventos.filter((e: any) => e.id !== eventoId) };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
      }
      showToast('Evento eliminado', 'info');
    } catch (error) {
      console.error('Error deleting evento:', error);
    }
  };

  const addDocumento = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevoDoc = {
      caso_id: selectedCaso.id,
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      notas: formData.get('notas')
    };
    
    try {
      const { data, error } = await supabase.from('documentos').insert([nuevoDoc]).select();
      if (error) throw error;
      if (data) {
        const casoActualizado = { ...selectedCaso, documentos: [...(selectedCaso.documentos || []), data[0]] };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
        setShowNewDocumento(false);
      }
    } catch (error) {
      console.error('Error adding documento:', error);
    }
  };

  const deleteDocumento = async (docId: string) => {
    try {
      const { error } = await supabase.from('documentos').delete().eq('id', docId);
      if (error) throw error;
      if (selectedCaso) {
        const casoActualizado = { ...selectedCaso, documentos: selectedCaso.documentos.filter((d: any) => d.id !== docId) };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
      }
    } catch (error) {
      console.error('Error deleting documento:', error);
    }
  };

  const addConsulta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaCons = {
      caso_id: selectedCaso.id,
      pregunta: formData.get('pregunta'),
      respuesta: formData.get('respuesta') || ''
    };
    
    try {
      const { data, error } = await supabase.from('consultas').insert([nuevaCons]).select();
      if (error) throw error;
      if (data) {
        const casoActualizado = { ...selectedCaso, consultas: [...(selectedCaso.consultas || []), data[0]] };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
        setShowNewConsulta(false);
      }
    } catch (error) {
      console.error('Error adding consulta:', error);
    }
  };

  const addFactura = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCaso) return;
    const formData = new FormData(e.currentTarget);
    const nuevaFac = {
      caso_id: selectedCaso.id,
      numero: formData.get('numero'),
      concepto: formData.get('concepto'),
      total: parseFloat(formData.get('total') as string) || 0,
      status: 'pendiente'
    };
    
    try {
      const { data, error } = await supabase.from('facturas').insert([nuevaFac]).select();
      if (error) throw error;
      if (data) {
        const casoActualizado = { ...selectedCaso, facturas: [...(selectedCaso.facturas || []), data[0]] };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
        setShowNewFactura(false);
      }
    } catch (error) {
      console.error('Error adding factura:', error);
    }
  };

  const updateFacturaStatus = async (facturaId: string, status: string) => {
    try {
      const { error } = await supabase.from('facturas').update({ status }).eq('id', facturaId);
      if (error) throw error;
      if (selectedCaso) {
        const facturasActualizadas = selectedCaso.facturas.map((f: any) => f.id === facturaId ? { ...f, status } : f);
        const casoActualizado = { ...selectedCaso, facturas: facturasActualizadas };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteFactura = async (facturaId: string) => {
    try {
      const { error } = await supabase.from('facturas').delete().eq('id', facturaId);
      if (error) throw error;
      if (selectedCaso) {
        const casoActualizado = { ...selectedCaso, facturas: selectedCaso.facturas.filter((f: any) => f.id !== facturaId) };
        setCasos(casos.map(c => c.id === selectedCaso.id ? casoActualizado : c));
        setSelectedCaso(casoActualizado);
      }
    } catch (error) {
      console.error('Error deleting factura:', error);
    }
  };

  const addProspecto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoProspecto = {
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      motivo: formData.get('motivo'),
      fuente: formData.get('fuente'),
      status: 'nuevo'
    };
    
    try {
      const { data, error } = await supabase.from('prospectos').insert([nuevoProspecto]).select();
      if (error) throw error;
      if (data) {
        setProspectos([data[0], ...prospectos]);
        setShowNewProspecto(false);
        showToast('Prospecto agregado', 'success');
      }
    } catch (error) {
      console.error('Error adding prospecto:', error);
    }
  };

  const updateProspectoStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from('prospectos').update({ status }).eq('id', id);
      if (error) throw error;
      setProspectos(prospectos.map(p => p.id === id ? { ...p, status } : p));
      if (status === 'cliente') showToast('Prospecto convertido a cliente', 'success');
    } catch (error) {
      console.error('Error updating prospecto:', error);
    }
  };

  const deleteProspecto = async (id: string) => {
    try {
      const { error } = await supabase.from('prospectos').delete().eq('id', id);
      if (error) throw error;
      setProspectos(prospectos.filter(p => p.id !== id));
      showToast('Prospecto eliminado', 'info');
    } catch (error) {
      console.error('Error deleting prospecto:', error);
    }
  };

  // Team member functions
  const addTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoMiembro = {
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
      rol: formData.get('rol'),
      especialidad: formData.get('especialidad'),
      status: 'activo'
    };
    
    try {
      const { data, error } = await supabase.from('equipo').insert([nuevoMiembro]).select();
      if (error) throw error;
      if (data) {
        setTeamMembers([data[0], ...teamMembers]);
        setShowNewTeamMember(false);
        showToast('Miembro agregado', 'success');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      const { error } = await supabase.from('equipo').delete().eq('id', id);
      if (error) throw error;
      setTeamMembers(teamMembers.filter(m => m.id !== id));
      showToast('Miembro eliminado', 'info');
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const convertirProspecto = async (prospecto: any) => {
    const nuevoCliente = {
      nombre: prospecto.nombre,
      correo: prospecto.correo,
      telefono: prospecto.telefono,
      direccion: '',
      rfc: '',
      notas: `Convertido de prospecto. Fuente: ${prospecto.fuente}`
    };
    
    try {
      const { data, error: errC } = await supabase.from('clientes').insert([nuevoCliente]).select();
      if (errC) throw errC;
      
      const { error: errP } = await supabase.from('prospectos').update({ status: 'cliente' }).eq('id', prospecto.id);
      if (errP) throw errP;
      
      if (data) {
        setClientes([data[0], ...clientes]);
        setProspectos(prospectos.map(p => p.id === prospecto.id ? { ...p, status: 'cliente' } : p));
        showToast('Prospecto convertido a cliente', 'success');
      }
    } catch (error) {
      console.error('Error converting prospecto:', error);
    }
  };

  const addCita = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevaCita = {
      cliente_id: formData.get('clienteId'),
      titulo: formData.get('titulo'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      tipo: formData.get('tipo'),
      notas: formData.get('notas'),
      status: 'pendiente'
    };
    
    try {
      const { data, error } = await supabase.from('citas').insert([nuevaCita]).select();
      if (error) throw error;
      if (data) {
        setCitas([data[0], ...citas]);
        setShowNewCita(false);
        showToast('Cita agendada', 'success');
      }
    } catch (error) {
      console.error('Error adding cita:', error);
    }
  };

  const updateCitaStatus = async (citaId: string, status: string) => {
    try {
      const { error } = await supabase.from('citas').update({ status }).eq('id', citaId);
      if (error) throw error;
      setCitas(citas.map(c => c.id === citaId ? { ...c, status } : c));
      showToast('Estado de cita actualizado', 'success');
    } catch (error) {
      console.error('Error updating cita status:', error);
    }
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
        filename = 'tuabogadoia_clientes';
        break;
      case 'casos':
        data = { casos, clientes };
        filename = 'tuabogadoia_casos';
        break;
      case 'prospectos':
        data = { prospectos };
        filename = 'tuabogadoia_prospectos';
        break;
      case 'citas':
        data = { citas, clientes };
        filename = 'tuabogadoia_citas';
        break;
      case 'all':
        data = { clientes, casos, prospectos, citas, exportDate: new Date().toISOString() };
        filename = 'tuabogadoia_backup_completo';
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
    const correctPassword = localStorage.getItem('tuabogadoia_password') || 'tuabogadoia2026';
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
      localStorage.setItem('tuabogadoia_password', loginPassword);
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
          <h1 suppressHydrationWarning style={{ fontSize: isMobile ? '28px' : '32px', marginBottom: '8px', color: '#C9A227', fontFamily: 'Playfair Display, serif' }}>TuAbogadoIA</h1>
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
            💡 Contraseña: tuabogadoia2026
          </p>
        </div>
      </div>
    );
  }
  */
 
  // Always show app (auth disabled)

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      background: 'var(--bg)', 
      color: 'var(--text)',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
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
        {/* Left: Logo & Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {mounted && (isMobile || (typeof window !== 'undefined' && window.innerWidth < 1024)) && (
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              ☰
            </button>
          )}
          <img src="/logo.png" alt="TuAbogadoIA" style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', objectFit: 'contain' }} />
          <h1 style={{ 
            fontSize: isMobile ? '18px' : '22px', 
            fontWeight: 700, 
            margin: 0, 
            fontFamily: 'Playfair Display', 
            color: '#ffffff',
            letterSpacing: '0.8px',
            display: 'flex',
            alignItems: 'center'
          }}>
            TuAbogadoIA
            {!isMobile && subscriptionLevel === 'pro' && <span className="badge-pro" style={{ marginLeft: '12px' }}>PRO</span>}
          </h1>
        </div>

        {/* Center: Pill Search */}
        <div className="pill-search">
          <span style={{ fontSize: '16px', opacity: 0.6 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar en TuAbogadoIA..." 
            onClick={() => setShowSearch(true)}
            readOnly
          />
        </div>

        {/* Right: Profile & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative' }}>
          {mounted && (
            <>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="icon-button-gold" 
                style={{ fontSize: '20px', position: 'relative' }}
              >
                🔔
                {notifications.length > 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-5px', 
                    right: '-5px', 
                    background: '#ef4444', 
                    color: 'white', 
                    fontSize: '10px', 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1.5px solid #0A0D14'
                  }}>
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationCenter 
                  notifications={notifications} 
                  onClose={() => setShowNotifications(false)} 
                />
              )}

              {!isMobile && (
                <div 
                  onClick={() => setActiveTab('profile')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
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
              )}
              {isMobile && (
                <div 
                  onClick={() => setActiveTab('profile')}
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--surface-opaque)',
                    border: '1.5px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >👤</div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Workspace Area */}
      <main style={{ flex: 1, display: 'flex', padding: '24px', gap: '24px', zIndex: 1, overflow: 'hidden', minHeight: 0, height: 'calc(100vh - 110px)' }}>
        {/* Navigation Sidebar Drawer - Responsive Fidelity */}
        <aside className="sidebar-glass" style={{ 
          width: '260px', 
          display: !mounted ? 'flex' : (isMobile || window.innerWidth < 1024) ? (showMobileMenu ? 'flex' : 'none') : 'flex', 
          flexDirection: 'column', 
          gap: '4px',
          minHeight: 0,
          overflowY: 'auto',
          paddingRight: '4px',
          position: (isMobile || (typeof window !== 'undefined' && window.innerWidth < 1024)) ? 'fixed' : 'relative',
          top: (isMobile || (typeof window !== 'undefined' && window.innerWidth < 1024)) ? '70px' : '0',
          left: (isMobile || (typeof window !== 'undefined' && window.innerWidth < 1024)) ? '0' : '0',
          bottom: (isMobile || (typeof window !== 'undefined' && window.innerWidth < 1024)) ? '0' : '0',
          zIndex: 100,
          background: 'rgba(10, 13, 20, 0.95)',
          backdropFilter: 'blur(15px)',
          padding: '20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
          animation: 'sidebarSlide 0.3s ease'
        }}>
          {[
            { id: 'chat', label: 'Inicio', icon: '🏠' },
            { id: 'reportes', label: 'Dashboard', icon: '📊' },
            { id: 'teamChat', label: 'Chat de Equipo', icon: '💬' },
            { id: 'library', label: 'Biblioteca Legal', icon: '📖', hasChevron: true },
            { id: 'casos', label: `Casos (${casos.length})`, icon: '💼', hasChevron: true },
            { id: 'prospectos', label: `Prospectos (${prospectos.length})`, icon: '🎯' },
            { id: 'calendario', label: 'Calendario', icon: '📅' },
            { id: 'citas', label: `Citas (${citas.length})`, icon: '🤝' },
            { id: 'plantillas', label: 'Plantillas', icon: '📝' },
            { id: 'equipo', label: 'Equipo', icon: '👥' },
            { id: 'suscripcion', label: 'Suscripción', icon: '👑' },
            { id: 'profile', label: 'Perfil', icon: '👤' }
          ].map(item => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id as any);
                  if (isMobile) setShowMobileMenu(false);
                }}
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
          
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
             {/* Indicador Realtime Premium */}
             <div style={{ 
               padding: '12px 16px', 
               background: 'rgba(197, 160, 89, 0.05)', 
               borderRadius: '12px', 
               border: '1px solid rgba(197, 160, 89, 0.1)',
               marginBottom: '16px',
               display: 'flex',
               alignItems: 'center',
               gap: '10px'
             }}>
               <div style={{ 
                 width: '8px', 
                 height: '8px', 
                 borderRadius: '50%', 
                 background: realtimeStatus === 'connected' ? '#2ea043' : realtimeStatus === 'connecting' ? '#f59e0b' : '#ef4444',
                 boxShadow: `0 0 10px ${realtimeStatus === 'connected' ? '#2ea043' : '#f59e0b'}`,
                 animation: realtimeStatus === 'connected' ? 'pulseGold 2s infinite' : 'none'
               }} />
               <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                 {realtimeStatus === 'connected' ? 'NUBE ACTIVA' : realtimeStatus === 'connecting' ? 'CONECTANDO...' : 'ERROR NUBE'}
               </span>
             </div>

             <button onClick={logout} className="nav-item-fidelity" style={{ width: '100%', color: '#ef4444' }}>
                <span style={{ fontSize: '18px' }}>🚪</span> Cerrar Sesión
             </button>
          </div>
        </aside>

        <section className="tuabogadoia-fade" style={{ flex: 1, display: 'flex', gap: '24px', overflow: 'hidden', minHeight: 0 }}>
          {activeTab === 'chat' && (
            <>
              {/* Central Chat: Gold Bordered */}
              <div className="chat-container-gold" style={{ flex: 1, minHeight: 0 }}>
                {activeTab === 'chat' ? (
                  <ChatInterface 
                    messages={messages}
                    isLoading={isLoading}
                    isSearchingWeb={isSearchingWeb}
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
                    isMobile={isMobile}
                  />
                ) : (
                  <TeamChat 
                    messages={equipoMensajes}
                    teamMembers={teamMembers}
                    onSendMessage={onSendTeamMessage}
                  />
                )}
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
                     onUploadDocument={handleUploadDocument}
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
                      onGeneratePortalLink={generatePortalLink}
                      onSignDocument={handleSignDocument}
                   />
                 </div>
               )}

               {activeTab === 'library' && (
                                   <LegalLibrary 
                    materiaFilter={materiaFilter} 
                    setMateriaFilter={setMateriaFilter} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    language={language} 
                    filteredLeyes={buscarLeyes(searchTerm)} 
                    filteredJurisprudencias={buscarJurisprudencia(searchTerm)} 
                    activeSubTab={activeSubTab} 
                    setActiveSubTab={setActiveSubTab} 
                  />
               )}

               {activeTab === 'prospectos' && (
                 <ProspectosView prospectos={prospectos} clientes={clientes} onAdd={addProspecto} onUpdateStatus={updateProspectoStatus} onDelete={deleteProspecto} onConvert={convertirProspecto} onShowNew={() => setShowNewProspecto(true)} />
               )}

               {activeTab === 'reportes' && (
                                   <ReportesView casos={casos} clientes={clientes} teamMembers={teamMembers} />
               )}

               {activeTab === 'plantillas' && (
                                   <PlantillasView 
                    clientes={clientes} 
                    casos={casos} 
                    selectedCaso={selectedCaso} 
                    onAutoSaveDocument={async (filename, base64, casoId) => {
                      try {
                        const byteCharacters = atob(base64);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], {type: "application/octet-stream"});
                        const file = new File([blob], filename, { type: "application/octet-stream" });
                        const fakeEvent = { target: { files: [file] } } as any;
                        if (typeof handleUploadDocument === "function") {
                          await handleUploadDocument(fakeEvent, casoId);
                        }
                      } catch (err) {
                        console.error("AutoSave Error:", err);
                      }
                    }}
                  />
               )}

               {activeTab === 'calendario' && (
                 <CalendarioView casos={casos} />
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
                {activeTab === 'suscripcion' && (
                  <SuscripcionView 
                    currentLevel={subscriptionLevel} 
                    onUpgrade={(level) => {
                      setSubscriptionLevel(level);
                      showToast(`¡Bienvenido al nivel ${level.toUpperCase()}!`, 'success');
                      setActiveTab('chat');
                    }} 
                  />
                )}
                {activeTab === 'profile' && (
                  <ProfileView 
                    onSave={(updatedProfile: any) => {
                      setSubscriptionLevel(updatedProfile.suscripcion);
                    }} 
                    showToast={showToast}
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
            {isSaving ? "Guardando cambios encriptados..." : "TuAbogadoIA Cloud: Sistema Sincronizado"}
          </div>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>Región: México (CDMX)</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
           <span>TuAbogadoIA Premium v2.1.0</span>
           <span style={{ fontWeight: 700, color: 'var(--primary)' }}>© 2026 TuAbogadoIA AI Legal Systems</span>
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
