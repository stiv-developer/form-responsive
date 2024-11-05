document.addEventListener('DOMContentLoaded', function () {
    const inputFirtsname = document.querySelector('#firtsname');
    const inputLastname = document.querySelector('#lastname');
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#message');
    const radioButtons = document.querySelectorAll('input[name="type"]');
    const checkboxTerms = document.querySelector('#terms');
    const formulario = document.querySelector('#formulario');

    // Event listeners for inputs
    inputFirtsname.addEventListener('blur', validar);
    inputLastname.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputMessage.addEventListener('blur', validar);
    radioButtons.forEach(radio => radio.addEventListener('change', validar));
    checkboxTerms.addEventListener('change', validar);

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarAlertas();

        if (comprobarFormulario()) {
            mostrarMensajeExito();
            formulario.reset();
        }
    });

    function validar(e) {
        limpiarAlerta(e.target);

        if (target.value.trim() === '') {
            mostrarAlerta(`The field ${target.name || target.id} is required`, target.parentElement);
            return;
        }

        if (target.id === 'email' && !esEmailValido(target.value)) {
            mostrarAlerta('Invalid email format', target.parentElement);
        }
    }

    function mostrarAlerta(mensaje, referencia) {
        const alertaExistente = referencia.querySelector('.error');
        if (alertaExistente) return;

        // Apply red border to the incorrect field
        referencia.querySelector('input, textarea')?.classList.add('error-border');

        // Create and add error message
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('error');
        referencia.appendChild(error);

        if (referencia.classList.contains('group-radio') || referencia.classList.contains('checkbox-group')) {
            const errorContainer = referencia.parentElement;
            errorContainer.appendChild(error);
        }
        else {
            referencia.appendChild(error);
        }
    }

    function limpiarAlerta(element) {

        const container = element.closest('.radio-required, .group-email, .complete-name, .group-message, .checkbox-terms') || element.parentElement;

        const alerta = container.querySelector('.error');
        if (alerta) {
            alerta.remove();
        }

        element.classList.remove('error-border');
        if (container.classList.contains('radio-required') || container.classList.contains('checkbox-terms')) {
            container.classList.remove('error-border');
        }
    }

    function limpiarAlertas() {
        const alertas = formulario.querySelectorAll('.error');
        alertas.forEach(alerta => alerta.remove());
    }

    function comprobarFormulario() {
        let isFormValid = true;

        // Validación de cada campo requerido
        if (inputFirtsname.value.trim() === '') {
            mostrarAlerta('This field is required', inputFirtsname.parentElement);
            isFormValid = false;
        }

        if (inputLastname.value.trim() === '') {
            mostrarAlerta('This field is required', inputLastname.parentElement);
            isFormValid = false;
        }

        if (inputEmail.value.trim() === '' || !esEmailValido(inputEmail.value)) {
            mostrarAlerta('Please enter a valid email address', inputEmail.parentElement);
            isFormValid = false;
        }

        if (!Array.from(radioButtons).some(radio => radio.checked)) {
            mostrarAlerta('Please select a query type', radioButtons[0].parentElement.parentElement);
            isFormValid = false;
        }

        if (inputMessage.value.trim() === '') {
            mostrarAlerta('This field is required', inputMessage.parentElement);
            isFormValid = false;
        }

        if (!checkboxTerms.checked) {
            mostrarAlerta('To submit this form, please consent to being contacted', checkboxTerms.parentElement);
            isFormValid = false;
        }

        return isFormValid;
    }

    function esEmailValido(email) {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    }

    function mostrarMensajeExito() {
        const mensajeExito = document.getElementById("successful-message");
        mensajeExito.style.display = "initial";
        setTimeout(() => {
            mensajeExito.style.display = "none"
        }, 3000);
    }
});