const btn = document.getElementById("btn");
const code = document.getElementById("code");
const search = document.getElementById("search");

async function searchResults() {
  code.innerText = "please wait";

  let searchTerm = search.value.trim();

  const res = await fetch("/get?search=" + encodeURIComponent(searchTerm));
  const json = await res.json();

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

btn.addEventListener("click", searchResults);

search.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchResults();
  }
});

//regex: deleting unescessary
