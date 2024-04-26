import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import { generateId } from '../helpers/functions.js';
import { cartService, userService } from '../service/index.service.js';

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        callbackURL: process.env.PASSPORT_CALLBACK_URL,
    }, async (_accessToken, _refreshToken, profile, done) => {
        try {
            const [ user ] = await userService.get({ email: profile._json.email })
            const cart = await cartService.create()
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: 'NO_DATA',
                    email: profile._json.email,
                    age: 1000,
                    password: generateId(),
                    cart: cart._id
                }
                const result = await userService.create(newUser)
                done(null, result)
            } else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
    ));
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    const user = await userService.getOne({ _id: userId })
    done(null, user)
});

export default initializePassport