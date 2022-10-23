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
      let companyInfo = await getCompanyDetails(symbol);

      newLi.innerHTML =
        '<img src=" ' +
        companyInfo.profile.image +
        '" width="20" height="20">' +
        ' <a target="_blank" href=/company.html?symbol=' +
        symbol +
        ">" +
        name +
        "</a> <span style='font-size: 13px'>(" +
        symbol +
        ") </span> <span style='font-size: 10px; color: green'>" +
        companyInfo.profile.changesPercentage +
        "</span>";
      searchedList.appendChild(newLi);
    }
  } catch (err) {
    throw new Error("error", err);
  }
}

async function getCompanyDetails(symbol) {
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (err) {
    throw new Error("error", err);
  }
}
