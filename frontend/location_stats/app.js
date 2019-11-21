init();

// Adding margin top because the search bar is fixed and the location name would go under it.
function init() {
    const statsContainer = document.querySelector(".stats-container");
    const searchContainter = document.querySelector(".search-container");
    statsContainer.style.marginTop = searchContainter.offsetHeight + 10 + "px";
}

// -------onclick/Event functions------

function openSideMenu() {
    document.getElementById("side-menu").style.left = "0px";
}

function closeSideMenu() {
    document.getElementById("side-menu").style.left= "-500px";
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
    if(timePickers.style.display === "none" || getComputedStyle(timePickers, null).display === "none") {
        timePickers.style.display = "block";
        setArrowDirection("up");
    }
    else {
        timePickers.style.display = "none";
        setArrowDirection("down");
    }
});

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

const rangeBtn = document.getElementById("accept-range-btn");
rangeBtn.addEventListener("click", function() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    createCustomGraph(startDate, endDate);
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

//-----------chart.js code-------

// initial chart
const ctx = document.getElementById("myChart").getContext("2d");
let chart = new Chart(ctx, getWeeklyGraph());

function changeMailCountGraph(option_num) {
    // Destroy old chart every time a new one is created. 
    if(chart) {
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
}

function createWeeklyGraph() {
    chart = new Chart(ctx, getWeeklyGraph());
}

function create30DaysGraph() {
    chart = new Chart(ctx, get30DaysGraph());
}

function createYearlyGraph() {
    chart = new Chart(ctx, getYearlyGraph());
}

function createLifetimeGraph() {
    // Have to check the date of the first and most recent mail sent before
    // creating graph.
    // queryDatabase();
    chart = new Chart(ctx, getLifetimeGraph(startDate, endDate));
}

// put this in the get graph
function createCustomGraph(startDate, endDate) {
    chart.destroy();
    chart = new Chart(ctx, getCustomGraph(new Date(startDate), new Date(endDate)));
}

// database data functions

function getWeeklyGraph() {
    let weeklyData = {
        labels: getLastWeekLabels(),
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
    return weeklyDataGraph;
}

function get30DaysGraph() {
    let thirtyDaysData = {
        labels: getLast30DaysLabels(),
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
    
    let thirtyDaysGraph = {
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
    
    return thirtyDaysGraph;
}

function getYearlyGraph() {
    return {
        type: "line",
        data: {
            labels: getLastYearLabels(),
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
}

function getLifetimeGraph() {
    return {
        type: "line",
        data: {
            labels: getCGLabels(new Date(startDate), new Date(endDate)),
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
}

// have to add startDate, endDate parameters for the query
function getCustomGraph(startDate, endDate) {
    const oneDay = 1000 * 3600 * 24;
    const dayDifference = (endDate - startDate) / oneDay;
    console.log(dayDifference);
    let chartType = "";

    if(dayDifference <= 7) {
        chartType = "bar";
    }

    else {
        chartType = "line";
    }

    return {
        type: chartType,
        data: {
            labels: getCGLabels(startDate, endDate),
            datasets: [{
                label: "Number of letters over the past year",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [10, 100, 184, 293, 400, 567, 630, 710, 885, 943, 1075, 1200]
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
}

//----- label helper functions-----

function getCGLabels(startDate, endDate) {
    const oneDay = 1000 * 3600 * 24;
    const dayDifference = (endDate - startDate) / oneDay;

    if(dayDifference <= 7) {
        return cgLabels(dayDifference, startDate, endDate, dayDifference);
    }
    else {
        return cgLabels(10, startDate, endDate, dayDifference);
    }
}

function cgLabels(numLabels, startDate, endDate, dayDifference) {
    let dateLabels = [];
    let date = null;
    let dd = "";
    let mm = "";
    let yyyy = "";
    let dateString = "";

    for(let i = 0; i < numLabels - 1; ++i) {
        date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1 + (Math.ceil(dayDifference / numLabels - 1) * i));
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dateLabels.push(dateString);
    }

    // add endDate label. Got to guarentee the endDate is the last label
    date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
    dd = String(date.getDate()).padStart(2, '0');
    mm = String(date.getMonth() + 1).padStart(2, '0');
    yyyy = date.getFullYear();
    dateString = mm + '/' + dd + '/' + yyyy;
    dateLabels.push(dateString);

    return dateLabels
}

function getLastWeekLabels() {
    let dateLabels = [];
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
        dateLabels.push(dateString);
    }

    return dateLabels;
}

function getLast30DaysLabels() {
    let dateLabels = [];
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
        dateLabels.push(dateString);
    }

    return dateLabels;
}

function getLastYearLabels() {
    let dateLabels = [];
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
        dateLabels.push(dateString);
    }

    return dateLabels;
}