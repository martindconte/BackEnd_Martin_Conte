import { crearModalConfirmacion, crearModalTicket } from "./functions.js"

document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('cart')
    const cartId = cart.dataset.cartid
    const cartAction = document.getElementById('cartAction')
    const itemsDelete = document.querySelectorAll('[data-itemdelete]');
    const totalAmount = document.getElementById('totalAmount')

    if (cartAction) {
        cartAction.addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.dataset.delete) {
                const url = `${location.origin}/api/carts/${e.target.dataset.delete}`
                // modal creation
                const divModal = document.createElement("div");
                divModal.id = `${e.target.dataset.delete}Modal`;
                cartAction.appendChild(divModal);
                crearModalConfirmacion(
                    "¿Esta seguro que desea ELIMINAR TODOS los productos? SITUACION IRREVERSIBLE",
                    `${e.target.dataset.delete}Modal`
                );
                // confirmation of empty cart
                document.getElementById(`${e.target.dataset.delete}Modalyes`).onclick = async () => {
                    try {
                        const response = await fetch(url, { method: 'DELETE' })
                        if (response.ok) {
                            divModal.remove();
                            cart.innerHTML = `
                            <div class="cartEmpty">
                                <p>NO HAY PRODUCTOS</p>
                                <a href="/products">Agregar Productos</a>
                            </div>
                            `
                        }
                    } catch (error) {
                        console.error(error)
                    }
                };
                // not accept delete cart
                document.getElementById(`${e.target.dataset.delete}Modalnot`).onclick = () => {
                    divModal.remove();
                };
            }
            // confirm buy cart
            if (e.target.dataset.buy) {
                const url = `${location.origin}/api/carts/${e.target.dataset.buy}/purchase`
                // modal creation
                const divModal = document.createElement("div");
                divModal.id = `${e.target.dataset.buy}Modal`;
                cartAction.appendChild(divModal);
                crearModalConfirmacion(
                    `¿Confirme la compra a realizarse por un ${totalAmount.innerHTML} ?`,
                    `${e.target.dataset.buy}Modal`
                );
                // confirmation of buy cart
                document.getElementById(`${e.target.dataset.buy}Modalyes`).onclick = async () => {
                    try {
                        const response = await fetch(url, { method: 'POST' })
                        const data = await response.json()
                        console.log(data)
                        if (response.ok && !data.msg) {
                            divModal.innerHTML= '';
                            crearModalTicket(data)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                };
                // not accept buy cart
                document.getElementById(`${e.target.dataset.buy}Modalnot`).onclick = () => {
                    divModal.remove();
                };
            }
        })
    }

    itemsDelete.forEach(item => {
        item.addEventListener('click', async (e) => { 
            const url = `${location.origin}/api/carts/${cartId}/product/${item.dataset.itemdelete}`
            try {
                const response = await fetch(url, { method: 'DELETE' })
                if (response.ok) {
                    window.location.reload()
                    // const cartItem = e.target.closest('li');
                    // cartItem.remove()
                }
            } catch (error) {
                console.error(error)
            }
        })
    })
})