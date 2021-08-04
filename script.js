import axios from "./node_modules/@bundled-es-modules/axios/axios.js";
import { DataTable } from "./node_modules/simple-datatables/dist/module/index.js";

const myTable = document.querySelector("#myTable");
let tBodyEl = document.querySelector("tbody");
const body  = document.querySelector("body");
let storageArrPrev = [];
let storageArrCurr = [];

callAxios();


function callAxios() {
  let count = 0;
  let Interval = setInterval(() => {
    // tBodyEl.innerHTML = "";
    count++;
    const response = axios
      .get("https://api.coincap.io/v2/assets")
      .then((response) => {

        response.data;
        if (count % 2 === 0) {
          body.style.backgroundColor = "lightblue"
        } else {
          body.style.backgroundColor = "rgb(204, 200, 204)"
        }

        if (storageArrPrev[0]) {
          storageArrPrev = localStorage.getItem("arr");

          storageArrPrev = JSON.parse(storageArrPrev);

        }

        createTableBody(response.data.data);
        const dataTable = new DataTable(myTable);
        storageArrPrev = storageArrCurr;
        localStorage.setItem("arr", JSON.stringify(storageArrPrev));
      
      })
      .catch((err) => console.log(err));

    console.log("bla");
  }, 5000);
}

const createTableBody = (data) => {
  tBodyEl.innerHTML = "";
  let trEl = "";
  // let counter = 0;
  for (const iterator of data) {
    // counter++;
    const { rank, name, priceUsd, marketCapUsd, vwap24Hr, supply, volumeUsd24Hr, changePercent24Hr, symbol } = iterator;
    const arr = [rank, name, priceUsd, marketCapUsd, vwap24Hr, supply, volumeUsd24Hr, changePercent24Hr, symbol];
    
    storageArrCurr.push(arr);

    trEl = "";
    let tdEl = "";

    for (let i = 0; i < arr.length; i++) {
      let num;
      let key = arr[i];
      switch (i) {
        case 0:
          tdEl += `<td>${key}</td>`;
          break;
        case 1:
          tdEl += `<td class="name_box"><img src="https://assets.coincap.io/assets/icons/${arr[8].toLowerCase()}@2x.png">
                <div class="name_box_words"> 
                <p>${key}<p>
                <p>${arr[8]}</p>
                </div></td>`;
          break;
        case 2:
          num = toBorM(key);
          num = toDollar(num);
          tdEl += `<td>${num}</td>`;

          break;
        case 3:
          num = toBorM(key);
          num = toDollar(num);
          tdEl += `<td>${num}</td>`;
          break;
        case 4:
          //   tdEl += `<td>${key}</td>`;
          num = toBorM(key);
          num = toDollar(num);
          tdEl += `<td>${num}</td>`;
          break;
        case 5:
          //   tdEl += `<td>${key}</td>`;
          num = toBorM(key);
          tdEl += `<td>${num}</td>`;
          break;
        case 6:
          //   tdEl += `<td>${key}</td>`;
          num = toBorM(key);
          num = toDollar(num);
          tdEl += `<td>${num}</td>`;
          break;
        case 7:
          //   tdEl += `<td>${key}</td>`;
          num = percent(key);
          tdEl += `<td>${num}</td>`;
          break;
        default:
          break;
      }

      trEl = `<tr id="color${arr[0]}">${tdEl}</tr>`;
    }
    tBodyEl.innerHTML += trEl;
  }

    updated();
    
};

function toDollar(num) {
  return `$${parseFloat(num)}`;
}

function toBorM(num) {
  num = parseFloat(num);
  if (num >= 1000000000) {
    num /= 1000000000;
    return `${num.toFixed(2)}b`;
  } else if (num >= 1000000) {
    num /= 1000000;
    return `${num.toFixed(2)}m`;
  } else {
    return `${num.toFixed(2)}`;
  }
}

function percent(num) {
  return `${parseFloat(num).toFixed(2)}%`;
}

function updated() {
  let temp;
  console.log("bla bla blaaaa");
  // console.log(storageArrCurr);
  console.log(storageArrPrev);

for (let i = 0; i < storageArrCurr.length - 1; i++) {
 for (let j = 2; j < storageArrPrev.length -1; j++) {
   if(storageArrCurr[i][j] > storageArrPrev[i][j]) {
     temp = document.querySelector(`#color${storageArrCurr[i][0]}`)
     console.log(`#color${storageArrCurr[i][0]}`);
     temp.style.backgroundColor = "green !important";
     console.log(temp);

   } else if (storageArrCurr[i][j] < storageArrPrev[i][j]) {
    temp = document.querySelector(`#color${storageArrCurr[i][0]}`)
    temp.style.backgroundColor = "red !important";
   } 
  //  else {
  //   temp = document.querySelector(`#color${storageArrCurr[i][0]}`)
  //   temp.style.backgroundColor = "none !important";
  //  }
  
 }

 }
}