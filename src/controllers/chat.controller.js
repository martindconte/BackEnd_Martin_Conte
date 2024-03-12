import chatService from "../dao/chat.models.js";

const getChat = async (req, res, next) => {

    console.log(req.session.username)

    try {
        const messages = await chatService.get().lean()

        if (!messages) return next()

        res.render('chat', {
            pageName: 'Chat',
            layout: 'main',
            messages,
            user: {email: req.session.username}
        })
        console.log('Imprimiendo...')
    } catch (error) {
        console.log(error.message)
        res.status(404).send({ error });
    }
}

const newMessage = async (req, res, next) => {

    try {

        const { io } = req

        if (!io) return res.status(400).send({ error: "La instancia 'io' no está disponible" });

        const newMessage = await chatService.create(req.body);

        if (!newMessage) return next();

        const messages = await chatService.get()

        io.emit("new message", messages);
        next()

        res.status(200).send({ message: "Mensaje creado correctamente" });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error });
    }
}

export {
    getChat,
    newMessage
}