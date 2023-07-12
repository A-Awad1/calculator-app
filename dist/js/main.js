let keypad = document.querySelector(".keypad"),
  valuesKeys = document.querySelectorAll("button[data-value]"),
  operatorsKeys = document.querySelectorAll("button[data-operator]"),
  delButton = document.querySelector(".delete"),
  resetButton = document.querySelector(".reset"),
  equalButton = document.querySelector(".equal"),
  payload = "",
  operator = "",
  digits = [],
  result = 0;

keypad.textContent = 0;

function displayResult() {
  if (digits.length === 1 && operator !== "" && payload !== "") {
    digits[1] = payload;
    result = eval(`${+digits[0]} ${operator} ${+digits[1]}`);
    keypad.textContent = result;
    digits = [];
    payload = result;
    operator = "";
  } else {
  }
}
valuesKeys.forEach(
  (e) =>
    (e.onclick = () => {
      payload += e.dataset.value;
      payload = +payload;
      keypad.textContent = payload;
    })
);
operatorsKeys.forEach(
  (e) =>
    (e.onclick = () => {
      displayResult();
      if (payload !== "") {
        if (digits.length === 0) {
          digits[0] = payload;
        }
        operator = e.dataset.operator;
        payload = "";
      }
    })
);
equalButton.onclick = () => {
  displayResult();
};
delButton.onclick = () => {
  console.log(payload);
  payload = payload.toString().slice(0, -1);
  payload === "" ? (payload = 0) : null;
  payload = +payload;
  keypad.textContent = payload;
};
resetButton.onclick = () => {
  payload = "";
  operator = "";
  digits = [];
  result = 0;
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
