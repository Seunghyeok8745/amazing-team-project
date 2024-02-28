const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const basesURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`;
const functionName = 'route';

const getRoute = async () => {
  console.log(`BASE backend URL: ${basesURL}`);
  const data = await fetch(`${basesURL}/${functionName}`).then(response => response.json());
  console.log(JSON.stringify(data));
  return data;
};

getRoute();


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


