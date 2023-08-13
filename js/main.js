// Main variables
let increaseEl = document.querySelector(".increase");
let decreaseEl = document.querySelector(".decrease");
let numEl = document.querySelector(".number");
let limitEl = document.querySelector(".limit");
let limitNum = document.getElementById("limit-num");
let currentNum = 0;
let maxLimit;

window.onload = () => {
  numEl.innerHTML = currentNum;
  checkControllers();
};

function checkControllers() {
  if (currentNum === 0) {
    decreaseEl.classList.remove("show-btn");
    decreaseEl.classList.add("hide-btn");
  } else {
    decreaseEl.classList.remove("hide-btn");
    decreaseEl.classList.add("show-btn");
  }
  if (limitEl.classList.contains("limit-found")) {
    if (maxLimit - currentNum === 0) {
      limitEl.innerHTML = `You reached your goal! (${currentNum})`;
    } else if (maxLimit - currentNum > 0) {
      limitEl.innerHTML = `${maxLimit - currentNum} out of ${maxLimit} left`;
    } else if (maxLimit - currentNum < 0) {
      limitEl.innerHTML = `You are above your goal with: ${
        currentNum - maxLimit
      }`;
    }
  }
}

document.addEventListener("click", (e) => {
  let increaseBtn = document.querySelector(".increase-logo");
  let decreaseBtn = document.querySelector(".decrease-logo");
  if (e.target === increaseBtn || e.target === decreaseBtn) {
    checkControllers();
  }
});

increaseEl.onclick = () => {
  currentNum += 1;
  numEl.innerHTML = currentNum;
};

decreaseEl.onclick = () => {
  if (currentNum !== 0) {
    currentNum -= 1;
    numEl.innerHTML = currentNum;
  }
};

function closePopUp(div, section) {
  let closeBtn = document.querySelector(`.${section}.popup .close`);
  closeBtn.addEventListener("click", () => {
    div.classList.remove("show");
  });
}

// Info
let infoBtn = document.querySelector(".header .info");

infoBtn.onclick = () => {
  let div = document.querySelector(".info.popup");
  div.classList.add("show");

  closePopUp(div, "info");
};

// Settings
let settingsBtn = document.querySelector(".header .settings");

settingsBtn.onclick = () => {
  let div = document.querySelector(".settings.popup");
  div.classList.add("show");

  closePopUp(div, "settings");

  let startNumEl = document.getElementById("start-num");
  startNumEl.value = "";

  startNumEl.addEventListener("input", () => {
    currentNum = Number(startNumEl.value);
    numEl.innerHTML = currentNum;
    checkControllers();
  });

  limitNum.value = "";
  limitNum.addEventListener("blur", () => {
    if (limitNum.value !== "") {
      maxLimit = Number(limitNum.value);
      limitEl.innerHTML = `${maxLimit - currentNum} out of ${maxLimit} left`;
      limitEl.classList.add("limit-found");
    } else {
      limitEl.innerHTML = ``;
      maxLimit = undefined;
    }
  });
};

// Reset
let resetBtn = document.querySelector(".header .reset");

resetBtn.onclick = () => {
  if (currentNum !== 0) {
    let div = document.querySelector(".reset.popup");
    div.classList.add("show");

    let yesBtn = document.querySelector(".reset.popup .yes");
    let cancelBtn = document.querySelector(".reset.popup .cancel");

    yesBtn.onclick = () => {
      div.classList.remove("show");
      currentNum = 0;
      numEl.innerHTML = currentNum;
      if (maxLimit > 0) {
        maxLimit = Number(limitNum.value);
        limitEl.innerHTML = `${maxLimit - currentNum} out of ${maxLimit} left`;
      }
      decreaseEl.classList.remove("show-btn");
      decreaseEl.classList.add("hide-btn");
    };
    cancelBtn.onclick = () => {
      div.classList.remove("show");
    };
  }
};

// Themes
let colorsSpans = document.querySelectorAll(".settings .colors span");

colorsSpans.forEach((span) => {
  span.addEventListener("click", () => {
    let themes = ["blue-theme", "violet-theme", "light-theme", "dark-theme"];
    document.body.classList.remove(...themes);
    document.body.classList.add(`${span.classList[0]}-theme`);
    // switch active class
    colorsSpans.forEach((oneSpan) => {
      oneSpan.classList.remove("active");
    });
    span.classList.add("active");
  });
});
