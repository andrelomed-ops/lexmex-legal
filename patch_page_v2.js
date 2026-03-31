const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\cp_an\\OneDrive\\Escritorio\\PROYECTOS IA\\LEXMEX IA\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original content length:', content.length);

// 1. Library Sync
const libraryOld = '                  <LegalLibrary materiaFilter={materiaFilter} setMateriaFilter={setMateriaFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} language={language} filteredLeyes={[]} filteredJurisprudencias={[]} activeSubTab="leyes" setActiveSubTab={() => {}} />';
const libraryNew = '                  <LegalLibrary \n                    materiaFilter={materiaFilter} \n                    setMateriaFilter={setMateriaFilter} \n                    searchTerm={searchTerm} \n                    setSearchTerm={setSearchTerm} \n                    language={language} \n                    filteredLeyes={buscarLeyes(searchTerm)} \n                    filteredJurisprudencias={buscarJurisprudencia(searchTerm)} \n                    activeSubTab={activeSubTab} \n                    setActiveSubTab={setActiveSubTab} \n                  />';

if (content.indexOf(libraryOld) === -1) {
    console.log('WARNING: libraryOld not found exactly. Trying partial match.');
    // Try to match without leading spaces
    const partialOld = '<LegalLibrary materiaFilter={materiaFilter} setMateriaFilter={setMateriaFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} language={language} filteredLeyes={[]} filteredJurisprudencias={[]} activeSubTab="leyes" setActiveSubTab={() => {}} />';
    if (content.indexOf(partialOld) !== -1) {
        content = content.replace(partialOld, libraryNew);
        console.log('Library patched via partial match.');
    } else {
        console.log('Library patch FAILED.');
    }
} else {
    content = content.replace(libraryOld, libraryNew);
    console.log('Library patched via exact match.');
}

// 2. Reportes Sync
const reportesOld = '                  <ReportesView casos={casos} clientes={clientes} />';
const reportesNew = '                  <ReportesView casos={casos} clientes={clientes} teamMembers={teamMembers} />';

if (content.indexOf(reportesOld) !== -1) {
    content = content.replace(reportesOld, reportesNew);
    console.log('Reportes patched.');
} else {
    const partialReportes = '<ReportesView casos={casos} clientes={clientes} />';
    if (content.indexOf(partialReportes) !== -1) {
        content = content.replace(partialReportes, reportesNew);
        console.log('Reportes patched via partial.');
    } else {
        console.log('Reportes patch FAILED.');
    }
}

// 3. Plantillas Sync
const plantillasOld = '                  <PlantillasView clientes={clientes} casos={casos} />';
const plantillasNew = '                  <PlantillasView \n                    clientes={clientes} \n                    casos={casos} \n                    selectedCaso={selectedCaso} \n                    onAutoSaveDocument={async (filename, base64, casoId) => {\n                      try {\n                        const byteCharacters = atob(base64);\n                        const byteNumbers = new Array(byteCharacters.length);\n                        for (let i = 0; i < byteCharacters.length; i++) {\n                          byteNumbers[i] = byteCharacters.charCodeAt(i);\n                        }\n                        const byteArray = new Uint8Array(byteNumbers);\n                        const blob = new Blob([byteArray], {type: "application/octet-stream"});\n                        const file = new File([blob], filename, { type: "application/octet-stream" });\n                        const fakeEvent = { target: { files: [file] } };\n                        if (typeof handleUploadDocument === "function") {\n                          await handleUploadDocument(fakeEvent, casoId);\n                        }\n                      } catch (err) {\n                        console.error("AutoSave Error:", err);\n                      }\n                    }}\n                  />';

if (content.indexOf(plantillasOld) !== -1) {
    content = content.replace(plantillasOld, plantillasNew);
    console.log('Plantillas patched.');
} else {
    const partialPlantillas = '<PlantillasView clientes={clientes} casos={casos} />';
    if (content.indexOf(partialPlantillas) !== -1) {
        content = content.replace(partialPlantillas, plantillasNew);
        console.log('Plantillas patched via partial.');
    } else {
        console.log('Plantillas patch FAILED.');
    }
}

fs.writeFileSync(filePath, content);
console.log('Done. New length:', content.length);
