import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDcqwGMKOXBCEmdeHlVniZlitnzPs0u7KQ",
    authDomain: "capston-colorist.firebaseapp.com",
    projectId: "capston-colorist",
    storageBucket: "capston-colorist.appspot.com",
    messagingSenderId: "138599426574",
    appId: "1:138599426574:web:34c866027e3ad1cd6eaa5f",
    measurementId: "G-2F6BYG1915"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginButton = document.getElementById('login');
const messageDiv = document.getElementById('message'); // Elemento para mostrar mensajes

loginButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón de formulario

    const email = document.getElementById('emaillog').value;
    const password = document.getElementById('passwordlog').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            // Inicio de sesión exitoso
            messageDiv.textContent = "Usuario logueado correctamente.";
            messageDiv.style.color = "green"; // Estilo para éxito
            messageDiv.style.display = "block"; // Asegúrate de que sea visible

            // Redirige al usuario
            setTimeout(() => {
                window.location.href = '/home.html';
            }, 2000);
        })
        .catch(error => {
            // Manejo de errores
            const errorCode = error.code;
            let errorMessage = "";

            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = "El correo es inválido.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "El usuario ha sido deshabilitado.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "El usuario no existe.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Contraseña incorrecta.";
                    break;
                default:
                    errorMessage = "Correo o contraseña incorrecta, intentalo de nuevo ";
            }

            // Muestra el mensaje de error
            messageDiv.textContent = errorMessage;
            messageDiv.style.color = "red"; // Estilo para errores
            messageDiv.style.display = "block";

            console.error("Error en el login:", errorMessage); // También lo mostramos en la consola para depuración
        });
});






