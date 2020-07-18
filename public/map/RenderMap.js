function generateLatLong() {
    
    let tripArray = []

    window.testData.forEach(trip => {

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
    var tripArray = generateLatLong()

    var heatmapData = []
    
    tripArray.forEach(trip => {
        let lat
        let long
        for(var i = 0; i < trip.length; i++){  
            if(i%2 === 0) {
                lat = trip[i]
            } else {
                long = trip[i]
                heatmapData.push(new google.maps.LatLng(lat, long))
            }
        }
    })

    // console.log(heatmapData)
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
     heatmap.set("radius", heatmap.get("radius") ? null : 7)
     heatmap.set("opacity", false)
    
    // var marker = new google.maps.Marker({position: knox, map: map});

}