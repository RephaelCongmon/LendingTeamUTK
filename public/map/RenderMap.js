let scooterData = require('./JsonScooterData.js')

function generateLatLong() {
    // let subStr = (scooterData[3].geometry).substring(13, (scooterData[3].geometry).length - 2)
    // let geometryLines = (subStr).split(" ")
    // let geometryNumbers = []

    // geometryLines.forEach(coordinate => {
    //     coordinate = coordinate.replace(',', '')
    //     geometryNumbers.push(parseFloat(coordinate))
    // })

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
    console.log(tripArray[0])
}

generateLatLong()
function initMap() {
    // The location of Uluru
    var knox = {lat: 35.964668, lng: -83.926453};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: knox});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: knox, map: map});
  }
