export const helpersHbs = {

  generatePageLink: (pages, queryParameters) => {
    const urlParams = new URLSearchParams(queryParameters);
    urlParams.delete('page');
    const query = urlParams.toString();
    console.log('queries: ', queryParameters)
    const links = pages.map(page => `
      <li><a href="/products?page=${page}&${query}">${page}</a></li>
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
      total += item.quantity * item.product.price
    }) 
    return total
  }
}