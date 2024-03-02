import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCP01jRV0UHrVPtMU9mC7wBsxd5J1uDs7U",
  authDomain: "amazingteam-68fce.firebaseapp.com",
  projectId: "amazingteam-68fce",
  storageBucket: "amazingteam-68fce.appspot.com",
  messagingSenderId: "963843107117",
  appId: "1:963843107117:web:e3cbb5ae05e14c7adf8ba4",
  measurementId: "G-T9G82HFNV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'it';
const login = document.getElementById("googleLogin")
login.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            alert("Login Successful :)" + user.email);
            window.location.href = "index.html";

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error)

            alert(errorMessage)

        });
})