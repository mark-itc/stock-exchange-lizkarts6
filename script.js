const searchButton = document
  .getElementById("submitButton")
  .addEventListener("click", searchData);
const userInput = document.getElementById("userInput").value;
const searchedList = document.getElementById("searchedList");
const loadingSpinner = document.getElementById("spinner");

function searchData(e) {
  e.preventDefault();
  getSearchData(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      userInput +
      "&limit=10&exchange=NASDAQ"
  );
}

async function getSearchData(url) {
  loadingSpinner.classList.remove("d-none");
  searchedList.innerHTML = "";
  try {
    const response = await fetch(url);
    const result = await response.json();
    loadingSpinner.classList.add("d-none");
    result.forEach((item) => {
      let name = item.name;
      let symbol = item.symbol;
      let newLi = document.createElement("li");
      newLi.classList.add("list-of-results");
      newLi.innerHTML =
        '<a target="_blank" href=/company.html?symbol=' +
        symbol +
        ">" +
        name +
        "(" +
        symbol +
        ")</a>";
      searchedList.appendChild(newLi);
    });
  } catch (err) {
    throw new Error("error", err);
  }
}
