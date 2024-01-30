import fs from 'fs'

const generateId = () => {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
        result += alphanumericChars.charAt(randomIndex);
    }

    return result;
}

const readFile = async (pathFile) => {
    try {
        const fileContent = await fs.promises.readFile(pathFile, 'utf-8');
        const data = JSON.parse(fileContent);
        return data
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("No existe el archivo... O aun no fue creado");
            return null;
        } else {
            throw error;
        }
    }
}

export {
    generateId,
    readFile
}