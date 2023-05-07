import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
  // Paste your Firebase configuration object here
  apiKey: "AIzaSyCbDFRRY8n0v4kYhh4QVmyOpS2ArvkPp40",
  authDomain: "mym-nasa-image-gallery.firebaseapp.com",
  projectId: "mym-nasa-image-gallery",
  storageBucket: "mym-nasa-image-gallery.appspot.com",
  messagingSenderId: "571006073870",
  appId: "1:571006073870:web:d32d75dff0e2dee3edd05f",
  measurementId: "G-HHN03NJFPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('User is signed in:', user);
    } else {
      // User is signed out
      console.log('User is signed out');
    }
  });

export  {auth,app,provider};
