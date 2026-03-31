const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\cp_an\\OneDrive\\Escritorio\\PROYECTOS IA\\LEXMEX IA\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The specific corruption found via grep
const corrupted = 'setActiveSubTab={setActiveSubTab}risprudencia(searchTerm)}';
const fixed = 'setActiveSubTab={setActiveSubTab}';

if (content.indexOf(corrupted) !== -1) {
    content = content.replace(corrupted, fixed);
    fs.writeFileSync(filePath, content);
    console.log('Corruption fixed successfully.');
} else {
    console.log('Corruption not found exactly. Searching for variations...');
    // Try without curly braces or other variations
    const genericSearch = /setActiveSubTab=\{setActiveSubTab\}risprudencia\(searchTerm\)\}/g;
    if (genericSearch.test(content)) {
        content = content.replace(genericSearch, fixed);
        fs.writeFileSync(filePath, content);
        console.log('Corruption fixed via regex.');
    } else {
        console.log('Corruption NOT found.');
    }
}
