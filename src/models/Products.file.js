import fs from 'fs'
import path from 'path';
import { generateId } from '../helpers/functions.js';

class ProductManager {

    constructor(folderPath) {
        this.products = [];
        this.folderPath = path.resolve(folderPath);
        this.filePath = path.join(folderPath, 'products.json');
    }

    addProduct = async ({ title, description, code, price, status = true, stock, category, thumbnails }) => {

        try {
            this._validateData(title, description, code, price, status = true, stock, category, thumbnails)
            await this._createFolderAndFile()
            const data = await this._readFile()
            if (data.some(product => product.code === code)) throw new Error(`El Code ${code} ya existe para el ${title} ${description}`)
            const newProduct = {
                id: generateId(),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails: thumbnails ? thumbnails : []
            };
            this.products = [...data, newProduct];
            await this._writeFile(this.products)
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

    getProducts = async (quantity) => {
        const productsAll = await this._readFile() || [];
        const limit = Number(quantity);
        const products = limit > 0 ? productsAll.slice(0, limit) : productsAll;
        return products
    }

    getProductsById = async (id) => {
        try {
            const data = await this._readFile();
            const product = data.find(prod => prod.id === id);
            return product
        } catch (error) {   
            console.log(error)
        }
    }

    updateProduct = async (id, updatedProduct) => {

        try {
            const data = await this._readFile();
            const productId = data.find(product => product.id === id);
            if (productId === undefined) throw new Error('Product is not found');
            if (productId.id !== updatedProduct.id) throw new Error('No se puede modificar el ID');
            this.products = data.map(prod => (prod.id === id ? updatedProduct : prod));
            await this._writeFile(this.products);
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

    deleteProduct = async (id) => {
        try {
            const data = await this._readFile();
            const productId = data.find(product => product.id === id);
            if (productId === undefined) throw new Error('Product is not found');
            this.products = data.filter(prod => prod.id !== id);
            await this._writeFile(this.products);
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

    _createFolderAndFile = async () => {
        try {
            await fs.promises.access(this.folderPath, fs.constants.F_OK,)
            await fs.promises.access(this.filePath, fs.constants.F_OK)
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('La carpeta o el archivo no existen. Creando...');
                await fs.promises.mkdir(this.folderPath, { recursive: true });
                await fs.promises.writeFile(this.filePath, JSON.stringify([]));
            }
        }
    };

    /**
     * 
     * @returns {Array[Object]}
     */
    _readFile = async () => {
        try {
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
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

    _writeFile = async (data) => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (error) {
            throw error;
        }
    }

    _validateData = ( title, description, code, price, status = true, stock, category, thumbnails ) => {
        const regex = /^-?\d*\.?\d+$/;
        if (!title || !description || !code || !stock || !category || !price) throw new Error('Las propiedades title, description, price, code, stock y category son obligatorias');
        if (typeof title !== 'string') throw new Error('title debe ser un string');
        if (typeof description !== 'string') throw new Error('description debe ser un string');
        if (typeof code !== 'string') throw new Error('code debe ser un string');
        if (!regex.test(price)) throw new Error('price debe ser un number');
        if (typeof status !== 'boolean') throw new Error('status debe ser un boolean');
        if (!regex.test(stock)) throw new Error('stock debe ser un number');
        if (typeof category !== 'string') throw new Error('category debe ser un string');
        if (thumbnails) {
            if (!Array.isArray(thumbnails) || !thumbnails.every(path => typeof path === 'string')) {
                throw new Error('thumbnails debe ser un Array con las rutas de las imagenes');
            }
        }
    } 
}

export {
    ProductManager
}