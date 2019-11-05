const statsContainer = document.querySelector(".stats-container");
const searchContainter = document.querySelector(".search-container");
// Adding margin top because the search bar is fixed and the location name would go under it.
statsContainer.style.marginTop = searchContainter.offsetHeight + 10 + "px";

// onclick/Event functions
function openSideMenu() {
    document.getElementById("side-menu").style.left = "0px";
}

function closeSideMenu() {
    document.getElementById("side-menu").style.left= "-500px";
}

function setArrowDirection(direction) {
    const arrow = document.querySelector(".direction-arrow");
    const upArrow = "\u25B2";
    const downArrow = "\u25BC";

    if(direction === "up") {
        arrow.innerText = upArrow;
    }
    else {
        arrow.innerText = downArrow;
    }
}

const timeframeOptionsDiv = document.getElementById("timeframe-options");
const timeframeOptions = timeframeOptionsDiv.children;
const timePickers = document.querySelector(".time-pickers");

for(let i = 0; i < 4; ++i) {
    timeframeOptions[i].addEventListener("click", function() {
        changeMailCountGraph(i);
    });
}

timeframeOptions[4].addEventListener("click", function() {
    // showDatePickers();
    if(timePickers.style.display === "none" || getComputedStyle(timePickers, null).display === "none") {
        timePickers.style.display = "block";
        setArrowDirection("up");
    }
    else {
        timePickers.style.display = "none";
        setArrowDirection("down");
    }
});


// Algolia search bar init function
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

function fetchCityData(locationDetails) {
    const location = document.getElementById("location");
    location.innerText = locationDetails.name + ", " + locationDetails.administrative;
    // queryDatabase();
}

function fetchStreetData(locationDetails) {
    const location = document.getElementById("location");
    location.innerText = locationDetails.name + ", " + locationDetails.city + ", " +locationDetails.administrative;
    // queryDatabase();
}

// chart.js code
const ctx = document.getElementById("myChart").getContext("2d");

let yearlyDataGraph = {
    type: "line",
    data: {
        labels: getLastYear(),
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
            text: "Total mail sent this year for City, State"
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

let thirtyDaysData = {
    labels: getLast30Days(),
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

let thirtyDaysDataGraph = {
    type: "line",
    data: thirtyDaysData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      title: {
      display: true,
        text: "Total mail sent in the last 30 days for City, State"
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

function getLast30Days() {
    let dateArr = [];
    let today = new Date();
    let date = null;
    let mm = "";
    let dd = "";
    let yyyy = "";
    let dateString = "";

    for(let i = 0; i < 7; ++i) {
        date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i));
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dateArr.push(dateString);
    }

    return dateArr;
}

function getLastYear() {
    let dateArr = [];
    let today = new Date();
    let date = null;
    let mm = "";
    let yyyy = "";
    let dateString = "";

    for(let i = 0; i < 12; ++i) {
        date = new Date(today.getFullYear(), today.getMonth() - 11 + i);
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + yyyy;
        dateArr.push(dateString);
    }

    return dateArr;
}

function getLifetimeDates() {
    // todo once server is up.
}


let chart = new Chart(ctx, weeklyDataGraph);

function changeMailCountGraph(option_num) {
    // Destroy old chart every time a new one is created. 
    if(chart) {
        console.log("hello");
        chart.destroy();
    }
    if(option_num === 0) {
        createWeeklyGraph();
    }
    else if(option_num === 1) {
        create30DaysGraph();
    }
    else if(option_num === 2) {
        createYearlyGraph();
    }
    else if(option_num === 3) {
        createYearlyGraph(); // placeholder till connected to server
        // createLifetimeGraph(); 
    }
    // else if(option_num === 4) {
    //     createCustomTimeframeGraph();
    // }
}

function createWeeklyGraph() {
    let chart = new Chart(ctx, weeklyDataGraph);
}

function create30DaysGraph() {
    let chart = new Chart(ctx, thirtyDaysDataGraph);
}

function createYearlyGraph() {
    let chart = new Chart(ctx, yearlyDataGraph);
}

function createLifetimeGraph() {

}

function createCustomTimeframeGraph() {

}