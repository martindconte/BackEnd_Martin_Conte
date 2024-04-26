const socket = io();

const user = document.getElementById('userName').lastChild.data
const formSendMessage = document.getElementById('formSendMessage')
const messageContainer = document.getElementById('messageContainer')

async function sendMessage(e) {

  e.preventDefault()

  const newMessage = {};

  const formData = new FormData(formSendMessage)
  formData.forEach((value, key) => {
    newMessage[key] = value.trim()
  });

  newMessage.user = user

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
    
  } catch (error) {
    console.log(error.message)
  }
}

socket.on('new message', messages => {
  if(user) messageContainer.innerHTML = ''
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

formSendMessage.addEventListener('submit', sendMessage)
formSendMessage.addEventListener('keyup', e => {
  if(e.key === 'Enter'){
    sendMessage(e)
  }
})
