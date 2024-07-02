import { chatService } from "../service/index.service.js"

const getChat = async (req, res, next) => {

    try {
        const messagesMongo = await chatService.get()
        const messages= messagesMongo.map(message => message.toObject())

        if (!messages) return next()

        res.render('chat', {
            pageName: 'Chat',
            layout: 'main',
            messages,
            userDTO: req.session.user,
            notAdmin: true,
            adminPProducts: req.session.user.role === 'PREMIUM' ? true : false
        })

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