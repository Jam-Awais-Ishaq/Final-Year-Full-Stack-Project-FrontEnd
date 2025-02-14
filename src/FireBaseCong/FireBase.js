import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwDAxyxtbnqYCsi0kAZZZ23Go3F6yz7s4",
  authDomain: "for-test-5be61.firebaseapp.com",
  projectId: "for-test-5be61",
  storageBucket: "for-test-5be61.appspot.com",
  messagingSenderId: "262666289067",
  appId: "1:262666289067:web:c0f402f274ce0e5fe85cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };