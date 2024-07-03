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

socket.on('update-products', async () => {

  window.location.reload()

})