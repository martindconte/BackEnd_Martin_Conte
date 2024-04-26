export const helpersHbs = {

  generatePageLink: (pages, queryParameters, baseURL) => {
    const baseUrlWithoutQuery = baseURL.split('?')[0]; // Obtener la URL base sin los parámetros de consulta
    const urlParams = new URLSearchParams(queryParameters);
    urlParams.delete('page');
    const query = urlParams.toString();
    const links = pages.map(page => `
        <li><a href="${baseUrlWithoutQuery}?page=${page}${query ? `&${query}` : ''}">${page}</a></li>
    `);

    return links.join('\n');
},

  formatCurrency: (price) => {
    return Intl.NumberFormat("es-AR", {
      currency: "ARS",
      currencySymbol: "$",
      minimumFractionDigits: 2
    }).format(price)

  },

  subTotalPrice: (quantity, price) => quantity * price,

  totalPrice: (products) => {
    let total = 0
    products.forEach(item => {
      if( item.product ) {
        total += item.quantity * item.product.price
      }
    }) 
    return total
  }
}