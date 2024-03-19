import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'fist name is required',
        trim: true,
    },
    last_name: {
        type: String,
        required: 'last name is required',
        trim: true,
    },
    email: {
        type: String,
        required: 'email is required',
        trim: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        required: 'The age is required',
        trim: true,
        min: 18
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next()
    
    console.log(this.password)
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this.password)

    next()
})

userSchema.methods.checkPassword = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

// userSchema.pre('save', function( next ) {
//     if(!this.isModified( 'password' )) next()
//     console.log('Ejecuntando brcypt...')
    
// console.log(this.password)
//     const salt = bcrypt.genSaltSync( 10 )
//     this.password = bcrypt.hashSync( this.password, salt )
//     console.log('password hasheada...', this.password)
//     next()
// })

// userSchema.methods.checkPassword = async function(passwordForm) {
//     console.log('desde checkpassword', passwordForm)
//     console.log('this.password desde check...', this.password)
//     try {
//         const checkPassword = await bcrypt.compare(passwordForm, this.password);
//         console.log('desde check... comprobando..', checkPassword)
//         return checkPassword
//     } catch (error) {
//         console.error('Error al comparar contraseñas:', error);
//         throw error;
//     }
// };
// userSchema.methods.checkPassword = async function(passwordForm) {
//     try {
//         console.log(await bcrypt.compare(passwordForm, this.password))
//         return await bcrypt.compare( passwordForm , this.password )
//     } catch (error) {
//         console.log(error)
//     }
// }
// userSchema.pre('save', async function( next ) {
//     console.log('Es modificado...?', !this.isModified( 'password' ))
//     if(!this.isModified( 'password' )) next()
//     console.log('Ejecuntando brcypt...')
    
//     const salt = await bcrypt.genSalt( 10 )
//     console.log(salt)
//     this.password = await bcrypt.hash( this.password, salt )
// })

// userSchema.methods.checkPassword = async function(passwordForm) {
//     console.log(passwordForm)
//     try {
//         console.log(await bcrypt.compare(passwordForm, this.password))
//         return await bcrypt.compare( passwordForm , this.password )
//     } catch (error) {
//         console.log(error)
//     }
// }

const userModel = mongoose.model('users', userSchema)

export {
    userModel
}