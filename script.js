const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
console.log("FROM : ", dropdowns);

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  console.log(element);
  let currencyCode = element.value;
  console.log("CurrencyCode : ", currencyCode);
  let countryCode = countryList[currencyCode];
  console.log("CountryCode : ", countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
  console.log(
    "Teh new URL to get teh converted currency value exchange rate is : "
  );
  console.log(URL);

  let response = await fetch(URL);
  let data = await response.json();
  console.log("The Exchange Rate result : ", data);
  let rate = data[toCurrency.value.toLowerCase()];
  console.log("Rate : ", rate);

  let totalValue = rate * amountVal;
  let updatedMessage = document.querySelector("form .msg");
  updatedMessage.innerText = `${amountVal} ${fromCurrency.value} = ${totalValue}${toCurrency.value}`;
};
