import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Firebase configuration (use environment variables for sensitive data in a real application)
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
const db = getFirestore(app);

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!email || !password) {
        displayErrorMessage("Email and password are required.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            localStorage.setItem('Name', userData.name);
            localStorage.setItem('UID', user.uid);
            localStorage.setItem('Email', email);

            // Redirect user to dashboard or another page
            window.location.href = "../index.html";
        } else {
            displayErrorMessage("User data not found.");
        }
    } catch (error) {
        displayErrorMessage(getFriendlyErrorMessage(error.code));
    }
});

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

function getFriendlyErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        default:
            return 'Login failed. Please try again.';
    }
}
