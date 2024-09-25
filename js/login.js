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

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        messageDiv.textContent = "Usuario logueado correctamente";
        messageDiv.style.color = "green"; // Establece el color del texto para el mensaje de éxito
       
        window.location.href = '/home.html';
    }).catch(error => {
        const errorCode = error.code;
        let errorMessage = "";

        if (errorCode === 'auth/invalid-email')
            errorMessage = "El correo es invalido";
        else if (errorCode === 'auth/user-disabled')
            errorMessage = "El usuario ha sido deshabilitado";
        else if (errorCode === 'auth/user-not-found')
            errorMessage = "El usuario no existe";
        else if (errorCode === 'auth/wrong-password')
            errorMessage = "Contraseña incorrecta";

        messageDiv.textContent = errorMessage;
        messageDiv.style.color = "red"; // Establece el color del texto para los mensajes de error
    });
});


