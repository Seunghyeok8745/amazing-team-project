import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore ,addDoc,collection,getDocs,doc,deleteDoc,updateDoc,query,where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCP01jRV0UHrVPtMU9mC7wBsxd5J1uDs7U",
  authDomain: "amazingteam-68fce.firebaseapp.com",
  projectId: "amazingteam-68fce",
  storageBucket: "amazingteam-68fce.appspot.com",
  messagingSenderId: "963843107117",
  appId: "1:963843107117:web:e3cbb5ae05e14c7adf8ba4",
  measurementId: "G-T9G82HFNV4"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 const db = getFirestore(app)
 const gptDiv=document.getElementById('gptDiv')
 let GptTra=[]
 let GptRes=[]
 const data = {
   date: '3월4일2024년',
   city: '서울',
   country: '한국',
   weather: 'sunny',
   kind: '특별한추억'
 };
 

 const LOCAL_URL = `https://bktest1.onrender.com/project/ai`;

//gpt 에서 여행명소 보여주는 함수
const showList = async () => {
  let resHTML;
  try {
    const promises = GptTra.map(async (area) => {
      try {
        const checkDup = await getDocs(query(collection(db,"historyT"), where("name","==",area[0])));
        if (checkDup.size === 0) {
          
          await addDoc(collection(db, "historyT"), {
            name: area[0],
            description: area[3],
            address: area[1]
          });
          console.log(area[0],'00000')
          console.log(area[1],'11111')
          console.log(area[2],'22222222')
        } else {
          console.log('Already have the list');
        }
        return `
          <div class="gptRes">
            <ul>
              <li>${area[0]}</li>
              <li>${area[1]}</li>
              <li>${area[2]}</li>
              <button id="pinBtn" onclick="pinBtn('${area[3]},${area[4]}')">find</button>
            </ul>
          </div>
        `;
      } catch (error) {
        console.error('Error in showList: ', error);
        return ''; // Return empty string if there's an error
      }
    });
    resHTML = await Promise.all(promises);
  } catch (error) {
    console.error('Error in showList: ', error);
    resHTML = [];
  }
  gptDiv.innerHTML = resHTML.join('');
}

//--------------------------------------------------------



//firebase auth (로그인하면 이메일고 user 정보들 보여주는 함수)
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
      profile.src = user.photoURL || '';
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
        console.log(error,'user 정보들 - app.js')
      });
})


//-----------------------------------------------------

//gpt 연결해서 소스 받는 api 함수
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
//-----------------------------------------
//gpt 에서 받은 string 을 배열로 변경해주는 함수
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


//------------------------------------------







postJSON(data);

