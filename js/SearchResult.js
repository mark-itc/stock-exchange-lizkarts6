class SearchResult {
  constructor(searchResultElement) {
    this.searchResultElement = searchResultElement;
  }

  async getCompanyData(symbol) {
    try {
      const url =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
        symbol;

      const response = await fetch(url);
      const result = response.json();

      return result;
    } catch (error) {
      return false;
    }
  }

  companyInfoPage(name, symbol, image, percentage) {
    const container = document.createElement("div");
    container.style.borderBottom = "1px solid gray";
    container.style.width = "fit-content";
    container.style.alignItems = "center";
    container.style.padding = "10px";
    container.style.margin = "auto";

    const makeLink = document.createElement("a");
    makeLink.setAttribute("href", "company.html?symbol=" + symbol);
    makeLink.setAttribute("target", "_blank");
    makeLink.innerHTML = " " + name + " (" + symbol + ") ";
    makeLink.innerHTML = makeLink.innerHTML.replace(
      new RegExp(this.searchValue, "gi"),
      (match) => "<mark>" + match + "</mark>"
    );

    const CompanyIcon = document.createElement("img");
    CompanyIcon.setAttribute("src", image);
    CompanyIcon.setAttribute("alt", "image");
    CompanyIcon.setAttribute("height", "40");
    CompanyIcon.setAttribute("width", "40");
    CompanyIcon.style.borderRadius = "10px";

    const percentageChange = document.createElement("div");
    percentageChange.style.fontSize = "10px";
    percentageChange.innerHTML = " (" + percentage + ")";
    if (percentage > 0) {
      percentageChange.style.color = "#2E5902";
    } else {
      percentageChange.style.color = "#A62B1F";
    }
    percentageChange;
    container.appendChild(CompanyIcon);
    container.appendChild(makeLink);
    container.appendChild(percentageChange);

    return container;
  }

  async renderResults(companies) {
    const searchValue = document.getElementById("search-input").value;
    this.searchValue = searchValue;

    companies.forEach(async (item) => {
      const details = await this.getCompanyData(item.symbol);
      const companyProfile = details.profile;
      const companyInfo = this.companyInfoPage(
        item.name,
        item.symbol,
        companyProfile.image,
        companyProfile.changesPercentage
      );
      this.searchResultElement.appendChild(companyInfo);
    });
  }
}
