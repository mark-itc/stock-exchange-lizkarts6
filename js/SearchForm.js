class SearchForm {
  constructor(searchFormElement) {
    this.searchFormElement = searchFormElement;
    this.searchQuery = "";
    this.searchLimit = 10;
    this.createSearchBar();
  }

  createSearchBar() {
    const input = document.createElement("input");
    const button = document.createElement("button");

    input.classList.add("form-control");
    input.classList.add("me-2");
    input.setAttribute("id", "search-input");
    input.setAttribute("aria-label", "Search");
    input.setAttribute("placeholder", "Search");
    input.setAttribute("type", "search");
    input.style.width = "300px";
    input.style.marginLeft = "40%";

    button.classList.add("btn");
    button.classList.add("btn-outline-success");
    button.setAttribute("type", "submit");
    button.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

    this.searchFormElement.append(input);
    this.searchFormElement.append(button);
  }

  async getSearchData() {
    try {
      const url =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search" +
        "?query=" +
        encodeURIComponent(this.searchQuery) +
        "&limit=" +
        this.searchLimit +
        "&exchange=NASDAQ";

      const response = await fetch(url);
      const results = await response.json();

      return results;
    } catch (error) {
      return [];
    }
  }

  async runSearch() {
    this.searchQuery =
      this.searchFormElement.querySelector("#search-input").value;

    const searchResult = document.getElementById("search-result");
    const spinner = document.getElementById("spinner");

    searchResult.innerHTML = "";
    spinner.classList.remove("d-none");
    const results = await this.getSearchData();

    this.callback(results);

    spinner.classList.add("d-none");
  }

  onSearch(callback) {
    this.callback = callback;

    this.searchFormElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.runSearch();
    });
  }
}
