import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore ,addDoc,collection,getDocs,doc,deleteDoc,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
const db = getFirestore(app)


onAuthStateChanged(auth, (user) => {
  if (user) {
      //get user details
      const uid = user.uid;

      const email = document.getElementById('userEmail');
      const username = document.getElementById('userName');
      const profile = document.getElementById('profileImage');
      const time = document.getElementById('lastSeen');
      //append user details
      email.innerHTML = user.email;
      username.innerHTML = user.displayName;
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
  <button id="findBtn" onclick="findBtn('${area[3]}','${area[4]}')">find</button>
  </ul>
  
  </div>
  `)

  gptDiv.innerHTML=resHTML

}





//----------------------------------------------------------------
const showHisDiv=document.getElementById("showHisDiv")
const historyFromFirestore=async()=>{
  try{
    const docRef= await addDoc(collection(db,"historyT"),{
       name:"Eleven Madison Park",
       description:" Eleven Madison Park, with Chef Daniel Humm at the helm, is a three-Michelin-starred restaurant known for its innovative tasting menus and exceptional service. The Art Deco-inspired dining room adds to the grandeur of the experience.",
       country:"USA",
       city:"NEW York",
       address:"11 Madison Ave, New York, NY 10010"

    })
    console.log('good')
  }catch(error){
    console.log(error,'firestore')
  }
}






//historyFromFirestore()
async function deleteData(id){
  try{
    await deleteDoc(doc(db,"historyT",id));
    console.log('deleted!!');
    getDocs();
  } catch(error) {
    console.log(error,'deleteHistory');
  }
}

async function showHistory() {
  try {
    const quertSnapshot = await getDocs(collection(db, "historyT"));
    const historyHTMLArray = quertSnapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <ul>
          <li>${doc.id}</li>
          <li>${data.name}</li>
          <li>${data.address}</li>
          <li>${data.description}</li>
          <button class="delBtn" onclick="deleteData('${doc.id}')">Delete</button>
          <button class="updateBtn" onclick="updateData('${doc.id}')">Update</button>
        </ul>
      `;
    });
    const historyHTML = historyHTMLArray.join(""); // 배열을 문자열로 결합
    document.getElementById("showHisDiv").innerHTML = historyHTML;
  } catch (error) {
    console.log(error, 'getHistory');
  }
}







showHistory()


postJSON(data);

