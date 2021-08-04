import axios from "./node_modules/@bundled-es-modules/axios/axios.js";

let btn = document.querySelector("#submit");
let input = document.querySelector("#input");

let rateUsdBitcoin;

// callAxios();
btn.addEventListener("click", callAxios);

function callAxios() {
  axios
    .get(`https://api.coincap.io/v2/rates/bitcoin`)
    .then((response) => {
      rateUsdBitcoin = response.data.data.rateUsd;
    })
    .catch((err) => console.log(err));

  const coin = input.value.toLowerCase();
  input.value = "";
  const response = axios
    .get(`https://api.coincap.io/v2/rates/${coin}`)
    .then((response) => {
      console.log(response);
      const temp = response.data.data;
      const parent = document.querySelector("#id_parent");

      const objCrypto = new CryptoES6(parent, temp.id, temp.id, temp.rateUsd, temp.symbol.toLowerCase(), temp.rateUsd);
      objCrypto.addToHtml();
      objCrypto.listen();
    })
    .catch((err) => console.log(err));
}

class CryptoES6 {
  constructor(parent, name, id, price, symbol, rateUsd) {
    this.parent = parent;
    this.name = name;
    this.id = id;
    this.symbol = symbol;
    this.price = Number(price);
    this.imgUrl = `https://assets.coincap.io/assets/icons/${this.symbol.toLowerCase()}@2x.png`;
    this.rateUsd = rateUsd;
  }
  addToHtml() {
    var newBox = document.createElement("div");
    newBox.className = "box";
    this.parent.appendChild(newBox);
    newBox.innerHTML += `<img src='${this.imgUrl}' >`;
    newBox.innerHTML += `<h3>${this.name}</h3>`;
    newBox.innerHTML += `<div>Price:${this.price.toFixed(2)} USD</div>`;
    newBox.innerHTML += `<div class='${this.id}Exchange' ></div>`;
    newBox.innerHTML += `<button id="btn-${this.id}">Exchange coin</button>`;
  }
  listen() {
    const exchangeBtn = document.querySelector(`#btn-${this.id}`);
    exchangeBtn.addEventListener("click", () => {
      let temp = `one bitcoin=${(rateUsdBitcoin / this.rateUsd).toFixed(2)} ${this.name}`;
      let divEl = document.querySelector(`.${this.id}Exchange`);
      divEl.innerText = temp;
    });
  }
}
