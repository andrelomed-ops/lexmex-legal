const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\cp_an\\OneDrive\\Escritorio\\PROYECTOS IA\\LEXMEX IA\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Branding Replace
content = content.replace(/LexMex IA/g, 'TuAbogadoIA');
content = content.replace(/LexMex/g, 'TuAbogadoIA');

// 2. Add handlers to the page component
// We need to find the definition of the component and add these new functions
// Assuming we add them near other handlers like handleUploadDocument

const newHandlers = `
  const generatePortalLink = async (casoId: string) => {
    // Generar un token único (simulado)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return \`\${origin}/portal/\${token}\`;
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
`;

// Insert after a known handler
if (content.indexOf('const handleUploadDocument') !== -1) {
    const searchStr = '};';
    const index = content.indexOf('};', content.indexOf('const handleUploadDocument'));
    if (index !== -1) {
        content = content.slice(0, index + 2) + newHandlers + content.slice(index + 2);
    }
}

// 3. Update CaseDetail props in the render block
content = content.replace(
    'onShowCall={() => setShowCallModal(true)}',
    'onShowCall={() => setShowCallModal(true)}\n                      onGeneratePortalLink={generatePortalLink}\n                      onSignDocument={handleSignDocument}'
);

fs.writeFileSync(filePath, content);
console.log('page.tsx patched with rebranding and new handlers.');
