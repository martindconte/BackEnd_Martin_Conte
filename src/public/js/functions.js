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