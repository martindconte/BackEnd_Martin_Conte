import express from "express"
import { ProductManager } from "../models/Products.js"

const productManager = new ProductManager(process.cwd() + '/src/public/data')

const router = express.Router()

router.get('/', async ( req, res ) => {
    try {
        const products = await productManager.getProducts( req.query.limit )
        res.render('realTimeProducts', {
                    pageName: 'Real Time',
                    products,
                    layout: 'main'
                })
    } catch (error) {
        console.log(error)
    }
})

// router.delete('/:pid', async ( req, res ) => {
//     try {
//         const productId = req.params.pid
//         await productManager.deleteProduct(productId)
//         res.send(await productManager.getProducts())
//     } catch (error) {
//         console.log(error)
//     }
// })

export default router