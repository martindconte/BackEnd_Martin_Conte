import CustomError from "../service/errors/CustomError.js"
import ErrorType from "../service/errors/ErrorType.js"
import { getUserEmailIsNotValid, getUserErrorInfo } from "../service/errors/info.js"
import { cartService, userService } from "../service/index.service.js"

export const createUser = async (req, res, next) => {
    const msg = []
    try {
        const { first_name, last_name, email, age, password } = req.body

        if (!first_name || !last_name || !email || age < 17 || !password) {
            msg.push('Edad minima 18 años')
            throw new CustomError({
                name: 'User Creation Error. All data is Required!',
                cause: getUserErrorInfo({ first_name, last_name, email, age, password }),
                message: 'Error creating User. Check Info...',
                code: ErrorType.INCOMPLETE_DATA
            })
        }

        const cart = await cartService.create()
        const userData = {
            first_name,
            last_name,
            email,
            age,
            password,
            cart: cart._id
        }
        await userService.create(userData)
        res.redirect('/login')
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            msg.push('Email ya registrado')
            const customError = new CustomError({
                name: 'The email is already registered!',
                cause: getUserEmailIsNotValid(req.body.email),
                message: 'Error creating User. Check EMAIL...',
                code: ErrorType.INVALID_DATA
            })
            res.redirect(`/register?errorMessages=${JSON.stringify(msg)}`)
            next(customError)
        } else {
            console.log(error)
            msg.push('Revisa la informacion ingresada. Recuerda... TODOS los campos son obligatorios')
            res.redirect(`/register?errorMessages=${JSON.stringify(msg)}`)
        }
    }
}

export const changeRole = async (req, res) => {
    console.log('Modificando el role.....');
    console.log('desde changleRole req.session --------------------->', req.session);
    const { user } = req.session

    try {
        const userData = await userService.getById({ _id: user.id })

        console.log('desde changleRole userData --------------------->', userData);

        userData.role == 'user'
            ? userData.role = 'PREMIUM'
            : userData.role = 'user'

        await userService.updateById(user.id, userData)

        req.session.user.role = userData.role
        await req.session.save()
        res.redirect('/current')
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The email query could not be performed to get users' });
    }
}

export const uploadDocuments = async (req, res) => {

    const { uid } = req.params
    // console.log(req.session);
    try {
        const user = await userService.getById({ id: uid })
        let documents = user.documents || []

        console.log('user ------------>', user);

        console.log('req.files ---------->', req.files);
        
        const newDocuments = documents.concat(req.files.map(file => ({
            name: file.originalname,
            reference: file.path.split('public')[1].replace(/\\/g, '/')
        })));

        console.log('documents ------------->', documents);

        const updateUser = await userService.updateById(user._id, { documents: newDocuments }, { new: true });

        console.log(updateUser);

        res.send({ status: 'success', payload: updateUser })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
}

export const profileImg = async ( req, res ) => {

    console.log('el body --------------------->', req.body);

    const { uid } = req.params
    // console.log(req.session);
    try {
        const user = await userService.getById({ id: uid })
        // let documents = user.documents || []

        // console.log('user ------------>', user);

        console.log('req.file ---------->', req.file);

        const updateUser = await userService.updateById(user._id, { profile_image: req.file.path.split('public')[1].replace(/\\/g, '/') }, { new: true });
    
        res.redirect('/current')
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
}