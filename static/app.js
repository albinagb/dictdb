const btn = document.getElementById("btn");
const code = document.querySelector(".code");
const search = document.getElementById("search");
let clearBtn = document.querySelector(".clearBtn");
let borderEl = document.getElementById("borderline");

async function searchResults() {
  // code.innerText = "please wait";

  let searchTerm = search.value.trim().toLowerCase();

  const res = await fetch("/get?search=" + encodeURIComponent(searchTerm));
  const json = await res.json();

  // console.log(json);

  if (json.size > 0) {
    let allDef =
      "\n" + json.size + " definitions of '" + searchTerm + "' found:\n\n";

    animateFirstCode(defField);

    function defField() {
      json.dict.forEach((entry, indx) => {
        allDef = allDef + (indx + 1 + ". " + entry.def + "\n");
      });

      code.innerText = allDef;
    }
  } else {
    code.innerText =
      "\nNothing found for '" + searchTerm + "', please try something else.";
  }
}

// Clear all definitions

function clear() {
  search.value = "";
  animateCode(contentClear);
  clearBtn.style.visibility = "hidden";
  borderEl.style.visibility = "hidden";
}

function contentClear() {
  code.innerHTML = "";
}

function animateCode(callback) {
  let dur = 500;

  code.animate(
    { opacity: [0.8, 0] },
    {
      duration: dur,
      easing: "ease",
      iterations: 1,
    }
  );
  setTimeout(function () {
    callback();
  }, dur - 100);
}

// animate def code

function animateFirstCode(firstCallback) {
  let dur = 500;
  code.animate(
    { opacity: [0, 0.6] },
    {
      duration: dur,
      easing: "ease",
      iterations: 1,
    }
  );
  setTimeout(function () {
    firstCallback();
  }, dur - 100);
}

// Event Listeners

btn.addEventListener("click", searchResults);

search.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchResults();
  }

  let val = search.value.length;

  if (val === "" || val == null) {
    return false;
  } else {
    clearBtn.style.visibility = "visible";
    borderEl.style.visibility = "visible";
    clearBtn.classList.add("clearBtnNew");
    borderEl.classList.add("borderline");
    clearBtn.addEventListener("click", clear);
  }
});

//regex: deleting unescessary simbols

let headerEl = document.querySelector(".header");

let headerlength = headerEl.length;

// Transitions Only After Page Loaded
let bodyEl = document.body;

window.addEventListener("DOMContentLoaded", (event) => {
  bodyEl.classList.add("transitionsEl");
});
