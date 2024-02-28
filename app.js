   
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
    const auth=getAuth(app);
    auth.languageCode='en'
    const provider = new GoogleAuthProvider()
    const signInButton =document.getElementById('signInBtn')
    const signOutButton =document.getElementById('signOut')
    const message = document.getElementById("msg");
    let user;
    signOutButton.style.display='none'
    message.style.display='none';

     signOutButton.addEventListener("click",function(){
      signOut(auth).then(()=>{
       console.log('Bye')
      }).catch((error)=>{
        console.log(error,'signOut error!')
      })
     })
    signInButton.addEventListener("click",function(){
      signInWithPopup(auth,provider)
      .then((result)=>{
        const credential=GoogleAuthProvider.credentialFromResult(result)
        const token=credential.accessToken;
     
        user = result.user;
        console.log(user,'user!!!!')
        signOutButton.style.display='flex'
        // window.location.href="./logged.html";
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage=error.message;
     
      })
    })

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
        console.log(uid,'uid!')
        return uid;
      }
     })
    
    updateUserProfile()




















const data = {
  date: '3월4일2024년',
  city: '오사카',
  country: '일본',
  weather: '비',
  kind: '특별한추억'
};

let arrData=[]
const LOCAL_URL = `https://bktest1.onrender.com/project/ai`;


async function postJSON(data) {
  try {
    const response = await fetch(LOCAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.data) {
    
console.log(result.data,'result!')
    } else {
      console.error('Error: result.data is undefined');
    }
  } catch (error) {
    console.error("Error:", error);
  }
}







postJSON(data);

