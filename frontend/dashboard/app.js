const menuIcon = document.querySelector(".menu-icon");
const sidenav = document.querySelector(".sidenav");
const sidenavClose = document.querySelector(".sidenav-close-icon");

menuIcon.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});

sidenavClose.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});

(function() {
    let placesAutocomplete = places({
      appId: 'plYR0C6D25C3',
      apiKey: 'cb7d79d87daed4f68068500409865fa1',
      container: document.querySelector('#address')
    });

    placesAutocomplete.on('change', function(e) {
        if(e.suggestion.type === "city") {
            fetchCityData(e.suggestion);
        }
        else if(e.suggestion.type === "address") {
            fetchStreetData(e.suggestion);
        }
        else if(e.suggestion.type === "state") {
            // for states. cant search states right now
        }
        console.log(e.suggestion); // delete 
    });
})();

// for state rank represent 90% of the graph with states/ 100% if only one
// and the remaining 10% with other
let statesPiechart = {
    type: "pie",
    data: {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ["#1496BB", "#0d3c55", "#c02e1d"]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    },
    options: {
        // animation: true
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: "Top states piechart",
            fontSize: 20
        }
    }
}

let weeklyData = {
    labels: getLastWeek(),
    datasets: [{
      label: "Mail sent",
      data: [20, 10, 30, 10, 20, 10, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(105, 205, 0, 0.5)"
  
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(105, 205, 0, 1)"
      ],
      borderWidth: 1
    }]
};

let weeklyDataGraph = {
    type: "bar",
    data: weeklyData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "Total mail sent this week: total here",
            fontSize: 18
        },
        scales: {
            xAxes: [{
            gridLines: {
                display:true
            },
            ticks: {
                fontSize: 16
            }  
            }],
            yAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 16
                }   
            }]
        }
    }
}

function getLastWeek() {
    let dateArr = [];
    let today = new Date();
    let date = null;
    let dd = "";
    let mm = "";
    let yyyy = "";
    let dateString = "";

    for(let i = 0; i < 7; ++i) {
        date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6 + i);
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dateArr.push(dateString);
    }

    return dateArr;
}

// chart js code
const ctx = document.getElementById("national-stats-graph").getContext("2d");
let chart = new Chart(ctx, weeklyDataGraph);

const ctx2 = document.getElementById("states-piechart").getContext("2d");
let piechart = new Chart(ctx2, statesPiechart);