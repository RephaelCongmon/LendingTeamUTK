
let scooterData = require('./JsonScooterData.json')

function generateLatLong() {
    
    let tripArray = []

    scooterData.forEach(trip => {

        let geometryNumbers = []
        let subStr = (trip.geometry).substring(12, (trip.geometry).length - 2)
        let geometryLines = (subStr).split(" ")

        geometryLines.forEach(coordinate => {
            coordinate = coordinate.replace(',', '')
            geometryNumbers.push(parseFloat(coordinate))
        })
        tripArray.push(geometryNumbers)
    });
    return tripArray
}

function initMap() {
    // The location of Knoxville
    var knox = {lat: 35.964668, lng: -83.926453};
    var tripArray = setTimeout(generateLatLong(),100)

    var heatmapData = [new google.maps.LatLng(35.96, -83.92)]
    tripArray.forEach(trip => {
        trip.forEach(coordinate, index => {
            console.log(index)
            heatmapData.push()
        })
    })

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15, 
            center: knox,
            //mapTypeId: 'satellite'
        }
    );

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });

     heatmap.setMap(map);
    
    var marker = new google.maps.Marker({position: knox, map: map});

}