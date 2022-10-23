let urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");
const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
const urlCharts = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
const spinner = document.getElementById("spinnerForCompany");

async function getSearchData(url) {
  spinner.classList.remove("d-none");
  try {
    const response = await fetch(url);
    const result = await response.json();
    spinner.classList.add("d-none");

    let link = result.profile.website;
    let name = result.profile.companyName;
    let photo = result.profile.image;
    let description = result.profile.description;
    let price = result.profile.price;
    let changesPercentage = result.profile.changesPercentage;

    document.getElementById("nameNlink").innerHTML =
      name + '<br> <a href="' + link + '" target="_blank">' + link + "</a>";
    document.getElementById("compImage").innerHTML =
      '<img src="' + photo + '">';
    document.getElementById("compPrice").innerHTML =
      "stock price: " + price + " $ ";
    if (price < 0) {
      document.getElementById("compPrice").style.color = "#A62B1F";
    } else {
      document.getElementById("compPrice").style.color = "#2E5902";
    }
    document.getElementById("priceChange").innerHTML =
      "(+" + changesPercentage + "%)";
    document.getElementById("priceChange").style.color = "#A8B545";
    document.getElementById("priceChange").style.fontSize = "14px";

    document.getElementById("compDescription").innerHTML = description;
  } catch (err) {
    throw new Error("error", err);
  }
}

getSearchData(url);

async function getChartData(urlCharts) {
  const response = await fetch(urlCharts);
  const result = await response.json();
  console.log(result);

  let history = result.historical;
  let historyDate = [];
  for (let i = 0; i < history.length; i++) {
    historyDate.push(history[i].date);
  }
  const labels = historyDate.reverse();
  let historyClose = [];
  for (let i = 0; i < history.length; i++) {
    historyClose.push(history[i].close);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price History",
        backgroundColor: "#3b622b",
        borderColor: "#3b622b",
        
        data: historyClose.reverse(),
      },
    ],
  };
  const chartAreaBorder = {
    id: "chartAreaBorder",
    beforeDraw(chart, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
        
      } = chart;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };
  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        chartAreaBorder: {
          borderColor: "#3b622b",
        },
      },
    },
    plugins: [chartAreaBorder],
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  
}

getChartData(urlCharts);
