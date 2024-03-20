import express from "express"
import { createUser, singIn, logOut } from "../controllers/session.controller.js"
import passport from "passport"

const router = express.Router()

//passport
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.username = req.user.email
    await req.session.save()
    res.redirect('/')
})

router.route('/login')
    .post(singIn)

router.route('/register')
    .post(createUser)

router.route('/logout')
    .post(logOut)

export default router
