// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNf1UPe0RN9FUrukAIf79o_wgtqbM6Ux8",
    authDomain: "new-perfect-app.firebaseapp.com",
    projectId: "new-perfect-app",
    storageBucket: "new-perfect-app.appspot.com",
    messagingSenderId: "185180136509",
    appId: "1:185180136509:web:3bb1ff8e0ebb22324c7654"
  };
  
 
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Get elements
const chatList = document.getElementById('chat-list');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// Listen for form submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    addDoc(collection(db, 'messages'), {
      text: message,
      timestamp: new Date()
    })
    .then(() => {
      messageInput.value = '';
    })
    .catch((error) => {
      console.error('Error adding message: ', error);
    });
  }
});

// Real-time listener
const q = query(collection(db, 'messages'), orderBy('timestamp'));
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const message = change.doc.data();
      displayMessage(message);
    }
  });
});

// Display message in the chat
function displayMessage(message) {
  const li = document.createElement('li');
  li.textContent = message.text;
  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight; // Scroll to bottom
}