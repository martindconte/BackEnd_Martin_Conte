const socket = io();

const formSendMessage = document.getElementById('formSendMessage')
const messageContainer = document.getElementById('messageContainer')

let user = ''

const getEmail = async () => {
  const { value: email } = await Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address",
    allowOutsideClick: false
  });
  if (email) {
    Swal.fire(`Entered email: ${email}`);
  }
  return email
}

getEmail()
  .then(email => user = email)
  .catch(err => console.error(err))

formSendMessage.onsubmit = async (e) => {

  e.preventDefault()

  const newMessage = {};

  const formData = new FormData(formSendMessage)
  formData.forEach((value, key) => {
    newMessage[key] = value.trim()
  });

  newMessage.user = user
  console.log(newMessage)
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })

    if (!response.ok) throw new Error(`Response: ${response.status}`)
    
    formSendMessage.reset()
    // console.log('Desde chat.socket.js se agrego el mensaje: ', newMessage)

  } catch (error) {
    console.log(error.message)
  }
}

socket.on('new message', messages => {
  console.log('Desde clientee eescuchando...', messages)
  messageContainer.innerHTML = ''
  messages.forEach(message => {
    
    const dateMongoose = message.date
    const dateUTC = new Date(dateMongoose)
    const localDate = dateUTC.toLocaleString()

    messageContainer.innerHTML +=
    `<li class="userMessage">
    <div class="chatUser">
      <span>Usuario:</span>
      <span class="userMail">${message.user}</span>
    </div>
    <div class="chatMessage">
      <p>
        ${message.message}
      </p>
      <p>${localDate}</p>
    </div>
  </li>`
  })
})
