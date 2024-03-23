// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getFirestore, getDocs, collection, addDoc, orderBy, query, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';


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
const auth = getAuth(firebaseApp);

const chatList = document.getElementById('chat-list');
const chatForm = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');


auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in');
        console.log(window.location);
    } else {
        // No user is signed in
        console.log('No user is signed in');
        console.log(window.location.pathname);
        // Redirect to the login or sign-up page only if not already on the login or sign-up page
        if (window.location.pathname !== '/Auth/Login.html' && window.location.pathname !== '/Auth/Register.html') {
            window.location.href = '/Auth/Login.html';
        }
    }
});



// Listen for form submit
chatForm.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("data sent!")
  const message = messageInput.value.trim();
  if (message !== '') {
    console.log("Rishabh",auth.currentUser);
    addDoc(collection(db, 'messages'), {
      text: message,
      timestamp: new Date(),
      userId: auth.currentUser ? auth.currentUser.uid : null
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
  
  // Create and append the h3 element for displaying userName
  const userNameHeader = document.createElement('h5');
  userNameHeader.textContent = "Rishabh:";
  li.appendChild(userNameHeader);
  
  // Create and append the h5 element for displaying the actual message
  const messageHeader = document.createElement('h6');
  messageHeader.textContent = message.text;
  li.appendChild(messageHeader);
  
  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight; // Scroll to bottom
}


 document.getElementById("logout").addEventListener('click', function(){
 
    auth.signOut()
        .then(() => {
            // Sign-out successful.
            alert('User signed out successfully.');
        })
        .catch((error) => {
            // An error happened.
            console.error('Error signing out:', error);
        });

 })
// let userName="";
 async function getUserData() {
  try {
    let uid = localStorage.getItem("UID");
    console.log(uid);
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef);
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    const userWithDesiredEmail = users.find((user) => user.id === uid);

    if (userWithDesiredEmail) {
      // userName = userWithDesiredEmail.name;
      return userWithDesiredEmail.name; // Return the userName value
    } else {
      console.log("User not found with the desired email.");
      return null; // Or return null or any other value indicating user not found
    }
  } catch (error) {
    console.error("Error reading user data:", error);
    throw error; // Throw the error to be caught by the caller
  }
}

// Call getUserData and store the result in username variable
getUserData().then((username) => {
  console.log(username); // Print the retrieved username
}).catch((error) => {
  console.error("Error retrieving user data:", error);
});


function userDataForDisplay(uid){
  
}
