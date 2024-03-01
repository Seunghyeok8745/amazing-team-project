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

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const gptDiv = document.getElementById('gptDiv');
let GptTra = [];
let GptRes = [];

let data = {
  date: '3월4일 2024년',
  city: 'Quebec',
  country: 'Canada',
  weather: 'sunny',
  kind: '특별한추억',
};

const LOCAL_URL = `https://bktest1.onrender.com/project/ai`;

//gpt 에서 여행명소 보여주는 함수
const showList = async () => {
  let resHTML;
  try {
    const promises = GptTra.map(async area => {
      try {
        const checkDup = await getDocs(query(collection(db, 'historyT'), where('name', '==', area.Name)));
        if (checkDup.size === 0) {
          // await addDoc(collection(db, "historyT"), {
          //   name: area[0],
          //   description: area[3],
          //   address: area[1]
          // });
          // console.log(area[0],'00000')
          // console.log(area[1],'11111')
          // console.log(area[2],'22222222')
        } else {
          console.log('Already have the list');
        }
        return `
          <div class="gptRes">
            <ul>
              <li>${area.Name}</li>
              <li>${area.Address}</li>
              <li>${area.Description}</li>
              <button id="pinBtn" onclick="pinBtn('${area.Latitude},${area.Longitude}')">find</button>
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
};

//pin 버튼(위도경도 보여준다
window.pinBtn = async function (lng, lat) {
  try {
    const regex = /-?\d+\.\d+/g;
    const numbers = lng.match(regex);
    const latitude = parseFloat(numbers[0]);
    const longitude = parseFloat(numbers[1]);
    console.log(latitude, longitude);
  } catch (error) {
    console.error('Error in pinBtn: ', error);
  }
};

//--------------------------------------------------------

//firebase auth (로그인하면 이메일고 user 정보들 보여주는 함수)
onAuthStateChanged(auth, user => {
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
    console.log(user);
  } else {
    // alert("logged out...")
    // window.location.href = "loginWithGoogle.html"
  }
});

// const logout = document.getElementById("signOut");
// logout.addEventListener("click" , function(){
//     signOut(auth).then(() => {
//       //  alert("logging out...");
//        window.location.href = "index.html"
//       }).catch((error) => {
//         console.log(error,'user 정보들 - app.js')
//       });
// })

//-----------------------------------------------------

//gpt 연결해서 소스 받는 api 함수

window.postJSON = async function () {
  try {
    console.log('postJSON@@@');
    const date = document.getElementById('date').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    data.date = date;
    data.city = city;
    data.country = country;

    const response = await fetch(LOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(data, 'data!!!');
    const result = await response.json();
    if (result.data) {
      const text = result.data;
      const textR = result.data2;

      const tipsArray = text
        .split('\n')
        .map(tip => tip.trim())
        .filter(tip => tip.length > 0);
      const tipsArrayR = textR
        .split('\n')
        .map(tip => tip.trim())
        .filter(tip => tip.length > 0);
      const destination = parseTipsArray(tipsArray);
      const restaurant = parseTipsArray(tipsArrayR);

      for (let area of destination) {
        const obj = convertToRestaurantObject(area);
        console.log(obj, 'obueee');
        GptTra.push(obj);
      }
      for (let rest of restaurant) {
        const obj = convertToRestaurantObject(rest);
        console.log(obj, 'ressss');
        GptRes.push(obj);
      }
      showList();
    } else {
      console.error('Error: result.data is undefined');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
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
  console.log(nestedArray, 'nestedArray');
  return nestedArray;
}

//------------------------------------------

const convertToRestaurantObject = infoArray => {
  const restaurantObject = {};

  infoArray.forEach(item => {
    // ':'를 기준으로 키와 값을 분리
    let [key, value] = item.split(': ');

    // 키에서 순서 번호 제거 (예: '5. Restaurant' -> 'Restaurant')
    key = key.replace(/^\d+\.\s*/, '');

    // 객체에 키-값 쌍 추가
    restaurantObject[key] = value;
  });
  console.log(restaurantObject, 'restaurantObj');
  return restaurantObject;
};

//-------------------------weataher----------------------

const API_KEY = `3b56745dd240621d3eaad2aac3d8a827`;

let buttonArea = document.getElementById('button-area');
buttonArea.addEventListener('click', () => {
  console.log(buttonArea);
  navigator.geolocation.getCurrentPosition(success, error);
  //사용자의 실제 위치를 브라우저에게 요청 가능.
});

const success = position => {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //alert("Current location is " + latitude + " and, " + longitude);
  getWeatherInfo(latitude, longitude);
};
const error = () => {
  // alert("Location can't be found");
};

const getWeatherInfo = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  //함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 "나중에 호출(called back)"하는 것이 콜백 함수의 개념
  const data = await response.json();
  console.log(data);

  const location = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById('location-area').innerHTML = `<li id="location-area">location: ${location}</li>`;
  document.getElementById('feelsLike-area').innerHTML = `<li id="feelsLike-area">temperature: ${temperature}°</li>`;
  document.getElementById('description-area').innerHTML = `<li id="description-area">description: ${description}</li>`;
  document.getElementById('icon-area').setAttribute(`src`, `https://openweathermap.org/img/wn/${icon}@2x.png`);
};
// postJSON(data);
