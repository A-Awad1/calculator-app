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
