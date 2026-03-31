const fs = require('fs');
const filePath = 'c:\\Users\\cp_an\\OneDrive\\Escritorio\\PROYECTOS IA\\LEXMEX IA\\app\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the block I added at the top
const duplicatedBlock = `  // Estados para Biblioteca Legal
  const [activeSubTab, setActiveSubTab] = useState<'leyes' | 'jurisprudencia' | 'doctrina'>('leyes');
  const [materiaFilter, setMateriaFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  `;

if (content.indexOf(duplicatedBlock) !== -1) {
    content = content.replace(duplicatedBlock, '');
}

// 2. Locate the other states at line ~450 and add activeSubTab if missing
if (content.indexOf('const [activeSubTab, setActiveSubTab]') === -1) {
    const searchTermLine = "const [searchTerm, setSearchTerm] = useState('');";
    if (content.indexOf(searchTermLine) !== -1) {
        content = content.replace(searchTermLine, searchTermLine + "\n  const [activeSubTab, setActiveSubTab] = useState<'leyes' | 'jurisprudencia' | 'doctrina'>('leyes');");
    }
}

// 3. Fix the ChangeEvent lint error in render block if possible
// (Optional, but good for build)
content = content.replace(
    'const fakeEvent = { target: { files: [file] } };',
    'const fakeEvent = { target: { files: [file] } } as any;'
);

fs.writeFileSync(filePath, content);
console.log('page.tsx cleaned and optimized.');
