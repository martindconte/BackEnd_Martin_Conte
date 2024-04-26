import express from "express"
import { singIn, logOut } from "../controllers/session.controller.js"
// import { createUser, singIn, logOut } from "../controllers/session.controller.js"
import passport from "passport"
import { createUser } from "../controllers/user.controller.js"
import { userService } from "../service/index.service.js"

const router = express.Router()

//passport
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    const user = await userService.getById(req.session.passport.user)
    console.log('user desde passport', user)
    const userLog = {
        username: req.user.email,
        role: 'user',
        cartId: user.cart
    }
    req.session.user = userLog
    await req.session.save()
    res.redirect('/current')
})

router.route('/login')
    .post(singIn)

router.route('/register')
    .post(createUser)

router.route('/logout')
    .post(logOut)

export default router
