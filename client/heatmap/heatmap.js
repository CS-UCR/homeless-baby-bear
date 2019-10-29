const body = document.querySelector("body");
const searchContainter = document.querySelector(".search-container");
const mapDiv = document.querySelector("#map");

let prevWindowHeight = window.innerHeight;
setMapHeight();
initHeatMap();

// on click functions and event listeners
window.addEventListener('resize', reportWindowSize);

function openSideMenu() {
    document.getElementById("side-menu").style.left = "0px";
}

function closeSideMenu() {
    document.getElementById("side-menu").style.left= "-500px";
}

function reportWindowSize() {
    if(window.innerHeight > prevWindowHeight) {
        prevWindowHeight = window.innerHeight;
        setMapHeight();
    }
}

// Algolia search bar init function
(function() {
    let placesAutocomplete = places({
      appId: 'plYR0C6D25C3',
      apiKey: 'cb7d79d87daed4f68068500409865fa1',
      container: document.querySelector('#address')
    });
})();

// Google map functions

// Adding position from the top because the search bar is fixed and the map would go over it.
function setMapHeight() {
    mapDiv.style.top = searchContainter.offsetHeight + "px";
    mapDiv.style.height = window.innerHeight - searchContainter.offsetHeight + "px";
}

function initHeatMap() {
    let heatmapData = generateHeatMapData();
    const americasCenter = new google.maps.LatLng(39.5, -98.35);

    const map = new google.maps.Map(document.getElementById('map'), {
      center: americasCenter,
      zoom: 5,
      mapTypeId: 'hybrid',
      gestureHandling: 'cooperative'
    });

    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData
    });
    heatmap.setMap(map);
}

function generateHeatMapData() {
    let heatmapData = [];

    for(let i = 0; i < 500; ++i) {
        let latitude = getRandomLatOrLong(30, 50, 3);
        let longitude = getRandomLatOrLong(-123, -70, 3);
    
        heatmapData.push(
            {
                location: new google.maps.LatLng(latitude, longitude),
                weight: getWeight()
            }
        );
    }
    return heatmapData;
}

function getRandomLatOrLong(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function getWeight() {
    return Math.floor((Math.random() * 10) + 1);
}