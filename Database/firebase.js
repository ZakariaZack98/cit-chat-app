// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo4ow-dxS7HdhqWpbeqzPhpA2MmNFlNVU",
  authDomain: "cit-react-chat.firebaseapp.com",
  projectId: "cit-react-chat",
  storageBucket: "cit-react-chat.firebasestorage.app",
  messagingSenderId: "210650372944",
  appId: "1:210650372944:web:4bf006562ec3f17e33ea55"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;