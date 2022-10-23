const url =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?/AAPL?&limit=14";
async function marqueeData(url) {
    try {
  const response = await fetch(url);
  const result = await response.json();
  for (let i = 0; i < result.length; i++) {
    
    let symbol = result[i].symbol;
    let price = result[i].price;
    
    
    
    document.getElementById("marqueeContent").innerHTML += symbol + " $" + price + " ";
    document.getElementById("marqueeContentTwo").innerHTML += symbol + " $" + price + " ";
  }
} catch {
    console.log('error')
}
}
marqueeData(url);


