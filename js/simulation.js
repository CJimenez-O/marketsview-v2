console.log('test');
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['6/20', '6/21', '6/20', '6/21', '6/22', '6/23'],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgb(255, 0,0)',
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
                display: false,
            }
        }
    },
    
});
