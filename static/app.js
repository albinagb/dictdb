const btn = document.getElementById("btn");
const code = document.getElementById("code");
const search = document.getElementById("search");
let clearBtn = document.querySelector(".clearBtn");
let borderEl = document.getElementById("borderline");

async function searchResults() {
  code.innerText = "please wait";

  let searchTerm = search.value.trim().toLowerCase();

  const res = await fetch("/get?search=" + encodeURIComponent(searchTerm));
  const json = await res.json();

  // console.log(json);

  if (json.size > 0) {
    let allDef =
      "\n" + json.size + " definitions of '" + searchTerm + "' found:\n\n";

    json.dict.forEach((entry, indx) => {
      allDef = allDef + (indx + 1 + ". " + entry.def + "\n");
    });

    code.innerText = allDef;
  } else {
    code.innerText =
      "\nNothing found for '" + searchTerm + "', please try something else.";
  }
}

function clear() {
  search.value = "";
  code.innerHTML = "";
  clearBtn.style.visibility = "hidden";
  borderEl.style.visibility = "hidden";
}

btn.addEventListener("click", searchResults);

search.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchResults();
    // clear();
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

console.log(headerlength);
