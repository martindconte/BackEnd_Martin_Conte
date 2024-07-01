const btnUsersManager = document.getElementById('btnUsersManager')
const btnInactiveUsersDelete = document.getElementById('btnInactiveUsersDelete')
const tableUsers  = document.getElementById('tableUsers')

btnUsersManager.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/user')
        if (!response.ok) {
            throw new Error('Error en la solicitud')
        }
        const users = await response.json()

        if( users.length > 0 ) {

            const table = document.createElement('table')
            const thead = document.createElement('thead')
            const tbody = document.createElement('tbody')

            // encabezado
            const headerRow = document.createElement('tr')
            const headers = ['Nombre', 'Apellido', 'Edad', 'Email', 'Rol', 'Imagen de Perfil', 'Última Conexión', 'Inactivo > 30 mim', 'Eliminar']
            headers.forEach(headerText => {
                const th = document.createElement('th')
                th.textContent = headerText
                headerRow.appendChild(th)
            });
            thead.appendChild(headerRow)

            users.forEach( user => {
                const row = document.createElement('tr')
                const userData = [
                    user.first_name,
                    user.last_name,
                    user.age,
                    user.email,
                    user.role,
                    user.profile_image ? `<img src="${user.profile_image}" alt="Imagen de perfil" width="50">` : 'No disponible',
                    new Date(user.last_connection).toLocaleString(),
                ];

                userData.forEach( data => {
                    const td = document.createElement('td');
                    if (data.includes && data.includes('<img')) {
                        td.innerHTML = data
                    } else {
                        td.textContent = data;
                    }
                    row.appendChild(td)
                })

                const tdInactivo = document.createElement('td')

                const lastConnectionDate = new Date(user.last_connection)
                const now = new Date()
                const timeDifference = Math.abs(now - lastConnectionDate)
                const minutesDifference = Math.floor(timeDifference / (1000 * 60))

                tdInactivo.textContent = minutesDifference > 30 ? 'Verdadero' : 'Falso'
                
                const deleteButton = document.createElement('button')
                deleteButton.className = 'btn-delete'
                deleteButton.textContent = 'Eliminar'
                deleteButton.addEventListener('click', async () => {
                    try {
                        const deleteResponse = await fetch(`/api/user/${user._id}`, {
                            method: 'DELETE'
                        })

                        console.log(deleteResponse);
                        if (!deleteResponse.ok) {
                            throw new Error('Error al eliminar el usuario')
                        }
                        // Eliminar la fila de la tabla
                        row.remove()
                        alert('Usuario eliminado exitosamente')
                    } catch (error) {
                        console.error('Error:', error)
                        alert('Hubo un error al eliminar el usuario')
                    }
                })

                const tdButton = document.createElement('td')
                
                tdButton.appendChild(deleteButton)
                row.appendChild(tdButton)
                
                row.appendChild(tdInactivo)

                tbody.appendChild(row);

                tbody.appendChild(row);

            })
            
            table.appendChild(thead)
            table.appendChild(tbody)

            // tableUsers.innerHTML= ''
            tableUsers.appendChild(table)

            btnUsersManager.style.display = 'none';
            btnInactiveUsersDelete.style.display = 'block';

        } else {
            const p = document.createElement('p')
            p.textContent = 'No Hay Usuarios Registrados aun'
            tableUsers.appendChild(p)
        }

        console.log(users);
        // return users;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
})

btnInactiveUsersDelete.addEventListener('click', async () => {
    try {
        const deleteResponse = await fetch('/api/user/', {
            method: 'DELETE'
        })
        console.log(deleteResponse);
        if (!deleteResponse.ok) {
            throw new Error('Error al eliminar el usuario')
        }

        window.location.reload()
    } catch (error) {
        console.error('Error:', error)
        alert('Hubo un error al eliminar el usuario')
    }
})