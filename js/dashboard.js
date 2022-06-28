// collecting search input value
const searchBar = document.querySelector(".search-input");
searchBar.addEventListener("keypress", function (e) {
  // after the enter key is press grab stock data entered and render data
  if (e.keyCode == 13) {
    const symbol = searchBar.value;


    // grab news stories from API
    getNews(symbol);
    // get chart data from searched symbol
    updateChart(symbol);


    // update stock table details such as 52 wk chng, avg volume ect.
    fetch(
      `https://rapidapi.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}&region=US`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "675e232180msh684db82c43224d9p122709jsne5c627d38df4",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // change company Name to search stock name
        let companyName = document.querySelector(".stock-name");
        companyName.innerHTML = `${data.price.shortName}`;

        // change News title
        document.querySelector(
          ".stock-news"
        ).innerHTML = `Latest ${data.symbol} News`;

        //if daily stock change is less than 0 than add PROFIT class else add LOSS classname
        let companySymbol = document.querySelector(".stock-symbol");
        let change = parseFloat(data.price.regularMarketChange.fmt);
        if (change > 0) {
          companySymbol.innerHTML = `${data.symbol} <span class="quote profit"> ${data.price.regularMarketPrice.fmt}  ${data.price.regularMarketChange.fmt}(${data.price.regularMarketChangePercent.fmt})</span>`;
        } else {
          companySymbol.innerHTML = `${data.symbol} <span class="quote loss"> ${data.price.regularMarketPrice.fmt}  ${data.price.regularMarketChange.fmt}(${data.price.regularMarketChangePercent.fmt})</span>`;
        }
        // adding data to stock info table
        let obj = data.defaultKeyStatistics; // defining object to access 52WeekChange
        document.querySelector(
          ".wk-change"
        ).innerHTML = `${obj["52WeekChange"].fmt}`;
        document.querySelector(
          ".avg-vol"
        ).innerHTML = `${data.summaryDetail.averageVolume.fmt}`;
        document.querySelector(
          ".c-shares-short"
        ).innerHTML = `${obj.sharesShort.fmt}`;
        document.querySelector(
          ".prev-mon-s-s"
        ).innerHTML = `${obj.sharesShortPriorMonth.fmt}`;
        document.querySelector(
          ".market-cap"
        ).innerHTML = `${data.summaryDetail.marketCap.fmt}`;
        document.querySelector(
          ".pe-ratio"
        ).innerHTML = `${data.summaryDetail.trailingPE.fmt}`;
      })
      .catch((err) => {
        console.error("API call not responding please refresh.....");
      });

    

  }
});



////////////////////////////
//  update news to page ///
//////////////////////////
function getNews(sym){
     // grabs 10 news stories from API
     const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "675e232180msh684db82c43224d9p122709jsne5c627d38df4",
          "X-RapidAPI-Host": "stock-market-data.p.rapidapi.com",
        },
      };
  
      fetch(
        `https://stock-market-data.p.rapidapi.com/stock/buzz/news?ticker_symbol=${sym}`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          // grabs news title and URL and updates news
          for (let i = 0; i <= 9; i++) {
            // grabs title and shortens to first 37 charaters then add ... to the end of string 
            let title = res.news[i].title;
            let shortTitle = title.slice(0, 37);
            shortTitle += "...";
            document.querySelector(
              `.news-${i}`
            ).innerHTML = `<a href="${res.news[i].url}" target="_blank" class="news-title">${shortTitle}</a> `;
          }
        })
        .catch((err) => console.error(err));
}

////////////////////////////
//  update chart to page //
//////////////////////////

function updateChart(sym) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "675e232180msh684db82c43224d9p122709jsne5c627d38df4",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  fetch(
    `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=${sym}&region=US`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      let dates = [];
      let quotes = [];
      // getting previous 100 days and converting time to MM DD and pushing to dates array
      // grab 100 prev closing quotes of stock and adding to quotes array
      for (let i = 100; i >= 1; i--) {
        let time = res.prices[i].date + "000"; // adding 000 to end since API gives year of 1970
        let parsedTime = new Date(parseInt(time)).toString(); // converting to string so date can sliced
        dates.push(parsedTime.slice(4, 10));
        quotes.push(parseFloat(res.prices[i].close).toFixed(2));
      }

      // removing old chart and loading new stock chart
      document.querySelector(".stock-chart").innerHTML = "";
      document.querySelector(
        ".stock-chart"
      ).innerHTML = `<canvas id="myChart" width="400px" height="300px"></canvas>`;

      // change color based on prev 100 day performance 
      function colorChange(){
          if(quotes[99] - quotes[0] < 0){
              return 'rgb(255, 0,0)';
          }else{
              return 'rgb(0,255,0)';
          }
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: quotes,
              borderColor: colorChange(), //changes color base on price
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          plugins: {
            legend: {
              display: false, // removes label on top of chart
            },
          },
        },
      });
      // end of chart function
    })
    .catch((err) => console.error(err));
}


//  add chart to page on window load //

// updateChart('aapl');

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["6/20", "6/21", "6/20", "6/21", "6/22", "6/23"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgb(255, 0,0)", //changes color base on price
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false, // removes label on top of chart
      },
    },
  },
});
