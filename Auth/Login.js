import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNf1UPe0RN9FUrukAIf79o_wgtqbM6Ux8",
    authDomain: "new-perfect-app.firebaseapp.com",
    projectId: "new-perfect-app",
    storageBucket: "new-perfect-app.appspot.com",
    messagingSenderId: "185180136509",
    appId: "1:185180136509:web:3bb1ff8e0ebb22324c7654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app); // Initialize Firestore

let uid = "Uid here!";
document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    
                    // User successfully logged in
                    uid = userCredential.user.uid;
                    localStorage.setItem('UID',uid);
                    localStorage.setItem('email',email);

                    // Redirect user to dashboard or another page
                    window.location.href = "../index.html";
                })
                .catch((error) => {
                    // Handle login error
                    const errorMessage = error.message;
                    console.error("Login error:", errorMessage);
                    document.getElementById('errorMessage').textContent = errorMessage;
                    document.getElementById('errorMessage').style.display = 'block';
                });
        });
        
   