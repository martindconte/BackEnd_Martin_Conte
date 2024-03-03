import express from "express"

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login', {
        layout: false
    })
})

router.get('/register', (req, res) => {
    res.render('registerNewUser', {
        layout: false
    })
})

export default router
