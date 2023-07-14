let keypad = document.querySelector(".keypad"),
  valuesKeys = document.querySelectorAll("button[data-value]"),
  operatorsKeys = document.querySelectorAll("button[data-operator]"),
  delButton = document.querySelector(".delete"),
  resetButton = document.querySelector(".reset"),
  equalButton = document.querySelector(".equal"),
  payload = "",
  digit1 = null,
  digit2 = null,
  operator = null,
  result = null;

keypad.textContent = 0;

function keypadValue(number) {
  let formattedResult =
    number > +"9".repeat(15) ? number.toPrecision(1) : number.toLocaleString();
  keypad.textContent = formattedResult;
}
function displayResult() {
  if (digit1 !== null && payload !== "") {
    digit2 = payload;
    payload = "";
  }
  if (digit1 !== null && digit2 !== null && operator !== null) {
    result = eval(`${digit1} ${operator} ${digit2}`);
    keypadValue(result);
    digit1 = null;
    digit2 = null;
    operator = null;
  }
}
valuesKeys.forEach(
  (e) =>
    (e.onclick = () => {
      result = null;
      if (e.dataset.value === ".") {
        if (payload.toString().includes(".")) {
          return false;
        }
        if (payload === "") {
          payload = 0;
        }
      }
      payload += e.dataset.value;
      keypadValue(+payload);
    })
);
operatorsKeys.forEach(
  (e) =>
    (e.onclick = () => {
      displayResult();
      if (e.dataset.operator === "-") {
        if (
          payload === "" &&
          digit1 === null &&
          digit2 === null &&
          operator === null &&
          result === null
        ) {
          payload = "-";
          keypad.textContent = "-";
          return false;
        }
      }
      if (payload !== "" && result === null) {
        digit1 = payload;
        payload = "";
      }
      if (payload === "" && result !== null) {
        digit1 = result;
        result = "";
      }
      if (digit1 !== null) {
        operator = e.dataset.operator;
      }
    })
);
equalButton.onclick = () => displayResult();
delButton.onclick = () => {
  +payload === 0 ? (payload = 0) : null;
  payload = payload.toString().slice(0, -1);
  payload = payload === "" ? "" : +payload;
  keypadValue(+payload);
};
resetButton.onclick = () => {
  digit1 = null;
  digit2 = null;
  payload = "";
  operator = null;
  result = null;
  keypad.textContent = 0;
};

let theme = localStorage.theme || 1;
document.documentElement.dataset.theme = theme;
let activeThemeButton = document.querySelector(`button[data-theme='${theme}']`);
activeThemeButton.classList.add("active");

let themeButtons = document.querySelectorAll(".theme-control button");
themeButtons.forEach((e) => {
  e.onclick = () => {
    themeButtons.forEach((e) => e.classList.remove("active"));
    document.documentElement.dataset.theme = e.dataset.theme;
    localStorage.theme = e.dataset.theme;
    e.classList.add("active");
  };
});
