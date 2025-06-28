#!/usr/bin/env node
import { promises as fs } from 'fs';
import { glob } from 'glob';

/**
 * Fix all remaining Lucide React barrel imports
 */

const iconMapping = {
  'Check': 'check',
  'ChevronDown': 'chevron-down',
  'ChevronLeft': 'chevron-left', 
  'ChevronRight': 'chevron-right',
  'ChevronUp': 'chevron-up',
  'Circle': 'circle',
  'Dot': 'dot',
  'GripVertical': 'grip-vertical',
  'MoreHorizontal': 'more-horizontal',
  'PanelLeft': 'panel-left',
  'Search': 'search',
  'X': 'x',
  'ArrowLeft': 'arrow-left',
  'ArrowRight': 'arrow-right'
};

async function fixImports() {
  console.log('Fixing all Lucide React barrel imports...');
  
  try {
    // Find all TypeScript/JavaScript files in client/src
    const files = await glob('client/src/**/*.{ts,tsx,js,jsx}');
    
    let totalFixed = 0;
    
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      
      // Check if file has barrel import from lucide-react
      if (content.includes('from "lucide-react"')) {
        console.log(`Fixing: ${file}`);
        
        // Extract the import statement
        const importMatch = content.match(/import\s*{\s*([^}]+)\s*}\s*from\s*"lucide-react"/);
        
        if (importMatch) {
          const icons = importMatch[1]
            .split(',')
            .map(icon => icon.trim())
            .filter(icon => icon.length > 0);
          
          // Create individual imports
          const newImports = icons.map(icon => {
            const kebabCase = iconMapping[icon] || icon.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
            return `import ${icon} from "lucide-react/dist/esm/icons/${kebabCase}";`;
          }).join('\n');
          
          // Replace the barrel import
          const newContent = content.replace(
            /import\s*{\s*[^}]+\s*}\s*from\s*"lucide-react"/,
            newImports
          );
          
          await fs.writeFile(file, newContent);
          totalFixed++;
        }
      }
    }
    
    console.log(`✅ Fixed ${totalFixed} files with barrel imports`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

fixImports().then(success => {
  process.exit(success ? 0 : 1);
});