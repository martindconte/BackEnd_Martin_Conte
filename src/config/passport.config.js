import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import userService from '../dao/users.models.js';
import { generateId } from '../helpers/functions.js';

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.e33ac980bb5956f7',
        clientSecret: 'e3d6ad4c5679c9d49e7b9a72c49dd4f383ec2b22',
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (_accessToken, _refreshToken, profile, done) => {
        try {
            const user = await userService.getOne({ email: profile._json.email })
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: 'NO_DATA',
                    email: profile._json.email,
                    age: 1000,
                    password: generateId()
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