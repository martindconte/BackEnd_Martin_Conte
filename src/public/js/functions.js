/**
 * CREO MODAL CON DOS BOTONES LOS CUALES TIENE LOS id=${id}Confirmar y id=${id}Cancelar
 * @param {string} text TEXTO QUE SE DESEA EN LA VENTANA DEL MODAL
 * @param {string} id ID HTML EN DONDE SE DECLARA
 */
export const crearModalConfirmacion = (text, id) => {
  const modalContainer = document.getElementById(id);
  modalContainer.innerText = "";
  const modal = document.createElement("div");
  const modalVentana = document.createElement("div");
  const parrafo = document.createElement("p");
  const modalButton = document.createElement("div");
  const btnConfirmar = document.createElement("button");
  const btnCancelar = document.createElement("button");

  modal.id = id;
  parrafo.textContent = text;
  btnConfirmar.textContent = "Confirmar";
  btnCancelar.textContent = "Cancelar";
  btnConfirmar.id = id + "yes";
  btnCancelar.id = id + "not";

  modal.className = "modal";
  modalVentana.className = "modal__ventana";
  parrafo.className = "modal__parrafo";
  modalButton.className = "modal__botones";
  btnConfirmar.className = "modal__btnConfirmar";
  btnCancelar.className = "modal__btnCancelar";

  modalButton.appendChild(btnConfirmar);
  modalButton.appendChild(btnCancelar);
  modalVentana.appendChild(parrafo);
  modalVentana.appendChild(modalButton);
  modal.appendChild(modalVentana);
  modalContainer.appendChild(modal);
};

export const crearModalTicket = (sale) => {

  const container = document.getElementById('modalTicket');
  const modalTicketContainer = document.createElement("div")
  modalTicketContainer.classList = "modalTicket"
  const divConatiner = document.createElement("div")
  divConatiner.className = "divContainerModal"
  const modalInfo = document.createElement("div")
  modalInfo.className = 'modal__ventanaTicket'
  modalInfo.innerHTML = `
  <p>Gracias por su COMPRA!</p>
  <div class="modal__ticketInfo">
  <p>Ticket: <span>${sale.ticket.code}</span></p>
  <p>Cliente: <span>${sale.ticket.purchaser}</span></p>
  <p>Fecha: <span>${sale.ticket.purchase_datetime}</span></p>
  </div>
  `
  const modalItemDetail = document.createElement("ul")
  modalItemDetail.className = 'modalDetailProducts'
  sale.purchaseProducts.forEach(element => {
    const item = document.createElement("li")
    item.className = "modalItemDetail"
    item.innerHTML = `
      <p>${element.product.description}</p>
      <p>Cant.: <span>${element.quantity}</span></p>
      <p>SubTotal: <span>${element.quantity * element.product.price}</span></p>
    `
    modalItemDetail.appendChild(item)
  });

  const price = document.createElement("p")
  price.className = "modalPrice"
  price.innerHTML = `
    <p>Total: <span>${sale.ticket.amount}</span></p>
  `

  const btnClose = document.createElement("button")
  btnClose.classList = "modal__btnCancelar"
  btnClose.id = "closeModalTicket"
  btnClose.textContent = "Cerrar"

  container.appendChild(modalTicketContainer)
  modalTicketContainer.appendChild(divConatiner)
  divConatiner.appendChild(modalInfo)
  divConatiner.appendChild(modalItemDetail)
  divConatiner.appendChild(price)
  divConatiner.appendChild(btnClose)

  btnClose.addEventListener("click", () => {
    document.getElementById("modalTicket").innerHTML = "";
    window.location.reload()
  });
}

