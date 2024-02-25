export const helpersHbs = {
  // generatePageLink: (pages, queryParameters) => {

  //   let li = ''
  //   let query = ''

  //   Object.entries(queryParameters).forEach(([key, value]) => {
  //     query += `${key}=${value}&`
  //   })

  //   pages.forEach(page => {
  //     let aux = `/products?page=${page}&${query}`
  //     if (aux.endsWith('&')) aux = aux.slice(0, -1)
  //     console.log(aux)

  //     return li += `
  //       <li><a href=${aux}>${page}</a></li>
  //     `
  //   });

  //   return li
  // }

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