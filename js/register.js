import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDcqwGMKOXBCEmdeHlVniZlitnzPs0u7KQ",
    authDomain: "capston-colorist.firebaseapp.com",
    projectId: "capston-colorist",
    storageBucket: "capston-colorist.appspot.com",
    messagingSenderId: "138599426574",
    appId: "1:138599426574:web:34c866027e3ad1cd6eaa5f",
    measurementId: "G-2F6BYG1915"
  };


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerButton = document.getElementById('registro');

registerButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón de formulario

    const email = document.getElementById('emailreg').value;
    const password = document.getElementById('passwordreg').value;

    try {
        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            createdAt: new Date()
        });

        alert("Usuario registrado exitosamente");

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use')
            alert('El correo ya está en uso');
        else if (errorCode === 'auth/invalid-email')
            alert('El correo es inválido');
        else if (errorCode === 'auth/weak-password')
            alert('La contraseña es muy débil');
        else
            alert(`Error al registrar: ${errorMessage}`);
    }
});
