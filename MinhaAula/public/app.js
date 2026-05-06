import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoJ114qEz9Lqg2mUqPIvXY53FxZVUtAkA",
  authDomain: "devolveja-8ebcb.firebaseapp.com",
  projectId: "devolveja-8ebcb",
  storageBucket: "devolveja-8ebcb.firebasestorage.app",
  messagingSenderId: "473213468601",
  appId: "1:473213468601:web:d399a4c477c5651a668068"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Espera o DOM carregar (evita erro de botão null)
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnCadastrar");

    btn.addEventListener("click", async () => {

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

      
        if (!email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        if (password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            alert("✅ Sucesso! Usuário: " + userCredential.user.email);

        } catch (error) {
            console.log(" ERRO COMPLETO:", error);

          
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Esse e-mail já está em uso.");
                    break;
                case "auth/invalid-email":
                    alert("E-mail inválido.");
                    break;
                case "auth/weak-password":
                    alert("Senha fraca. Use pelo menos 6 caracteres.");
                    break;
                case "auth/operation-not-allowed":
                    alert("Ative Email/Senha no Firebase Authentication.");
                    break;
                default:
                    alert("Erro: " + error.message);
            }
        }

    });

});