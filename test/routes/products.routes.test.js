import { expect } from 'chai';
import mocha from 'mocha';
import supertest from 'supertest';
import { adminUser } from '../../src/config/config.js'
import { generateId } from '../../src/helpers/functions.js';

const request = supertest('http://localhost:8080');  // Asegúrate de incluir http://

describe('/api/products test', function() {

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

        this.productMock = {
            "title": "NO SE DEBERIA CARGAR",
            "description": "NO SE DEBERIA CARGAR",
            "code": 'code repeat',
            "price": 1199.99,
            "status": true,
            "stock": 25,
            "category": "NO SE DEBERIA CARGAR",
            "thumbnails": [
              "https://example.com/fender-stratocaster-1.jpg",
              "https://example.com/fender-stratocaster-2.jpg"
            ],
        }

        this.getCookie = async function ( userMock ) {
            const loginResponse = await request.post('/api/sessions/login')
                .send(userMock)
            return loginResponse.headers['set-cookie'][0].split('=')[1].split(';')[0]
        }
    },

    beforeEach( async function() {
        this.newProductMock = {
            "title": "nuevo producto creado en test",
            "description": "nuevo producto creado en test",
            "code": generateId(),
            "price": 1199.99,
            "status": true,
            "stock": 25,
            "category": "nuevo producto creado en test",
            "thumbnails": [
              "https://example.com/fender-stratocaster-1.jpg",
              "https://example.com/fender-stratocaster-2.jpg"
            ],
        };
    })

);

    it('GET: solo ADMIN puede consultar los endpoints y obtener resultados de paginacion y productos /api', async function() {
        const cookieValue = await this.getCookie( this.mockUserAdmin )
        const {_body, statusCode} = await request.get('/api/products')
            .set('Cookie', `connect.sid=${cookieValue}`)
        expect(statusCode).to.be.equal(200)
        expect(_body.payload).to.be.a('Array')
    });

    it('POST: Solo un usuario PREMIUM o ADMIN puede crear un PRODUCTO. Se intenta crear un producto con ROL PREMIUM y USER', async function() {
        const cookiePremium = await this.getCookie( this.mockUserPremium )

        const responsePremium = await request.post('/api/products')
            .set('Cookie', `connect.sid=${cookiePremium}`)
            .send(this.newProductMock)
        expect(responsePremium._body).to.have.property('_id')
        expect(responsePremium.statusCode).to.be.equal(200)
    })

    it('POST: Al crear un objeto la propiedad code debe ser unica. El Code premium ya existe y NO debe crear el producto', async function() {
        const cookieValue = await this.getCookie( this.mockUserPremium )
        const {_body, statusCode} = await request.post('/api/products')
            .set('Cookie', `connect.sid=${cookieValue}`)
            .send(this.productMock)
        expect(statusCode).to.be.equal(404)
    })

    it('DELETE: Solo un usuario PREMIUM o ADMIN pueden eliminar un producto. Se crea un producto y luego se intenta eliminnar', async function() {

        const cookiePremium = await this.getCookie( this.mockUserPremium )
        const cookieAdmin = await this.getCookie( this.mockUserAdmin )

        const newProductByPremium = await request.post('/api/products')
            .set('Cookie', `connect.sid=${cookiePremium}`)
            .send(this.newProductMock)
        expect(newProductByPremium.statusCode).to.be.equal(200)

        const idToDelete = newProductByPremium._body._id

        const responseDeleteAdmin = await request.delete(`/api/products/${idToDelete}`)
            .set('Cookie', `connect.sid=${cookieAdmin}`)
        expect(responseDeleteAdmin.statusCode).to.be.equal(200)
    })
});