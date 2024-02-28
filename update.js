
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth=getAuth(app);
auth.languageCode='en'
const provider = new GoogleAuthProvider()
const user = auth.currentUser
function updateUserProfile(user){
  const userName = user.displayName;
  const userEmail = user.email;
  const userProfilePicture=user.photoURL;
  document.getElementById("userName").innerHTML=userName;
  document.getElementById("userProfilePicture").src =userProfilePicture;
 }



 onAuthStateChanged(auth,(user)=>{
  if(user){
    updateUserProfile(user);
    const uid = user.uid;
    return uid;
  }else{
    alert("create Account");
  }
 })

updateUserProfile()