const addToCart = async (cartId, productId) => {

    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) throw new Error(`Response: ${response.status}`)

    window.location.href = '/products'
}