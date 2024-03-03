import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCP01jRV0UHrVPtMU9mC7wBsxd5J1uDs7U',
  authDomain: 'amazingteam-68fce.firebaseapp.com',
  projectId: 'amazingteam-68fce',
  storageBucket: 'amazingteam-68fce.appspot.com',
  messagingSenderId: '963843107117',
  appId: '1:963843107117:web:e3cbb5ae05e14c7adf8ba4',
  measurementId: 'G-T9G82HFNV4',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

async function showHistoryV() {
  try {
    const quertSnapshot = await getDocs(collection(db, 'historyV'));
    const visitedHTMLArray = quertSnapshot.docs.map(doc => {
      const data = doc.data();
      // console.log(data,'data')
      return `
      <div class="swiper card_slider">
      <div id="recom" class="swiper-wrapper">

        <div class="card swiper-slide">
          <div class="image-box">
            <img src="./image-files/main2.jpg" alt="" />
            <h3 class="name">Vancouver</h3>
            <p class="content-demo">
              A bustling west coast seaport in British Columbia, is among Canada's densest, most ethnically diverse
              cities.
            </p>
          </div>
        </div>
          
          <button onclick="deleteBtnV('${doc.id}')" id="delBtn")">Delete</button>
          

       
      `;
    });
    const visitedHTML = visitedHTMLArray.join('');
    document.getElementById('showVisitedDiv').innerHTML = visitedHTML;
  } catch (error) {
    console.log(error, 'getHistory');
  }
}
showHistoryV();
showHistoryT();

window.deleteBtnV = async function (id) {
  try {
    await deleteDoc(doc(db, 'historyV', id));

    await showHistoryV();
  } catch (error) {
    console.log(error, 'delete');
  }
};

//firestore 에서 gpt 가 준 명소 리스트 보여주기 함수
async function showHistoryT() {
  try {
    const quertSnapshot = await getDocs(collection(db, 'historyT'));
    const historyHTMLArray = quertSnapshot.docs.map(doc => {
      const data = doc.data();

      return `
    

        <div class="card swiper-slide">
          <div class="image-box">
            <img src="./image-files/main2.jpg" alt="" />
            <h3 class="name1">${data.name} </h3>

           
            <p class="content-demo">
             ${data.description}
            </p>
          </div>
         
        </div>

      `;
    });
    const historyHTML = historyHTMLArray.join('');
    document.getElementById('recom').innerHTML = historyHTML;
  } catch (error) {
    console.log(error, 'getHistory');
  }
}
//================================
//*** showHistory() 는 버튼 위에잇어야합니다 ***/
showHistoryT();
//pin 버튼(위도경도 보여준다
// window.pinBtn = async function(lng, lat) {
//   try {
//     const regex = /-?\d+\.\d+/g;
//     const numbers1 = lng.match(regex);
//     const numbers2 = lat.match(regex);
//     const latitude = parseFloat(numbers1);
//     const longitude = parseFloat(numbers2);
//     console.log(latitude, longitude);
//   } catch(error) {
//     console.error('Error in pinBtn: ', error);
//   }
// }
//--------------------------------------
//forestore 에 gpt 가 보여준것들 리스트 지워주는 버튼
window.deleteBtnT = async function (id) {
  try {
    await deleteDoc(doc(db, 'historyT', id));
    await showHistoryT();
  } catch (error) {
    console.log(error, 'delete');
  }
};

window.visitedBtn = async function (name, address, description, email) {
  console.log(name, 'name');
  console.log(address, 'address');
  console.log(description, 'description');
  console.log(email, 'email');
  try {
    console.log(address, 'email');
    await addDoc(collection(db, 'historyV'), {
      address: address,
      description: description,
      name: name,
      userEmail: email,
    });
  } catch (error) {
    console.log(error, 'visitedBtn');
  }
};
