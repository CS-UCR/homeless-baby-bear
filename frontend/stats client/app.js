const statsContainer = document.querySelector(".stats-container");
const searchContainter = document.querySelector(".search-container");

// Adding margin top because the search bar is fixed and the location name would go under it.
statsContainer.style.marginTop = searchContainter.offsetHeight + "px";

// onclick/Event functions
function openSideMenu() {
    document.getElementById("side-menu").style.left = "0px";
}

function closeSideMenu() {
    document.getElementById("side-menu").style.left= "-500px";
}

// Algolia search bar init function
(function() {
    let placesAutocomplete = places({
      appId: 'plYR0C6D25C3',
      apiKey: 'cb7d79d87daed4f68068500409865fa1',
      container: document.querySelector('#address')
    });
})();

// My chart.js code
const ctx = document.getElementById("myChart").getContext("2d");

let yearlyDataGraph = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
            label: "Number of letters over the past year",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 100, 184, 293, 400, 567, 630, 710, 885, 943, 1075, 1200]
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false, 
        legend: {
            display: false
        },
        title: {
        display: true,
            text: "Total mail sent this week for City, State"
        },
        scales: {
            xAxes: [{
            gridLines: {
                display:true
            }
            }],
            yAxes: [{
            gridLines: {
                display:true
            }  
            }]
        }   
    }
};

weeklyData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
        text: "Total mail sent this week for City, State"
      },
      scales: {
        xAxes: [{
          gridLines: {
            display:true
          }
        }],
        yAxes: [{
          gridLines: {
            display:true
          },
          ticks: {
          beginAtZero: true
        }   
        }]
      }
    }
}

let chart = new Chart(ctx, weeklyDataGraph);
const timeframeOptionsDiv = document.getElementById("timeframe-options");
const timeframeOptions = timeframeOptionsDiv.children;

for(let i = 0; i < timeframeOptions.length; ++i) {
    timeframeOptions[i].addEventListener("click", function() {
        changeMailCountGraph(i);
    });
}

function changeMailCountGraph(option_num) {
    if(option_num === 0) {
        createWeeklyGraph();
    }
    else if(option_num === 1) {
        createMonthlyGraph();
    }
    else if(option_num === 2) {
        createYearlyGraph();
    }
    else if(option_num === 3) {
        createLifetimeGraph();
    }
    else if(option_num === 4) {
        createCustomTimeframeGraph();
    }
}

function createWeeklyGraph() {
    let chart = new Chart(ctx, weeklyDataGraph);
}

function createMonthlyGraph() {

}

function createYearlyGraph() {
    let chart = new Chart(ctx, yearlyDataGraph);
}

function createLifetimeGraph() {

}

function createCustomTimeframeGraph() {

}