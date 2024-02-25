import { crearModalConfirmacion } from "./functions.js"

document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('cart')
    const cartId = cart.dataset.cartid
    const cartAction = document.getElementById('cartAction')
    const itemsDelete = document.querySelectorAll('[data-itemdelete]');

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
                    console.log('Dejando...')
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
                    const cartItem = e.target.closest('li');
                    cartItem.remove()
                }
            } catch (error) {
                console.error(error)
            }
        })
    })
})