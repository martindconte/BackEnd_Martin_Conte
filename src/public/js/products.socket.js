const socket = io();
const cardContainer = document.getElementById('card-products');
const formAddProduct = document.getElementById('formAddProduct')

cardContainer.addEventListener('click', async (e) => {
  if (e.target.getAttribute("data-id") === "btn-delete") {
    const pid = e.target.getAttribute('id').slice(6);
    try {
      const response = await fetch(`api/products/${pid}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) throw new Error(`Response desde Index: ${response.status}`)

      socket.emit('delete-product', pid);
    } catch (error) {
      console.log('error deleting the product', error.message)
    }
  }
});

formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(formAddProduct);

  try {
    const response = await fetch('api/products', {
      method: 'POST',
      body: formData 
    });
    if (!response.ok) throw new Error(`Response: ${response.status}`);

    const product = await response.json();
    console.log('Desde Index agregando producto...', product);
    
    socket.emit('add-products', product);

    window.location.reload()

  } catch (error) {
    console.log(error);
  }
});
// formAddProduct.addEventListener('submit', async (e) => {
//   e.preventDefault()

//   const newProduct = {};
//   const formData = new FormData(formAddProduct)
//   console.log(formData);
//   formData.forEach((value, key) => {
//     newProduct[key] = key === 'thumbnails'
//       ? newProduct[key] = Array.from(formData.getAll('thumbnails')).map(file => file.name)
//       : newProduct[key] = value.trim()
//   }
//   );

//   console.log({ newProduct });

//   try {
//     const response = await fetch('api/products', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newProduct)
//     })
//     if (!response.ok) throw new Error(`Response: ${response.status}`)

//     const product = await response.json()
//     console.log('Desde Index agregandfo producto...', product)
//     socket.emit('add-products', product);
//   } catch (error) {
//     console.log(error)
//   }
// })

socket.on('update-products', async () => {

  window.location.reload()

  // try {
  //   const response = await fetch('api/products')

  //   console.log(response);

  //   // if (!response.ok) throw new Error(`Response: ${response.status}`)

  //   const data = await response.json()
  //   console.log('aqui..........................................');
  //   console.log(data);
  //   cardContainer.innerHTML = ''
  //   data.payload.forEach(product => {
  //     const productItem = document.createElement('li');
  //     productItem.classList.add('card');
  //     productItem.innerHTML = `
  //         <h3>${product.title}</h3>
  //         <p>${product.description}</p>
  //         <p>Precio: $${product.price}</p>
  //         <div class="btn-container">
  //             <button class="btn-accept" data-id="btn-buy" id="buy${product._id}">COMPRAR</button>
  //             <button class="btn-delete" data-id="btn-delete" id="delete${product._id}">ELIMINAR</button>
  //             <button class="btn-cart">AGREGAR AL CARRITO</button>
  //         </div>
  //     `;
  //     cardContainer.appendChild(productItem);
  //   })
  // } catch (error) {
  //   console.log(error);
  //   // res.status(500).send(error.message);
  // }
})