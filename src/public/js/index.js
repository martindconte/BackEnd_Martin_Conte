const socket = io();

const cardContainer = document.getElementById('card-products');
const formAddProduct = document.getElementById('formAddProduct')

cardContainer.addEventListener('click', async (e) => {
  if (e.target.getAttribute("data-id") === "btn-delete") {
    const pid = e.target.getAttribute('id').slice(6);
    console.log(pid)
    try {
      const response = await fetch(`api/products/${pid}`,
        {
          method: 'DELETE',
        }
      )

      if(!response.ok) throw new Error(`Response desde Index: ${response.status}`)
      
      socket.emit('delete-product', pid);
    } catch (error) {
      console.log('error deleting the product', error.message)
    }
  }
});

formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault()

  const newProduct = {};
  const formData = new FormData(formAddProduct)
  formData.forEach((value, key) => {
    newProduct[key] = key === 'thumbnails'
      ? newProduct[key] = Array.from(formData.getAll('thumbnails')).map(file => file.name)
      : newProduct[key] = value.trim()
  }
  );

  try {
    const response = await fetch('api/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    console.log(response)

    if(!response.ok) throw new Error(`Response: ${response.status}`)

    const product = await response.json()
    console.log('Desde Index agregandfo producto...', product)
    socket.emit('add-products', product );
  } catch (error) {
    console.log(error)
  }
})

socket.on('update-products', async () => {

  try {
    const response = await fetch('api/products')

    if(!response.ok) throw new Error(`Response: ${response.status}`)
    
    const data = await response.json()
    console.log(data.length)
    cardContainer.innerHTML = ''
    data.forEach(product => {
      const productItem = document.createElement('li');
      productItem.classList.add('card');
      productItem.innerHTML = `
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>Precio: $${product.price}</p>
          <div class="btn-container">
              <button class="btn-accept" data-id="btn-buy" id="buy${product._id}">COMPRAR</button>
              <button class="btn-delete" data-id="btn-delete" id="delete${product._id}">ELIMINAR</button>
              <button class="btn-cart">AGREGAR AL CARRITO</button>
          </div>
      `;
      cardContainer.appendChild(productItem);
    })
  } catch (error) {
    res.status(500).send( error.message );
  }

})

// const socket = io();

// const cardContainer = document.getElementById('card-products');
// const formAddProduct = document.getElementById('formAddProduct')

// cardContainer.addEventListener('click', async (e) => {
//   if (e.target.getAttribute("data-id") === "btn-delete") {
//     // quito la palabra "delete" para obtener el id
//     const productId = e.target.getAttribute('id').slice(6, 20);
//     try {
//       const response = await fetch(`/api/products/${productId}`,
//         {
//           method: 'DELETE',
//         }
//       )
//       const { products } = await response.json()
//       socket.emit('delete-product', { productId, products });
//     } catch (error) {
//       console.log(error)
//     }
//   }
// });

// formAddProduct.addEventListener('submit', async (e) => {
//   e.preventDefault()

//   const newProduct = {};
//   const formData = new FormData(formAddProduct)
//   formData.forEach((value, key) => {
//     newProduct[key] = key === 'thumbnails'
//       ? newProduct[key] = Array.from(formData.getAll('thumbnails')).map(file => file.name)
//       : newProduct[key] = value.trim()
//   }
//   );
//   const response = await fetch('api/products', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     // envio los datos del formulario al endopin
//     body: JSON.stringify(newProduct)
//   })
//   const { products } = await response.json()
//   socket.emit('add-products', { newProduct, products });
// })

// socket.on('update-products', data => {

//   cardContainer.innerHTML = ''
//   data.forEach(product => {
//     const productItem = document.createElement('li');
//     productItem.classList.add('card');
//     productItem.innerHTML = `
//         <h3>${product.title}</h3>
//         <p>${product.description}</p>
//         <p>Precio: $${product.price}</p>
//         <div class="btn-container">
//             <button class="btn-accept" data-id="btn-buy" id="buy${product.id}">COMPRAR</button>
//             <button class="btn-delete" data-id="btn-delete" id="delete${product.id}">ELIMINAR</button>
//             <button class="btn-cart">AGREGAR AL CARRITO</button>
//         </div>
//     `;
//     cardContainer.appendChild(productItem);
//   })
// })

