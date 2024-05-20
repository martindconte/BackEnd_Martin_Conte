addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newPasswordForm');
    const token = window.location.pathname.split('/').pop(); // Obtener el token desde la URL actual

    form.action = `/api/sessions/change-password/${token}`;
})