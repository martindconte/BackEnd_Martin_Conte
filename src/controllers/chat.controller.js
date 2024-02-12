import { chatModel } from "../dao/models/chat.models.js"

const getChat = async (req, res, next) => {
    try {
        const messages = await chatModel.find()

        if (!messages) return next()

        const plainMessages = messages.map(msg => msg.toObject());

        res.render('chat', {
            pageName: 'Chat',
            layout: 'main',
            messages: plainMessages
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

        const newMessage = await chatModel.create(req.body);

        if (!newMessage) return next();

        const messages = await chatModel.find()

        io.emit("new message", messages);
        // console.log('despuess de emit...', messages)
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