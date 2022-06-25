


// collecting search input value 
const searchBar = document.querySelector('.search-input');
searchBar.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        const symbol = searchBar.value;

        fetch(`https://rapidapi.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}&region=US`, {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		        "x-rapidapi-key": "675e232180msh684db82c43224d9p122709jsne5c627d38df4"
	        }
            })
            .then(response => {
	         return response.json();
            })
            .then(data => {

                console.log(data);
                
                // var li = document.createElement('p');
                // li.textContent = `${data.symbol} --- ${data.price.regularMarketPrice.raw}  `;
                // li.classList.add('portListing');
                // watchList.appendChild(li);
            })
            .catch(err => {
                console.error('API call not responding please refresh.....');
            }); 
        
    };

})

/////////////////////////
//  add chart to page //
////////////////////////

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['6/20', '6/21', '6/20', '6/21', '6/22', '6/23'],    
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgb(255, 0,0)',   //changes color base on price 
            color: 'rgb(255, 255, 255)',
        }]
    },
   
    options: {
        
        scales: {
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                display: false,    // removes label on top of chart 
            }
        }
    },
    
});
