const searchButton = document
  .getElementById("submitButton")
  .addEventListener("click", searchData);
const userInput = document.getElementById("userSearchInput");
const searchedList = document.getElementById("searchedList");
const loadingSpinner = document.getElementById("spinner");

function searchData(e) {
  e.preventDefault();
  getSearchData(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      userInput.value +
      "&limit=10&exchange=NASDAQ"
  );
}
// let urlParams = new URLSearchParams(window.location.search);
// const symbol = urlParams.get("symbol");

// async function getImgAndPrice (){
//   const response = await fetch (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
//   const result = await response.json()
//   console.log(result);
// }

// getImgAndPrice()
async function getSearchData(url) {
  loadingSpinner.classList.remove("d-none");
  searchedList.innerHTML = "";
  try {
    const response = await fetch(url);
    const result = await response.json();
    loadingSpinner.classList.add("d-none");
    for (let i = 0; i < result.length; i++) {
      let symbol = result[i].symbol;
      let name = result[i].name;
      let newLi = document.createElement("li");
      newLi.classList.add("list-of-results");
      newLi.innerHTML =
        ' <a target="_blank" href=/company.html?symbol=' +
        symbol +
        ">" +
        name +
        "(" +
        symbol +
        ")</a> ";
      searchedList.appendChild(newLi);
    }
  } catch (err) {
    throw new Error("error", err);
  }
}
