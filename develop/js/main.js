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

function displayResult() {
  if (digit1 !== null && payload !== "") {
    digit2 = payload;
    payload = "";
  }
  if (digit1 !== null && digit2 !== null && operator !== null) {
    result = eval(`${digit1} ${operator} ${digit2}`);
    Math.trunc(result) !== result ? (result = result.toFixed(2)) : null;
    keypad.textContent = result.toLocaleString();
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
      keypad.textContent = (+payload).toLocaleString();
    })
);
operatorsKeys.forEach(
  (e) =>
    (e.onclick = () => {
      displayResult();
      if (payload !== "" && !result) {
        digit1 = payload;
        payload = "";
      }
      if (payload === "" && result) {
        digit1 = result;
        result = "";
      }
      if (digit1 !== null) {
        operator = e.dataset.operator;
      }
    })
);
equalButton.onclick = () => {
  displayResult();
};
delButton.onclick = () => {
  +payload === 0 ? (payload = 0) : null;
  payload = payload.toString().slice(0, -1);
  payload = payload === "" ? "" : +payload;
  keypad.textContent = (+payload).toLocaleString();
  console.log(payload);
};
resetButton.onclick = () => {
  digit1 = null;
  digit2 = null;
  payload = "";
  operator = null;
  result = null;
  keypad.textContent = 0;
};
