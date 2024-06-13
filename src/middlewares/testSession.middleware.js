export const testSessionMiddleware = async (req, res, next) => {
    if (!req.session) req.session = {}

    // Simula el usuario en la sesión
    req.session.user = {
        username: process.env.APP_ADMIN_EMAIL,
        role: 'ADMIN'
    };
    
    await req.session.save()
    next();
};