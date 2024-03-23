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

// Check if Firebase app is already initialized
const firebaseApp = initializeApp(firebaseConfig);
const app = firebaseApp ? firebaseApp : initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in');
        console.log(window.location)
        // Redirect to the home page only if not already on the home page
        if (window.location.pathname !== '../index.html') {
            // window.location.href = '../home.html';
        }
    } else {
        // No user is signed in
        console.log('No user is signed in');
        console.log(window.location.pathname)
        // Redirect to the login or sign-up page only if not already on the login or sign-up page
        if (window.location.pathname !== '/Auth/login.html' && window.location.pathname !== '/Auth/Register.html') {
            window.location.href = 'login.html'; // or 'signup.html'
        }
    }
});
