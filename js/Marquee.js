let url =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=150 ";

class Marquee {
  constructor(element) {
    this.element = element;
  }
  async getMarqueeData(url) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      let presentData = document.createElement("div");
      presentData.classList.add("marqDisplay");
      this.element.appendChild(presentData);
      for (let i = 0; i < result.length; i++) {
        let marqueeData = document.createElement("div");
        marqueeData.classList.add("dataStyle");
        marqueeData.innerText = result[i].symbol + " $ " + result[i].price;
        presentData.appendChild(marqueeData);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
let marquee = document.getElementById("marquee");

let showMarquee = new Marquee(marquee);

showMarquee.getMarqueeData(url);
