


// collecting search input value 
const searchBar = document.querySelector('.search-input');
searchBar.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        const symbol = searchBar.value;
        
    };

   

})


//  add chart to page 
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
