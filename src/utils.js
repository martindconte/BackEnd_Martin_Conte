import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtiene el directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname
