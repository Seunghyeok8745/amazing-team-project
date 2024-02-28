import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCP01jRV0UHrVPtMU9mC7wBsxd5J1uDs7U",
  authDomain: "amazingteam-68fce.firebaseapp.com",
  projectId: "amazingteam-68fce",
  storageBucket: "amazingteam-68fce.appspot.com",
  messagingSenderId: "963843107117",
  appId: "1:963843107117:web:e3cbb5ae05e14c7adf8ba4",
  measurementId: "G-T9G82HFNV4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
      //get user details
      const uid = user.uid;

      const email = document.getElementById('userEmail');
      const username = document.getElementById('userName');
      const profile = document.getElementById('profileImage');
      const time = document.getElementById('lastSeen');
      //append user details
      email.innerText = user.email;
      username.innerText = user.displayName;
      profile.src = "https://lh3.googleusercontent.com/a/ACg8ocLKnJjfskBaCFPsLm8YN2vuXzWCE8iyF0WiKA5XoAqC2w=s96-c"
      console.log(user)


  } else {
      alert("logged out...")
      window.location.href = "loginWithGoogle.html"
  }
});

const logout = document.getElementById("signOut");
logout.addEventListener("click" , function(){
    signOut(auth).then(() => {
       alert("logging out...");
       window.location.href = "index.html"
      }).catch((error) => {
        // An error happened.
      });
})


//------------------------gpt--------------------------
const gptDiv=document.getElementById('gptDiv')
let GptTra=[]
let GptRes=[]
const data = {
  date: '3월4일2024년',
  city: '뉴욕',
  country: '미국',
  weather: 'sunny',
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
const text =result.data
const textR=result.data2

const tipsArray = text.split('\n').map(tip => tip.trim()).filter(tip => tip.length > 0);
const tipsArrayR = textR.split('\n').map(tip => tip.trim()).filter(tip => tip.length > 0);
const destination=parseTipsArray(tipsArray)
const restaurant=parseTipsArray(tipsArrayR)

for(let area of destination){
console.log(area,'area')
GptTra.push(area)
}
for(let rest of restaurant){
  console.log(rest,'ressss')
  GptRes.push(rest)
  }
  showList()

    } else {
      console.error('Error: result.data is undefined');
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function parseTipsArray(tipsArray) {
  const nestedArray = [];
  let currentArray = [];

  tipsArray.forEach(line => {
      if (line.match(/^\d+\./)) { 
          if (currentArray.length) {
              nestedArray.push(currentArray);
              currentArray = [];
          }
      }
      currentArray.push(line);
  });


  if (currentArray.length) {
      nestedArray.push(currentArray);
  }
console.log(nestedArray,'nestedArray')
  return nestedArray;
}


const showList=()=>{
  let resHTML;
  resHTML=GptTra.map((area)=>
 
  `
  <div class="gptRes">
  <ul>
  <li>${area[0]}</li>
  <li>${area[1]}</li>
  <li>${area[2]}</li>
  </ul>
  
  </div>
  `)

  gptDiv.innerHTML=resHTML
console.log(GptRes,'GptRes')
console.log(GptTra,'GptTra')
}



//----------------------------------------------------------------













// function parseTipsArray(tipsArray) {
//   const destinations = [];
//   let currentDestination = {};

//   tipsArray.forEach(line => {
//       if (line.match(/^\d+\./)) {
//           if (currentDestination.name) {
//               destinations.push(currentDestination);
//               currentDestination = {};
//           }
//           currentDestination.name = line.split(': ')[1];
//       } else if (line.includes('주소: ')) {
//           currentDestination.address = line.split('주소: ')[1];
//       } else if (line.includes('설명: ')) {
//           currentDestination.description = line.split('설명: ')[1];
//       } else if (line.includes('위도: ')) {
//           currentDestination.latitude = parseFloat(line.split('위도: ')[1]);
//       } else if (line.includes('경도: ')) {
//           currentDestination.longitude = parseFloat(line.split('경도: ')[1]);
//       }
//   });

//   if (Object.keys(currentDestination).length > 0) {
//       destinations.push(currentDestination);
//   }

//   return destinations;
// }





postJSON(data);

