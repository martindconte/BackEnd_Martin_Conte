import { expect } from 'chai';
import mocha from 'mocha';
import supertest from 'supertest';
import { adminUser } from '../../src/config/config.js'
import { generateId } from '../../src/helpers/functions.js';

const request = supertest('http://localhost:8080');  // Asegúrate de incluir http://

describe('/api/carts test', function() {

    before( async function() {

        this.mockUserAdmin = {
            email: adminUser.username,
            password: adminUser.password,
        }

        this.mockUser = {
            email: 'UserTest@UserTest.com',
            password: '123456',
        }

        this.mockUserPremium = {
            email: 'martin.conte@telefonica.com',
            password: '123456',
        }

        this.cartID = '66344d006feded0d65092031'

        this.productMock = {
            _id: '65d188d284e84a5ebc791baf',
            title: "Camiseta",
            description: "Una camiseta de algodón de alta calidad",
            code: "sasddwesdewewdew",
            price: 29.99,
            status: true,
            stock: 100,
            category: "Ropa",
            thumbnails: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            owner: "ADMIN",
        }

        this.getCookie = async function ( userMock ) {
            const loginResponse = await request.post('/api/sessions/login')
                .send(userMock)
            return loginResponse.headers['set-cookie'][0].split('=')[1].split(';')[0]
        }
    });

    it('GET: solo ADMIN puede consultar los endpoints /api y obtener resultados de los carts', async function() {
        const cookieValue = await this.getCookie( this.mockUserAdmin )
        const {_body, statusCode} = await request.get('/api/carts')
            .set('Cookie', `connect.sid=${cookieValue}`)
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.a('Array')
    });

    it('GET :/cid: Un usuario solo puedo consultar su carrito', async function() {
        const cookieValue = await this.getCookie( this.mockUser )
        const {_body, statusCode} = await request.get(`/cart/${this.cartID}`)
            .set('Cookie', `connect.sid=${cookieValue}`)
        expect(statusCode).to.be.equal(302)
    });

    it('PUT /:cid/product/:pid No se podra modificar la cantidad de productos en un carrito si la cantidad es menor a 1', async function() {
        const cookieValue = await this.getCookie( this.mockUser )
        const quantity = 0
        const { _body, statusCode } = await request.put(`/api/carts/${this.cartID}/product/${this.productMock._id}`)
            .set('Cookie', `connect.sid=${cookieValue}`)
            .send({quantity})
        expect(_body).to.have.property('error')
        expect(statusCode).to.be.equal(404)
    })
});